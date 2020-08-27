<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

use App\User as User;


class Tip extends Model
{
    use SoftDeletes;

    protected $table = 'tips';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'accepted'
    ];

    /**
     * Get the user that belong to the tip.
     * one user belongs to many tips
     * @return object
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the user that belong to the tip including the softdeleted.
     * one user belongs to many tips
     * @return object
     */
    public function trashed_user()
    {
        return $this->belongsTo(User::class, 'user_id')->withTrashed();
    }
}
