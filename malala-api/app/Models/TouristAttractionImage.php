<?php

namespace App\Models;

use App\Models\TouristAttraction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TouristAttractionImage extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'profile', 'tourist_attraction_id'];

    protected function name(): Attribute
    {
        return Attribute::make(
            get: fn ($name) => asset('storage/images/tourist_attraction/' . $name),
        );
    }

    public function touristAttraction(): BelongsTo
    {
        return $this->belongsTo(TouristAttraction::class);
    }
}
