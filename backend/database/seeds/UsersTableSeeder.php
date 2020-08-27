<?php

use Illuminate\Database\Seeder;
use Faker\Generator as Faker;

use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

use App\User;

class UsersTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(User::class, 20)->create();

        $user = new User();
        $user->id               = 21;
        $user->name             = 'Jens';
        $user->email            = 'jens.rottiers@drunk.com';
        $user->remember_token   = Str::random(40);
        $user->password         = Hash::make('secret');
        $user->verify_token     = Str::random(40);
        $user->role             = 'superadmin';
        $user->save();
    }
}
