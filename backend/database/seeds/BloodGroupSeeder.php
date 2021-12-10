<?php

use App\BloodGroup;
use Illuminate\Database\Seeder;

class BloodGroupSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        BloodGroup::insert([
            [
                'title' => 'A',
                'slug' => 'a'
            ],
            [
                'title' => 'B',
                'slug' => 'b'
            ],
            [
                'title' => 'AB',
                'slug' => 'ab'
            ],
            [
                'title' => 'O',
                'slug' => 'o'
            ],
            [
                'title' => 'A+',
                'slug' => 'a-positive'
            ],
            [
                'title' => 'O+',
                'slug' => 'o-positive'
            ],
            [
                'title' => 'B+',
                'slug' => 'b-positive'
            ],
            [
                'title' => 'AB+',
                'slug' => 'ab-positive'
            ],
            [
                'title' => 'A-',
                'slug' => 'a-negative'
            ],
            [
                'title' => 'O-',
                'slug' => 'o-negative'
            ],

            [
                'title' => 'B-',
                'slug' => 'b-negative'
            ],
            [
                'title' => 'AB-',
                'slug' => 'o-negative'
            ]
        ]);
    }
}
