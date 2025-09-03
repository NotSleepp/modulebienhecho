import { createRouter, createWebHistory } from "vue-router";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import eventBus, { EventTypes } from "../utils/eventBus";
import { useAuthStore } from "../stores/authStore.js";
import MainLayout from "../layouts/MainLayout.vue";

// Configuración de NProgress
NProgress.configure({ 
  showSpinner: false,
  minimum: 0.3
});

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView.vue"),
    meta: {
      title: "Iniciar Sesión",
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "dashboard",
        component: () => import("../views/DashboardView.vue"),
        meta: {
          title: "Dashboard",
          requiresAuth: true
        }
      },
      {
        path: "home",
        name: "home",
        component: async () => {
          console.log('🏠 Intentando cargar el componente Home...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Home...');
            const module = await import("home/Home");
            console.log('✅ Módulo Home importado:', module);
            NProgress.done();
            console.log('🎯 Retornando componente Home...');
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando componente Home:', error);
            console.error('Stack trace:', error.stack);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar el componente Home",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Home",
          requiresAuth: true
        }
      },
      {
        path: "noticias",
        name: "noticias",
        component: () => {
          NProgress.start();
          return import("noticias/Noticias")
            .then(component => {
              NProgress.done();
              return component.default;
            })
            .catch(error => {
              NProgress.done();
              eventBus.emit(EventTypes.ERROR, {
                message: "Error al cargar el componente Noticias",
                error
              });
              throw error;
            });
        },
        meta: {
          title: "Noticias",
          requiresAuth: true
        }
      },
      {
        path: "perfil/datos-personales",
        name: "perfil",
        component: async () => {
          console.log('👤 Intentando cargar el componente Perfil...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Perfil...');
            const module = await import("perfil/Perfil");
            console.log('✅ Módulo Perfil importado:', module);
            NProgress.done();
            console.log('🎯 Retornando componente Perfil...');
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando componente Perfil:', error);
            console.error('Stack trace:', error.stack);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar el componente Perfil",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Mi Perfil",
          requiresAuth: true
        }
      },
      {
        path: "biblioteca/biblioteca-virtual",
        name: "biblioteca-virtual",
        component: async () => {
          console.log('📚 Intentando cargar Biblioteca Virtual...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Biblioteca...');
            const module = await import("biblioteca/BibliotecaView");
            console.log('✅ Módulo Biblioteca Virtual importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Biblioteca Virtual:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar la Biblioteca Virtual",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Biblioteca Virtual",
          requiresAuth: true
        }
      },
      {
        path: "biblioteca/catalogo",
        name: "catalogo-biblioteca",
        component: async () => {
          console.log('📚 Intentando cargar Catálogo Biblioteca...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Catálogo...');
            const module = await import("biblioteca/CatalogView");
            console.log('✅ Módulo Catálogo importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Catálogo Biblioteca:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar el Catálogo de Biblioteca",
              error
            });
            throw error;
          }
        },
        meta: {
          title: "Catálogo Biblioteca",
          requiresAuth: true
        }
      },
      {
        path: "cuenta-corriente/cuenta-corriente",
        name: "cuenta-corriente-view",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/CuentaCorrienteView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cuenta Corriente",
              error
            });
            throw error;
          }
        },
        meta: { title: "Mi Cuenta Corriente", requiresAuth: true }
      },
      {
        path: "cuenta-corriente/matriculacion",
        name: "cuenta-corriente-matriculacion",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/MatriculacionView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Matriculación",
              error
            });
            throw error;
          }
        },
        meta: { title: "Matriculación", requiresAuth: true }
      },
      {
        path: "cuenta-corriente/cupon-pago",
        name: "cuenta-corriente-cupon-pago",
        component: async () => {
          NProgress.start();
          try {
            const module = await import("cuenta_corriente/CuponPagoView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cupón de Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Cupón de Pago", requiresAuth: true }
      },
      {
        path: "gestiones/consultas",
        name: "gestiones-consultas",
        component: async () => {
          console.log('📝 Intentando cargar Gestión de Consultas...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Gestión de Consultas...');
            const module = await import("gestion_consultas/GestionConsultaView");
            console.log('✅ Módulo Gestión de Consultas importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Gestión de Consultas:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Gestión de Consultas",
              error
            });
            throw error;
          }
        },
        meta: { title: "Gestión de Consultas", requiresAuth: true }
      },
      {
        path: "gestiones/becas",
        name: "gestiones-becas",
        component: async () => {
          console.log('🎓 Intentando cargar Gestión de Becas...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Gestión de Becas...');
            const module = await import("gestion_consultas/GestionBecasView");
            console.log('✅ Módulo Gestión de Becas importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Gestión de Becas:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Gestión de Becas",
              error
            });
            throw error;
          }
        },
        meta: { title: "Gestión de Becas", requiresAuth: true }
      },
      {
        path: "certificados/solicitar-certificado",
        name: "certificados-solicitar",
        component: async () => {
          console.log('📄 Intentando cargar Solicitar Certificados...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Certificados (Solicitar)...');
            const module = await import("certificados/SolicitarCertificadosView");
            console.log('✅ Módulo Certificados (Solicitar) importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Solicitar Certificados:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Solicitar Certificados",
              error
            });
            throw error;
          }
        },
        meta: { title: "Solicitar Certificados", requiresAuth: true }
      },
      {
        path: "certificados/ver-certificado",
        name: "certificados-ver",
        component: async () => {
          console.log('📄 Intentando cargar Ver Certificados...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Certificados (Ver)...');
            const module = await import("certificados/VerCertificadosView");
            console.log('✅ Módulo Certificados (Ver) importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Ver Certificados:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Ver Certificados",
              error
            });
            throw error;
          }
        },
        meta: { title: "Ver Certificados", requiresAuth: true }
      },
      {
        path: "empleos/oportunidades",
        name: "oportunidades-view",
        component: async () => {
          console.log('💼 Intentando cargar Oportunidades Laborales...');
          NProgress.start();
          try {
            const module = await import("oportunidades_laborales/JobOpportunitiesView");
            NProgress.done();
            return module.default;
          } catch (error) {
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Oportunidades Laborales",
              error
            });
            throw error;
          }
        },
        meta: { title: "Oportunidades Laborales", requiresAuth: true }
      },
      {
        path: "trayectoria/donde-curso",
        name: "trayectoria-donde-curso",
        component: async () => import("trayectoria_academica/CursadasView").then(m=>m.default),
        meta: { title: "Dónde curso", requiresAuth: true }
      },
      {
        path: "trayectoria/inscripcion-cursadas",
        name: "trayectoria-inscripcion-cursadas",
        component: async () => import("trayectoria_academica/InscripcionCursadasView").then(m=>m.default),
        meta: { title: "Inscripción a Cursadas", requiresAuth: true }
      },
      {
        path: "trayectoria/fecha-finales",
        name: "trayectoria-fecha-finales",
        component: async () => import("trayectoria_academica/FechasFinalesView").then(m=>m.default),
        meta: { title: "Fechas de Finales", requiresAuth: true }
      },
      {
        path: "trayectoria/inscripcion-finales",
        name: "trayectoria-inscripcion-finales",
        component: async () => import("trayectoria_academica/InscripcionFinalesView").then(m=>m.default),
        meta: { title: "Inscripción a Finales", requiresAuth: true }
      },
      {
        path: "trayectoria/plan-estudio",
        name: "trayectoria-plan-estudio",
        component: async () => import("trayectoria_academica/PlanEstudioView").then(m=>m.default),
        meta: { title: "Plan de Estudio", requiresAuth: true }
      },
      {
        path: "trayectoria/trayecto-academico",
        name: "trayectoria-trayecto-academico",
        component: async () => import("trayectoria_academica/TrayectoAcademicoView").then(m=>m.default),
        meta: { title: "Mi Trayecto Académico", requiresAuth: true }
      },
      {
        path: "trayectoria/curriculum",
        name: "trayectoria-curriculum",
        component: async () => import("trayectoria_academica/CurriculumVitaeView").then(m=>m.default),
        meta: { title: "Curriculum Vitae", requiresAuth: true }
      },
      {
        path: "tutoriales/instructivo-cupon-pago",
        name: "tutoriales-instructivo-cupon-pago",
        component: async () => {
          console.log('📄 Intentando cargar Instructivo Cupón de Pago...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Instructivo Cupón de Pago...');
            const module = await import("tutoriales_ayuda/InstructivoCuponPagoView");
            console.log('✅ Módulo Instructivo Cupón de Pago importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Instructivo Cupón de Pago:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Instructivo Cupón de Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Instructivo Cupón de Pago", requiresAuth: true }
      },
      {
        path: "tutoriales/instructivo-mercado-pago",
        name: "tutoriales-instructivo-mercado-pago",
        component: async () => {
          console.log('💳 Intentando cargar Instructivo Mercado Pago...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Instructivo Mercado Pago...');
            const module = await import("tutoriales_ayuda/InstructivoMercadoPagoView");
            console.log('✅ Módulo Instructivo Mercado Pago importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Instructivo Mercado Pago:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Instructivo Mercado Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Instructivo Mercado Pago", requiresAuth: true }
      },
      {
        path: "ayuda/instructivo-cupon",
        name: "ayuda-instructivo-cupon",
        component: async () => {
          console.log('📄 Intentando cargar Instructivo Cupón de Pago (Ayuda)...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Instructivo Cupón de Pago...');
            const module = await import("tutoriales_ayuda/InstructivoCuponPagoView");
            console.log('✅ Módulo Instructivo Cupón de Pago importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Instructivo Cupón de Pago:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Instructivo Cupón de Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Instructivo Cupón de Pago", requiresAuth: true }
      },
      {
        path: "ayuda/instructivo-mercadopago",
        name: "ayuda-instructivo-mercadopago",
        component: async () => {
          console.log('💳 Intentando cargar Instructivo Mercado Pago (Ayuda)...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Instructivo Mercado Pago...');
            const module = await import("tutoriales_ayuda/InstructivoMercadoPagoView");
            console.log('✅ Módulo Instructivo Mercado Pago importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Instructivo Mercado Pago:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Instructivo Mercado Pago",
              error
            });
            throw error;
          }
        },
        meta: { title: "Instructivo Mercado Pago", requiresAuth: true }
      },
      {
        path: "normativas/calendario",
        name: "normativas-calendario",
        component: async () => {
          console.log('📅 Intentando cargar Calendario Académico...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Calendario Académico...');
            const module = await import("normativas_universitarias/CalendarioView");
            console.log('✅ Módulo Calendario Académico importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Calendario Académico:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Calendario Académico",
              error
            });
            throw error;
          }
        },
        meta: { title: "Calendario Académico", requiresAuth: true }
      },
      {
        path: "normativas/normativa-estudiantes",
        name: "normativas-estudiantes",
        component: async () => {
          console.log('📚 Intentando cargar Normativa para Estudiantes...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Normativa para Estudiantes...');
            const module = await import("normativas_universitarias/NormativaEstudiantesView");
            console.log('✅ Módulo Normativa para Estudiantes importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Normativa para Estudiantes:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Normativa para Estudiantes",
              error
            });
            throw error;
          }
        },
        meta: { title: "Normativa para Estudiantes", requiresAuth: true }
      },
      {
        path: "docente/finales-docente",
        name: "docente-finales",
        component: async () => {
          console.log('📝 Intentando cargar Finales Docente...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Finales Docente...');
            const module = await import("actividad_docente/FinalesDocenteView");
            console.log('✅ Módulo Finales Docente importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Finales Docente:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Finales Docente",
              error
            });
            throw error;
          }
        },
        meta: { title: "Finales Docente", requiresAuth: true }
      },
      {
        path: "docente/liquidacion",
        name: "docente-liquidacion",
        component: async () => {
          console.log('💰 Intentando cargar Liquidación Docente...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Liquidación Docente...');
            const module = await import("actividad_docente/LiquidacionView");
            console.log('✅ Módulo Liquidación Docente importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Liquidación Docente:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Liquidación Docente",
              error
            });
            throw error;
          }
        },
        meta: { title: "Liquidación Docente", requiresAuth: true }
      },
      {
        path: "docente/nombramientos",
        name: "docente-nombramientos",
        component: async () => {
          console.log('👨‍🏫 Intentando cargar Nombramientos Docente...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Nombramientos Docente...');
            const module = await import("actividad_docente/NombramientosView");
            console.log('✅ Módulo Nombramientos Docente importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Nombramientos Docente:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Nombramientos Docente",
              error
            });
            throw error;
          }
        },
        meta: { title: "Nombramientos Docente", requiresAuth: true }
      },
      {
        path: "investigacion/documentos-scdi",
        name: "investigacion-documentos-scdi",
        component: async () => {
          console.log('🔬 Intentando cargar Documentos SCDI...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Documentos SCDI...');
            const module = await import("investigacion/DocumentosSCDIView");
            console.log('✅ Módulo Documentos SCDI importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Documentos SCDI:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Documentos SCDI",
              error
            });
            throw error;
          }
        },
        meta: { title: "Documentos SCDI", requiresAuth: true }
      },
      {
        path: "investigacion/solicitudes-scdi",
        name: "investigacion-solicitudes-scdi",
        component: async () => {
          console.log('🔬 Intentando cargar Solicitudes SCDI...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Solicitudes SCDI...');
            const module = await import("investigacion/SolicitudesSCDIView");
            console.log('✅ Módulo Solicitudes SCDI importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Solicitudes SCDI:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Solicitudes SCDI",
              error
            });
            throw error;
          }
        },
        meta: { title: "Solicitudes SCDI", requiresAuth: true }
      },
      {
        path: "trayectoria/correlativas",
        name: "trayectoria-correlativas",
        component: async () => import("trayectoria_academica/CorrelativasView").then(m=>m.default),
        meta: { title: "Correlativas", requiresAuth: true }
      },
      {
        path: "trayectoria/programas",
        name: "trayectoria-programas",
        component: async () => import("trayectoria_academica/ProgramasView").then(m=>m.default),
        meta: { title: "Programas", requiresAuth: true }
      },
      {
        path: "docente/historico-cursadas",
        name: "docente-historico-cursadas",
        component: async () => import("actividad_docente/HistoricoCursadasView").then(m=>m.default),
        meta: { title: "Histórico de Cursadas", requiresAuth: true }
      },
      {
        path: "normativa-docente/normativa-docente",
        name: "normativa-docente",
        component: async () => import("normativas_universitarias/NormativaDocenteView").then(m=>m.default),
        meta: { title: "Normativa Docente", requiresAuth: true }
      },
      {
        path: "normativas/reglamento-arancelario",
        name: "normativas-reglamento-arancelario",
        component: async () => {
          console.log('💰 Intentando cargar Reglamento Arancelario...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Reglamento Arancelario...');
            const module = await import("normativas_universitarias/ReglamentoArancelarioView");
            console.log('✅ Módulo Reglamento Arancelario importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Reglamento Arancelario:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Reglamento Arancelario",
              error
            });
            throw error;
          }
        },
        meta: { title: "Reglamento Arancelario", requiresAuth: true }
      },
      {
        path: "docente/catedras",
        name: "docente-catedras",
        component: async () => {
          console.log('🏫 Intentando cargar Cátedras Actuales...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Cátedras Actuales...');
            const module = await import("actividad_docente/CatedrasView");
            console.log('✅ Módulo Cátedras Actuales importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Cátedras Actuales:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cátedras Actuales",
              error
            });
            throw error;
          }
        },
        meta: { title: "Cátedras Actuales", requiresAuth: true }
      },
      {
        path: "docente/cargar-programas",
        name: "docente-cargar-programas",
        component: async () => {
          console.log('📚 Intentando cargar Cargar Programas...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Cargar Programas...');
            const module = await import("actividad_docente/CargarProgramasView");
            console.log('✅ Módulo Cargar Programas importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Cargar Programas:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Cargar Programas",
              error
            });
            throw error;
          }
        },
        meta: { title: "Cargar Programas", requiresAuth: true }
      },
      {
        path: "normativas/reglamento-alumnos",
        name: "normativas-reglamento-alumnos",
        component: async () => {
          console.log('👨‍🎓 Intentando cargar Reglamento de Alumnos...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Reglamento de Alumnos...');
            const module = await import("normativas_universitarias/ReglamentoAlumnosView");
            console.log('✅ Módulo Reglamento de Alumnos importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Reglamento de Alumnos:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Reglamento de Alumnos",
              error
            });
            throw error;
          }
        },
        meta: { title: "Reglamento de Alumnos", requiresAuth: true }
      },
      {
        path: "normativas/normativa-univ",
        name: "normativas-normativa-univ",
        component: async () => {
          console.log('🏛️ Intentando cargar Normativa Universitaria...');
          NProgress.start();
          try {
            console.log('📦 Importando módulo Normativa Universitaria...');
            const module = await import("normativas_universitarias/NormativaUnivView");
            console.log('✅ Módulo Normativa Universitaria importado:', module);
            NProgress.done();
            return module.default;
          } catch (error) {
            console.error('❌ Error cargando Normativa Universitaria:', error);
            NProgress.done();
            eventBus.emit(EventTypes.ERROR, {
              message: "Error al cargar Normativa Universitaria",
              error
            });
            throw error;
          }
        },
        meta: { title: "Normativa Universitaria", requiresAuth: true }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log('🚦 Navegando de:', from.path, 'a:', to.path);
  const authStore = useAuthStore();
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(record => record.meta.onlyWhenLoggedOut);
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  console.log('🔐 Estado de autenticación:', {
    isPublic,
    onlyWhenLoggedOut,
    requiresAuth,
    isAuthenticated: authStore.isAuthenticated
  });

  NProgress.start();

  // Si la ruta requiere autenticación y el usuario no está autenticado
  if (requiresAuth && !authStore.isAuthenticated) {
    console.log('⚠️ Ruta protegida y usuario no autenticado, redirigiendo a login');
    return next({
      path: '/login',
      query: { redirect: to.fullPath }
    });
  }

  // Si la ruta es solo para usuarios no autenticados y el usuario está autenticado
  if (authStore.isAuthenticated && onlyWhenLoggedOut) {
    console.log('⚠️ Usuario autenticado intentando acceder a ruta de no autenticados, redirigiendo a home');
    return next('/');
  }

  // Si la ruta no es pública y el usuario no está autenticado
  if (!isPublic && !authStore.isAuthenticated) {
    console.log('⚠️ Ruta no pública y usuario no autenticado, redirigiendo a login');
    return next('/login');
  }

  console.log('✅ Navegación permitida');
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router;
