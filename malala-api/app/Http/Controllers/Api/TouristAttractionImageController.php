<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\TouristAttractionImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TouristAttractionImageController extends Controller
{
    protected $touristAttractionImageModel;

    public function __construct()
    {
        $this->touristAttractionImageModel = new TouristAttractionImage();
    }

    public function index(String $destinationId)
    {
        $images = $this->touristAttractionImageModel::select('id', 'name', 'profile', 'created_at', 'updated_at')
                                                        ->where('tourist_attraction_id', $destinationId)
                                                        ->paginate(15);
        return response()->json([
            'status' => 'success',
            'images' => $images,
        ]);
    }

    public function store(Request $request, String $destinationId)
    {
        try {
            $validate = Validator::make($request->all(), [
                'profile' => 'required|boolean',
                'image' => 'required|image|mimes:jpg,png,jpeg,webp|max:5120',
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status'    => 'fail',
                    'error'   => $validate->errors(),
                ], 400);
            }
    
            
            DB::transaction(function() use ($request, $destinationId) {
                $image = $request->file('image');
                $image->storeAs('public/images/tourist_attraction', $image->hashName());

                $setProfile = $request->profile;
                if ($setProfile) {
                    $this->touristAttractionImageModel::where('tourist_attraction_id', $destinationId)
                                                        ->where('profile', true)
                                                        ->update(['profile' => false]);
                }
        
                $this->touristAttractionImageModel::create([
                    'name' => $image->hashName(),
                    'profile' => $request->profile,
                    'tourist_attraction_id' => $destinationId,
                ]);
            });

            return response()->json([
                'status'    => 'success',
                'message'   => 'Gambar berhasil ditambahkan.',
            ], 201);
        } catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            $message = $e->getMessage() ?: 'Terjadi kesalahan dalam proses penambahan gambar.';

            return response()->json([
                'status'    => 'fail',
                'message'   => $message,
            ], $statusCode);
        }
    }

    public function delete(Request $request, string $destinationId)
    {
        try {
            $validate = Validator::make($request->all(), [
                'imageId' => 'required',
            ]);
    
            if ($validate->fails()) {
                return response()->json([
                    'status'    => 'fail',
                    'error'   => $validate->errors(),
                ], 400);
            }
    
            $imageId = $request->imageId;
    
            $image = $this->touristAttractionImageModel::find($imageId);
            if (!$image) {
                throw new \Exception('Gambar tidak ditemukan', 404);
            }

            DB::transaction(function() use ($destinationId, $imageId, $image) {
                if ($image->profile == 1) {
                    $images = $this->touristAttractionImageModel::where('tourist_attraction_id', $destinationId)
                                                                    ->where('id', '!=', $imageId)
                                                                    ->orderBy('created_at', 'desc')->get();
                    if ($images->count() <= 1) {
                        throw new \Exception('Gambar tidak boleh dihapus. Tambahkan gambar lain terlebih dahulu.', 400);
                    }
        
                    $lastCreatedImage = $images->first();
                    $lastCreatedImage->update(['profile' => true]);
                }
    
                Storage::delete('public/images/tourist_attraction/' . basename($image->name));
                $image->delete();
            });
            
            return response()->json([
                'status'    => 'success',
                'message'   => 'Gambar berhasil dihapus.',
            ], 200);
        } catch (\Exception $e) {
            $statusCode = $e->getCode() ?: 500;
            $message = $e->getMessage() ?: 'Terjadi kesalahan dalam proses penghapusan gambar.';

            return response()->json([
                'status'    => 'fail',
                'message'   => $message,
            ], $statusCode);
        }
    }
}
