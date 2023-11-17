<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('villages', function (Blueprint $table) {
            $table->char('id', 10)->primary();
            $table->string('name');
            $table->char('district_id', 6);
            $table->integer('region_type_id');
            $table->timestamps();

            $table->foreign('district_id')->references('id')->on('districts')->onUpdate('cascade');
            $table->foreign('region_type_id')->references('id')->on('region_types')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('villages', function (Blueprint $table) {
            $table->dropForeign(['district_id']);
            $table->dropForeign(['region_type_id']);
        });
        Schema::dropIfExists('villages');
    }
};
