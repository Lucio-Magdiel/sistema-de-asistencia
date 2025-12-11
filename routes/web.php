<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use App\Http\Controllers\EmpleadoController;
use App\Http\Controllers\AsistenciaController;
use App\Http\Controllers\ReporteController;
use App\Http\Controllers\EmpleadoPerfilController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');

    // Ruta para perfil de empleado
    Route::get('mi-perfil', [EmpleadoPerfilController::class, 'index'])->name('empleado.perfil');

    // Rutas de Empleados
    Route::resource('empleados', EmpleadoController::class);

    // Rutas de Asistencias
    Route::resource('asistencias', AsistenciaController::class);
    Route::post('asistencias/registrar-entrada', [AsistenciaController::class, 'registrarEntrada'])
        ->name('asistencias.registrar-entrada');
    Route::post('asistencias/registrar-salida', [AsistenciaController::class, 'registrarSalida'])
        ->name('asistencias.registrar-salida');

    // Rutas de Reportes
    Route::get('reportes', [ReporteController::class, 'index'])->name('reportes.index');
    Route::get('reportes/exportar', [ReporteController::class, 'exportar'])->name('reportes.exportar');
    Route::get('reportes/exportar-excel', [ReporteController::class, 'exportarExcel'])->name('reportes.exportar-excel');
    Route::get('reportes/exportar-pdf', [ReporteController::class, 'exportarPdf'])->name('reportes.exportar-pdf');
});

require __DIR__.'/settings.php';
