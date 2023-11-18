<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TouristAttraction extends Model
{
    use HasFactory;
    
    protected $table = 'tourist_attractions';
    protected $fillable = ['name', 'description', 'price', 'contact', 'address', 'link_map', 'province_id', 'regency_id', 'district_id', 'village_id'];
}
