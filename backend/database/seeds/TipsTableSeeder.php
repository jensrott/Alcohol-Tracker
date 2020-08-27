<?php

use App\Tip;
use Illuminate\Database\Seeder;

class TipsTableSeeder extends Seeder
{

    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        factory(Tip::class, 20)->create();
    }
}
