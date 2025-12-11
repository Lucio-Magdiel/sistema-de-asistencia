import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Download, Search, FileSpreadsheet, FileText } from 'lucide-react';
import { useState } from 'react';

const route = (name: string) => {
    const routes: any = {
        'reportes.index': '/reportes',
        'reportes.exportar': '/reportes/exportar',
        'reportes.exportar-excel': '/reportes/exportar-excel',
        'reportes.exportar-pdf': '/reportes/exportar-pdf',
    };
    return routes[name];
};

interface Estadisticas {
    total_registros: number;
    presentes: number;
    ausentes: number;
    tardes: number;
    permisos: number;
    vacaciones: number;
    porcentaje_asistencia: number;
}

interface ReporteEmpleado {
    empleado_id: number;
    codigo: string;
    nombre_completo: string;
    departamento: string;
    cargo: string;
    total_registros: number;
    presentes: number;
    ausentes: number;
    tardes: number;
    porcentaje_asistencia: number;
}

interface Props {
    estadisticas: Estadisticas;
    reporteEmpleados: ReporteEmpleado[];
    empleados: any[];
    departamentos: string[];
    filters: {
        fecha_inicio: string;
        fecha_fin: string;
        empleado_id?: number;
        departamento?: string;
    };
}

export default function Index({ estadisticas, reporteEmpleados, empleados, departamentos, filters }: Props) {
    const [fechaInicio, setFechaInicio] = useState(filters.fecha_inicio);
    const [fechaFin, setFechaFin] = useState(filters.fecha_fin);
    const [empleadoId, setEmpleadoId] = useState(filters.empleado_id?.toString() || '');
    const [departamento, setDepartamento] = useState(filters.departamento || '');

    const handleFilter = () => {
        const params: any = {
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
        };
        if (empleadoId) params.empleado_id = empleadoId;
        if (departamento) params.departamento = departamento;
        
        router.get(route('reportes.index'), params);
    };

    const handleExportCSV = () => {
        const params = new URLSearchParams({
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            ...(empleadoId && { empleado_id: empleadoId }),
            ...(departamento && { departamento: departamento }),
        });
        window.location.href = `${route('reportes.exportar')}?${params.toString()}`;
    };

    const handleExportExcel = () => {
        const params = new URLSearchParams({
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            ...(empleadoId && { empleado_id: empleadoId }),
            ...(departamento && { departamento: departamento }),
        });
        window.location.href = `${route('reportes.exportar-excel')}?${params.toString()}`;
    };

    const handleExportPDF = () => {
        const params = new URLSearchParams({
            fecha_inicio: fechaInicio,
            fecha_fin: fechaFin,
            ...(empleadoId && { empleado_id: empleadoId }),
            ...(departamento && { departamento: departamento }),
        });
        window.location.href = `${route('reportes.exportar-pdf')}?${params.toString()}`;
    };

    return (
        <AppLayout>
            <Head title="Reportes de Asistencia" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Reportes de Asistencia</h2>

                            {/* Filtros */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div>
                                    <Label>Fecha Inicio</Label>
                                    <Input
                                        type="date"
                                        value={fechaInicio}
                                        onChange={(e) => setFechaInicio(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Fecha Fin</Label>
                                    <Input
                                        type="date"
                                        value={fechaFin}
                                        onChange={(e) => setFechaFin(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <Label>Empleado</Label>
                                    <Select value={empleadoId || undefined} onValueChange={setEmpleadoId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los empleados" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {empleados.map((emp) => (
                                                <SelectItem key={emp.id} value={emp.id.toString()}>
                                                    {emp.codigo} - {emp.nombre} {emp.apellido}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div>
                                    <Label>Departamento</Label>
                                    <Select value={departamento || undefined} onValueChange={setDepartamento}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Todos los departamentos" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {departamentos.map((dept) => (
                                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex gap-2 mb-6">
                                <Button onClick={handleFilter}>
                                    <Search className="w-4 h-4 mr-2" />
                                    Filtrar
                                </Button>
                                <Button variant="outline" onClick={handleExportExcel}>
                                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                                    Exportar Excel
                                </Button>
                                <Button variant="outline" onClick={handleExportPDF}>
                                    <FileText className="w-4 h-4 mr-2" />
                                    Exportar PDF
                                </Button>
                                <Button variant="outline" onClick={handleExportCSV}>
                                    <Download className="w-4 h-4 mr-2" />
                                    Exportar CSV
                                </Button>
                            </div>

                            {/* Estadísticas Generales */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Total Registros</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{estadisticas.total_registros}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-green-600">{estadisticas.presentes}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold text-red-600">{estadisticas.ausentes}</div>
                                    </CardContent>
                                </Card>
                                <Card>
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-sm font-medium">% Asistencia</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">{estadisticas.porcentaje_asistencia}%</div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Tabla de Reporte por Empleado */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-4">Reporte Detallado por Empleado</h3>
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Código</TableHead>
                                                <TableHead>Empleado</TableHead>
                                                <TableHead>Departamento</TableHead>
                                                <TableHead className="text-center">Total</TableHead>
                                                <TableHead className="text-center">Presentes</TableHead>
                                                <TableHead className="text-center">Ausentes</TableHead>
                                                <TableHead className="text-center">Tardes</TableHead>
                                                <TableHead className="text-center">% Asistencia</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {reporteEmpleados.map((empleado) => (
                                                <TableRow key={empleado.empleado_id}>
                                                    <TableCell className="font-medium">{empleado.codigo}</TableCell>
                                                    <TableCell>{empleado.nombre_completo}</TableCell>
                                                    <TableCell>{empleado.departamento}</TableCell>
                                                    <TableCell className="text-center">{empleado.total_registros}</TableCell>
                                                    <TableCell className="text-center text-green-600">{empleado.presentes}</TableCell>
                                                    <TableCell className="text-center text-red-600">{empleado.ausentes}</TableCell>
                                                    <TableCell className="text-center">{empleado.tardes}</TableCell>
                                                    <TableCell className="text-center font-semibold">{empleado.porcentaje_asistencia}%</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
