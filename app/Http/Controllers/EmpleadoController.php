<?php

namespace App\Http\Controllers;

use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\RedirectResponse;

class EmpleadoController extends Controller
{
    /**
     * Mostrar listado de empleados
     */
    public function index(Request $request): Response
    {
        $query = Empleado::query();

        // Búsqueda
        if ($request->filled('search')) {
            $query->search($request->search);
        }

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por departamento
        if ($request->filled('departamento')) {
            $query->where('departamento', $request->departamento);
        }

        $empleados = $query->orderBy('nombre')->paginate(10)->withQueryString();

        // Obtener departamentos únicos para el filtro
        $departamentos = Empleado::distinct()->pluck('departamento');

        return Inertia::render('empleados/index', [
            'empleados' => $empleados,
            'departamentos' => $departamentos,
            'filters' => $request->only(['search', 'estado', 'departamento']),
        ]);
    }

    /**
     * Mostrar formulario de creación
     */
    public function create(): Response
    {
        return Inertia::render('empleados/create');
    }

    /**
     * Guardar nuevo empleado
     */
    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'codigo' => 'required|string|unique:empleados,codigo|max:50',
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'email' => 'required|email|unique:empleados,email|max:150',
            'telefono' => 'nullable|string|max:20',
            'departamento' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'fecha_ingreso' => 'required|date',
            'estado' => 'required|in:activo,inactivo',
        ]);

        Empleado::create($validated);

        return redirect()->route('empleados.index')
            ->with('success', 'Empleado creado exitosamente.');
    }

    /**
     * Mostrar empleado específico
     */
    public function show(Empleado $empleado): Response
    {
        $empleado->load(['asistencias' => function ($query) {
            $query->orderBy('fecha', 'desc')->limit(10);
        }]);

        return Inertia::render('empleados/show', [
            'empleado' => $empleado,
        ]);
    }

    /**
     * Mostrar formulario de edición
     */
    public function edit(Empleado $empleado): Response
    {
        return Inertia::render('empleados/edit', [
            'empleado' => $empleado,
        ]);
    }

    /**
     * Actualizar empleado
     */
    public function update(Request $request, Empleado $empleado): RedirectResponse
    {
        $validated = $request->validate([
            'codigo' => 'required|string|max:50|unique:empleados,codigo,' . $empleado->id,
            'nombre' => 'required|string|max:100',
            'apellido' => 'required|string|max:100',
            'email' => 'required|email|max:150|unique:empleados,email,' . $empleado->id,
            'telefono' => 'nullable|string|max:20',
            'departamento' => 'required|string|max:100',
            'cargo' => 'required|string|max:100',
            'fecha_ingreso' => 'required|date',
            'estado' => 'required|in:activo,inactivo',
        ]);

        $empleado->update($validated);

        return redirect()->route('empleados.index')
            ->with('success', 'Empleado actualizado exitosamente.');
    }

    /**
     * Eliminar empleado
     */
    public function destroy(Empleado $empleado): RedirectResponse
    {
        $empleado->delete();

        return redirect()->route('empleados.index')
            ->with('success', 'Empleado eliminado exitosamente.');
    }
}
