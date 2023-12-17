<?php

namespace App\Models;

use App\Models\User;
use App\Models\TouristAttraction;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Wishlist extends Model
{
    use HasFactory;

    protected $table = 'wishlists';
    protected $fillable = ['user_id', 'tourist_attraction_id'];

    public function user(): BelongsTo
    {
        return $this->user(User::class);
    }

    public function touristAttraction(): BelongsTo
    {
        return $this->belongsTo(TouristAttraction::class);
    }
}
