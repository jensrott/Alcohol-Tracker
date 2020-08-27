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

$version = '/v1';

Route::group(['prefix' => $version], function () {

    /* User */
    Route::post('register', 'Api\AuthController@register');
    Route::post('login', 'Api\AuthController@login');

    /* Tips */
    Route::get('tips', 'Api\TipsController@index');

    // Can only view these routes logged in
    Route::group(['middleware' => ['jwt.auth']], function () {

        Route::get('user', 'Api\AuthController@getAuthenticatedUser');
        Route::get('refresh', 'Api\AuthController@refresh');
        Route::post('logout', 'Api\AuthController@logout');

        /* Tips */
        Route::post('tip', 'Api\TipsController@store');
        Route::get('tip/{id}', 'Api\TipsController@show');
        Route::put('tip/{id}', 'Api\TipsController@update');
        Route::delete('tip/{id}', 'Api\TipsController@destroy');
        Route::get('tip/user/{id}', 'Api\TipsController@getTipsFromUser');
    });
});

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
