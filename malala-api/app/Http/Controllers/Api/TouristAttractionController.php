<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Models\TouristAttraction;
use Illuminate\Support\Facades\DB;
use App\Http\Controllers\Controller;
use App\Models\TouristAttractionImage;
use Illuminate\Support\Facades\Validator;
use App\Http\Resources\TouristAttractionResource;

class TouristAttractionController extends Controller
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
        $query = $this->touristAttractionModel;
        if ($request->name && $request->regency) {
            $query = $query->where('name', 'like', '%' . $request->name .'%')
                            ->where('regency_id', $request->regency);
        } else if ($request->name && $request->province) {
            $query = $query->where('name', 'like', '%' . $request->name .'%')
                            ->where('province_id', $request->province);
        } else if ($request->name) {
            $query = $query->where('name', 'like', '%' . $request->name .'%');
        } else if ($request->province) {
            $query = $query->where('province_id', $request->province);
        } else if ($request->regency) {
            $query = $query->where('regency_id', $request->regency);
        } else {
            $query = $this->touristAttractionModel;
        }

        $destinations = $query->with('images')->paginate(15);

        return new TouristAttractionResource('success', 'List Data Tempat Wisata', $destinations);
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
                return response()->json([
                    'status'    => 'fail',
                    'error'   => $validate->errors(),
                ], 400);
            }

            $destination = null;

            DB::transaction(function() use ($request, &$destination) {
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

            return response()->json([
                'status'    => 'success',
                'message'   => 'Data wisata berhasil ditambahkan.',
                'data'      => [
                    'id'            => $destination->id,
                    'name'          => $destination->name,
                    'description'   => $destination->description,
                ],
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => 'fail',
                'message'   => 'Data wisata gagal ditambahkan. ',
                'error'     => '' . $th,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $destination = $this->touristAttractionModel::with('images')->findOrFail($id);
            return response()->json([
                'status'    => 'success',
                'data'      => $destination,
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => 'fail',
                'message'   => 'Data tidak ditemukan.',
            ], 404);
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
                return response()->json([
                    'status'    => 'fail',
                    'error'   => $validate->errors(),
                ], 400);
            }

            $destination = $this->touristAttractionModel::find($id);

            if (!$destination) {
                return response()->json([
                    'status'    => 'fail',
                    'message'   => 'Data tidak ditemukan.',
                ], 404);
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

            return response()->json([
                'status'    => 'success',
                'message'   => 'Data wisata berhasil diperbarui.',
                'data'      => [
                    'id'            => $destination->id,
                    'name'          => $destination->name,
                    'description'   => $destination->description,
                ],
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => 'fail',
                'message'   => 'Data wisata gagal diperbarui.',
            ], 500);
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
                return response()->json([
                    'status'    => 'fail',
                    'message'   => 'Data tidak ditemukan.',
                ], 404);
            }

            $destination->delete();
            return response()->json([
                'status'    => 'success',
                'message'   => 'Data wisata berhasil dihapus.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'    => 'fail',
                'message'   => 'Data wisata gagal dihapus.',
            ], 500);
        }
    }
}
