import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Users, ClipboardList, BarChart3, UserCircle } from 'lucide-react';
import AppLogo from './app-logo';

const getMainNavItems = (isEmpleado: boolean): NavItem[] => {
    if (isEmpleado) {
        // Menú para empleados
        return [
            {
                title: 'Mi Perfil',
                href: '/mi-perfil',
                icon: UserCircle,
            },
        ];
    }

    // Menú para administradores
    return [
        {
            title: 'Dashboard',
            href: dashboard(),
            icon: LayoutGrid,
        },
        {
            title: 'Empleados',
            href: '/empleados',
            icon: Users,
        },
        {
            title: 'Asistencias',
            href: '/asistencias',
            icon: ClipboardList,
        },
        {
            title: 'Reportes',
            href: '/reportes',
            icon: BarChart3,
        },
    ];
};

const footerNavItems: NavItem[] = [
    {
        title: 'Repository',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage().props as any;
    const isEmpleado = auth?.user?.empleado !== null && auth?.user?.empleado !== undefined;
    const mainNavItems = getMainNavItems(isEmpleado);
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
