<?php

namespace App\Models;

use App\Models\TouristAttractionImage;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TouristAttraction extends Model
{
    use HasFactory;
    
    protected $table = 'tourist_attractions';
    protected $fillable = ['name', 'description', 'price', 'contact', 'address', 'link_map', 'province_id', 'regency_id', 'district_id', 'village_id'];

    public function images(): HasMany
    {
        return $this->hasMany(TouristAttractionImage::class);
    }
}
