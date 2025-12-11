import { Head, Link, router } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const route = (name: string, params?: any) => {
    const routes: any = {
        'empleados.index': '/empleados',
        'empleados.create': '/empleados/create',
        'empleados.show': (id: number) => `/empleados/${id}`,
        'empleados.edit': (id: number) => `/empleados/${id}/edit`,
        'empleados.destroy': (id: number) => `/empleados/${id}`,
    };
    const routeFn = routes[name];
    return typeof routeFn === 'function' ? routeFn(params) : routeFn;
};
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Eye, Plus, Search } from 'lucide-react';
import { useState } from 'react';

interface Empleado {
    id: number;
    codigo: string;
    nombre: string;
    apellido: string;
    email: string;
    telefono: string;
    departamento: string;
    cargo: string;
    fecha_ingreso: string;
    estado: 'activo' | 'inactivo';
}

interface Props {
    empleados: {
        data: Empleado[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    departamentos: string[];
    filters: {
        search?: string;
        estado?: string;
        departamento?: string;
    };
}

export default function Index({ empleados, departamentos, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [estado, setEstado] = useState(filters.estado || '');
    const [departamento, setDepartamento] = useState(filters.departamento || '');

    const handleFilter = () => {
        const params: any = {};
        if (search) params.search = search;
        if (estado) params.estado = estado;
        if (departamento) params.departamento = departamento;
        
        router.get(route('empleados.index'), params, {
            preserveState: true,
        });
    };

    const handleDelete = (id: number) => {
        if (confirm('¿Está seguro de eliminar este empleado?')) {
            router.delete(route('empleados.destroy', id));
        }
    };

    return (
        <AppLayout>
            <Head title="Empleados" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {/* Header */}
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-gray-800">Gestión de Empleados</h2>
                                <Link href={route('empleados.create')}>
                                    <Button>
                                        <Plus className="w-4 h-4 mr-2" />
                                        Nuevo Empleado
                                    </Button>
                                </Link>
                            </div>

                            {/* Filtros */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                                <div className="md:col-span-2">
                                    <Input
                                        placeholder="Buscar por nombre, código o email..."
                                        value={search}
                                        onChange={(e) => setSearch(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleFilter()}
                                    />
                                </div>
                                <Select value={estado || undefined} onValueChange={setEstado}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todos los estados" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="activo">Activo</SelectItem>
                                        <SelectItem value="inactivo">Inactivo</SelectItem>
                                    </SelectContent>
                                </Select>
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
                            <div className="flex gap-2 mb-6">
                                <Button onClick={handleFilter}>
                                    <Search className="w-4 h-4 mr-2" />
                                    Buscar
                                </Button>
                                <Button 
                                    variant="outline" 
                                    onClick={() => {
                                        setSearch('');
                                        setEstado('');
                                        setDepartamento('');
                                        router.get(route('empleados.index'), {}, { preserveState: true });
                                    }}
                                >
                                    Limpiar
                                </Button>
                            </div>

                            {/* Tabla */}
                            <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Código</TableHead>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Departamento</TableHead>
                                            <TableHead>Cargo</TableHead>
                                            <TableHead>Estado</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {empleados.data.map((empleado) => (
                                            <TableRow key={empleado.id}>
                                                <TableCell className="font-medium">{empleado.codigo}</TableCell>
                                                <TableCell>{empleado.nombre} {empleado.apellido}</TableCell>
                                                <TableCell>{empleado.email}</TableCell>
                                                <TableCell>{empleado.departamento}</TableCell>
                                                <TableCell>{empleado.cargo}</TableCell>
                                                <TableCell>
                                                    <Badge variant={empleado.estado === 'activo' ? 'default' : 'secondary'}>
                                                        {empleado.estado}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Link href={route('empleados.show', empleado.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Eye className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Link href={route('empleados.edit', empleado.id)}>
                                                            <Button variant="ghost" size="sm">
                                                                <Pencil className="w-4 h-4" />
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="ghost" 
                                                            size="sm"
                                                            onClick={() => handleDelete(empleado.id)}
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

                            {/* Paginación */}
                            {empleados.last_page > 1 && (
                                <div className="mt-6 flex justify-center gap-2">
                                    {empleados.links.map((link, index) => (
                                        <Button
                                            key={index}
                                            variant={link.active ? 'default' : 'outline'}
                                            size="sm"
                                            onClick={() => link.url && router.get(link.url)}
                                            disabled={!link.url}
                                            dangerouslySetInnerHTML={{ __html: link.label }}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
