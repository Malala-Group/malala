<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\TouristAttraction;
use Illuminate\Support\Facades\DB;
use App\Models\TouristAttractionImage;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseApiController;
use App\Http\Resources\TouristAttractionResource;

class TouristAttractionController extends BaseApiController
{
    protected $touristAttractionModel;
    protected $touristAttractionImageModel;

    public function __construct()
    {
        $this->touristAttractionModel = new TouristAttraction();
        $this->touristAttractionImageModel = new TouristAttractionImage();
    }

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        try {
            $query = $this->touristAttractionModel;
            if ($request->name && $request->regency) {
                $query = $query->where('name', 'like', '%' . $request->name . '%')
                                ->where('regency_id', $request->regency);
            } else if ($request->name && $request->province) {
                $query = $query->where('name', 'like', '%' . $request->name . '%')
                                ->where('province_id', $request->province);
            } else if ($request->name) {
                $query = $query->where('name', 'like', '%' . $request->name . '%');
            } else if ($request->province) {
                $query = $query->where('province_id', $request->province);
            } else if ($request->regency) {
                $query = $query->where('regency_id', $request->regency);
            } else {
                $query = $this->touristAttractionModel;
            }

            $destinations = $query->with('images', 'province')->paginate(15);

            if ($destinations->count() < 1) {
                throw new \Exception('Data tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data tempat wisata', $destinations);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name'          => 'required|string',
                'description'   => 'required|string',
                'price'         => 'required|min:0',
                'contact'       => 'required|string|starts_with:+62',
                'address'       => 'required|string',
                'link_map'      => 'required|starts_with:https://maps.app.goo.gl/|active_url',
                'province_id'   => 'required',
                'regency_id'    => 'required',
                'district_id'   => 'required',
                'village_id'    => 'required',
                'image'         => 'required|image|mimes:jpg,png,jpeg,webp|max:5120',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $destination = null;

            DB::transaction(function () use ($request, &$destination) {
                $destination = $this->touristAttractionModel::create([
                    'name'          => $request->name,
                    'description'   => $request->description,
                    'price'         => $request->price,
                    'contact'       => $request->contact,
                    'address'       => $request->address,
                    'link_map'      => $request->link_map,
                    'province_id'   => $request->province_id,
                    'regency_id'    => $request->regency_id,
                    'district_id'   => $request->district_id,
                    'village_id'    => $request->village_id,
                ]);

                $image = $request->file('image');
                $image->storeAs('public/images/tourist_attraction', $image->hashName());

                $this->touristAttractionImageModel::create([
                    'name' => $image->hashName(),
                    'profile' => true,
                    'tourist_attraction_id' => $destination->id,
                ]);
            });

            return $this->jsonResponse('success', 'Data wisata berhasil ditambahkan.', [
                'id'            => $destination->id,
                'name'          => $destination->name,
                'description'   => $destination->description,
            ], 201);
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penambahan data tempat wisata.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $destination = $this->touristAttractionModel::with('images', 'province')->find($id);
            if (!$destination) {
                throw new \Exception('Data tidak ditemukan', 404);
            }
            return $this->jsonResponse('success', 'Detail tempat wisata', $destination);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        try {
            $validate = Validator::make($request->all(), [
                'name'          => 'required|string',
                'description'   => 'required|string',
                'price'         => 'required|min:0',
                'contact'       => 'required|string|starts_with:+62',
                'address'       => 'required|string',
                'link_map'      => 'required|starts_with:https://maps.app.goo.gl/|active_url',
                'province_id'   => 'required',
                'regency_id'    => 'required',
                'district_id'   => 'required',
                'village_id'    => 'required',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $destination = $this->touristAttractionModel->find($id);

            if (!$destination) {
                return $this->jsonResponse('fail', 'Data tidak ditemukan.', null, 404);
            }

            $destination->update([
                'name'          => $request->name,
                'description'   => $request->description,
                'price'         => $request->price,
                'contact'       => $request->contact,
                'address'       => $request->address,
                'link_map'      => $request->link_map,
                'province_id'   => $request->province_id,
                'regency_id'    => $request->regency_id,
                'district_id'   => $request->district_id,
                'village_id'    => $request->village_id,
            ]);

            return $this->jsonResponse('success', 'Data wisata berhasil diperbarui.', [
                'id'            => $destination->id,
                'name'          => $destination->name,
                'description'   => $destination->description,
            ], 200);
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses memperbarui data.');
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        try {
            $destination = $this->touristAttractionModel::find($id);
            if (!$destination) {
                return $this->jsonResponse('fail', 'Data tidak ditemukan.', null, 404);
            }

            $destination->delete();
            return $this->jsonResponse('success', 'Data wisata berhasil dihapus.');
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penghapusan data.');
        }
    }
}
