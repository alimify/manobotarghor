<?php

namespace App\Http\Controllers\API;

use App\FoodProject;
use App\FoodProjectHistory;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FoodController extends Controller
{
    public function projectList()
    {
        $projects = FoodProject::where('active',true)->get();

        return response()->json(compact('projects'));
    }

    public function storeFoodDonation(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'project_id' => 'required',
            'person' => 'required',
            'date' => 'required'
        ]);

        if($validate->fails()){

            return response()->json([
                'type' => 'missing',
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }

        $attr = [
            'project_id' => $request->project_id,
            'donor_user_id' => $request->user()->id,
            'person' => $request->person,
            'date' => $request->date,
            'type' => 1
        ];

        $project = FoodProjectHistory::insert($attr);


        return response()->json([
            'type' => 'success',
            'messages' => [
                'অশেষ কৃতজ্ঞতা ও ধন্যবাদ',
                'খাবার প্রদানের অনুরোধটি গ্রহন করা হয়েছে',
                'সেচ্ছাসেবকরা আপনার সাথে যোগাযোগ করে খাবার সংগ্রহ করে বিতরন করবেন।'
            ],
            'result' => $project
        ]);

    }


    public function storeMoneyDonation(Request $request)
    {
        $validate = Validator::make($request->all(),[
            'project_id' => 'required',
            'amount' => 'required'
        ]);

        if($validate->fails()){

            return response()->json([
                'type' => 'missing',
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }

        $attr = [
            'project_id' => $request->project_id,
            'donor_user_id' => $request->user()->id,
            'money' => $request->amount,
            'type' => 2
        ];

        $project = FoodProjectHistory::insertGetId($attr);


        return response()->json([
            'type' => 'success',
            'messages' => 'Succefully Added.',
            'result' => $project
        ]);

    }


    public function selfDonation(Request $request)
    {
        $user = $request->user();
        $id = $user->id;

        $results = FoodProjectHistory::where('donor_user_id',$id)->orderBy('created_at','DESC')
                                                                 ->with('project')
                                                                 ->get();

        return response()->json($results);
    }
}
