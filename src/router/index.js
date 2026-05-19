import { createRouter, createWebHistory } from "vue-router";

// AUTH
import Signin from "@/views/auth/Signin.vue";

// LAYOUTS
import AdminLayout from "@/layouts/AdminLayout.vue";

// ADMIN
import AdminDashboard from "@/views/admin/Dashboard.vue";
import UsuariosIndex from "@/views/admin/usuarios/index.vue";

// DOCENTE
import DocenteDashboard from "@/views/docente/Dashboard.vue";

//usuarios 
import UsuariosCreate from "@/views/admin/usuarios/Create.vue";
import UsuariosEdit from "@/views/admin/usuarios/Edit.vue";

//estudiantes
import EstudiantesIndex from "@/views/estudiante/programacion/Index.vue";
import EstudiantesHistorialIndex from "@/views/estudiante/historial/Index.vue";

//carreras
import CarrerasIndex from "@/views/admin/carreras/Index.vue";
import CarrerasCreate from "@/views/admin/carreras/Create.vue";
import CarrerasEdit from "@/views/admin/carreras/Edit.vue";

//materias
import MateriasIndex from "@/views/admin/materias/Index.vue";
import MateriasCreate from "@/views/admin/materias/Create.vue";
import MateriasEdit from "@/views/admin/materias/Edit.vue";

//inscripciones
import InscripcionesIndex from "@/views/admin/inscripciones/Index.vue";
import InscripcionesCreate from "@/views/admin/inscripciones/Create.vue";

//historial
import HistorialIndex from "@/views/admin/historial/Index.vue";
import HistorialAcademico from "@/views/admin/reportes/historial/Index.vue";

//docentes
import DocenteNotas from "@/views/docente/notas/Index.vue";

// prerrequisitos y periodos

import PeriodosIndex from "@/views/admin/periodos/Index.vue";

import PrerrequisitosIndex from "@/views/admin/prerrequisitos/Index.vue";

//reportes
import ReporteMateria from "@/views/admin/reportes/materias/Index.vue";
import ReporteCarrera from "@/views/admin/reportes/carrera/Index.vue";
import ReportePeriodo from "@/views/admin/reportes/periodo/Index.vue";


const routes = [

  // LOGIN
  {
    path: "/signin",
    component: Signin,
  },

  // ADMIN LAYOUT
  {
    path: "/admin",
    component: AdminLayout,

    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    },

    children: [

      // DASHBOARD
      {
        path: "dashboard",
        component: AdminDashboard,
      },

      // USUARIOS
      {
        path: "usuarios",
        component: UsuariosIndex,
      },
      {
        path: "usuarios/create",
        component: UsuariosCreate,
      },
      {
        path: "usuarios/:id/edit",
        component: UsuariosEdit,
      },

      // CARRERAS
      {
        path: "carreras",
        component: CarrerasIndex,
      },

      {
        path: "carreras/create",
        component: CarrerasCreate,
      },

      {
        path: "carreras/:id/edit",
        component: CarrerasEdit,
      },

    ]

  },

  // MATERIAS
  {
    path: "/admin/materias",
    component: MateriasIndex,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/materias/create",
    component: MateriasCreate,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/materias/:id/edit",
    component: MateriasEdit,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  // INSCRIPCIONES
  {
    path: "/admin/inscripciones",
    component: InscripcionesIndex,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/inscripciones/create",
    component: InscripcionesCreate,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  // HISTORIAL
  {
    path: "/admin/historial",
    component: HistorialIndex,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  // PRERREQUISITOS Y PERIODOS
  {
    path: "/admin/periodos",
    component: PeriodosIndex,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/prerrequisitos",
    component: PrerrequisitosIndex,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/reportes/historial",
    component: HistorialAcademico,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },
  {
    path: "/admin/reportes/materia",
    component: ReporteMateria,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },
  {
    path: "/admin/reportes/carrera",
    component: ReporteCarrera,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  {
    path: "/admin/reportes/periodo",
    component: ReportePeriodo,
    meta: {
      requiresAuth: true,
      roles: ["SECRETARIA"]
    }
  },

  // DOCENTE
  {
    path: "/docente/dashboard",
    component: DocenteDashboard,

    meta: {
      requiresAuth: true,
      roles: ["DOCENTE"]
    }
  },

  {
    path: "/docente/notas",
    component: DocenteNotas,
    meta: {
      requiresAuth: true,
      roles: ["DOCENTE"]
    }
  },

  // ESTUDIANTES
  {
    path: "/estudiante/programacion",
    component: EstudiantesIndex,
    meta: {
      requiresAuth: true,
      role: "ESTUDIANTE"
    }
  },
  {
    path: "/estudiante/historial",
    component: EstudiantesHistorialIndex,
    meta: {
      requiresAuth: true,
      role: "ESTUDIANTE"
    }
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// GUARD
router.beforeEach((to, from, next) => {

  const token = localStorage.getItem("token");

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  // PROTEGER
  if (to.meta.requiresAuth && !token) {

    return next("/signin");

  }

  // VALIDAR ROLES
  if (to.meta.roles) {

    if (
      !user ||
      !to.meta.roles.includes(user.rol)
    ) {

      return next("/signin");

    }

  }

  next();

});

export default router;