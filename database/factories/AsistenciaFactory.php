<?php

namespace Database\Factories;

use App\Models\Asistencia;
use App\Models\Empleado;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Asistencia>
 */
class AsistenciaFactory extends Factory
{
    protected $model = Asistencia::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $estado = fake()->randomElement([
            'presente', 'presente', 'presente', 'presente', 'presente', // 62.5% presente
            'tarde', 'tarde', // 25% tarde
            'ausente', // 12.5% ausente
        ]);

        $horaEntrada = null;
        $horaSalida = null;

        if ($estado === 'presente' || $estado === 'tarde') {
            $horaEntrada = $estado === 'tarde' 
                ? fake()->time('H:i', '09:30') 
                : fake()->time('H:i', '08:30');
            
            // Hora de salida entre 5 y 9 horas después
            $horaSalida = fake()->time('H:i', '17:30');
        }

        return [
            'empleado_id' => Empleado::factory(),
            'fecha' => fake()->dateTimeBetween('-30 days', 'now'),
            'hora_entrada' => $horaEntrada,
            'hora_salida' => $horaSalida,
            'estado' => $estado,
            'observaciones' => fake()->optional(0.3)->sentence(),
        ];
    }
}
