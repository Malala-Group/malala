<?php

namespace Database\Seeders;

use App\Models\RegionType;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class RegionTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $region_types = [
            ['name' => 'kabupaten'],
            ['name' => 'kota'],
            ['name' => 'kelurahan'],
            ['name' => 'desa'],
        ];

        foreach ($region_types as $region_type) {
            RegionType::create($region_type);
        }
    }
}
