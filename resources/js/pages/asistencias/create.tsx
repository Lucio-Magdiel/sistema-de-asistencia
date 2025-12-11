import { Head, Link, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';

const route = (name: string) => {
    const routes: any = {
        'asistencias.index': '/asistencias',
        'asistencias.store': '/asistencias',
    };
    return routes[name];
};

interface Empleado {
    id: number;
    nombre: string;
    apellido: string;
    codigo: string;
}

interface Props {
    empleados: Empleado[];
}

export default function Create({ empleados }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        empleado_id: '',
        fecha: new Date().toISOString().split('T')[0],
        hora_entrada: '',
        hora_salida: '',
        estado: 'presente',
        observaciones: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('asistencias.store'));
    };

    return (
        <AppLayout>
            <Head title="Nueva Asistencia" />
            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <div className="flex items-center mb-6">
                                <Link href={route('asistencias.index')}>
                                    <Button variant="ghost" size="sm">
                                        <ArrowLeft className="w-4 h-4 mr-2" />
                                        Volver
                                    </Button>
                                </Link>
                                <h2 className="text-2xl font-bold text-gray-800 ml-4">Nueva Asistencia</h2>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="empleado_id">Empleado *</Label>
                                        <Select value={data.empleado_id} onValueChange={(value) => setData('empleado_id', value)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Seleccionar empleado" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {empleados.map((emp) => (
                                                    <SelectItem key={emp.id} value={emp.id.toString()}>
                                                        {emp.codigo} - {emp.nombre} {emp.apellido}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errors.empleado_id && <p className="text-sm text-red-500 mt-1">{errors.empleado_id}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="fecha">Fecha *</Label>
                                        <Input
                                            id="fecha"
                                            type="date"
                                            value={data.fecha}
                                            onChange={(e) => setData('fecha', e.target.value)}
                                        />
                                        {errors.fecha && <p className="text-sm text-red-500 mt-1">{errors.fecha}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="hora_entrada">Hora Entrada</Label>
                                        <Input
                                            id="hora_entrada"
                                            type="time"
                                            value={data.hora_entrada}
                                            onChange={(e) => setData('hora_entrada', e.target.value)}
                                        />
                                        {errors.hora_entrada && <p className="text-sm text-red-500 mt-1">{errors.hora_entrada}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="hora_salida">Hora Salida</Label>
                                        <Input
                                            id="hora_salida"
                                            type="time"
                                            value={data.hora_salida}
                                            onChange={(e) => setData('hora_salida', e.target.value)}
                                        />
                                        {errors.hora_salida && <p className="text-sm text-red-500 mt-1">{errors.hora_salida}</p>}
                                    </div>

                                    <div>
                                        <Label htmlFor="estado">Estado *</Label>
                                        <Select value={data.estado} onValueChange={(value) => setData('estado', value)}>
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="presente">Presente</SelectItem>
                                                <SelectItem value="ausente">Ausente</SelectItem>
                                                <SelectItem value="tarde">Tarde</SelectItem>
                                                <SelectItem value="permiso">Permiso</SelectItem>
                                                <SelectItem value="vacaciones">Vacaciones</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        {errors.estado && <p className="text-sm text-red-500 mt-1">{errors.estado}</p>}
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="observaciones">Observaciones</Label>
                                        <Textarea
                                            id="observaciones"
                                            value={data.observaciones}
                                            onChange={(e) => setData('observaciones', e.target.value)}
                                            rows={3}
                                        />
                                        {errors.observaciones && <p className="text-sm text-red-500 mt-1">{errors.observaciones}</p>}
                                    </div>
                                </div>

                                <div className="flex justify-end gap-4">
                                    <Link href={route('asistencias.index')}>
                                        <Button type="button" variant="outline">
                                            Cancelar
                                        </Button>
                                    </Link>
                                    <Button type="submit" disabled={processing}>
                                        Guardar Asistencia
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
