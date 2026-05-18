# instalacion del proyecto 
```bash
npm install
```
# ejecucion
```bash
npm run serve
```
# Documentación Rápida — Plataforma de Gestión Académica Universitaria

## Descripción General

Se desarrolló una plataforma académica universitaria utilizando:

* Frontend: Vue.js + Bootstrap
* Backend: Express
* Base de datos: PostgreSQL
* Arquitectura: API REST
* Autenticación: JWT
* Control de roles:

  * SECRETARIA
  * DOCENTE
  * ESTUDIANTE

---

# Arquitectura del Backend

El backend está dividido en módulos:

```bash
src/modules/
```

Cada módulo contiene:

```bash
controller
model
service
routes
```

## Flujo

```text
ROUTES
 ↓
CONTROLLER
 ↓
SERVICE
 ↓
MODEL
 ↓
BASE DE DATOS
```

---

# Módulos Implementados

# 1. Módulo de Carreras

## Funcionalidades

* Listar carreras
* Obtener carrera por ID
* Crear carrera
* Editar carrera
* Desactivar carrera

## Tabla utilizada

```sql
carrera
```

## Endpoints

```http
GET    /carreras
GET    /carreras/:id
POST   /carreras
PUT    /carreras/:id
PATCH  /carreras/:id/status
```

## Validaciones

* No permite carreras duplicadas
* Verifica existencia antes de editar
* Desactivación lógica mediante `estado=false`

---

# 2. Módulo de Materias

## Funcionalidades

* CRUD de materias
* Relación con carrera
* Asignación de docente
* Validación de siglas

## Relaciones

```text
Materia
 ├── Carrera
 └── Docente
```

## Tabla utilizada

```sql
materia
```

## Endpoints

```http
GET    /materias
GET    /materias/:id
POST   /materias
PUT    /materias/:id
PATCH  /materias/:id/status
```

## Validaciones

* Siglas únicas
* Validación de existencia
* Docente opcional

---

# 3. Módulo de Inscripciones

## Funcionalidades

* Inscribir estudiantes
* Validación automática de periodo
* Validación de prerrequisitos
* Validación de carrera

## Reglas Implementadas

### Validación de periodo activo

Solo se puede inscribir si existe un periodo activo.

### Validación de carrera

El estudiante solo puede inscribirse en materias de su carrera.

### Validación de prerrequisitos

Se verifica si aprobó materias anteriores.

### Validación de duplicados

No permite doble inscripción.

## Tabla utilizada

```sql
inscripcion
```

## Endpoint

```http
POST /inscripciones
```

---

# 4. Módulo de Notas

## Funcionalidades

* Registro de nota final
* Validación del docente propietario
* Validación de rango de nota

## Reglas

* Solo el docente asignado puede registrar notas
* Rango permitido:

```text
0 - 100
```

## Endpoint

```http
PUT /notas/:inscripcionId
```

---

# 5. Módulo de Periodos Académicos

## Funcionalidades

* Crear periodos
* Editar periodos
* Activar periodo
* Desactivar periodos automáticamente

## Tabla

```sql
periodo_academico
```

## Endpoints

```http
GET    /periodos
GET    /periodos/:id
POST   /periodos
PUT    /periodos/:id
PATCH  /periodos/:id/activate
```

## Regla importante

Solo puede existir:

```text
1 periodo activo
```

---

# 6. Módulo de Prerrequisitos

## Funcionalidades

* Crear prerrequisitos
* Eliminar prerrequisitos
* Listar relaciones

## Relación

```text
Materia
 └── requiere otra Materia
```

## Tabla

```sql
prerrequisito
```

## Endpoints

```http
GET    /prerrequisitos
POST   /prerrequisitos
DELETE /prerrequisitos/:id
```

## Validaciones

* Una materia no puede ser prerrequisito de sí misma
* No permite duplicados

---

# 7. Módulo de Reportes

## Reportes Implementados

---

## Reporte por Materia

Muestra:

* Estudiantes inscritos
* Correo
* Nota final
* Estado

### Endpoint

```http
GET /reportes/materia/:materiaId
```

---

## Historial Académico del Estudiante

Muestra:

* Materias cursadas
* Gestión
* Periodo
* Nota
* Resultado:

  * APROBADO
  * REPROBADO
  * CURSANDO

### Endpoint

```http
GET /reportes/historial/:estudianteId
```

---

## Reporte por Carrera

Muestra:

* Materias
* Estudiantes
* Periodos
* Notas

### Endpoint

```http
GET /reportes/carrera/:carreraId
```

---

## Reporte por Periodo

Muestra:

* Carrera
* Materia
* Estudiante
* Nota

### Endpoint

```http
GET /reportes/periodo/:periodoId
```

---

## Materias Asignadas al Docente

### Endpoint

```http
GET /reportes/docente/materias
```

---

# Frontend Implementado

## Tecnologías

* Vue 3
* Composition API
* Vue Router
* Axios
* Bootstrap 5

---

# Pantallas Implementadas

## Administración

* Dashboard
* Gestión de carreras
* Gestión de materias
* Gestión de periodos
* Gestión de prerrequisitos
* Reportes

## Docente

* Registro de notas
* Visualización de materias asignadas

## Estudiante

* Inscripción a materias
* Historial académico

---

# Servicios Frontend

Se implementaron servicios Axios:

```bash
src/services/
```

Ejemplo:

```js
getCarreras()
createCarrera()
updateCarrera()
```

---

# Seguridad

## Middlewares Implementados

### authMiddleware

Valida JWT.

### roleMiddleware

Restringe acceso por rol.

Ejemplo:

```js
roleMiddleware('SECRETARIA')
```

---

# Base de Datos

## Tablas principales

```text
usuario
rol
carrera
materia
inscripcion
periodo_academico
prerrequisito
```

---


# Estado Actual del Proyecto

## Backend

✔ Autenticación
✔ Roles
✔ Carreras
✔ Materias
✔ Inscripciones
✔ Notas
✔ Periodos
✔ Prerrequisitos
✔ Reportes

---

## Frontend

✔ CRUD carreras
✔ CRUD materias
✔ Inscripciones
✔ Registro notas
✔ Reportes
✔ Navegación
✔ Sidebar/Navbar

---

# Posibles Mejoras Futuras

## Académico

* Kardex PDF
* Exportar Excel/PDF
* Control de cupos
* Horarios
* Paralelos
* Asistencia

## Técnico

* Paginación
* Filtros avanzados
* Dashboard estadístico
* Logs
* Docker
* Tests

---

# Conclusión

El sistema actualmente permite administrar:

* carreras
* materias
* estudiantes
* docentes
* periodos
* prerrequisitos
* inscripciones
* notas
* reportes académicos

siguiendo una arquitectura modular, escalable y basada en API REST.
