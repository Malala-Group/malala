<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\TouristAttraction;
use Illuminate\Support\Facades\DB;
use App\Models\TouristAttractionImage;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class TouristAttractionImageController extends BaseApiController
{
    protected $touristAttractionModel;
    protected $touristAttractionImageModel;

    public function __construct()
    {
        $this->touristAttractionModel = new TouristAttraction();
        $this->touristAttractionImageModel = new TouristAttractionImage();
    }

    public function index(String $destinationId)
    {
        try {
            $images = $this->touristAttractionImageModel::select('id', 'name', 'profile', 'created_at', 'updated_at')
                ->where('tourist_attraction_id', $destinationId)
                ->paginate(15);

            if ($images->count() < 1) {
                throw new \Exception('Data gambar tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data gambar tempat wisata', $images);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(Request $request, String $destinationId)
    {
        try {
            $validate = Validator::make($request->all(), [
                'profile' => 'required|boolean',
                'image' => 'required|image|mimes:jpg,png,jpeg,webp|max:5120',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $destination = $this->touristAttractionModel::find($destinationId);
            if (!$destination) {
                throw new \Exception('Data tempat wisata tidak ditemukan', 404);
            }

            DB::transaction(function () use ($request, $destinationId) {
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

            return $this->jsonResponse('success', 'Gambar berhasil ditambahkan.', null, 201);
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penambahan gambar.');
        }
    }

    public function setProfile(Request $request, String $destinationId)
    {
        try {
            $validate = Validator::make($request->all(), [
                'imageId' => 'required',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $destination = $this->touristAttractionModel::find($destinationId);
            if (!$destination) {
                throw new \Exception('Data tempat wisata tidak ditemukan', 404);
            }

            DB::transaction(function () use ($request, $destinationId) {
                $imageId = $request->imageId;
                $image = $this->touristAttractionImageModel::find($imageId);
                if (!$image) {
                    throw new \Exception('Data gambar tidak ditemukan.', 404);
                }
                $activeProfileImage = $this->touristAttractionImageModel::where('tourist_attraction_id', $destinationId)
                    ->where('profile', true)
                    ->first();

                if (!$activeProfileImage) {
                    throw new \Exception('Data profile active tidak ditemukan.', 404);
                }

                if ($activeProfileImage && $activeProfileImage->id == $imageId) {
                    throw new \Exception('Gambar ini sudah menjadi default profile.', 400);
                }

                $image->update(['profile' => true]);
                $activeProfileImage->update(['profile' => false]);
            });

            return $this->jsonResponse('success', 'Gambar berhasil dijadikan profile');
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses mengubah gambar profile.');
        }
    }

    public function delete(Request $request, string $destinationId)
    {
        try {
            $validate = Validator::make($request->all(), [
                'imageId' => 'required',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $imageId = $request->imageId;

            $image = $this->touristAttractionImageModel::find($imageId);
            if (!$image) {
                throw new \Exception('Gambar tidak ditemukan', 404);
            }

            DB::transaction(function () use ($destinationId, $imageId, $image) {
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

            return $this->jsonResponse('success', 'Gambar berhasil dihapus.');
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penghapusan gambar.');
        }
    }
}
