# 📚 Manual de Usuario - Sistema de Control de Asistencia

## 🎯 Introducción

Este manual te guiará paso a paso en el uso del Sistema de Control de Asistencia. El sistema permite gestionar empleados, registrar asistencias y generar reportes detallados.

## 🔐 Acceso al Sistema

El sistema tiene **dos tipos de usuarios**:

### 👨‍💼 Acceso como Administrador

**Credenciales:**
- **Email:** admin@example.com
- **Contraseña:** password

**Funcionalidades disponibles:**
- Gestión completa de empleados (crear, editar, eliminar)
- Gestión completa de asistencias
- Visualización y generación de reportes
- Exportación de datos (Excel, PDF, CSV)

### 👤 Acceso como Empleado

**Credenciales de prueba:**
- **Email:** cleveland18@example.com
- **Contraseña:** empleado123

**Funcionalidades disponibles:**
- Ver su propia información personal y laboral
- Ver estadísticas de asistencia del mes actual
- Consultar historial de asistencias (últimas 30)

### Pasos para Iniciar Sesión

1. Abre tu navegador y ve a: `http://localhost:8000`
2. Haz clic en el botón **"Log in"**
3. Ingresa el email y contraseña según tu rol
4. Haz clic en **"Log in"**

### Registro de Nuevos Usuarios (Opcional)

1. Desde la página de inicio, haz clic en **"Register"**
2. Completa el formulario:
   - Nombre
   - Email
   - Contraseña
   - Confirmar contraseña
3. Haz clic en **"Register"**
4. Verifica tu email (en desarrollo, este paso se omite)

**Nota:** Los usuarios registrados manualmente son administradores por defecto.

## 👤 Perfil de Empleado

### Vista del Empleado

Cuando un empleado inicia sesión, verá automáticamente su perfil personal con:

#### Panel de Bienvenida
- Saludo personalizado con nombre completo
- Código de empleado

#### Información Personal
- ✉️ Email de contacto
- 📱 Teléfono (si está registrado)
- 📅 Fecha de ingreso

#### Información Laboral
- 🏢 Departamento
- 💼 Cargo
- ✅ Estado (activo/inactivo)

#### Estadísticas del Mes Actual
Tarjetas con información detallada:
- **Total:** Cantidad total de registros
- **Presentes:** Días que asistió (verde)
- **Ausentes:** Días que faltó (rojo)
- **Tardes:** Días que llegó tarde (amarillo)
- **Permisos:** Días con permiso (azul)
- **Vacaciones:** Días de vacaciones (morado)
- **% Asistencia:** Porcentaje de asistencia del mes

#### Historial de Asistencias
Tabla con las últimas 30 asistencias mostrando:
- Fecha del registro
- Hora de entrada
- Hora de salida
- Estado (con colores distintivos)
- Observaciones (si las hay)

### Restricciones del Empleado

Los empleados **NO tienen acceso** a:
- ❌ Gestión de otros empleados
- ❌ Registro o edición de asistencias
- ❌ Reportes generales
- ❌ Exportación de datos

### Crear Usuarios para Empleados Existentes

**Para administradores:** Si necesitas dar acceso al sistema a un empleado existente:

1. Usa el comando Artisan desde la terminal:
   ```bash
   php artisan empleado:asignar-usuario {CODIGO}
   ```
   Ejemplo: `php artisan empleado:asignar-usuario EMP-001`

2. El sistema te pedirá ingresar y confirmar una contraseña

3. Se creará un usuario con el email del empleado

4. El empleado podrá iniciar sesión inmediatamente

## 📋 Módulo de Empleados

### Ver Lista de Empleados

1. Desde el **Dashboard**, haz clic en **"Empleados"** en el menú lateral
2. Verás una tabla con todos los empleados registrados
3. La tabla muestra:
   - Código del empleado
   - Nombre completo
   - Email
   - Departamento
   - Cargo
   - Estado (activo/inactivo)

### Buscar Empleados

**Búsqueda por texto:**
1. En el campo de búsqueda, escribe:
   - Nombre del empleado
   - Código
   - Email
   - Departamento
2. Haz clic en **"Buscar"**
3. Los resultados se filtrarán automáticamente

**Filtros adicionales:**
- **Estado:** Selecciona "Activo" o "Inactivo"
- **Departamento:** Selecciona un departamento específico
- Haz clic en **"Buscar"** para aplicar

**Limpiar filtros:**
- Haz clic en **"Limpiar"** para resetear todos los filtros

### Crear Nuevo Empleado

1. Haz clic en el botón **"Nuevo Empleado"** (parte superior derecha)
2. Completa el formulario:
   - **Código:** Identificador único (ej: EMP-001)
   - **Nombre:** Primer nombre
   - **Apellido:** Apellido(s)
   - **Email:** Correo electrónico único
   - **Teléfono:** Número de contacto (opcional)
   - **Departamento:** Área de trabajo
   - **Cargo:** Puesto en la empresa
   - **Fecha de Ingreso:** Fecha de inicio
   - **Estado:** Activo o Inactivo
3. Haz clic en **"Guardar Empleado"**
4. Serás redirigido a la lista con un mensaje de éxito

**Nota:** Los campos marcados con * son obligatorios

### Ver Detalles de un Empleado

1. En la lista de empleados, haz clic en el ícono de **ojo** 👁️
2. Verás:
   - **Información Personal:**
     * Email
     * Teléfono
     * Fecha de ingreso
   - **Información Laboral:**
     * Departamento
     * Cargo
   - **Últimas Asistencias:**
     * Tabla con los 10 registros más recientes
     * Fecha, horas de entrada/salida, estado

### Editar Empleado

1. En la lista de empleados, haz clic en el ícono de **lápiz** ✏️
2. O desde la vista de detalles, haz clic en **"Editar"**
3. Modifica los campos necesarios
4. Haz clic en **"Actualizar Empleado"**
5. Los cambios se guardarán inmediatamente

### Eliminar Empleado

1. En la lista de empleados, haz clic en el ícono de **basura** 🗑️
2. Confirma la eliminación en el diálogo
3. El empleado y todas sus asistencias serán eliminadas

**⚠️ Advertencia:** Esta acción no se puede deshacer

## 🕐 Módulo de Asistencias

### Ver Lista de Asistencias

1. Haz clic en **"Asistencias"** en el menú lateral
2. Verás una tabla con:
   - Fecha del registro
   - Empleado (código y nombre)
   - Hora de entrada
   - Hora de salida
   - Estado (presente, ausente, tarde, permiso, vacaciones)

**Vista por defecto:** Muestra las asistencias del mes actual

### Filtrar Asistencias

**Por fecha:**
1. Selecciona una fecha en el calendario
2. Haz clic en **"Buscar"**

**Por empleado:**
1. Despliega el selector "Empleado"
2. Selecciona un empleado de la lista
3. Haz clic en **"Buscar"**

**Por estado:**
1. Despliega el selector "Estado"
2. Selecciona: Presente, Ausente, Tarde, Permiso o Vacaciones
3. Haz clic en **"Buscar"**

**Combinar filtros:**
Puedes aplicar múltiples filtros simultáneamente para búsquedas más específicas

### Registrar Nueva Asistencia

1. Haz clic en **"Nueva Asistencia"**
2. Completa el formulario:
   - **Empleado:** Selecciona de la lista desplegable
   - **Fecha:** Fecha del registro (por defecto, hoy)
   - **Hora Entrada:** Hora de llegada (formato 24h)
   - **Hora Salida:** Hora de salida (formato 24h)
   - **Estado:** Selecciona el tipo de asistencia
     * **Presente:** Asistió normalmente
     * **Ausente:** No asistió
     * **Tarde:** Llegó tarde
     * **Permiso:** Con autorización
     * **Vacaciones:** Día de descanso
   - **Observaciones:** Notas adicionales (opcional)
3. Haz clic en **"Guardar Asistencia"**

**Validaciones:**
- La hora de salida debe ser posterior a la hora de entrada
- No se puede registrar dos veces la misma fecha para un empleado

### Editar Asistencia

1. En la lista, haz clic en el ícono de **lápiz** ✏️
2. Modifica los campos necesarios
3. Haz clic en **"Actualizar Asistencia"**

**Casos de uso comunes:**
- Corregir hora de entrada/salida
- Cambiar estado (ej: de "tarde" a "presente")
- Agregar observaciones

### Eliminar Asistencia

1. Haz clic en el ícono de **basura** 🗑️
2. Confirma la eliminación
3. El registro será eliminado permanentemente

## 📊 Módulo de Reportes

### Ver Reportes

1. Haz clic en **"Reportes"** en el menú lateral
2. Verás tres secciones:
   - **Estadísticas Generales** (tarjetas superiores)
   - **Reporte por Empleado** (tabla detallada)
   - **Reporte por Departamento** (tabla agrupada)

### Estadísticas Generales

Muestra 4 métricas principales:
1. **Total Registros:** Cantidad total de asistencias en el período
2. **Presentes:** Número de asistencias presentes
3. **Ausentes:** Número de ausencias
4. **% Asistencia:** Porcentaje de presencias sobre el total

### Filtrar Reportes

**Por rango de fechas:**
1. **Fecha Inicio:** Selecciona la fecha inicial
2. **Fecha Fin:** Selecciona la fecha final
3. Haz clic en **"Filtrar"**

**Ejemplos de rangos útiles:**
- Última semana
- Mes actual
- Último trimestre
- Año completo

**Por empleado específico:**
1. Selecciona un empleado del desplegable
2. Haz clic en **"Filtrar"**
3. Verás solo los datos de ese empleado

**Por departamento:**
1. Selecciona un departamento
2. Haz clic en **"Filtrar"**
3. Verás datos de todos los empleados de ese departamento

### Interpretar el Reporte por Empleado

La tabla muestra para cada empleado:
- **Código:** Identificador único
- **Nombre Completo:** Nombre y apellido
- **Departamento:** Área de trabajo
- **Total:** Cantidad de registros en el período
- **Presentes:** Días que asistió
- **Ausentes:** Días que faltó
- **Tardes:** Días que llegó tarde
- **% Asistencia:** Porcentaje de asistencia

**Interpretación de colores:**
- 🟢 Verde: Presentes
- 🔴 Rojo: Ausentes
- 🟡 Amarillo: Tardes

### Exportar Reportes

El sistema permite exportar reportes en **3 formatos diferentes**:

#### 📊 Exportar a Excel (Recomendado)

1. Aplica los filtros deseados (fechas, empleado, departamento)
2. Haz clic en el botón **"Exportar Excel"** (ícono 📊)
3. El archivo `.xlsx` se descargará automáticamente
4. Ábrelo con Microsoft Excel, LibreOffice Calc o Google Sheets

**Características del Excel:**
- ✅ Título y período del reporte
- ✅ Estadísticas generales destacadas
- ✅ Tabla de datos con formato profesional
- ✅ Colores en encabezados (azul)
- ✅ Bordes y estilos
- ✅ Columnas con ancho automático
- ✅ Ideal para presentaciones y análisis

#### 📄 Exportar a PDF

1. Aplica los filtros deseados
2. Haz clic en el botón **"Exportar PDF"** (ícono 📄)
3. El archivo `.pdf` se descargará automáticamente
4. Ábrelo con cualquier lector de PDF

**Características del PDF:**
- ✅ Formato apaisado (landscape) para mejor visualización
- ✅ Diseño profesional con estadísticas destacadas
- ✅ Tabla completa de empleados
- ✅ Colores y estilos elegantes
- ✅ Fecha de generación del reporte
- ✅ Ideal para impresión y archivo

#### 📋 Exportar a CSV

1. Aplica los filtros deseados
2. Haz clic en el botón **"Exportar CSV"** (ícono 📥)
3. El archivo `.csv` se descargará automáticamente
4. Ábrelo con Excel, Google Sheets o cualquier editor de hojas de cálculo

**Características del CSV:**
- ✅ Formato simple y universal
- ✅ Compatible con cualquier sistema
- ✅ Ideal para procesamiento de datos
- ✅ Fácil de importar en otras aplicaciones

**Contenido de todas las exportaciones:**
- Todos los datos del reporte por empleado
- Código, nombre, departamento, cargo
- Desglose de asistencias (presentes, ausentes, tardes, permisos, vacaciones)
- Porcentaje de asistencia
- Nombre del archivo incluye las fechas del reporte

**Ejemplo de nombres de archivo:**
- `reporte_asistencias_2025-01-01_a_2025-01-31.xlsx`
- `reporte_asistencias_2025-01-01_a_2025-01-31.pdf`
- `reporte_asistencias_2025-01-01_a_2025-01-31.csv`

**Usos del CSV:**
- Crear gráficas personalizadas
- Análisis avanzado con Excel
- Compartir con gerencia
- Archivo histórico

## 💡 Casos de Uso Comunes

### Caso 1: Registro Diario de Asistencia

**Escenario:** Es lunes por la mañana y necesitas registrar quién llegó

1. Ve a **"Asistencias"** → **"Nueva Asistencia"**
2. Para cada empleado que llegó:
   - Selecciona el empleado
   - Deja la fecha de hoy
   - Ingresa la hora de entrada
   - Estado: "Presente" o "Tarde"
   - Guarda
3. Para empleados ausentes:
   - Selecciona el empleado
   - Estado: "Ausente"
   - Agrega observación si es necesario
   - Guarda

### Caso 2: Reporte Mensual para Gerencia

**Escenario:** Fin de mes, necesitas reportar asistencias

1. Ve a **"Reportes"**
2. Configura filtros:
   - Fecha Inicio: 1ro del mes
   - Fecha Fin: Último día del mes
3. Revisa las estadísticas generales
4. Analiza el reporte por empleado
5. Identifica empleados con bajo % de asistencia
6. Exporta a CSV
7. Envía el archivo a gerencia

### Caso 3: Agregar Nuevo Empleado

**Escenario:** Ingresa un nuevo colaborador

1. Ve a **"Empleados"** → **"Nuevo Empleado"**
2. Completa todos los datos:
   - Código: EMP-XXX (siguiente número disponible)
   - Datos personales
   - Departamento y cargo
   - Fecha de ingreso: Hoy
   - Estado: Activo
3. Guarda
4. Verifica en la lista que aparezca correctamente

### Caso 4: Revisar Asistencia de un Empleado

**Escenario:** Un empleado solicita revisar su asistencia del mes

1. Ve a **"Empleados"**
2. Busca al empleado por nombre o código
3. Haz clic en el ícono de **ojo** 👁️
4. Revisa la sección "Últimas Asistencias"
5. Verifica fechas, horas y estados
6. Si necesitas más detalle, ve a **"Reportes"**
7. Filtra por el empleado específico
8. Exporta a CSV si necesita una copia

### Caso 5: Corregir Error en Registro

**Escenario:** Se ingresó mal una hora de entrada

1. Ve a **"Asistencias"**
2. Busca el registro:
   - Por fecha
   - Por empleado
3. Haz clic en **editar** ✏️
4. Corrige la hora de entrada
5. Guarda los cambios
6. Verifica que se actualizó correctamente

## ⚙️ Configuraciones y Ajustes

### Cambiar Contraseña

1. Haz clic en tu nombre (esquina superior derecha)
2. Selecciona **"Settings"**
3. Ve a **"Password"**
4. Ingresa:
   - Contraseña actual
   - Nueva contraseña
   - Confirmación
5. Guarda cambios

### Configurar 2FA (Autenticación de Dos Factores)

1. Ve a **Settings** → **Two Factor**
2. Haz clic en **"Enable"**
3. Escanea el código QR con tu app de autenticación
4. Ingresa el código de verificación
5. Guarda los códigos de recuperación

### Cerrar Sesión

1. Haz clic en tu nombre (esquina superior derecha)
2. Selecciona **"Log out"**

## 🆘 Preguntas Frecuentes (FAQ)

### ¿Puedo eliminar una asistencia por error?

Sí, simplemente haz clic en el ícono de basura 🗑️ y confirma. Sin embargo, esta acción no se puede deshacer.

### ¿Cómo registro un permiso?

Crea una nueva asistencia, selecciona el empleado, la fecha, y en "Estado" elige "Permiso". Opcionalmente agrega detalles en "Observaciones".

### ¿Puedo ver asistencias de meses anteriores?

Sí, en el módulo de Asistencias usa los filtros de fecha, o mejor aún, ve a Reportes y selecciona el rango de fechas deseado.

### ¿Cómo sé qué empleados faltaron hoy?

Ve a Asistencias, filtra por la fecha de hoy y estado "Ausente".

### ¿El reporte incluye fines de semana?

El sistema permite registrar cualquier día, pero los datos de ejemplo solo incluyen días laborales (lunes a viernes).

### ¿Puedo modificar un empleado después de crearlo?

Sí, en cualquier momento puedes editarlo desde la lista de empleados.

### ¿Qué pasa si elimino un empleado con asistencias?

Se eliminarán también todas sus asistencias registradas. Usa con precaución.

### ¿Puedo tener dos empleados con el mismo email?

No, el email debe ser único en el sistema.

### ¿Hay límite de empleados o registros?

No hay límite técnico, el sistema puede manejar miles de registros.

## 🎨 Atajos y Tips

### Navegación Rápida

- **Sidebar:** Siempre visible en el lado izquierdo
- **Breadcrumbs:** Muestra dónde estás y permite volver rápidamente
- **Botón "Volver":** Presente en formularios de creación/edición

### Eficiencia en el Trabajo

1. **Usa filtros:** Aprende a combinar filtros para búsquedas rápidas
2. **Exporta reportes:** Guarda reportes mensuales automáticamente
3. **Atajos de teclado:** Enter para buscar en campos de búsqueda
4. **Vista de detalles:** Usa el ícono 👁️ para info rápida sin editar

### Buenas Prácticas

- ✅ Registra asistencias diariamente
- ✅ Mantén actualizada la información de empleados
- ✅ Agrega observaciones relevantes
- ✅ Genera reportes regularmente
- ✅ Exporta datos importantes a CSV
- ✅ Revisa el % de asistencia mensualmente

## 📞 Soporte

Si tienes problemas técnicos:

1. **Verifica:**
   - Conexión a internet
   - Servidor Laravel corriendo
   - Datos correctos en formularios

2. **Comandos de ayuda:**
   ```bash
   # Reiniciar servidor
   php artisan serve
   
   # Limpiar cache
   php artisan cache:clear
   ```

3. **Documentación adicional:**
   - README_SISTEMA.md
   - DESPLIEGUE.md

---

**¡Disfruta usando el Sistema de Control de Asistencia!** 🎉

**Versión:** 1.0.0  
**Última actualización:** Diciembre 2025
