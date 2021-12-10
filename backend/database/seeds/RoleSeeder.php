<?php

use App\Role;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Role::insert([
            [
                'id' => 1,
                'title' => 'Member',
                'slug' => 'member',
            ],
            [
                'id' => 2,
                'title' => 'Admin',
                'slug' => 'admin',
            ],
            [
                'id' => 3,
                'title' => 'Volunteer',
                'slug' => 'volunteer',
            ],
            [
                'id' => 4,
                'title' => 'Donor',
                'slug' => 'donor',
            ],
            [
                'id' => 5,
                'title' => 'Donar',
                'slug' => 'donar',
            ],
        ]);
    }
}
