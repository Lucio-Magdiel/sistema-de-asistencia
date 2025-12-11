<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EmpleadoPerfilController extends Controller
{
    /**
     * Mostrar el perfil del empleado autenticado
     */
    public function index(Request $request): Response
    {
        $user = $request->user();
        $empleado = $user->empleado()->with(['asistencias' => function($query) {
            $query->orderBy('fecha', 'desc')
                  ->orderBy('hora_entrada', 'desc')
                  ->limit(30);
        }])->first();

        if (!$empleado) {
            abort(403, 'No tienes un perfil de empleado asociado.');
        }

        // Estadísticas del mes actual
        $estadisticasMes = $empleado->asistencias()
            ->whereMonth('fecha', now()->month)
            ->whereYear('fecha', now()->year)
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN estado = 'presente' THEN 1 ELSE 0 END) as presentes,
                SUM(CASE WHEN estado = 'ausente' THEN 1 ELSE 0 END) as ausentes,
                SUM(CASE WHEN estado = 'tarde' THEN 1 ELSE 0 END) as tardes,
                SUM(CASE WHEN estado = 'permiso' THEN 1 ELSE 0 END) as permisos,
                SUM(CASE WHEN estado = 'vacaciones' THEN 1 ELSE 0 END) as vacaciones
            ")
            ->first();

        $porcentajeAsistencia = $estadisticasMes->total > 0
            ? round(($estadisticasMes->presentes / $estadisticasMes->total) * 100, 2)
            : 0;

        return Inertia::render('empleado/perfil', [
            'empleado' => $empleado,
            'estadisticasMes' => [
                'total' => $estadisticasMes->total ?? 0,
                'presentes' => $estadisticasMes->presentes ?? 0,
                'ausentes' => $estadisticasMes->ausentes ?? 0,
                'tardes' => $estadisticasMes->tardes ?? 0,
                'permisos' => $estadisticasMes->permisos ?? 0,
                'vacaciones' => $estadisticasMes->vacaciones ?? 0,
                'porcentaje_asistencia' => $porcentajeAsistencia,
            ],
        ]);
    }
}
