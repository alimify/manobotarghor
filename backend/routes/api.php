<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::group(['namespace' => 'API'], function () {
    Route::get('hello', 'AuthController@hello');

    Route::post('login', 'AuthController@login');
    Route::post('register', 'AuthController@register');
    ///Test

    ///CommonController
    Route::get('common/divisions', 'CommonController@divisions');
    Route::get('common/districtByDivision', 'CommonController@districtByDivision');
    Route::get('common/thanaByDistrict', 'CommonController@thanaByDistrict');

    Route::get('common/doctorHelpTitles', 'CommonController@doctorHelpTitles');
    Route::get('common/bloodGroups', 'CommonController@bloodGroups');

    // PaymentController
    Route::get('payment/shurjopay', 'PaymentController@shurjoPay');
    Route::get('payment/shurjopayReturn', 'PaymentController@shurjoPayReturn')->name('api.shurjopayreturn');

});


Route::group(['namespace' => 'API', 'middleware' => ['auth:sanctum']], function () {

    Route::get('user', 'AuthController@user');
    Route::post('logout', 'AuthController@logout');
    Route::post('user/changePassword', 'AuthController@changePassword');
    Route::post('user/updateProfile', 'AuthController@updateProfile');
    Route::post('user/changeImage', 'AuthController@changeImage');
    Route::post('user/changeNID', 'AuthController@changeNID');
    Route::get('user/doctorLists', 'AuthController@doctorLists');
    Route::post('user/updateTelemedicineStatus', 'AuthController@updateTelemedicineStatus');
    Route::post('user/updateTelemedicineData', 'AuthController@updateTelemedicineData');


    //MoneyController
    Route::get('money/list', 'MoneyController@list');
    Route::post('money/request', 'MoneyController@request');
    Route::get('money/requestDetails', 'MoneyController@requestDetails');
    Route::post('money/request/providerUpdate', 'MoneyController@providerUpdate');
    Route::post('money/request/publish', 'MoneyController@requestPublish');

    // FoodController
    Route::get('food/projectList', 'FoodController@projectList');
    Route::post('food/storeFoodDonation', 'FoodController@storeFoodDonation');
    Route::post('food/storeMoneyDonation', 'FoodController@storeMoneyDonation');
    Route::get('food/selfDonation', 'FoodController@selfDonation');
});

