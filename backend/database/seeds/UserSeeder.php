<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::insert([
            [
                'name' => 'Abdul Alim',
                'email' => 'alimifypro@gmail.com',
                'phone' => '01767436576',
                'password' => Hash::make('123456'),
                'role_id' => 2
            ],
            [
                'name' => 'Admin',
                'email' => 'admin@login.com',
                'phone' => '01832292096',
                'password' => Hash::make('123456'),
                'role_id' => 2
            ],
            [
                'name' => 'Volunteer',
                'email' => 'volunteer@login.com',
                'phone' => '01234567890',
                'password' => Hash::make('123456'),
                'role_id' => 3
            ],
            [
                'name' => 'Donor',
                'email' => 'donor@login.com',
                'phone' => '09876543210',
                'password' => Hash::make('123456'),
                'role_id' => 4
            ],

            [
                'name' => 'Donar',
                'email' => 'donar@login.com',
                'phone' => '11223344551',
                'password' => Hash::make('123456'),
                'role_id' => 5
            ],
        ]);
    }
}
