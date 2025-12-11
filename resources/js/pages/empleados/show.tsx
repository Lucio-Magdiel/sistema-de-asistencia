import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ArrowLeft, Mail, Phone, Calendar, Briefcase, Building2 } from 'lucide-react';

const route = (name: string, params?: any) => {
    const routes: any = {
        'empleados.index': '/empleados',
        'empleados.edit': (id: number) => `/empleados/${id}/edit`,
    };
    const routeFn = routes[name];
    return typeof routeFn === 'function' ? routeFn(params) : routeFn;
};

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
    estado: 'activo' | 'inactivo';
    asistencias: Asistencia[];
}

interface Props {
    empleado: Empleado;
}

export default function Show({ empleado }: Props) {
    const getBadgeVariant = (estado: string) => {
        const variants: any = {
            presente: 'default',
            ausente: 'destructive',
            tarde: 'secondary',
            permiso: 'outline',
            vacaciones: 'outline'
        };
        return variants[estado] || 'default';
    };

    return (
        <AppLayout>
            <Head title={`Empleado: ${empleado.nombre} ${empleado.apellido}`} />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    {/* Header */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <Link href={route('empleados.index')}>
                                        <Button variant="ghost" size="sm">
                                            <ArrowLeft className="w-4 h-4 mr-2" />
                                            Volver
                                        </Button>
                                    </Link>
                                    <div className="ml-4">
                                        <h2 className="text-2xl font-bold text-gray-800">
                                            {empleado.nombre} {empleado.apellido}
                                        </h2>
                                        <p className="text-gray-600">{empleado.codigo}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Badge variant={empleado.estado === 'activo' ? 'default' : 'secondary'}>
                                        {empleado.estado}
                                    </Badge>
                                    <Link href={route('empleados.edit', empleado.id)}>
                                        <Button>Editar</Button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Información del Empleado */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Información Personal</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Email</p>
                                        <p className="font-medium">{empleado.email}</p>
                                    </div>
                                </div>
                                {empleado.telefono && (
                                    <div className="flex items-center gap-3">
                                        <Phone className="w-5 h-5 text-gray-500" />
                                        <div>
                                            <p className="text-sm text-gray-600">Teléfono</p>
                                            <p className="font-medium">{empleado.telefono}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-3">
                                    <Calendar className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Fecha de Ingreso</p>
                                        <p className="font-medium">{empleado.fecha_ingreso}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Información Laboral</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3">
                                    <Building2 className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Departamento</p>
                                        <p className="font-medium">{empleado.departamento}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Briefcase className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="text-sm text-gray-600">Cargo</p>
                                        <p className="font-medium">{empleado.cargo}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Últimas Asistencias */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Últimas Asistencias</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {empleado.asistencias && empleado.asistencias.length > 0 ? (
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
                                            {empleado.asistencias.map((asistencia) => (
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
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-8">No hay registros de asistencia</p>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
