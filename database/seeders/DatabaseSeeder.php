<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Empleado;
use App\Models\Asistencia;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Crear usuario de prueba
        User::firstOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Administrador',
                'password' => 'password',
                'email_verified_at' => now(),
            ]
        );

        // Crear empleados de ejemplo
        $empleados = Empleado::factory(20)->create();

        // Crear asistencias para los últimos 30 días
        foreach ($empleados as $empleado) {
            // Generar asistencias para cada día laboral del mes
            for ($i = 0; $i < 30; $i++) {
                $fecha = Carbon::now()->subDays($i);
                
                // Solo días laborales (lunes a viernes)
                if ($fecha->isWeekday()) {
                    Asistencia::factory()->create([
                        'empleado_id' => $empleado->id,
                        'fecha' => $fecha->toDateString(),
                    ]);
                }
            }
        }
    }
}
