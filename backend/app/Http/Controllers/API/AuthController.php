<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'user' => 'required',
            'password' => 'required',
            'device_name' => 'required'
        ]);

        if ($validate->fails()) {

            return response()->json([
                'type' => "missing",
                'messages' => $validate->errors(),
                'token' => null
            ]);

        }

        $user = User::where('email', $request->user)->orWhere('phone', $request->user)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {

            return response()->json([
                'type' => "incorrect",
                'messages' => 'The credentials was incorrect',
                'token' => null
            ]);

        }

        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'type' => 'success',
            'messages' => 'Login Successfully',
            'token' => $token
        ]);
    }

    public function register(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required|min:10|max:11|unique:users',
            'password' => 'required|confirmed',
            'role_id' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => "missing",
                'messages' => $validate->errors(),
                'result' => null
            ]);
        }

        $userAttr = [
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'organisation' => $request->organisation,
            'role_id' => $request->role_id,
            'lat' => $request->lat,
            'lng' => $request->lng
        ];


        $user = User::create($userAttr);
        $token = $user->createToken($request->device_name)->plainTextToken;

        return response()->json([
            'type' => $user ? "success" : "fail",
            'messages' => $user ? 'Succesfully Created' : 'Fail to create',
            'result' => $user,
            'token' => $token
        ]);
    }


    public function user(Request $request)
    {
        $user = $request->user();
        $user->location = $user->location;
        $user->role = $user->role;

        return $user;
    }


    public function updateProfile(Request $request)
    {
        $userId = $request->user()->id;


        $validate = Validator::make($request->all(), [
            'name' => 'required',
            'phone' => 'required|min:10|max:11|unique:users,phone,' . $userId,
            'email' => 'unique:users,email,' . $userId
        ]);


        if ($validate->fails()) {
            return response()->json([
                'type' => 'missing',
                'messages' => $validate->errors()
            ]);
        }

        $user = User::where('id', $userId)->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'email' => $request->email,
            'fb_link' => $request->fb_link,
            'organisation' => $request->organisation,

            'gender' => $request->gender,
            'birthday' => $request->birthday,

            'blood_group_id' => $request->blood_group_id,
            'blood_donate' => $request->blood_donate,
            'last_blood_donation' => $request->last_blood_donation,

            'location_id' => $request->location_id,
            'address' => $request->address,
            'lat' => $request->lat,
            'lng' => $request->lng
        ]);

        return response()->json([
            'type' => 'success',
            'messages' => 'সফলভাবে পরিবর্তিত হয়েছে'
        ]);
    }


    public function changePassword(Request $request)
    {
        $user = $request->user();

        $validate = Validator::make($request->all(), [
            'oldPassword' => 'required',
            'password' => 'required|confirmed'
        ]);


        if ($validate->fails()) {

            return response()->json([
                'type' => 'missing',
                'messages' => $validate->errors()
            ]);
        }

        $user = User::findOrFail($user->id);


        if (!$user || !Hash::check($request->oldPassword, $user->password)) {

            return response()->json([
                'type' => 'error',
                'messages' => 'পুরাতন পাসওয়ার্ড ভুল দিয়েছেন ।'
            ]);
        }


        $user->password = Hash::make($request->password);
        $user->save();

        return response()->json([
            'type' => 'success',
            'messages' => 'সফলভাবে পাসওয়ার্ড পরিবর্তিত হয়েছে',
            'results' => $user
        ]);
    }


    public function changeImage(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'image' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'missing',
                'message' => 'There is something error please check.'
            ]);
        }
        $user = false;

        if ($request->hasFile('image')) {
            $user = $request->user();
            $image = $request->file('image');
            $dir = 'user/profile';
            $imageName = 'storage/' . $dir . '/default.png';

            if (isset($image) && $image) {

                if (Storage::disk('public')->exists($dir . '/' . basename($user->image_directory))) {
                    Storage::disk('public')->delete($dir . '/' . basename($user->image_directory));
                }

                $imageName = uniqid() . Carbon::now() . '.' . $image->getClientOriginalExtension();
                if (!Storage::disk('public')->exists($dir)) {
                    Storage::disk('public')->makeDirectory($dir);
                }
                $img = $image->store($dir, 'public');
                $imageName = $img ? 'storage/' . $img : $imageName;
            }

            $user->image_directory = $imageName;
            $user = $user->save();
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Image successfully updated.',
            'user' => $user
        ]);
    }


    public function changeNID(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'image' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'missing',
                'message' => 'There is something error please check.'
            ]);
        }
        $user = false;

        if ($request->hasFile('image')) {
            $user = $request->user();
            $image = $request->file('image');
            $dir = 'user/nid';
            $imageName = 'storage/' . $dir . '/default.png';

            if (isset($image) && $image) {

                if (Storage::disk('public')->exists($dir . '/' . basename($user->image_directory))) {
                    Storage::disk('public')->delete($dir . '/' . basename($user->image_directory));
                }

                $imageName = uniqid() . Carbon::now() . '.' . $image->getClientOriginalExtension();
                if (!Storage::disk('public')->exists($dir)) {
                    Storage::disk('public')->makeDirectory($dir);
                }
                $img = $image->store($dir, 'public');
                $imageName = $img ? 'storage/' . $img : $imageName;
            }

            $user->nid_img = $imageName;
            $user = $user->save();
        }

        return response()->json([
            'type' => 'success',
            'message' => 'Image successfully updated.',
            'user' => $user
        ]);
    }


    public function doctorLists(Request $request)
    {
        $users = User::where('doctor_help', true)->with('doctorHelpTitle');

        if ($request->doctor_help_id) {
            $users = $users->where('doctor_help_id', $request->doctor_help_id);
        }

        $users = $users->get();

        return response()->json($users);
    }

    public function updateTelemedicineStatus(Request $request)
    {
        $user = $request->user();


        $user = $request->user();
        $user = User::findOrFail($user->id);
        $user->doctor_help = !$user->doctor_help;
        $update = $user->save();
        return response()->json([
            'result' => (Boolean)$user->doctor_help,
            'update' => $update
        ]);
    }


    public function updateTelemedicineData(Request $request)
    {

        $validate = Validator::make($request->all(), [
            'degreeTitle' => 'required',
            'workplace' => 'required',
            'workTitle' => 'required',
            'medivision' => 'required',
            'whatsapp' => 'required'
        ]);

        if ($validate->fails()) {
            return response()->json([
                'type' => 'missing',
                'messages' => $validate->errors()
            ]);
        }


        $user = $request->user();


        $user = $request->user();
        $user = User::findOrFail($user->id);
        $user->doctor_degree = $request->degreeTitle;
        $user->doctor_workplace = $request->workplace;
        $user->doctor_title = $request->workTitle;
        $user->doctor_help_id = $request->medivision;
        $user->whatsapp = $request->whatsapp;
        $user->doctor_schedule_type = $request->schedule_type;
        $user->doctor_schedule_days = json_encode($request->schedule_days ?? []);
        $user->doctor_schedule_time_from = $request->time_from;
        $user->doctor_schedule_time_to = $request->time_to;
        $update = $user->save();


        return response()->json([
            'type' => 'success',
            'result' => $update,
            'messages' => 'Succefully Done.'
        ]);
    }


    public function logout(Request $request)
    {
        $revoke = $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => $revoke
        ]);
    }


    public function hello(Request $request)
    {

        return response()->json([
            'message' => $request->message
        ]);
    }

}
