<?php

namespace App\Http\Controllers;

use App\Models\Asistencia;
use App\Models\Empleado;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use PhpOffice\PhpSpreadsheet\Style\Fill;
use PhpOffice\PhpSpreadsheet\Style\Alignment;
use PhpOffice\PhpSpreadsheet\Style\Border;

class ReporteController extends Controller
{
    /**
     * Mostrar vista de reportes
     */
    public function index(Request $request): Response
    {
        $fechaInicio = $request->input('fecha_inicio', Carbon::now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', Carbon::now()->endOfMonth()->toDateString());
        $empleadoId = $request->input('empleado_id');
        $departamento = $request->input('departamento');

        // Estadísticas generales
        $estadisticas = $this->obtenerEstadisticas($fechaInicio, $fechaFin, $empleadoId, $departamento);

        // Reporte detallado por empleado
        $reporteEmpleados = $this->obtenerReporteEmpleados($fechaInicio, $fechaFin, $empleadoId, $departamento);

        // Reporte por departamento
        $reporteDepartamentos = $this->obtenerReporteDepartamentos($fechaInicio, $fechaFin);

        // Obtener empleados y departamentos para filtros
        $empleados = Empleado::activos()->orderBy('nombre')->get(['id', 'nombre', 'apellido', 'codigo']);
        $departamentos = Empleado::distinct()->pluck('departamento');

        return Inertia::render('reportes/index', [
            'estadisticas' => $estadisticas,
            'reporteEmpleados' => $reporteEmpleados,
            'reporteDepartamentos' => $reporteDepartamentos,
            'empleados' => $empleados,
            'departamentos' => $departamentos,
            'filters' => [
                'fecha_inicio' => $fechaInicio,
                'fecha_fin' => $fechaFin,
                'empleado_id' => $empleadoId,
                'departamento' => $departamento,
            ],
        ]);
    }

    /**
     * Obtener estadísticas generales
     */
    private function obtenerEstadisticas($fechaInicio, $fechaFin, $empleadoId = null, $departamento = null)
    {
        $query = Asistencia::fechaEntre($fechaInicio, $fechaFin);

        if ($empleadoId) {
            $query->where('empleado_id', $empleadoId);
        }

        if ($departamento) {
            $query->whereHas('empleado', function ($q) use ($departamento) {
                $q->where('departamento', $departamento);
            });
        }

        $totalRegistros = $query->count();
        $presentes = $query->where('estado', 'presente')->count();
        $ausentes = $query->where('estado', 'ausente')->count();
        $tardes = $query->where('estado', 'tarde')->count();
        $permisos = $query->where('estado', 'permiso')->count();
        $vacaciones = $query->where('estado', 'vacaciones')->count();

        return [
            'total_registros' => $totalRegistros,
            'presentes' => $presentes,
            'ausentes' => $ausentes,
            'tardes' => $tardes,
            'permisos' => $permisos,
            'vacaciones' => $vacaciones,
            'porcentaje_asistencia' => $totalRegistros > 0 ? round(($presentes / $totalRegistros) * 100, 2) : 0,
        ];
    }

    /**
     * Obtener reporte detallado por empleado
     */
    private function obtenerReporteEmpleados($fechaInicio, $fechaFin, $empleadoId = null, $departamento = null)
    {
        $query = Empleado::with(['asistencias' => function ($q) use ($fechaInicio, $fechaFin) {
            $q->fechaEntre($fechaInicio, $fechaFin);
        }]);

        if ($empleadoId) {
            $query->where('id', $empleadoId);
        }

        if ($departamento) {
            $query->where('departamento', $departamento);
        }

        $empleados = $query->activos()->get();

        return $empleados->map(function ($empleado) {
            $asistencias = $empleado->asistencias;
            $total = $asistencias->count();
            
            return [
                'empleado_id' => $empleado->id,
                'codigo' => $empleado->codigo,
                'nombre_completo' => $empleado->nombre_completo,
                'departamento' => $empleado->departamento,
                'cargo' => $empleado->cargo,
                'total_registros' => $total,
                'presentes' => $asistencias->where('estado', 'presente')->count(),
                'ausentes' => $asistencias->where('estado', 'ausente')->count(),
                'tardes' => $asistencias->where('estado', 'tarde')->count(),
                'permisos' => $asistencias->where('estado', 'permiso')->count(),
                'vacaciones' => $asistencias->where('estado', 'vacaciones')->count(),
                'porcentaje_asistencia' => $total > 0 ? round(($asistencias->where('estado', 'presente')->count() / $total) * 100, 2) : 0,
            ];
        });
    }

    /**
     * Obtener reporte por departamento
     */
    private function obtenerReporteDepartamentos($fechaInicio, $fechaFin)
    {
        return DB::table('asistencias')
            ->join('empleados', 'asistencias.empleado_id', '=', 'empleados.id')
            ->whereBetween('asistencias.fecha', [$fechaInicio, $fechaFin])
            ->select(
                'empleados.departamento',
                DB::raw('COUNT(*) as total_registros'),
                DB::raw('SUM(CASE WHEN asistencias.estado = "presente" THEN 1 ELSE 0 END) as presentes'),
                DB::raw('SUM(CASE WHEN asistencias.estado = "ausente" THEN 1 ELSE 0 END) as ausentes'),
                DB::raw('SUM(CASE WHEN asistencias.estado = "tarde" THEN 1 ELSE 0 END) as tardes'),
                DB::raw('SUM(CASE WHEN asistencias.estado = "permiso" THEN 1 ELSE 0 END) as permisos'),
                DB::raw('SUM(CASE WHEN asistencias.estado = "vacaciones" THEN 1 ELSE 0 END) as vacaciones')
            )
            ->groupBy('empleados.departamento')
            ->get()
            ->map(function ($item) {
                $item->porcentaje_asistencia = $item->total_registros > 0 
                    ? round(($item->presentes / $item->total_registros) * 100, 2) 
                    : 0;
                return $item;
            });
    }

    /**
     * Exportar reporte a CSV
     */
    public function exportar(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', Carbon::now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', Carbon::now()->endOfMonth()->toDateString());
        $empleadoId = $request->input('empleado_id');
        $departamento = $request->input('departamento');

        $reporteEmpleados = $this->obtenerReporteEmpleados($fechaInicio, $fechaFin, $empleadoId, $departamento);

        $filename = "reporte_asistencias_{$fechaInicio}_a_{$fechaFin}.csv";
        
        $headers = [
            'Content-Type' => 'text/csv',
            'Content-Disposition' => "attachment; filename=\"$filename\"",
        ];

        $callback = function() use ($reporteEmpleados) {
            $file = fopen('php://output', 'w');
            
            // Encabezados
            fputcsv($file, [
                'Código',
                'Nombre Completo',
                'Departamento',
                'Cargo',
                'Total Registros',
                'Presentes',
                'Ausentes',
                'Tardes',
                'Permisos',
                'Vacaciones',
                'Porcentaje Asistencia'
            ]);

            // Datos
            foreach ($reporteEmpleados as $empleado) {
                fputcsv($file, [
                    $empleado['codigo'],
                    $empleado['nombre_completo'],
                    $empleado['departamento'],
                    $empleado['cargo'],
                    $empleado['total_registros'],
                    $empleado['presentes'],
                    $empleado['ausentes'],
                    $empleado['tardes'],
                    $empleado['permisos'],
                    $empleado['vacaciones'],
                    $empleado['porcentaje_asistencia'] . '%'
                ]);
            }

            fclose($file);
        };

        return response()->stream($callback, 200, $headers);
    }

    /**
     * Exportar reporte a Excel
     */
    public function exportarExcel(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', Carbon::now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', Carbon::now()->endOfMonth()->toDateString());
        $empleadoId = $request->input('empleado_id');
        $departamento = $request->input('departamento');

        $reporteEmpleados = $this->obtenerReporteEmpleados($fechaInicio, $fechaFin, $empleadoId, $departamento);
        $estadisticas = $this->obtenerEstadisticas($fechaInicio, $fechaFin, $empleadoId, $departamento);

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Título
        $sheet->setCellValue('A1', 'REPORTE DE ASISTENCIAS');
        $sheet->mergeCells('A1:K1');
        $sheet->getStyle('A1')->getFont()->setBold(true)->setSize(16);
        $sheet->getStyle('A1')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Información del período
        $sheet->setCellValue('A2', "Período: {$fechaInicio} a {$fechaFin}");
        $sheet->mergeCells('A2:K2');
        $sheet->getStyle('A2')->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);

        // Estadísticas generales
        $sheet->setCellValue('A4', 'ESTADÍSTICAS GENERALES');
        $sheet->mergeCells('A4:D4');
        $sheet->getStyle('A4')->getFont()->setBold(true);
        $sheet->getStyle('A4')->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FFE0E0E0');

        $sheet->setCellValue('A5', 'Total Registros:');
        $sheet->setCellValue('B5', $estadisticas['total_registros']);
        $sheet->setCellValue('A6', 'Presentes:');
        $sheet->setCellValue('B6', $estadisticas['presentes']);
        $sheet->setCellValue('A7', 'Ausentes:');
        $sheet->setCellValue('B7', $estadisticas['ausentes']);
        $sheet->setCellValue('A8', 'Porcentaje Asistencia:');
        $sheet->setCellValue('B8', $estadisticas['porcentaje_asistencia'] . '%');

        // Encabezados de la tabla
        $row = 10;
        $headers = ['Código', 'Nombre Completo', 'Departamento', 'Cargo', 'Total', 'Presentes', 'Ausentes', 'Tardes', 'Permisos', 'Vacaciones', '%'];
        $col = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($col . $row, $header);
            $sheet->getStyle($col . $row)->getFont()->setBold(true);
            $sheet->getStyle($col . $row)->getFill()->setFillType(Fill::FILL_SOLID)->getStartColor()->setARGB('FF4472C4');
            $sheet->getStyle($col . $row)->getFont()->getColor()->setARGB('FFFFFFFF');
            $sheet->getStyle($col . $row)->getAlignment()->setHorizontal(Alignment::HORIZONTAL_CENTER);
            $col++;
        }

        // Datos
        $row = 11;
        foreach ($reporteEmpleados as $empleado) {
            $sheet->setCellValue('A' . $row, $empleado['codigo']);
            $sheet->setCellValue('B' . $row, $empleado['nombre_completo']);
            $sheet->setCellValue('C' . $row, $empleado['departamento']);
            $sheet->setCellValue('D' . $row, $empleado['cargo']);
            $sheet->setCellValue('E' . $row, $empleado['total_registros']);
            $sheet->setCellValue('F' . $row, $empleado['presentes']);
            $sheet->setCellValue('G' . $row, $empleado['ausentes']);
            $sheet->setCellValue('H' . $row, $empleado['tardes']);
            $sheet->setCellValue('I' . $row, $empleado['permisos']);
            $sheet->setCellValue('J' . $row, $empleado['vacaciones']);
            $sheet->setCellValue('K' . $row, $empleado['porcentaje_asistencia'] . '%');
            
            // Aplicar bordes
            $sheet->getStyle('A' . $row . ':K' . $row)->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_THIN);
            $row++;
        }

        // Ajustar ancho de columnas
        foreach (range('A', 'K') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        // Bordes en encabezados
        $sheet->getStyle('A10:K10')->getBorders()->getAllBorders()->setBorderStyle(Border::BORDER_MEDIUM);

        $filename = "reporte_asistencias_{$fechaInicio}_a_{$fechaFin}.xlsx";
        
        $writer = new Xlsx($spreadsheet);
        
        header('Content-Type: application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
        header('Content-Disposition: attachment; filename="' . $filename . '"');
        header('Cache-Control: max-age=0');
        
        $writer->save('php://output');
        exit;
    }

    /**
     * Exportar reporte a PDF
     */
    public function exportarPdf(Request $request)
    {
        $fechaInicio = $request->input('fecha_inicio', Carbon::now()->startOfMonth()->toDateString());
        $fechaFin = $request->input('fecha_fin', Carbon::now()->endOfMonth()->toDateString());
        $empleadoId = $request->input('empleado_id');
        $departamento = $request->input('departamento');

        $reporteEmpleados = $this->obtenerReporteEmpleados($fechaInicio, $fechaFin, $empleadoId, $departamento);
        $estadisticas = $this->obtenerEstadisticas($fechaInicio, $fechaFin, $empleadoId, $departamento);

        $pdf = Pdf::loadView('reportes.pdf', [
            'reporteEmpleados' => $reporteEmpleados,
            'estadisticas' => $estadisticas,
            'fechaInicio' => $fechaInicio,
            'fechaFin' => $fechaFin,
        ]);

        $pdf->setPaper('A4', 'landscape');

        $filename = "reporte_asistencias_{$fechaInicio}_a_{$fechaFin}.pdf";
        
        return $pdf->download($filename);
    }
}
