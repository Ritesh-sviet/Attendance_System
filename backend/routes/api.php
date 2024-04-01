<?php

use App\Http\Controllers\AttendanceController;
use App\Http\Controllers\UserAuthController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
Route::group(['namespace' => 'Controllers', 'prefix' => 'v1'], function () {
    Route::post('register', [UserAuthController::class, 'register']);
    Route::post('login', [UserAuthController::class, 'login']);
    Route::post('attendance', [AttendanceController::class, 'store'])->middleware('auth:api');
    // Route::middleware('throttle:rate_limit,2')->group(function () {
        Route::get('attendance_records', [AttendanceController::class, 'index'])->middleware('auth:api');
    // });
    Route::post('logout', [UserAuthController::class, 'destroy'])->middleware('auth:api');
    // Route::post('attendance', [AttendanceRecordController::class, 'store'])->middleware('auth:api');
});
