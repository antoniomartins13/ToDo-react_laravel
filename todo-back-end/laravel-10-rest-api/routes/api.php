<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::apiResource('/users', UserController::class);
Route::middleware('auth:sanctum')->group(function () {
    Route::apiResource('/users.tasks', TaskController::class);
});

Route::get('/', function () {
    return response()->json([
        'success' => true
    ]);
});
