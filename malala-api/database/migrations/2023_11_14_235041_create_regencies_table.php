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
        Schema::create('regencies', function (Blueprint $table) {
            $table->char('id', 4)->primary();
            $table->string('name', 50);
            $table->char('province_id', 2);
            $table->integer('region_type_id');
            $table->timestamps();
        
            $table->foreign('province_id')->references('id')->on('provinces')->onUpdate('cascade');
            $table->foreign('region_type_id')->references('id')->on('region_types')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('regencies', function (Blueprint $table) {
            $table->dropForeign(['province_id']);
            $table->dropForeign(['region_type_id']);
        });
        Schema::dropIfExists('regencies');
    }
};
