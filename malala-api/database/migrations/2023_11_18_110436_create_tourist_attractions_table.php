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
        Schema::create('tourist_attractions', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->text('description');
            $table->decimal('price', $precision = 8, $scale = 2);
            $table->string('contact', 15);
            $table->text('address');
            $table->string('link_map');
            $table->char('province_id', 2);
            $table->char('regency_id', 4);
            $table->char('district_id', 6);
            $table->char('village_id', 10);
            $table->foreignId('user_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->timestamps();

            $table->foreign('province_id')->references('id')->on('provinces')->onUpdate('cascade');
            $table->foreign('regency_id')->references('id')->on('regencies')->onUpdate('cascade');
            $table->foreign('district_id')->references('id')->on('districts')->onUpdate('cascade');
            $table->foreign('village_id')->references('id')->on('villages')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tourist_attractions', function (Blueprint $table) {
            $table->dropForeign(['province_id']);
            $table->dropForeign(['regency_id']);
            $table->dropForeign(['district_id']);
            $table->dropForeign(['village_id']);
        });
        Schema::dropIfExists('tourist_attractions');
    }
};
