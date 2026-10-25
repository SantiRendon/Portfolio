# Tareas de Implementación — Spec 001: Portafolio Profesional y Landing Page de Conversión

- [x] **T1. Clonación del repositorio base, vinculación al repositorio personal e instalación de dependencias.** RF-1
  - Hecho cuando: El repositorio base `https://github.com/PrabhuKiran8790/prabhukirankonda-portfolio.git` está clonado en la raíz de trabajo, el control de versiones remoto `origin` está vinculado a `https://github.com/SantiRendon/Portfolio.git` con push inicial completado, y las dependencias están instaladas y verificadas con compilación exitosa.

- [x] **T2. Modelado de datos homogéneo en `profiles.json` y recursos estáticos de CVs.** RF-2, RF-4, RF-5
  - Hecho cuando: `src/lib/data/profiles.json` contiene la estructura completa para los 3 perfiles (*Analista de Datos*, *Soporte y Sistemas*, *Data Entry*) y los archivos PDF correspondientes están ubicados en `static/cv/`.

- [x] **T3. Módulo de lógica pura de validación de formulario y suite de pruebas.** RF-12, RF-14
  - Hecho cuando: La función `validateContactForm` en `src/lib/utils/validator.js` valida nombre, email, teléfono opcional y mensaje pasando satisfactoriamente todas las pruebas con `node --test tests/validator.test.js`.

- [ ] **T4. Módulo de generación de URLs de WhatsApp contextuales y suite de pruebas.** RF-7, RF-10, RF-11
  - Hecho cuando: La función `buildWhatsAppUrl` en `src/lib/utils/whatsapp.js` genera los enlaces correctos con los textos predeterminados por perfil/sección y aprueba todos los casos con `node --test tests/whatsapp.test.js`.

- [ ] **T5. Módulo de extracción de atribución y formateo de eventos Meta Pixel con pruebas.** RF-16, RF-17, RF-18, RF-19
  - Hecho cuando: Las funciones `extractAttribution` y `buildMetaEvent` en `src/lib/utils/analytics.js` formatean los eventos `PageView`, `Contact`, `Lead` y `DownloadCV` aprobando la suite con `node --test tests/analytics.test.js`.

- [ ] **T6. Componentes interactivos: Selector de Perfil, Botón Flotante y Formulario de Contacto.** RF-3, RF-10, RF-12, RF-13, RF-15
  - Hecho cuando: Los componentes `ProfileSelector.svelte`, `WhatsAppFloatingButton.svelte` y `ContactForm.svelte` se renderizan de forma accesible, validan datos en tiempo real y gestionan estados de carga.

- [ ] **T7. Componente BentoGrid multi-perfil con descarga de CVs y fallback.** RF-3, RF-4, RF-5, RF-6
  - Hecho cuando: `BentoGrid.svelte` actualiza dinámicamente las tarjetas de resumen, experiencia, habilidades y proyectos según el rol seleccionado, permitiendo la descarga directa de su PDF con fallback a WhatsApp en caso de error.

- [ ] **T8. Ensamblaje de la Ruta Principal (`/`) con portafolio Bento e integración Pixel.** RF-1, RF-2, RF-3, RF-4, RF-5, RF-16, RF-17, RF-19
  - Hecho cuando: La ruta `/` carga por defecto el perfil *Analista de Datos*, permite alternar entre roles, registra los eventos `PageView` y `DownloadCV`, y muestra el botón flotante de WhatsApp.

- [ ] **T9. Ensamblaje de la Landing Comercial (`/servicios`) para campañas de Meta Ads.** RF-1, RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13, RF-14, RF-15, RF-17, RF-18
  - Hecho cuando: La ruta `/servicios` presenta la propuesta de valor sin distracciones, el catálogo Bento de los 3 servicios con CTAs directos, formulario de contacto operativo y registro de eventos de conversión (`Contact` y `Lead`).
