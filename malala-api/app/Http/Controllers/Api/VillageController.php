<?php

namespace App\Http\Controllers\Api;

use App\Models\Village;
use Illuminate\Http\Request;

class VillageController extends BaseApiController
{
    protected $villageModel;

    public function __construct()
    {
        $this->villageModel = new Village();
    }

    public function index(Request $request, String $districtId)
    {
        try {
            $query = $this->villageModel::where('district_id', $districtId);
            if ($request->name) {
                $query = $query->where('name', 'like', '%' . $request->name . '%');
            }
            $villages = $query->get();

            if ($villages->count() < 1) {
                throw new \Exception('Data desa tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data Desa', $villages);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function show(String $id)
    {
        try {
            $village = $this->villageModel::find($id);
            if (!$village) {
                throw new \Exception('Data desa tidak ditemukan', 404);
            }
            return $this->jsonResponse('success', 'Data Desa', $village);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
