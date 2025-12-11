<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use App\Models\Asistencia;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        // Si el usuario es empleado, redirigir a su perfil
        if (auth()->user()->empleado) {
            return redirect()->route('empleado.perfil');
        }

        // Estadísticas generales
        $totalEmpleados = Empleado::count();
        $empleadosActivos = Empleado::where('estado', 'activo')->count();
        
        // Asistencias de hoy
        $hoy = Carbon::today();
        $asistenciasHoy = Asistencia::whereDate('fecha', $hoy)->count();
        $presentesHoy = Asistencia::whereDate('fecha', $hoy)
            ->where('estado', 'presente')
            ->count();
        
        // Asistencias del mes actual
        $inicioMes = Carbon::now()->startOfMonth();
        $finMes = Carbon::now()->endOfMonth();
        
        $estadisticasMes = Asistencia::whereBetween('fecha', [$inicioMes, $finMes])
            ->selectRaw("
                COUNT(*) as total,
                SUM(CASE WHEN estado = 'presente' THEN 1 ELSE 0 END) as presentes,
                SUM(CASE WHEN estado = 'ausente' THEN 1 ELSE 0 END) as ausentes,
                SUM(CASE WHEN estado = 'tarde' THEN 1 ELSE 0 END) as tardes
            ")
            ->first();
        
        $porcentajeAsistenciaMes = $estadisticasMes->total > 0
            ? round(($estadisticasMes->presentes / $estadisticasMes->total) * 100, 2)
            : 0;
        
        // Top 5 empleados con mejor asistencia del mes
        $topEmpleados = Empleado::select('empleados.*')
            ->selectRaw('
                COUNT(asistencias.id) as total_asistencias,
                SUM(CASE WHEN asistencias.estado = "presente" THEN 1 ELSE 0 END) as presentes,
                ROUND((SUM(CASE WHEN asistencias.estado = "presente" THEN 1 ELSE 0 END) * 100.0 / COUNT(asistencias.id)), 2) as porcentaje
            ')
            ->leftJoin('asistencias', function($join) use ($inicioMes, $finMes) {
                $join->on('empleados.id', '=', 'asistencias.empleado_id')
                     ->whereBetween('asistencias.fecha', [$inicioMes, $finMes]);
            })
            ->where('empleados.estado', 'activo')
            ->groupBy('empleados.id')
            ->having('total_asistencias', '>', 0)
            ->orderByDesc('porcentaje')
            ->limit(5)
            ->get();
        
        // Últimas asistencias registradas
        $ultimasAsistencias = Asistencia::with('empleado')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get()
            ->map(function($asistencia) {
                return [
                    'id' => $asistencia->id,
                    'empleado' => $asistencia->empleado->nombre_completo,
                    'codigo' => $asistencia->empleado->codigo,
                    'fecha' => $asistencia->fecha,
                    'hora_entrada' => $asistencia->hora_entrada,
                    'estado' => $asistencia->estado,
                ];
            });
        
        // Departamentos con más asistencias
        $departamentos = Empleado::select('departamento')
            ->selectRaw('COUNT(DISTINCT empleados.id) as total_empleados')
            ->selectRaw('COUNT(asistencias.id) as total_asistencias')
            ->leftJoin('asistencias', function($join) use ($inicioMes, $finMes) {
                $join->on('empleados.id', '=', 'asistencias.empleado_id')
                     ->whereBetween('asistencias.fecha', [$inicioMes, $finMes]);
            })
            ->groupBy('departamento')
            ->orderByDesc('total_asistencias')
            ->limit(5)
            ->get();
        
        return Inertia::render('dashboard', [
            'stats' => [
                'total_empleados' => $totalEmpleados,
                'empleados_activos' => $empleadosActivos,
                'asistencias_hoy' => $asistenciasHoy,
                'presentes_hoy' => $presentesHoy,
            ],
            'estadisticasMes' => [
                'total' => $estadisticasMes->total ?? 0,
                'presentes' => $estadisticasMes->presentes ?? 0,
                'ausentes' => $estadisticasMes->ausentes ?? 0,
                'tardes' => $estadisticasMes->tardes ?? 0,
                'porcentaje' => $porcentajeAsistenciaMes,
            ],
            'topEmpleados' => $topEmpleados,
            'ultimasAsistencias' => $ultimasAsistencias,
            'departamentos' => $departamentos,
            'mesActual' => Carbon::now()->format('F Y'),
        ]);
    }
}
