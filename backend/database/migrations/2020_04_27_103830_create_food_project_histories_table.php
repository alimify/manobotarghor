<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFoodProjectHistoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('food_project_histories', function (Blueprint $table) {
            $table->id();
            $table->integer('project_id');
            $table->integer('donor_user_id');
            $table->integer('type');
            $table->integer('money')->default(0);
            $table->string('person')->default(0);
            $table->string('date')->nullable();
            $table->text('description')->nullable();
            $table->integer('status')->default(0);
            $table->boolean('active')->default(true);
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
        Schema::dropIfExists('food_project_histories');
    }
}
