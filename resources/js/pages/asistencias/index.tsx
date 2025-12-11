import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Plus } from 'lucide-react';
import { useState } from 'react';

const route = (name: string, params?: any) => {
    const routes: any = {
        'asistencias.index': '/asistencias',
        'asistencias.create': '/asistencias/create',
        'asistencias.edit': (id: number) => `/asistencias/${id}/edit`,
        'asistencias.destroy': (id: number) => `/asistencias/${id}`,
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
    empleado: {
        id: number;
        nombre: string;
        apellido: string;
        codigo: string;
    };
}

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    codigo: string;
}

interface Props {
    asistencias: {
        data: Asistencia[];
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    empleados: Empleado[];
    filters: {
        fecha?: string;
        empleado_id?: number;
        estado?: string;
    };
}

export default function Index({ asistencias, empleados, filters }: Props) {
    const [fecha, setFecha] = useState(filters.fecha || '');
    const [empleadoId, setEmpleadoId] = useState(filters.empleado_id?.toString() || '');
    const [estado, setEstado] = useState(filters.estado || '');

    const handleFilter = () => {
        const params: any = {};
        if (fecha) params.fecha = fecha;
        if (empleadoId) params.empleado_id = empleadoId;
        if (estado) params.estado = estado;
        
        router.get(route('asistencias.index'), params, { preserveState: true });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Está seguro de eliminar esta asistencia?')) {
            router.delete(route('asistencias.destroy', id));
        }
    };

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
            <Head title="Asistencias" />
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Gestión de Asistencias</h2>
                                <Link href={route('asistencias.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Nueva Asistencia
                                    </Button>
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <Input
                                    type="date"
                                    value={fecha}
                                    onChange={(e) => setFecha(e.target.value)}
                                />
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
                                <Select value={estado || undefined} onValueChange={setEstado}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos los estados" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="presente">Presente</SelectItem>
                                        <SelectItem value="ausente">Ausente</SelectItem>
                                        <SelectItem value="tarde">Tarde</SelectItem>
                                        <SelectItem value="permiso">Permiso</SelectItem>
                                        <SelectItem value="vacaciones">Vacaciones</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button onClick={handleFilter}>Buscar</Button>
                            </div>

                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Fecha</TableHead>
                                            <TableHead>Empleado</TableHead>
                                            <TableHead>Entrada</TableHead>
                                            <TableHead>Salida</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {asistencias.data.map((asistencia) => (
                                            <TableRow key={asistencia.id}>
                                                <TableCell>{asistencia.fecha}</TableCell>
                                                <TableCell>
                                                    {asistencia.empleado.codigo} - {asistencia.empleado.nombre} {asistencia.empleado.apellido}
                                                </TableCell>
                                                <TableCell>{asistencia.hora_entrada || '-'}</TableCell>
                                                <TableCell>{asistencia.hora_salida || '-'}</TableCell>
                                                <TableCell>
                                                    <Badge variant={getBadgeVariant(asistencia.estado)}>
                                                        {asistencia.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={route('asistencias.edit', asistencia.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(asistencia.id)}
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-500" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
