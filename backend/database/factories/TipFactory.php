<?php

/** @var \Illuminate\Database\Eloquent\Factory $factory */

use App\Tip;
use App\User;
use Faker\Generator as Faker;

$factory->define(Tip::class, function (Faker $faker) {

    $users = User::pluck('id')->toArray();

    return [
        'title' => $faker->title,
        'description' => $faker->address,
        'accepted' => $faker->boolean,
        'user_id' => $faker->randomElement($users),
    ];
});
