import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

const route = (name: string, params?: any) => {
    const routes: any = {
        'empleados.index': '/empleados',
        'empleados.update': (id: number) => `/empleados/${id}`,
    };
    const routeFn = routes[name];
    return typeof routeFn === 'function' ? routeFn(params) : routeFn;
};
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft } from 'lucide-react';
import { type BreadcrumbItem } from '@/types';

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
    empleado: Empleado;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Empleados', href: route('empleados.index') },
    { title: 'Editar', href: '#' },
];

export default function Edit({ empleado }: Props) {
    const { data, setData, put, processing, errors } = useForm({
        codigo: empleado.codigo,
        nombre: empleado.nombre,
        apellido: empleado.apellido,
        email: empleado.email,
        telefono: empleado.telefono || '',
        departamento: empleado.departamento,
        cargo: empleado.cargo,
        fecha_ingreso: empleado.fecha_ingreso,
        estado: empleado.estado,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('empleados.update', empleado.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Editar Empleado" />

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <Link href={route('empleados.index')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Volver
                                    </Button>
                                </Link>
                                <h2 className="text-2xl font-bold text-gray-800 ml-4">Editar Empleado</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="codigo">Código *</Label>
                                        <Input
                                            id="codigo"
                                            value={data.codigo}
                                            onChange={(e) => setData('codigo', e.target.value)}
                                        />
                                        {errors.codigo && <p className="text-sm text-red-500 mt-1">{errors.codigo}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="estado">Estado *</Label>
                                        <Select value={data.estado} onValueChange={(value) => setData('estado', value as 'activo' | 'inactivo')}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="activo">Activo</SelectItem>
                                                <SelectItem value="inactivo">Inactivo</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.estado && <p className="text-sm text-red-500 mt-1">{errors.estado}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="nombre">Nombre *</Label>
                                        <Input
                                            id="nombre"
                                            value={data.nombre}
                                            onChange={(e) => setData('nombre', e.target.value)}
                                        />
                                        {errors.nombre && <p className="text-sm text-red-500 mt-1">{errors.nombre}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="apellido">Apellido *</Label>
                                        <Input
                                            id="apellido"
                                            value={data.apellido}
                                            onChange={(e) => setData('apellido', e.target.value)}
                                        />
                                        {errors.apellido && <p className="text-sm text-red-500 mt-1">{errors.apellido}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                        />
                                        {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="telefono">Teléfono</Label>
                                        <Input
                                            id="telefono"
                                            value={data.telefono}
                                            onChange={(e) => setData('telefono', e.target.value)}
                                        />
                                        {errors.telefono && <p className="text-sm text-red-500 mt-1">{errors.telefono}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="departamento">Departamento *</Label>
                                        <Input
                                            id="departamento"
                                            value={data.departamento}
                                            onChange={(e) => setData('departamento', e.target.value)}
                                        />
                                        {errors.departamento && <p className="text-sm text-red-500 mt-1">{errors.departamento}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="cargo">Cargo *</Label>
                                        <Input
                                            id="cargo"
                                            value={data.cargo}
                                            onChange={(e) => setData('cargo', e.target.value)}
                                        />
                                        {errors.cargo && <p className="text-sm text-red-500 mt-1">{errors.cargo}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="fecha_ingreso">Fecha de Ingreso *</Label>
                                        <Input
                                            id="fecha_ingreso"
                                            type="date"
                                            value={data.fecha_ingreso}
                                            onChange={(e) => setData('fecha_ingreso', e.target.value)}
                                        />
                                        {errors.fecha_ingreso && <p className="text-sm text-red-500 mt-1">{errors.fecha_ingreso}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('empleados.index')}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        Actualizar Empleado
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
