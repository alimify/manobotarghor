<?php

use App\FoodProject;
use Illuminate\Database\Seeder;

class FoodProjectSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        FoodProject::insert([
            [
                'title' => 'Covid-19 food project',
                'description' => 'SomeDescription will be here ,lets love the code'
            ],
            [
                'title' => 'Ramadan Iftar Mahfil',
                'description' => 'SomeDescription will be here ,lets love the code'
            ]
        ]);
    }
}
