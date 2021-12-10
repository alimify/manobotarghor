<?php

namespace App\Http\Controllers\API;

use App\BloodGroup;
use App\DoctorHelpTitle;
use App\Http\Controllers\Controller;
use App\Location;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CommonController extends Controller
{
    public function divisions()
    {
        $locations = Location::groupBy('division')->get();

        return response()->json($locations);
    }

    public function districtByDivision(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'division' => 'required'
        ]);

        if ($validate->fails()) {

            return response()->json([
                'type' => 'missing',
                'message' => 'Division must required.',
                'results' => null
            ]);
        }

        $districts = Location::where('division', $request->division)
            ->groupBy('district')
            ->get();

        return response()->json([
            'type' => 'success',
            'message' => 'Results successfully loaded..',
            'results' => $districts
        ]);
    }


    public function thanaByDistrict(Request $request)
    {


        $validate = Validator::make($request->all(), [
            'district' => 'required'
        ]);

        if ($validate->fails()) {

            return response()->json([
                'type' => 'missing',
                'message' => 'District must required.',
                'results' => null
            ]);
        }


        $thanas = Location::where('district', $request->district)
            ->groupBy('thana')
            ->get();

        return response()->json([
            'type' => 'success',
            'message' => 'Results Successfully loaded..',
            'results' => $thanas
        ]);
    }


    public function doctorHelpTitles()
    {
        $titles = DoctorHelpTitle::where('active', true)->get();

        return response()->json($titles);
    }


    public function bloodGroups()
    {
        $groups = BloodGroup::all();

        return response()->json($groups);
    }

}
