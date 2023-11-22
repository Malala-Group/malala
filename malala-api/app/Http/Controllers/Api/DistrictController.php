<?php

namespace App\Http\Controllers\Api;

use App\Models\District;
use Illuminate\Http\Request;

class DistrictController extends BaseApiController
{
    protected $districtModel;

    public function __construct()
    {
        $this->districtModel = new District();
    }

    public function index(Request $request, String $regencyId)
    {
        try {
            $query = $this->districtModel::where('regency_id', $regencyId);
            if ($request->name) {
                $query = $query->where('name', 'like', '%' . $request->name . '%');
            }
            $districts = $query->get();

            if ($districts->count() < 1) {
                throw new \Exception('Data kecamatan tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data Kecamatan', $districts);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show(String $id)
    {
        try {
            $district = $this->districtModel::find($id);
            if (!$district) {
                throw new \Exception('Data kecamatan tidak ditemukan', 404);
            }
            return $this->jsonResponse('success', 'Data Kecamatan', $district);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
