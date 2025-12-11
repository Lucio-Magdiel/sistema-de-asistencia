<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureUserIsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Verificar si el usuario está autenticado
        if (!$request->user()) {
            return redirect()->route('login');
        }

        // Verificar si el usuario es administrador
        if (!$request->user()->isAdmin()) {
            // Si es empleado, redirigir a su perfil
            if ($request->user()->isEmpleado()) {
                return redirect()->route('empleado.perfil');
            }
            
            // Si no tiene rol definido, abortar con 403
            abort(403, 'No tienes permisos para acceder a esta sección.');
        }

        return $next($request);
    }
}
