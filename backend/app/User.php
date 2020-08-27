<?php

namespace App;

use App\Notifications\RestoreMail;
use App\Notifications\TipAcceptedMail;
use App\Notifications\VerifyMail;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;

use Illuminate\Contracts\Auth\MustVerifyEmail;

use Laravel\Passport\HasApiTokens;

use App\Tip as Tip;

class User extends Authenticatable implements MustVerifyEmail, JWTSubject
{
    use Notifiable, SoftDeletes;

    protected $table = 'users';

    const ROLES = ['superadmin', 'admin', 'guest'];

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'verify_token',
        'restore_token',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * The attributes that should be mutated to dates.
     *
     * @var array
     */
    protected $dates = [
        'deleted_at'
    ];

    /**
     * Get the identifier that will be stored in the subject claim of the JWT.
     *
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    /**
     * Return a key value array, containing any custom claims to be added to the JWT.
     *
     * @return array
     */
    public function getJWTCustomClaims()
    {
        return [];
    }

    /**
     * Get the tips for the user.
     * One user can have many tips
     * 
     * @return array
     */
    public function tips()
    {
        return $this->hasMany(Tip::class);
    }

    // TODO
    /**
     * Send veritifcation email
     * 
     * @return 
     */
    public function sendVerificationMail()
    {
        // error_log($this->notify(new VerifyMail($this)));
        $this->notify(new VerifyMail($this));
        // gettype()
    }

    public function sendRestoreMail()
    {
        $this->notify(new RestoreMail($this));
    }
    public function sendTipAcceptedMail($tip)
    {
        $this->notify(new TipAcceptedMail($this, $tip));
    }

    public function verified()
    {
        return $this->verify_token === null;
    }

    public function hasRole($role)
    {
        return $this->role == $role;
    }
}
