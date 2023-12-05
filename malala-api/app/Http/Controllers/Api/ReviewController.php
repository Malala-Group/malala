<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;


class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    protected $reviewModel;

    public function __construct(Review $reviewModel)
    {
        $this->reviewModel = $reviewModel;
    }
    public function index($tourist_attraction_id)
    {
        try {
            $reviews = Review::where('tourist_attraction_id', $tourist_attraction_id)->get();
            
            return response()->json(['reviews' => $reviews], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Gagal mengambil data review.',
                'error' => '' . $th,
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validate = Validator::make($request->all(), [
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'required|string',
                'tourist_attraction_id' => 'required|exists:tourist_attractions,id', // Menambahkan validasi untuk tourist_attraction_id
            ]);

            if ($validate->fails()) {
                return response()->json([
                    'status' => 'fail',
                    'error' => $validate->errors(),
                ], 400);
            }
            
            $image_path= null;
            if ($request->file('image_path')) {
                $validate = Validator::make($request->all(), [
                    
                    'image_path' => 'required|image|mimes:jpeg,png,jpg,webp|max:5120',
                ]);
                
                if ($validate->fails()) {
                    
                    return response()->json([
                        'status' => 'fail',
                        'error' => $validate->errors(),
                    ], 400);
                }
                $image_path = $request->file('image_path')->store('images', 'public');
            }
            
            $review = null;
            DB::transaction(function () use ($request, &$review, $image_path) {

                $review = Review::create([
                    'rating' => $request->rating,
                    'comment' => $request->comment,
                    'image_path' => $image_path,
                    'tourist_attraction_id' => $request->tourist_attraction_id,
                ]);
            });

            return response()->json([
                'status' => 'success',
                'message' => 'Komentar berhasil ditambahkan sesuai dengan tempat wisata.',
                'data' => [
                    'review' => $review,
                ],
            ], 201);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Komentar gagal ditambahkan.',
                'error' => '' . $th,
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        try {
            $review = Review::findOrFail($id);
            return response()->json([
                'status' => 'success',
                'data' => [
                    'review' => $review,
                ],
            ]);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Data tidak ditemukan.',
            ], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Review $review)
    {
        try {
            $request->validate([
                'rating' => 'required|integer|min:1|max:5',
                'comment' => 'required|string',
                'image_path' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            if ($request->hasFile('image_path')) {
                // Hapus gambar lama sebelum menyimpan yang baru
                Storage::delete('public/' . $review->image_path);
                
                // Simpan gambar baru dan update path-nya
                $image_path = $request->file('image_path')->store('images', 'public');
                $review->image_path = $image_path;
            }

            // Update rating dan comment
            $review->update([
                'rating' => $request->rating,
                'comment' => $request->comment,
            ]);

            return response()->json([
                'status' => 'success',
                'message' => 'Review berhasil diperbarui.',
                'data' => [
                    'review' => $review,
                ],
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status' => 'fail',
                'message' => 'Review gagal diperbarui.',
                'error' => '' . $th,
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        try {
            $review = $this->reviewModel::find($id);
            if (!$review) {
                return response()->json([
                    'status'  => 'fail',
                    'message' => 'Review tidak ditemukan.',
                ], 404);
            }
    
            // Hapus gambar terlebih dahulu jika ada
            if ($review->image_path) {
                Storage::delete('public/' . $review->image_path);
            }
    
            // Hapus review
            $review->delete();
    
            return response()->json([
                'status'  => 'success',
                'message' => 'Review berhasil dihapus.',
            ], 200);
        } catch (\Throwable $th) {
            return response()->json([
                'status'  => 'fail',
                'message' => 'Review gagal dihapus.',
            ], 500);
        }
    }
}
