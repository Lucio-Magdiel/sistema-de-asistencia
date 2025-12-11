<?php

namespace Database\Factories;

use App\Models\Empleado;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Empleado>
 */
class EmpleadoFactory extends Factory
{
    protected $model = Empleado::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $departamentos = ['Recursos Humanos', 'Ventas', 'Marketing', 'Tecnología', 'Finanzas', 'Operaciones'];
        $cargos = ['Gerente', 'Supervisor', 'Analista', 'Asistente', 'Coordinador', 'Especialista'];

        return [
            'codigo' => 'EMP-' . fake()->unique()->numberBetween(1000, 9999),
            'nombre' => fake()->firstName(),
            'apellido' => fake()->lastName(),
            'email' => fake()->unique()->safeEmail(),
            'telefono' => fake()->phoneNumber(),
            'departamento' => fake()->randomElement($departamentos),
            'cargo' => fake()->randomElement($cargos),
            'fecha_ingreso' => fake()->dateTimeBetween('-3 years', 'now'),
            'estado' => fake()->randomElement(['activo', 'activo', 'activo', 'inactivo']), // 75% activos
        ];
    }
}
