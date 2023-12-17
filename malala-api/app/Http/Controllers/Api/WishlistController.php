<?php

namespace App\Http\Controllers\Api;

use App\Models\Wishlist;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Api\BaseApiController;

class WishlistController extends BaseApiController
{
    protected $wishlistModel;
    public function __construct() {
        $this->wishlistModel = new Wishlist();
    }

    public function index()
    {
        try {
            $user_id = Auth::id();
            $wishlists = $this->wishlistModel->where('user_id', $user_id)->with('touristAttraction', 'touristAttraction.images', 'touristAttraction.province')->paginate(15);

            if ($wishlists->count() < 1) {
                throw new \Exception('Data tidak ditemukan', 404);
            }

            return $this->jsonResponse('success', 'Data tempat wisata', $wishlists);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    public function store(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'tourist_attraction_id'   => 'required',
            ]);

            if ($validate->fails()) {
                return $this->jsonResponse('fail', $validate->errors(), null, 400);
            }

            $wishlist = null;
            $user_id = Auth::id();

            DB::transaction(function () use ($request, &$wishlist, $user_id) {
                $wishlist = $this->wishlistModel::create([
                    'user_id' => $user_id,
                    'tourist_attraction_id' => $request->tourist_attraction_id,
                ]);
            });

            return $this->jsonResponse('success', 'Data wisata berhasil ditambahkan ke wishlist.', [
                'user_id'                 => $wishlist->user_id,
                'tourist_attraction_id'   => $wishlist->tourist_attraction_id,
            ], 201);
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penambahan data tempat wisata ke daftar wishlist.');
        }
    }

    public function show(string $destinationId)
    {
        $user_id = Auth::id();
        $wishlist = $this->wishlistModel->where('user_id', $user_id)->where('tourist_attraction_id', $destinationId)->with('touristAttractions')->get()->first();
        
        return $this->jsonResponse('success', 'Data tempat wisata', $wishlist);
    }

    public function destroy(string $destinationId)
    {
        try {
            $user_id = Auth::id();
            $wishlist = $this->wishlistModel::where('tourist_attraction_id', $destinationId)->where('user_id', $user_id)->get()->first();
            if (!$wishlist) {
                return $this->jsonResponse('fail', 'Data tidak ditemukan.', null, 404);
            }

            $wishlist->delete();
            return $this->jsonResponse('success', 'Data wisata berhasil dihapus dari daftar wishlist.');
        } catch (\Exception $e) {
            return $this->handleException($e, 'Terjadi kesalahan dalam proses penghapusan data wishlist.');
        }
    }
}
