<template>

<div class="container-fluid py-4">

  <!-- HERO -->
  <div class="row mb-4">

    <div class="col-12">

      <div
        class="card bg-gradient-primary shadow-lg border-0"
      >

        <div class="card-body p-5">

          <div class="row align-items-center">

            <div class="col-lg-8">

              <h1 class="text-white fw-bold mb-3">
                Sistema de Gestión Académica
              </h1>

              <p class="text-white text-lg mb-4">

                Plataforma desarrollada para la
                administración académica universitaria,
                permitiendo gestionar usuarios,
                carreras, materias, inscripciones,
                historial académico, notas y reportes
                de manera eficiente.

              </p>

              <div class="d-flex flex-wrap gap-2">

                <span
                  class="badge bg-white text-primary px-3 py-2"
                >
                  Gestión de Usuarios
                </span>

                <span
                  class="badge bg-white text-primary px-3 py-2"
                >
                  Inscripciones
                </span>

                <span
                  class="badge bg-white text-primary px-3 py-2"
                >
                  Reportes Académicos
                </span>

                <span
                  class="badge bg-white text-primary px-3 py-2"
                >
                  Historial Académico
                </span>

              </div>

            </div>

            <div class="col-lg-4 text-center">

              <i
                class="ni ni-hat-3 text-white"
                style="
                  font-size: 9rem;
                  opacity: 0.25;
                "
              ></i>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <!-- TARJETAS -->
  <div class="row">

    <!-- USUARIOS -->
    <div class="col-xl-3 col-sm-6 mb-4">

      <div class="card">

        <div class="card-body">

          <div
            class="d-flex justify-content-between align-items-center"
          >

            <div>

              <p
                class="text-sm mb-1 text-uppercase fw-bold"
              >
                Usuarios
              </p>

              <h4 class="mb-0">
                Gestión
              </h4>

            </div>

            <div
              class="icon icon-shape bg-gradient-primary shadow text-center border-radius-md"
            >

              <i
                class="ni ni-single-02 text-white text-lg opacity-10"
              ></i>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- CARRERAS -->
    <div class="col-xl-3 col-sm-6 mb-4">

      <div class="card">

        <div class="card-body">

          <div
            class="d-flex justify-content-between align-items-center"
          >

            <div>

              <p
                class="text-sm mb-1 text-uppercase fw-bold"
              >
                Carreras
              </p>

              <h4 class="mb-0">
                Administración
              </h4>

            </div>

            <div
              class="icon icon-shape bg-gradient-success shadow text-center border-radius-md"
            >

              <i
                class="ni ni-hat-3 text-white text-lg opacity-10"
              ></i>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- MATERIAS -->
    <div class="col-xl-3 col-sm-6 mb-4">

      <div class="card">

        <div class="card-body">

          <div
            class="d-flex justify-content-between align-items-center"
          >

            <div>

              <p
                class="text-sm mb-1 text-uppercase fw-bold"
              >
                Materias
              </p>

              <h4 class="mb-0">
                Control Académico
              </h4>

            </div>

            <div
              class="icon icon-shape bg-gradient-warning shadow text-center border-radius-md"
            >

              <i
                class="ni ni-books text-white text-lg opacity-10"
              ></i>

            </div>

          </div>

        </div>

      </div>

    </div>

    <!-- REPORTES -->
    <div class="col-xl-3 col-sm-6 mb-4">

      <div class="card">

        <div class="card-body">

          <div
            class="d-flex justify-content-between align-items-center"
          >

            <div>

              <p
                class="text-sm mb-1 text-uppercase fw-bold"
              >
                Reportes
              </p>

              <h4 class="mb-0">
                Estadísticas
              </h4>

            </div>

            <div
              class="icon icon-shape bg-gradient-danger shadow text-center border-radius-md"
            >

              <i
                class="ni ni-chart-bar-32 text-white text-lg opacity-10"
              ></i>

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>

  <!-- INFORMACION -->
  <div class="row">

    <div class="col-lg-8 mb-4">

      <div class="card h-100">

        <div class="card-header pb-0">

          <h5>
            Acerca del Sistema
          </h5>

        </div>

        <div class="card-body">

          <p class="text-sm">

            El Sistema de Gestión Académica fue
            desarrollado con el objetivo de
            optimizar los procesos administrativos
            y académicos de una institución
            universitaria.

          </p>

          <p class="text-sm">

            El sistema permite administrar:

          </p>

          <ul class="text-sm">

            <li>
              Usuarios y roles
            </li>

            <li>
              Carreras universitarias
            </li>

            <li>
              Materias y prerrequisitos
            </li>

            <li>
              Inscripciones estudiantiles
            </li>

            <li>
              Registro de notas
            </li>

            <li>
              Historial académico
            </li>

            <li>
              Reportes y consultas
            </li>

          </ul>

        </div>

      </div>

    </div>

    <!-- TECNOLOGIAS -->
    <div class="col-lg-4 mb-4">

      <div class="card h-100">

        <div class="card-header pb-0">

          <h5>
            Tecnologías
          </h5>

        </div>

        <div class="card-body">

          <div class="mb-3">

            <h6 class="mb-1">
              Frontend
            </h6>

            <p class="text-sm text-secondary">
              Vue.js + Bootstrap
            </p>

          </div>

          <div class="mb-3">

            <h6 class="mb-1">
              Backend
            </h6>

            <p class="text-sm text-secondary">
              Node.js + Express
            </p>

          </div>

          <div class="mb-3">

            <h6 class="mb-1">
              Base de Datos
            </h6>

            <p class="text-sm text-secondary">
              PostgreSQL
            </p>

          </div>

          <div>

            <h6 class="mb-1">
              Arquitectura
            </h6>

            <p class="text-sm text-secondary">
              API REST
            </p>

          </div>

        </div>

      </div>

    </div>

  </div>

</div>

</template>