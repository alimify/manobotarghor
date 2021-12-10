<?php

use App\DoctorHelpTitle;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class DoctorHelpTitleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DoctorHelpTitle::insert([
            [
                'bn_title' => 'করোনা হেল্প',
                'en_title' => 'Corona Help',
                'slug' => md5(Carbon::now())
            ]
        ]);
    }
}
