<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\TouristAttractionController;
use App\Http\Controllers\Api\TouristAttractionImageController;

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

Route::apiResource('destinations', TouristAttractionController::class);

Route::prefix('destinations/{destinationId}/images')->group(function() {
    Route::get('', [TouristAttractionImageController::class, 'index']);
    Route::post('', [TouristAttractionImageController::class, 'store']);
    Route::put('', [TouristAttractionImageController::class, 'setProfile']);
    Route::delete('', [TouristAttractionImageController::class, 'delete']);
});

Route::prefix('reviews')->group(function () {
    Route::get('/', [ReviewController::class, 'index']);
    Route::post('/', [ReviewController::class, 'store']);
    Route::get('/{id}', [ReviewController::class, 'show']);
    Route::put('/{review}', [ReviewController::class, 'update']);
    Route::delete('/{id}', [ReviewController::class, 'destroy']);
});