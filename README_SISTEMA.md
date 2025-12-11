# Sistema de Control de Asistencia

Sistema web completo para la gestión y control de asistencia de empleados, desarrollado con Laravel 12, Inertia.js y React 19.

## 🚀 Características

- **Autenticación completa** con Laravel Fortify
- **Gestión de Empleados** (CRUD completo)
  - Registro de empleados con código único
  - Información detallada: nombre, email, teléfono, departamento, cargo
  - Estados activo/inactivo
  - Búsqueda y filtros avanzados

- **Control de Asistencias** (CRUD completo)
  - Registro de entrada y salida
  - Estados: Presente, Ausente, Tarde, Permiso, Vacaciones
  - Filtros por fecha, empleado y estado
  - Observaciones personalizadas

- **Reportes y Estadísticas**
  - Estadísticas generales de asistencia
  - Reportes detallados por empleado
  - Reportes por departamento
  - Filtros por rango de fechas, empleado y departamento
  - **Exportación múltiple:** Excel (XLSX), PDF y CSV
  - Formatos profesionales con estadísticas y diseño optimizado

- **Interfaz moderna** con React, TypeScript y Tailwind CSS
- **Navegación intuitiva** con sidebar responsive
- **Roles de usuario** (Administrador y Empleado)
- **Datos de ejemplo** precargados para pruebas

## 📋 Requisitos

- PHP 8.4 o superior
- Composer
- Node.js 18+ y npm
- XAMPP (u otro servidor local con Apache y SQLite)

## 🔧 Instalación

El sistema ya está instalado y configurado. Para ejecutarlo:

### 1. Iniciar servidor de desarrollo

```bash
# En una terminal, iniciar el servidor PHP
php artisan serve
```

El servidor estará disponible en: `http://localhost:8000`

### 2. (Opcional) Modo desarrollo con hot-reload

Si deseas trabajar en el frontend con recarga automática:

```bash
# En otra terminal
npm run dev
```

## 👤 Acceso al Sistema

### Usuarios de Prueba

**Administrador:**
- **Email:** admin@example.com
- **Password:** password
- **Acceso completo** a todas las funcionalidades

**Empleado:**
- **Email:** cleveland18@example.com
- **Password:** empleado123
- **Acceso limitado** a su perfil personal y asistencias

## 📊 Datos de Ejemplo

El sistema incluye:
- 1 usuario administrador
- 20 empleados de ejemplo
- Registros de asistencia de los últimos 30 días (solo días laborales)

## 🗂️ Estructura del Proyecto

```
sistema-asistencia/
├── app/
│   ├── Http/Controllers/
│   │   ├── EmpleadoController.php      # CRUD de empleados
│   │   ├── AsistenciaController.php    # CRUD de asistencias
│   │   └── ReporteController.php       # Reportes y estadísticas
│   └── Models/
│       ├── Empleado.php                # Modelo de empleados
│       └── Asistencia.php              # Modelo de asistencias
├── database/
│   ├── migrations/                     # Estructura de la BD
│   ├── factories/                      # Generadores de datos
│   └── seeders/                        # Datos de prueba
├── resources/
│   └── js/
│       ├── pages/
│       │   ├── empleados/              # Vistas de empleados
│       │   ├── asistencias/            # Vistas de asistencias
│       │   └── reportes/               # Vistas de reportes
│       └── components/                 # Componentes reutilizables
└── routes/
    └── web.php                         # Rutas de la aplicación
```

## 🎯 Funcionalidades Principales

### Gestión de Empleados
- **Listar:** Ver todos los empleados con paginación
- **Crear:** Agregar nuevos empleados con validación
- **Editar:** Actualizar información de empleados
- **Eliminar:** Borrar empleados (también elimina sus asistencias)
- **Filtros:** Por nombre, código, email, departamento, estado

### Control de Asistencias
- **Registro manual:** Fecha, horarios, estado y observaciones
- **Listado:** Ver asistencias con filtros múltiples
- **Edición:** Modificar registros existentes
- **Eliminación:** Borrar registros incorrectos

### Reportes
- **Dashboard de estadísticas:** Total de registros, presentes, ausentes, % asistencia
- **Reporte por empleado:** Detalle completo con porcentajes
- **Reporte por departamento:** Estadísticas agrupadas
- **Exportación múltiple:**
  - **Excel (XLSX):** Formato profesional con estilos, colores y estadísticas
  - **PDF:** Documento imprimible en formato apaisado con diseño elegante
  - **CSV:** Formato simple y universal para análisis de datos

## 🔄 Comandos Útiles

```bash
# Resetear base de datos con datos de ejemplo
php artisan migrate:fresh --seed

# Crear usuario para un empleado existente
php artisan empleado:asignar-usuario {CODIGO}
# Ejemplo: php artisan empleado:asignar-usuario EMP-001

# Limpiar cache de rutas
php artisan route:clear

# Regenerar rutas de Wayfinder
php artisan wayfinder:generate

# Compilar assets para producción
npm run build

# Ejecutar tests
php artisan test
```

## 🌐 Rutas Principales

### Para Administradores
- `/` - Página de bienvenida
- `/login` - Inicio de sesión
- `/register` - Registro de usuarios
- `/dashboard` - Panel principal
- `/empleados` - Gestión de empleados
- `/asistencias` - Control de asistencias
- `/reportes` - Reportes y estadísticas

### Para Empleados
- `/mi-perfil` - Perfil personal y estadísticas de asistencia

## 🛠️ Tecnologías

### Backend
- **Laravel 12** - Framework PHP
- **Laravel Fortify** - Autenticación
- **Inertia.js 2** - Server-side rendering
- **SQLite** - Base de datos
- **PHPSpreadsheet** - Generación de archivos Excel
- **DomPDF** - Generación de archivos PDF
- **Laravel Excel** - Exportación de datos a Excel

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipado estático
- **Tailwind CSS 4** - Estilos
- **Vite** - Build tool
- **Laravel Wayfinder** - Routing type-safe

## 📝 Notas de Desarrollo

- Las rutas están protegidas con middleware `auth` y `verified`
- Los modelos incluyen relaciones Eloquent
- Validación de datos en backend
- Componentes UI reutilizables con shadcn/ui
- TypeScript estricto para mayor seguridad

## 🐛 Solución de Problemas

### Error de permisos en base de datos
```bash
# En Linux/Mac
chmod -R 775 database/
chmod -R 775 storage/
```

### Error de compilación de assets
```bash
# Limpiar cache de npm
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Error de migraciones
```bash
# Verificar conexión a BD
php artisan migrate:status

# Recrear base de datos
php artisan migrate:fresh --seed
```

## 📧 Soporte

Para cualquier duda o problema, consulta la documentación de Laravel:
- [Laravel Documentation](https://laravel.com/docs)
- [Inertia.js Documentation](https://inertiajs.com/)
- [React Documentation](https://react.dev/)

## 📄 Licencia

Este proyecto es un sistema de ejemplo para fines educativos y de desarrollo.

---

**Desarrollado con ❤️ usando Laravel + React**
