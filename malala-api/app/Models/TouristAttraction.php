<?php

namespace App\Models;

use App\Models\User;
use App\Models\Review;
use App\Models\Province;
use App\Models\Wishlist;
use App\Models\TouristAttractionImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TouristAttraction extends Model
{
    use HasFactory;
    
    protected $table = 'tourist_attractions';
    protected $fillable = ['name', 'description', 'price', 'contact', 'address', 'link_map', 'province_id', 'regency_id', 'district_id', 'village_id', 'user_id'];

    public function images(): HasMany
    {
        return $this->hasMany(TouristAttractionImage::class);
    }

    public function province(): BelongsTo
    {
        return $this->belongsTo(Province::class);
    }

    public function reviews(): HasMany
    {
        return $this->hasMany(Review::class);
    }

    public function user(): BelongsTo
    {
        return $this->user(User::class);
    }

    public function wishlists(): HasMany
    {
        return $this->hasMany(Wishlist::class);
    }
}
