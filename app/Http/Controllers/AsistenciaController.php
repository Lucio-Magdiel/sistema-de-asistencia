<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;
use Carbon\Carbon;

class AsistenciaController extends Controller
{
    /**
     * Mostrar listado de asistencias
     */
    public function index(Request $request): Response
    {
        $query = Asistencia::with('empleado');

        // Filtro por fecha
        if ($request->filled('fecha_inicio') && $request->filled('fecha_fin')) {
            $query->fechaEntre($request->fecha_inicio, $request->fecha_fin);
        } elseif ($request->filled('fecha')) {
            $query->where('fecha', $request->fecha);
        } else {
            // Por defecto mostrar el mes actual
            $query->whereMonth('fecha', Carbon::now()->month)
                  ->whereYear('fecha', Carbon::now()->year);
        }

        // Filtro por empleado
        if ($request->filled('empleado_id')) {
            $query->porEmpleado($request->empleado_id);
        }

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->porEstado($request->estado);
        }

        $asistencias = $query->orderBy('fecha', 'desc')
            ->orderBy('hora_entrada', 'desc')
            ->paginate(15)
            ->withQueryString();

        // Obtener empleados activos para el filtro
        $empleados = Empleado::activos()->orderBy('nombre')->get(['id', 'nombre', 'apellido', 'codigo']);

        return Inertia::render('asistencias/index', [
            'asistencias' => $asistencias,
            'empleados' => $empleados,
            'filters' => $request->only(['fecha', 'fecha_inicio', 'fecha_fin', 'empleado_id', 'estado']),
        ]);
    }

    /**
     * Mostrar formulario de creación
     */
    public function create(): Response
    {
        $empleados = Empleado::activos()->orderBy('nombre')->get(['id', 'nombre', 'apellido', 'codigo']);

        return Inertia::render('asistencias/create', [
            'empleados' => $empleados,
        ]);
    }

    /**
     * Guardar nueva asistencia
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
            'fecha' => 'required|date',
            'hora_entrada' => 'nullable|date_format:H:i',
            'hora_salida' => 'nullable|date_format:H:i|after:hora_entrada',
            'estado' => 'required|in:presente,ausente,tarde,permiso,vacaciones',
            'observaciones' => 'nullable|string|max:500',
        ]);

        Asistencia::create($validated);

        return redirect()->route('asistencias.index')
            ->with('success', 'Asistencia registrada exitosamente.');
    }

    /**
     * Mostrar asistencia específica
     */
    public function show(Asistencia $asistencia): Response
    {
        $asistencia->load('empleado');

        return Inertia::render('asistencias/show', [
            'asistencia' => $asistencia,
        ]);
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(Asistencia $asistencia): Response
    {
        $asistencia->load('empleado');
        $empleados = Empleado::activos()->orderBy('nombre')->get(['id', 'nombre', 'apellido', 'codigo']);

        return Inertia::render('asistencias/edit', [
            'asistencia' => $asistencia,
            'empleados' => $empleados,
        ]);
    }

    /**
     * Actualizar asistencia
     */
    public function update(Request $request, Asistencia $asistencia): RedirectResponse
    {
        $validated = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
            'fecha' => 'required|date',
            'hora_entrada' => 'nullable|date_format:H:i',
            'hora_salida' => 'nullable|date_format:H:i|after:hora_entrada',
            'estado' => 'required|in:presente,ausente,tarde,permiso,vacaciones',
            'observaciones' => 'nullable|string|max:500',
        ]);

        $asistencia->update($validated);

        return redirect()->route('asistencias.index')
            ->with('success', 'Asistencia actualizada exitosamente.');
    }

    /**
     * Eliminar asistencia
     */
    public function destroy(Asistencia $asistencia): RedirectResponse
    {
        $asistencia->delete();

        return redirect()->route('asistencias.index')
            ->with('success', 'Asistencia eliminada exitosamente.');
    }

    /**
     * Registrar entrada rápida
     */
    public function registrarEntrada(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
        ]);

        $fecha = Carbon::now()->toDateString();
        $hora = Carbon::now()->format('H:i');

        // Verificar si ya existe registro para hoy
        $asistenciaExistente = Asistencia::where('empleado_id', $validated['empleado_id'])
            ->where('fecha', $fecha)
            ->first();

        if ($asistenciaExistente) {
            return back()->with('error', 'Ya existe un registro de asistencia para hoy.');
        }

        Asistencia::create([
            'empleado_id' => $validated['empleado_id'],
            'fecha' => $fecha,
            'hora_entrada' => $hora,
            'estado' => 'presente',
        ]);

        return back()->with('success', 'Entrada registrada exitosamente.');
    }

    /**
     * Registrar salida rápida
     */
    public function registrarSalida(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'empleado_id' => 'required|exists:empleados,id',
        ]);

        $fecha = Carbon::now()->toDateString();
        $hora = Carbon::now()->format('H:i');

        $asistencia = Asistencia::where('empleado_id', $validated['empleado_id'])
            ->where('fecha', $fecha)
            ->first();

        if (!$asistencia) {
            return back()->with('error', 'No se encontró registro de entrada para hoy.');
        }

        if ($asistencia->hora_salida) {
            return back()->with('error', 'Ya se registró la salida para hoy.');
        }

        $asistencia->update(['hora_salida' => $hora]);

        return back()->with('success', 'Salida registrada exitosamente.');
    }
}
