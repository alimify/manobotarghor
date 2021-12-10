<?php

namespace App\Http\Controllers\API;

use App\FoodProjectHistory;
use App\Http\Controllers\Controller;
use App\MoneyRequest;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function shurjoPay(Request $request)
    {


        $ch = curl_init();
        $options = array( 'Merchant_Username'=>'spaytest', 'Merchant_password'=>'pass1234');
        $uniq_transaction_key='NOKPOR'.uniqid();//Given By Shurjumukhi Limited
        $amount= $request->amount;
        // $clientIP = $request->ip();
        $clientIP = "127.0.0.1";

        // dd($request->ip());

        $xml_data = 'spdata=<?xml version="1.0" encoding="utf-8"?>
                                  <shurjoPay><merchantName>'.$options['Merchant_Username'].'</merchantName>
                                  <merchantPass>'.$options['Merchant_password'].'</merchantPass>
                                  <userIP>'.$clientIP.'</userIP>
                                  <uniqID>'.$uniq_transaction_key.'</uniqID>
                                  <totalAmount>'.$amount.'</totalAmount>
                                  <paymentOption>shurjopay</paymentOption>
                                  <returnURL>'.route('api.shurjopayreturn',['id' => $request->id,'type' => $request->type,'uid' => $request->uid]).'</returnURL></shurjoPay>';

        $url = "https://shurjopay.com/sp-data.php";
        curl_setopt($ch,CURLOPT_URL,$url);
        curl_setopt($ch,CURLOPT_POST, 0);                //0 for a get request
        curl_setopt($ch,CURLOPT_POSTFIELDS,$xml_data);
        curl_setopt($ch,CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch,CURLOPT_CONNECTTIMEOUT ,3);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);

        echo $response;

    }


    public function shurjoPayReturn(Request $request)
    {
        $requestData = $request->all();

        if(count($requestData)>0) {
            $response_encrypted = $request->spdata;

            $fp = fopen('return.txt', 'a');
            $e = $response_encrypted."\n";
            fwrite($fp,$response_encrypted);
            fclose($fp);

            $response_decrypted = file_get_contents("https://shurjopay.com/merchant/decrypt.php?data=".$response_encrypted);
            $data= simplexml_load_string($response_decrypted) or die("Error: Cannot create object");

            $fp = fopen('return.txt', 'a');
            $d = $response_decrypted."\n";
            fwrite($fp,$response_decrypted);
            fclose($fp);

                $tx_id = $data->txID;
                $bank_tx_id = $data->bankTxID;
                $bank_status = $data->bankTxStatus;
                $sp_code = $data->spCode;
                $sp_code_des = $data->spCodeDes;
                $sp_payment_option = $data->paymentOption;

                switch($sp_code) {
                    case '000':
                        $res = array('status'=>false,'msg'=>'Action Successful');
                        break;
                    case '001':
                        $res = array('status'=>false,'msg'=>'Action Failed');
                        break;
                }

                if($request->type == 'food'){
                    $history = FoodProjectHistory::findOrFail($request->id);
                    $history->description = json_encode([
                        'gateway' => 'shurjopay',
                        'data' => $data
                    ]);
                    $history->status = $sp_code === '000' ? 1 : 2;
                    $history->save();

                    echo ($sp_code === '000')?'Success':'Failed';
                }


                if($request->type == 'money' && $sp_code === '000'){
                    $money = MoneyRequest::findOrFail($request->id);
                    $money->money_provider_id = $request->uid;
                    $money->payment_info = json_encode([
                        'gateway' => 'shurjopay',
                        'data' => $data
                    ]);
                    $money->save();
                    echo "Success";
                }elseif($request->type == 'money'){
                    echo "failed...";
                }

        }
    }
}
