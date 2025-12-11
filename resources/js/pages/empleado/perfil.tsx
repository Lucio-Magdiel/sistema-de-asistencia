import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { User, Briefcase, Mail, Phone, Calendar, Building2, ClipboardList } from 'lucide-react';

interface Asistencia {
    id: number;
    fecha: string;
    hora_entrada: string | null;
    hora_salida: string | null;
    estado: string;
    observaciones: string | null;
}

interface Empleado {
    id: number;
    codigo: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string | null;
    departamento: string;
    cargo: string;
    fecha_ingreso: string;
    estado: string;
    asistencias: Asistencia[];
}

interface EstadisticasMes {
    total: number;
    presentes: number;
    ausentes: number;
    tardes: number;
    permisos: number;
    vacaciones: number;
    porcentaje_asistencia: number;
}

interface Props {
    empleado: Empleado;
    estadisticasMes: EstadisticasMes;
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

export default function EmpleadoPerfil({ empleado, estadisticasMes }: Props) {
    return (
        <AppLayout>
            <Head title="Mi Perfil" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Bienvenida */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg shadow-lg p-8 text-white">
                        <h1 className="text-3xl font-bold mb-2">
                            Bienvenido, {empleado.nombre} {empleado.apellido}
                        </h1>
                        <p className="text-blue-100">Código de empleado: {empleado.codigo}</p>
                    </div>

                    {/* Información Personal */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Información Personal
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Email</p>
                                        <p className="font-medium">{empleado.email}</p>
                                    </div>
                                </div>
                                {empleado.telefono && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-400" />
                                        <div>
                                            <p className="text-sm text-gray-500">Teléfono</p>
                                            <p className="font-medium">{empleado.telefono}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Fecha de Ingreso</p>
                                        <p className="font-medium">{empleado.fecha_ingreso}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Briefcase className="w-5 h-5" />
                                    Información Laboral
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Departamento</p>
                                        <p className="font-medium">{empleado.departamento}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <ClipboardList className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <p className="text-sm text-gray-500">Cargo</p>
                                        <p className="font-medium">{empleado.cargo}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5" />
                                    <div>
                                        <p className="text-sm text-gray-500">Estado</p>
                                        <Badge variant={empleado.estado === 'activo' ? 'default' : 'secondary'}>
                                            {empleado.estado}
                                        </Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Estadísticas del Mes */}
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-4">Estadísticas del Mes Actual</h2>
                        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Total</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{estadisticasMes.total}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Presentes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-green-600">{estadisticasMes.presentes}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Ausentes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-red-600">{estadisticasMes.ausentes}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Tardes</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-yellow-600">{estadisticasMes.tardes}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Permisos</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-blue-600">{estadisticasMes.permisos}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">Vacaciones</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-purple-600">{estadisticasMes.vacaciones}</div>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader className="pb-2">
                                    <CardTitle className="text-sm font-medium">% Asistencia</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{estadisticasMes.porcentaje_asistencia}%</div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Historial de Asistencias */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Últimas 30 Asistencias</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Hora Entrada</TableHead>
                                            <TableHead>Hora Salida</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead>Observaciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {empleado.asistencias.length > 0 ? (
                                            empleado.asistencias.map((asistencia) => (
                                                <TableRow key={asistencia.id}>
                                                    <TableCell>{asistencia.fecha}</TableCell>
                                                    <TableCell>{asistencia.hora_entrada || '-'}</TableCell>
                                                    <TableCell>{asistencia.hora_salida || '-'}</TableCell>
                                                    <TableCell>
                                                        <Badge variant={getBadgeVariant(asistencia.estado)}>
                                                            {asistencia.estado}
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell className="max-w-xs truncate">
                                                        {asistencia.observaciones || '-'}
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-gray-500">
                                                    No hay registros de asistencia
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
