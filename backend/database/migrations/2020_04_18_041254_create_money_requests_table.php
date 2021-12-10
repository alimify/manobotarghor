<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoneyRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('money_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('user_id');
            $table->string('name');
            $table->string('phone');
            $table->string('income_source')->nullable();
            $table->integer('family_member')->default(0);
            $table->integer('amount')->default(0);
            $table->string('seeking_reason')->nullable();

            $table->string('reference1_name')->nullable();
            $table->string('reference1_phone')->nullable();
            $table->string('reference2_name')->nullable();
            $table->string('reference2_phone')->nullable();

            $table->integer('location_id')->nullable();
            $table->string('lat')->nullable();
            $table->string('lng')->nullable();
            $table->string('union')->nullable();


            $table->text('description')->nullable();

            $table->integer('money_provider_id')->nullable();
            $table->text('payment_info')->nullable();

            $table->boolean('completed')->default(false);

            $table->boolean('published')->default(false);
            
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
        Schema::dropIfExists('money_requests');
    }
}
