<?php

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ReviewController;
use App\Http\Controllers\Api\RegencyController;
use App\Http\Controllers\Api\VillageController;
use App\Http\Controllers\Api\DistrictController;
use App\Http\Controllers\Api\ProvinceController;
use App\Http\Controllers\Api\WishlistController;
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

Route::get('/isLogin', function() {
    return response()->json(Auth::check());
});

Route::middleware(['auth:sanctum', 'verified'])->group(function() {
    Route::get('/user', function (Request $request) {
        $userId = $request->user()->id;
        return User::with('roles')->find($userId);
    });
});

Route::get('/provinces', [ProvinceController::class, 'index']);
Route::get('/provinces/{id}', [ProvinceController::class, 'show']);
Route::get('/provinces/{provinceId}/regency', [RegencyController::class, 'index']);

Route::get('/regency/{id}', [RegencyController::class, 'show']);
Route::get('/regency/{provinceId}/districts', [DistrictController::class, 'index']);

Route::get('/districts/{id}', [DistrictController::class, 'show']);
Route::get('/districts/{provinceId}/villages', [VillageController::class, 'index']);

Route::get('/villages/{id}', [VillageController::class, 'show']);

// Route::apiResource('destinations', TouristAttractionController::class);

Route::apiResource('destinations', TouristAttractionController::class)->only([
    'index', 'show'
]);

Route::middleware(['auth:sanctum', 'verified', 'role:mitra'])->group(function() {
    Route::apiResource('destinations', TouristAttractionController::class)->only([
        'store', 'update', 'destroy'
    ]);
});
    
Route::prefix('destinations/{destinationId}/images')->group(function() {
    Route::get('', [TouristAttractionImageController::class, 'index']);
    Route::middleware('verified')->group(function() {
        Route::post('', [TouristAttractionImageController::class, 'store']);
        Route::put('', [TouristAttractionImageController::class, 'setProfile']);
        Route::delete('', [TouristAttractionImageController::class, 'delete']);
    });
});

Route::prefix('reviews')->group(function () {
    Route::get('', [ReviewController::class, 'index']);
    Route::middleware(['auth:sanctum', 'verified', 'role:user|mitra'])->group(function() {
        Route::post('', [ReviewController::class, 'store']);
        Route::get('/{id}', [ReviewController::class, 'show']);
        Route::put('/{id}', [ReviewController::class, 'update']);
        Route::delete('/{id}', [ReviewController::class, 'destroy']);
    });
});

Route::middleware(['auth:sanctum', 'verified', 'role:user|mitra'])->group(function() {
    Route::apiResource('wishlists', WishlistController::class)->only([
        'index', 'store', 'show', 'destroy'
    ]);
});