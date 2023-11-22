<?php

namespace App\Http\Controllers\Api;

use App\Models\Regency;
use Illuminate\Http\Request;

class RegencyController extends BaseApiController
{
    protected $regencyModel;

    public function __construct()
    {
        $this->regencyModel = new Regency();
    }

    public function index(Request $request, String $provinceId)
    {
        try {
            $query = $this->regencyModel::where('province_id', $provinceId);
            if ($request->name) {
                $query = $query->where('name', 'like', '%' . $request->name . '%');
            }
            $regencies = $query->get();

            if ($regencies->count() < 1) {
                throw new \Exception('Data kabupaten tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data Kabupaten', $regencies);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show(String $id)
    {
        try {
            $regency = $this->regencyModel::find($id);
            if (!$regency) {
                throw new \Exception('Data kabupaten tidak ditemukan', 404);
            }
            return $this->jsonResponse('success', 'Data Kabupaten', $regency);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
