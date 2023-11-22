<?php

namespace App\Http\Controllers\Api;

use App\Models\Province;
use Illuminate\Http\Request;
use App\Http\Controllers\Api\BaseApiController;

class ProvinceController extends BaseApiController
{
    public function __construct()
    {
        $this->provinceModel = new Province();
    }

    public function index(Request $request)
    {
        try {
            $query = $this->provinceModel;
            if ($request->name) {
                $query = $query->where('name', 'like', '%' . $request->name . '%');
            }
            $provinces = $query->get();

            if ($provinces->count() < 1) {
                throw new \Exception('Data provinsi tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data Provinsi', $provinces);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show(String $id)
    {
        try {
            $province = $this->provinceModel::find($id);
            if (!$province) {
                throw new \Exception('Data provinsi tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data Provinsi', $province);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
