<?php

namespace App\Console\Commands;

use App\Models\Empleado;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Hash;

class AsignarUsuarioEmpleado extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'empleado:asignar-usuario {codigo}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Crea un usuario y lo asigna a un empleado existente';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $codigo = $this->argument('codigo');

        $empleado = Empleado::where('codigo', $codigo)->first();

        if (!$empleado) {
            $this->error("No se encontró un empleado con el código: {$codigo}");
            return 1;
        }

        if ($empleado->user_id) {
            $this->error("Este empleado ya tiene un usuario asignado.");
            return 1;
        }

        $this->info("Empleado encontrado: {$empleado->nombre_completo}");
        $this->info("Email: {$empleado->email}");

        $password = $this->secret('Ingresa una contraseña para el usuario');
        $passwordConfirmation = $this->secret('Confirma la contraseña');

        if ($password !== $passwordConfirmation) {
            $this->error('Las contraseñas no coinciden.');
            return 1;
        }

        $user = User::create([
            'name' => $empleado->nombre_completo,
            'email' => $empleado->email,
            'password' => Hash::make($password),
            'email_verified_at' => now(),
        ]);

        $empleado->user_id = $user->id;
        $empleado->save();

        $this->info('✅ Usuario creado y asignado exitosamente!');
        $this->info("Email: {$user->email}");
        $this->info("El empleado puede iniciar sesión con estas credenciales.");

        return 0;
    }
}
