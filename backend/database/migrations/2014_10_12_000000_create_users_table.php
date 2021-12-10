<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email')->nullable()->unique();
            $table->string('phone')->unique();
            $table->string('fb_link')->nullable();
            $table->string('whatsapp')->nullable();
            $table->string('image_directory')->nullable();
            $table->string('nid_img')->nullable();
            $table->timestamp('email_verified_at')->nullable();
            $table->string('password');
            $table->string('birthday')->nullable();
            $table->string('gender')->nullable();
            $table->integer('blood_group_id')->nullable();
            $table->boolean('blood_donate')->default(false);
            $table->string('last_blood_donation')->nullable();
            $table->string('location_id')->nullable();
            $table->string('address')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->boolean('doctor_help')->default(false);
            $table->string('doctor_degree')->nullable();
            $table->string('doctor_workplace')->nullable();
            $table->string('doctor_title')->nullable();
            $table->integer('doctor_help_id')->nullable();
            $table->string('doctor_schedule_type')->nullable();
            $table->text('doctor_schedule_days')->nullable();
            $table->string('doctor_schedule_time_from')->nullable();
            $table->string('doctor_schedule_time_to')->nullable();
            $table->integer('role_id')->default(1);
            $table->boolean('modaretor_role')->default(false);
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('users');
    }
}
