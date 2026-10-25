# Memoria del Proyecto — Santiago Rendón Portfolio & Landing

## Estado General
- **Fase Actual**: Fase 4 (Implementación) 100% completada para Spec 001 (12/12 tareas). Listo para validación integral (Fase 5).
- **Control de Versiones**: Rama `main` sincronizada con repositorio remoto `https://github.com/SantiRendon/Portfolio.git`.
- **Suite de Pruebas**: 36/36 tests unitarios aprobados con ejecutor nativo `node --test` (0 frameworks externos, suites: `analytics`, `profiles`, `validator`, `whatsapp`, `servicios`).
- **Compilación de Producción**: Verificada y libre de errores (`npm run build` con código de salida 0).

---

## Especificaciones Implementadas

### Spec 001: Portafolio Profesional y Landing Page de Conversión
- **Estado**: 12/12 tareas completadas (100%).
- **Rutas Principales (RF-1)**:
  1. `/` (**Portafolio Profesional**): Hero con propuesta de valor integral, selector interactivo de 3 roles técnicos (`ProfileSelector`), cuadrícula Bento reactiva (`BentoGrid`) adaptada al esquema canónico `cv_template.json` con logros cuantificados, descarga directa de CVs en PDF con fallback a WhatsApp y botón flotante contextual.
  2. `/servicios` (**Landing Comercial para Meta Ads**): Diseño sin distracciones ni menús fugantes, hero comercial enfocado en optimización (+50% tiempo operativo), catálogo Bento de los 3 pilares técnicos (*Análisis de Datos*, *Business Intelligence*, *Ingeniería de IA*) con CTAs específicos a WhatsApp (`573023233342`), métricas de impacto y credibilidad, y formulario de contacto directo (`ContactForm`) con validación pura y persistencia de atribución.

---

## Arquitectura y Decisiones Técnicas Clave
1. **Separación de Lógica Pura e Interfaz**:
   - `src/lib/utils/validator.js`: Validación pura de formularios (RF-12, RF-14).
   - `src/lib/utils/whatsapp.js`: Generación pura y codificación de URLs de WhatsApp contextuales (`general`, `data`, `systems`, `ai`) con número por defecto `573023233342` (RF-11).
   - `src/lib/utils/analytics.js`: Parseo y formateo de eventos Meta Pixel y extracción de parámetros UTM/fbclid (RF-16 a RF-19).
2. **Esquema de Datos Canónico Homogéneo**:
   - `src/lib/data/profiles.json`: Centraliza los 3 perfiles técnicos reales (*Analista de Datos*, *Desarrollador BI y Sistemas*, *Ingeniero de IA*) conformes al esquema de `cv_template.json` (`personal`, `education`, `experience`, `skills`).
   - PDFs de CV ubicados en `static/cv/` (`cv-data.pdf`, `cv-systems.pdf`, `cv-ai.pdf`).
3. **Compatibilidad del Stack**:
   - Proyecto construido sobre Svelte 4 y SvelteKit fijado en `@sveltejs/kit: 2.5.5` para evitar conflictos con runas de Svelte 5.
4. **Respeto a la Privacidad y Atribución Publicitaria**:
   - Parámetros de campaña (`utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `fbclid`) almacenados de forma no invasiva en `sessionStorage` y adjuntados automáticamente al evento de conversión `'Lead'`.
