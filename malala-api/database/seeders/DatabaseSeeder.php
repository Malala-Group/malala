<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RegencySeeder;
use Database\Seeders\VillageSeeder;
use Database\Seeders\DistrictSeeder;
use Database\Seeders\ProvinceSeeder;
use Database\Seeders\RegionTypeSeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            RegionTypeSeeder::class,
            ProvinceSeeder::class,
            RegencySeeder::class,
            DistrictSeeder::class,
            VillageSeeder::class,
        ]);
    }
}
