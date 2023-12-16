<?php

namespace App\Models;

use App\Models\TouristAttraction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Province extends Model
{
    use HasFactory;

    protected $fillable = ['id', 'name'];
    
    public function touristAttraction(): HasMany
    {
        return $this->hasMany(TouristAttraction::class);
    }
}
