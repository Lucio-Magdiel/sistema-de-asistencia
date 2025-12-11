<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Reporte de Asistencias</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 20px;
        }
        h1 {
            text-align: center;
            color: #333;
            margin-bottom: 10px;
        }
        .period {
            text-align: center;
            margin-bottom: 20px;
            color: #666;
        }
        .statistics {
            background-color: #f5f5f5;
            padding: 15px;
            margin-bottom: 20px;
            border-radius: 5px;
        }
        .statistics h2 {
            margin-top: 0;
            font-size: 14px;
            color: #333;
        }
        .stat-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 10px;
        }
        .stat-item {
            padding: 10px;
            background-color: white;
            border-radius: 3px;
            border-left: 3px solid #4472C4;
        }
        .stat-label {
            font-size: 10px;
            color: #666;
            margin-bottom: 3px;
        }
        .stat-value {
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        table thead {
            background-color: #4472C4;
            color: white;
        }
        table th {
            padding: 10px 5px;
            text-align: left;
            font-size: 11px;
            font-weight: bold;
        }
        table td {
            padding: 8px 5px;
            border-bottom: 1px solid #ddd;
            font-size: 10px;
        }
        table tbody tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        table tbody tr:hover {
            background-color: #f0f0f0;
        }
        .text-center {
            text-align: center;
        }
        .text-right {
            text-align: right;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 10px;
            color: #999;
        }
    </style>
</head>
<body>
    <h1>REPORTE DE ASISTENCIAS</h1>
    <div class="period">
        Período: {{ $fechaInicio }} a {{ $fechaFin }}
    </div>

    <div class="statistics">
        <h2>Estadísticas Generales</h2>
        <div class="stat-grid">
            <div class="stat-item">
                <div class="stat-label">Total Registros</div>
                <div class="stat-value">{{ $estadisticas['total_registros'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Presentes</div>
                <div class="stat-value">{{ $estadisticas['presentes'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">Ausentes</div>
                <div class="stat-value">{{ $estadisticas['ausentes'] }}</div>
            </div>
            <div class="stat-item">
                <div class="stat-label">% Asistencia</div>
                <div class="stat-value">{{ $estadisticas['porcentaje_asistencia'] }}%</div>
            </div>
        </div>
    </div>

    <table>
        <thead>
            <tr>
                <th>Código</th>
                <th>Nombre Completo</th>
                <th>Departamento</th>
                <th>Cargo</th>
                <th class="text-center">Total</th>
                <th class="text-center">Presentes</th>
                <th class="text-center">Ausentes</th>
                <th class="text-center">Tardes</th>
                <th class="text-center">Permisos</th>
                <th class="text-center">Vacaciones</th>
                <th class="text-center">%</th>
            </tr>
        </thead>
        <tbody>
            @foreach($reporteEmpleados as $empleado)
            <tr>
                <td>{{ $empleado['codigo'] }}</td>
                <td>{{ $empleado['nombre_completo'] }}</td>
                <td>{{ $empleado['departamento'] }}</td>
                <td>{{ $empleado['cargo'] }}</td>
                <td class="text-center">{{ $empleado['total_registros'] }}</td>
                <td class="text-center">{{ $empleado['presentes'] }}</td>
                <td class="text-center">{{ $empleado['ausentes'] }}</td>
                <td class="text-center">{{ $empleado['tardes'] }}</td>
                <td class="text-center">{{ $empleado['permisos'] }}</td>
                <td class="text-center">{{ $empleado['vacaciones'] }}</td>
                <td class="text-center">{{ $empleado['porcentaje_asistencia'] }}%</td>
            </tr>
            @endforeach
        </tbody>
    </table>

    <div class="footer">
        Generado el {{ now()->format('d/m/Y H:i:s') }}
    </div>
</body>
</html>
