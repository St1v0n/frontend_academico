<template>
  <div class="presentacion-page">

    <!-- Hero Section -->
    <section class="hero">
      <div class="container text-center">
        <h1>Sistema de Gestión de Pagos</h1>
        <p>
          Automatiza y simplifica la administración de pagos de unidades particulares con nuestra
          plataforma integral
        </p>
      </div>
    </section>

    <!-- Problem Section -->
    <section id="problem" class="problem">
      <div class="container">
        <div class="section-title">
          <h2>Problemática Actual</h2>
          <p>La gestión manual de pagos presenta múltiples desafíos</p>
        </div>
        <div class="problem-items">
          <div class="problem-item" v-for="item in problemItems" :key="item.title">
            <i :class="item.icon"></i>
            <h3>{{ item.title }}</h3>
            <p>{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ✅ Solution Section con letras en blanco -->
    <section id="solution" class="solution">
      <div class="container">
        <div class="section-title">
          <h2>Nuestra Solución</h2>
          <p>Una plataforma diseñada específicamente para unidades particulares</p>
        </div>
        <div class="solution-content">
          <div class="solution-text">
            <h3>Sistema Integral de Gestión de Pagos</h3>
            <ul>
              <li>Pagos en línea seguros a través de múltiples métodos</li>
              <li>Automatización de recordatorios y cobranza</li>
              <li>Gestión centralizada de información financiera</li>
              <li>Reportes en tiempo real y personalizables</li>
              <li>Comunicación directa con residentes</li>
            </ul>
          </div>
          <div class="solution-image">
            <img
              src="https://images.unsplash.com/photo-1563013546-7e5c053c3453?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
              alt="Sistema de pagos"
            />
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="features">
      <div class="container">
        <div class="section-title">
          <h2>Funcionalidades Principales</h2>
          <p>Todo lo que necesitas en una sola plataforma</p>
        </div>
        <div class="features-grid">
          <div class="feature-card" v-for="feature in features" :key="feature.title">
            <i :class="feature.icon"></i>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="benefits">
      <div class="container">
        <div class="section-title">
          <h2>Beneficios Clave</h2>
          <p>Ventajas para administradores y residentes</p>
        </div>
        <div class="benefits-container">
          <div class="benefit-column">
            <h3>Para Administradores</h3>
            <ul>
              <li v-for="item in adminBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
          <div class="benefit-column">
            <h3>Para Residentes</h3>
            <ul>
              <li v-for="item in residentBenefits" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Security Section -->
    <section id="security" class="security">
      <div class="container">
        <div class="section-title">
          <h2>Seguridad y Confiabilidad</h2>
          <p>Protección de datos y transacciones garantizada</p>
        </div>
        <div class="security-items">
          <div class="security-item" v-for="sec in securityItems" :key="sec.title">
            <i :class="sec.icon"></i>
            <h3>{{ sec.title }}</h3>
            <p>{{ sec.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta">
      <div class="container text-center">
        <h2>¿Listo para modernizar tu sistema de pagos?</h2>
        <a href="#contact" class="btn">Solicitar una demostración</a>
      </div>
    </section>

    <!-- Footer -->
    <footer id="contact">
      <div class="container">
        <div class="section-title">
          <h2>Contacto</h2>
          <p>Estamos aquí para responder tus preguntas</p>
        </div>
        <div class="contact-info">
          <p><i class="fas fa-user"></i> <strong>Nombre:</strong> Juan Pérez</p>
          <p><i class="fas fa-envelope"></i> <strong>Email:</strong> juan@syspagos.com</p>
          <p><i class="fas fa-phone"></i> <strong>Teléfono:</strong> (55) 1234-5678</p>
          <p><i class="fas fa-globe"></i> <strong>Sitio web:</strong> www.syspagos.com</p>
        </div>
        <div class="copyright">
          <p>&copy; 2023 PaySystem - Sistema de Gestión de Pagos. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import '@/assets/css/presentassion.css';

const problemItems = ref([
  { icon: 'fas fa-clock', title: 'Procesos Lentos', desc: 'Gestión manual que consume tiempo y recursos valiosos' },
  { icon: 'fas fa-exclamation-triangle', title: 'Retrasos en Pagos', desc: 'Falta de recordatorios efectivos que generan morosidad' },
  { icon: 'fas fa-file-invoice', title: 'Conciliación Compleja', desc: 'Dificultad para conciliar pagos recibidos con registros' },
]);

const features = ref([
  { icon: 'fas fa-desktop', title: 'Portal Web y Móvil', desc: 'Acceso desde cualquier dispositivo con conexión a internet' },
  { icon: 'fas fa-credit-card', title: 'Múltiples Métodos de Pago', desc: 'Tarjeta, transferencia, efectivo en conveniencia y más' },
  { icon: 'fas fa-bell', title: 'Recordatorios Automáticos', desc: 'Notificaciones por email, SMS y aplicación móvil' },
  { icon: 'fas fa-history', title: 'Historial Completo', desc: 'Registro detallado de todas las transacciones realizadas' },
]);

const adminBenefits = ref([
  'Reducción de trabajo manual en un 70%',
  'Seguimiento automatizado de morosidad',
  'Reportes financieros instantáneos',
  'Ahorro en costos operativos',
  'Gestión centralizada de información',
]);

const residentBenefits = ref([
  'Múltiples métodos de pago disponibles',
  'Recordatorios automáticos personalizados',
  'Acceso 24/7 a estados de cuenta',
  'Transparencia total en sus pagos',
  'Comunicación directa con administración',
]);

const securityItems = ref([
  { icon: 'fas fa-lock', title: 'Datos Encriptados', desc: 'Tecnología SSL/TLS para máxima seguridad' },
  { icon: 'fas fa-shield-alt', title: 'Cumplimiento Normativo', desc: 'Totalmente compatible con LFPDPPP' },
  { icon: 'fas fa-database', title: 'Respaldo Diario', desc: 'Backup automático de toda la información' },
  { icon: 'fas fa-user-shield', title: 'Autenticación de Dos Factores', desc: 'Protección adicional para accesos' },
]);
</script>

<style>
/* ✅ Fondo oscuro y texto blanco solo para la sección de solución */
.solution {
  background: #041b34; /* Fondo oscuro */
  padding: 60px 0;
  color: white; /* Texto blanco por defecto */
}

.solution h2,
.solution h3,
.solution p,
.solution li {
  color: white;
}

.presentacion-page {
  margin-top: 10px; /* ajusta según la altura del header */
}

.logo-text {
  display: block;
  margin-top: 10px;
  font-weight: bold;
  font-size: 1.2rem;
}
/* ✅ Forzar el color y eliminar opacidad del título "Nuestra Solución" */
.solution .section-title h2 {
  color: #ffffff !important;
  opacity: 1 !important;
  text-shadow: none !important;
}

</style>
