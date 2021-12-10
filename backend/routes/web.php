<?php

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('/backend/dashboard');
})->name('index');

Auth::routes();

Route::get('logout','Auth\LoginController@logout')->name('logout');

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/storagelink', 'HomeController@storageLink')->name('storage.link');





Route::group(['as' => 'backend.','prefix' => 'backend','namespace' => 'Backend','middleware' => ['auth']],function(){

Route::get('dashboard','CommonController@dashboard')->name('dashboard');


Route::get('money/list','MoneyController@list')->name('money.list');


});
