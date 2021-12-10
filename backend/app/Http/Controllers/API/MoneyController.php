<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\MoneyRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class MoneyController extends Controller
{
    public function list(Request $request)
    {

        $req = MoneyRequest::orderBy('created_at','DESC')->with('location','user','moneyProvider');
        $user = $request->user();

        if($request->viewListType == 1){
            $req = $req->where('user_id',$user->id);
        }elseif($request->viewListType == 2){
            $req = $req->where('money_provider_id',$user->id);
        }

        if(!$user->modaretor_role && $request->viewListType != 1){
            $req = $req->where('published',true);
        }

        if($request->division || $request->district || $request->location){

            $req = $req->whereHas('location',function($query) use($request){

                $location = $query;

                if($request->location){
                    $location = $location->where('id',$request->location);
                }elseif ($request->division || $request->district){

                    if($request->division){
                        $location = $location->where('division',$request->division);
                    }

                    if($request->district){
                        $location = $location->where('district',$request->district);
                    }

                }


               return $location;
            });

        }

        $req = $req->get();

        return response()->json($req);
    }

    public function request(Request $request)
    {

        $validate = Validator::make($request->all(),[
            'name'  => 'required',
            'phone' => 'required|min:10|max:11',
            'income_source' => 'required',
            'family_member' => 'required|numeric',
            'amount' => 'required|numeric',
            'seeking_reason' => 'required',
            'reference1_name' => 'required',
            'reference1_phone' => 'required',
            'location_id' => 'required',
            // 'lat' => 'required',
            // 'lng' => 'required'
        ]);

        if($validate->fails()){
            return response()->json([
                'type' => "missing",
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }

        $attr = [
            'user_id' => $request->user()->id,
            'name' => $request->name,
            'phone' => $request->phone,
            'income_source' => $request->income_source,
            'family_member' => $request->family_member,
            'amount' => $request->amount,
            'seeking_reason' => $request->seeking_reason,
            'reference1_name' => $request->reference1_name,
            'reference1_phone' => $request->reference1_phone,
            'reference2_name' => $request->reference2_name,
            'reference2_phone' => $request->reference2_phone,
            'location_id' => $request->location_id,
            'lat' => $request->lat,
            'lng' => $request->lng,
            'union' => $request->union,
            'description' => $request->description,
        ];


        $req = MoneyRequest::create($attr);

        return response()->json([
            'type' => $req? "success" : "fail",
            'messages' => $req?'Succesfully Created':'Fail to create',
            'result' => $req
        ]);
    }


    public function requestDetails(Request $request)
    {
        if(!$request->id){
            return response()->json(null);
        }

        $req = MoneyRequest::find($request->id);

        return response()->json($req);
    }


    public function providerUpdate(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'request_id' => 'required'
        ]);

        if($validate->fails()){

            return response()->json([
                'type' => "missing",
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }


        $update = MoneyRequest::where('id',$request->request_id)
                                ->update([
                                    'money_provider_id' => $request->user()->id
                                    ]);

        return response()->json([
            'type' => $update? "success" : "fail",
            'messages' => $update?'successfully performed':'Fail to perform',
            'result' => $update
        ]);

    }

    public function requestPublish(Request $request)
    {

        $user = $request->user();

        if(!$user->modaretor_role){

            return response()->json([
                'type' => "fail",
                'messages' => 'You are not permitted.',
                'result' => null
            ]);
        }

        $validate = Validator::make($request->all(),[
            'request_id' => 'required'
        ]);

        if($validate->fails()){

            return response()->json([
                'type' => "missing",
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }


        $update = false;
        $requestMoney = MoneyRequest::find($request->request_id);
        if($requestMoney){
        $requestMoney->published = !$requestMoney->published;
        $update = $requestMoney->save();
        }


        return response()->json([
            'type' => $update? "success" : "fail",
            'messages' => $update?'successfully performed':'Fail to perform',
            'result' => $update
        ]);
    }

}
