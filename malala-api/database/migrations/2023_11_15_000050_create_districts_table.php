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
        Schema::create('districts', function (Blueprint $table) {
            $table->char('id', 6)->primary();
            $table->string('name');
            $table->char('regency_id', 4);
            $table->timestamps();

            $table->foreign('regency_id')->references('id')->on('regencies')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('districts', function (Blueprint $table) {
            $table->dropForeign(['regency_id']);
        });
        Schema::dropIfExists('districts');
    }
};
