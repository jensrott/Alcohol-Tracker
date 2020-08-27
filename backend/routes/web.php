<?php

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
    return redirect('/home');
});
Route::get('/home', 'Views\HomeController@index')->name('home');


Route::get('/login', 'Views\PagesController@login');
Route::get('/register', 'Views\PagesController@register');

Route::get('/verify/{token}', 'Views\VerifyController@verify');

Auth::routes();

// TODO: fix auth and verified error, gets redirected to home
// TODO: fix verified middleware
Route::group(['middleware' => ['role:superadmin', 'auth']], function () {
    Route::resource('users', 'Views\UsersController');
    Route::patch('users/{user}/restore', 'Views\UsersController@restore')->name('users.restore');
    Route::delete('users/{user}/delete', 'Views\UsersController@delete')->name('users.delete');

    // Route::group(['middleware' => ['role:admin,superadmin']], function () {
    Route::resource('tips', 'Views\TipsController');
    Route::patch('tips/{tip}/restore', 'Views\TipsController@restore')->name('tips.restore');
    Route::delete('tips/{tip}/delete', 'Views\TipsController@delete')->name('tips.delete');


    // });
});
