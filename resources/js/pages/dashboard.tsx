import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, UserCheck, ClipboardList, TrendingUp, Award, Calendar } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

interface Stats {
    total_empleados: number;
    empleados_activos: number;
    asistencias_hoy: number;
    presentes_hoy: number;
}

interface EstadisticasMes {
    total: number;
    presentes: number;
    ausentes: number;
    tardes: number;
    porcentaje: number;
}

interface TopEmpleado {
    id: number;
    codigo: string;
    nombre: string;
    apellido: string;
    departamento: string;
    total_asistencias: number;
    presentes: number;
    porcentaje: number;
}

interface UltimaAsistencia {
    id: number;
    empleado: string;
    codigo: string;
    fecha: string;
    hora_entrada: string | null;
    estado: string;
}

interface Departamento {
    departamento: string;
    total_empleados: number;
    total_asistencias: number;
}

interface Props {
    stats: Stats;
    estadisticasMes: EstadisticasMes;
    topEmpleados: TopEmpleado[];
    ultimasAsistencias: UltimaAsistencia[];
    departamentos: Departamento[];
    mesActual: string;
}

const getBadgeVariant = (estado: string) => {
    switch (estado) {
        case 'presente':
            return 'default';
        case 'ausente':
            return 'destructive';
        case 'tarde':
            return 'secondary';
        case 'permiso':
            return 'outline';
        case 'vacaciones':
            return 'outline';
        default:
            return 'default';
    }
};

export default function Dashboard({ stats, estadisticasMes, topEmpleados, ultimasAsistencias, departamentos, mesActual }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Encabezado */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="text-gray-600">Resumen general del sistema de asistencia</p>
                </div>

                {/* Tarjetas de estadísticas principales */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total Empleados</CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.total_empleados}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.empleados_activos} activos
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asistencias Hoy</CardTitle>
                            <ClipboardList className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.asistencias_hoy}</div>
                            <p className="text-xs text-muted-foreground">
                                {stats.presentes_hoy} presentes
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Asistencias del Mes</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{estadisticasMes.total}</div>
                            <p className="text-xs text-muted-foreground">
                                {estadisticasMes.presentes} presentes, {estadisticasMes.ausentes} ausentes
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">% Asistencia Mensual</CardTitle>
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{estadisticasMes.porcentaje}%</div>
                            <p className="text-xs text-muted-foreground">
                                {mesActual}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    {/* Top 5 Empleados */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5" />
                                Top 5 Empleados del Mes
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {topEmpleados.length > 0 ? (
                                    topEmpleados.map((emp, index) => (
                                        <div key={emp.id} className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`flex h-8 w-8 items-center justify-center rounded-full ${
                                                    index === 0 ? 'bg-yellow-100 text-yellow-700' :
                                                    index === 1 ? 'bg-gray-100 text-gray-700' :
                                                    index === 2 ? 'bg-orange-100 text-orange-700' :
                                                    'bg-blue-50 text-blue-700'
                                                } font-bold text-sm`}>
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{emp.nombre} {emp.apellido}</p>
                                                    <p className="text-sm text-gray-500">{emp.departamento}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold text-green-600">{emp.porcentaje}%</p>
                                                <p className="text-xs text-gray-500">{emp.presentes}/{emp.total_asistencias}</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-4">No hay datos disponibles</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    {/* Asistencias por Departamento */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <UserCheck className="h-5 w-5" />
                                Asistencias por Departamento
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-3">
                                {departamentos.length > 0 ? (
                                    departamentos.map((dept) => (
                                        <div key={dept.departamento} className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium">{dept.departamento}</p>
                                                <p className="text-sm text-gray-500">{dept.total_empleados} empleados</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-bold">{dept.total_asistencias}</p>
                                                <p className="text-xs text-gray-500">registros</p>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-gray-500 py-4">No hay datos disponibles</p>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Últimas Asistencias */}
                <Card>
                    <CardHeader>
                        <CardTitle>Últimas Asistencias Registradas</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Empleado</TableHead>
                                    <TableHead>Fecha</TableHead>
                                    <TableHead>Hora Entrada</TableHead>
                                    <TableHead>Estado</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {ultimasAsistencias.length > 0 ? (
                                    ultimasAsistencias.map((asistencia) => (
                                        <TableRow key={asistencia.id}>
                                            <TableCell className="font-medium">{asistencia.codigo}</TableCell>
                                            <TableCell>{asistencia.empleado}</TableCell>
                                            <TableCell>{asistencia.fecha}</TableCell>
                                            <TableCell>{asistencia.hora_entrada || '-'}</TableCell>
                                            <TableCell>
                                                <Badge variant={getBadgeVariant(asistencia.estado)}>
                                                    {asistencia.estado}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={5} className="text-center text-gray-500">
                                            No hay asistencias registradas
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
