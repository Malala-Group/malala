<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\RegencyController;
use App\Http\Controllers\Api\VillageController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\ProvinceController;
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

Route::get('/provinces', [ProvinceController::class, 'index']);
Route::get('/provinces/{id}', [ProvinceController::class, 'show']);
Route::get('/provinces/{provinceId}/regency', [RegencyController::class, 'index']);

Route::get('/regency/{id}', [RegencyController::class, 'show']);
Route::get('/regency/{provinceId}/districts', [DistrictController::class, 'index']);

Route::get('/districts/{id}', [DistrictController::class, 'show']);
Route::get('/districts/{provinceId}/villages', [VillageController::class, 'index']);

Route::get('/villages/{id}', [VillageController::class, 'show']);

Route::apiResource('destinations', TouristAttractionController::class);

Route::prefix('destinations/{destinationId}/images')->group(function() {
    Route::get('', [TouristAttractionImageController::class, 'index']);
    Route::middleware('verified')->group(function() {
        Route::post('', [TouristAttractionImageController::class, 'store']);
        Route::put('', [TouristAttractionImageController::class, 'setProfile']);
        Route::delete('', [TouristAttractionImageController::class, 'delete']);
    });
});

Route::prefix('reviews')->group(function () {
    Route::get('/{tourist_attraction_id}', [ReviewController::class, 'index']);
    Route::post('/', [ReviewController::class, 'store']);
    Route::put('/{id}', [ReviewController::class, 'update']);
    Route::delete('/{id}', [ReviewController::class, 'destroy']);
});