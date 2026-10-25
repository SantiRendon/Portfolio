# Plan Técnico — Spec 001: Portafolio Profesional y Landing Page de Conversión

## 1. Arquitectura y Stack Tecnológico
- **Base Técnica y Repositorio**: SvelteKit con Tailwind CSS y estructura Bento Grid basada en `https://github.com/PrabhuKiran8790/prabhukirankonda-portfolio.git`. El proyecto se inicializa clonando dicha base en el directorio de trabajo, reasignando el control de versiones remoto (`origin`) al repositorio personal `https://github.com/SantiRendon/Portfolio.git`, realizando el respaldo inicial (push) e instalando y verificando dependencias.
- **Estrategia de Código**: Componentes visuales desacoplados en Svelte y módulos de lógica pura en JavaScript estándar para validación, URLs de WhatsApp y analítica publicitaria.
- **Pruebas Unitarias**: Suite automatizada con `node --test` y `node:assert/strict` sin librerías de testing externas.

---

## 2. Archivos y Responsabilidades

| Archivo | Responsabilidad | RF Cubiertos |
| :--- | :--- | :--- |
| `src/lib/data/profiles.json` | Esquema homogéneo con la información estructurada de los 3 perfiles técnicos (*Analista de Datos*, *Soporte y Sistemas*, *Data Entry y Operaciones*) y rutas a sus PDFs. | RF-2, RF-4, RF-5 |
| `src/lib/utils/validator.js` | Funciones puras para validación de datos del formulario (longitud de nombre, formato de email, teléfono numérico opcional y longitud de mensaje). | RF-12, RF-14 |
| `src/lib/utils/whatsapp.js` | Generación pura de URLs de WhatsApp contextualizadas (`wa.me`) según la sección o perfil activo, con codificación segura de caracteres. | RF-7, RF-10, RF-11 |
| `src/lib/utils/analytics.js` | Funciones puras para captura y parseo de parámetros UTM / fbclid y construcción de payloads de eventos Meta Pixel (`PageView`, `Contact`, `Lead`, `DownloadCV`). | RF-16, RF-17, RF-18, RF-19 |
| `src/lib/components/ProfileSelector.svelte` | Selector interactivo de pestañas (Tabs) para alternar entre los roles técnicos con estado por defecto en *Analista de Datos*. | RF-2, RF-3, RF-4 |
| `src/lib/components/BentoGrid.svelte` | Cuadrícula responsiva Bento que renderiza las tarjetas de perfil (resumen, experiencia, competencias, proyectos y botón de descarga directa de PDF con manejo de fallback). | RF-4, RF-5, RF-6 |
| `src/lib/components/WhatsAppFloatingButton.svelte` | Botón flotante accesible fijado en pantalla con acceso rápido a WhatsApp y mensaje contextual predeterminado. | RF-10, RF-11 |
| `src/lib/components/ContactForm.svelte` | Formulario de 4 campos independientes con validación reactiva en cliente, estado de envío (carga/deshabilitado) y confirmación en pantalla. | RF-12, RF-13, RF-14, RF-15 |
| `src/lib/components/MetaPixel.svelte` | Componente de integración del script de Meta Pixel y despachador de eventos a `window.fbq`. | RF-16, RF-17, RF-18, RF-19 |
| `src/routes/+page.svelte` | Página principal de Portafolio: Hero con propuesta de valor, ProfileSelector, BentoGrid multi-perfil, botón flotante de WhatsApp y pie de página. | RF-1, RF-2, RF-3, RF-4, RF-5, RF-6, RF-10 |
| `src/routes/servicios/+page.svelte` | Landing comercial dedicada para Meta Ads: Titular y subtítulo cuantificable, catálogo de 3 servicios Bento, casos de uso, CTAs a WhatsApp, formulario de contacto y botón flotante. | RF-1, RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13 |
| `tests/validator.test.js` | Pruebas unitarias automatizadas para la validación de formularios con `node --test`. | RF-12, RF-14 |
| `tests/whatsapp.test.js` | Pruebas unitarias para la generación de URLs de WhatsApp con `node --test`. | RF-7, RF-11 |
| `tests/analytics.test.js` | Pruebas unitarias para extracción de UTMs y construcción de eventos Pixel con `node --test`. | RF-16, RF-17, RF-18, RF-19 |

---

## 3. Esquema de Datos Homogéneo (`src/lib/data/profiles.json`)
Estructura uniforme que alimenta a los 3 perfiles:
```json
{
  "profiles": [
    {
      "id": "data",
      "roleName": "Analista de Datos",
      "title": "Data Analyst & Business Intelligence Specialist",
      "summary": "Especialista en extracción, modelado y visualización de datos...",
      "skills": ["SQL", "Power BI", "Python", "ETL", "Excel Avanzado"],
      "experience": [
        {
          "company": "Empresa / Proyecto",
          "role": "Analista de Datos Senior",
          "period": "2022 - Presente",
          "achievements": ["Implementación de dashboards en Power BI...", "Automatización de reportes..."]
        }
      ],
      "projects": [
        {
          "name": "Dashboard Ejecutivo de Ventas",
          "description": "Visualización de KPIs comerciales y forecasting.",
          "technologies": ["Power BI", "SQL Server"]
        }
      ],
      "pdfUrl": "/cv/cv-analista-datos.pdf",
      "whatsappContext": "data"
    },
    {
      "id": "systems",
      "roleName": "Soporte y Sistemas",
      "title": "Especialista en Soporte TI e Infraestructura",
      "summary": "Gestión, diagnóstico y resolución de incidencias en redes...",
      "skills": ["Linux / Windows Server", "Redes TCP/IP", "Active Directory", "Mantenimiento Preventivo"],
      "experience": [...],
      "projects": [...],
      "pdfUrl": "/cv/cv-soporte-sistemas.pdf",
      "whatsappContext": "systems"
    },
    {
      "id": "data-entry",
      "roleName": "Data Entry y Operaciones",
      "title": "Especialista en Carga Masiva y Automatización de Datos",
      "summary": "Procesamiento, limpieza y validación exhaustiva de datos...",
      "skills": ["Excel Macros / VBA", "Google Sheets", "Validación de Datos", "OCR y OCR Scripts"],
      "experience": [...],
      "projects": [...],
      "pdfUrl": "/cv/cv-data-entry.pdf",
      "whatsappContext": "data-entry"
    }
  ]
}
```

---

## 4. Funciones Puras y Algoritmos

### 4.1. Validación de Formulario (`src/lib/utils/validator.js`)
**Firma:** `validateContactForm(data)`
- **Entrada:** `data = { name, email, phone, message }`
- **Pseudocódigo:**
  ```text
  FUNCTION validateContactForm(data):
    errors = {}
    
    // Validación Nombre: obligatorio, min 2 caracteres sin contar espacios extremos
    nameTrimmed = (data.name || "").trim()
    IF length(nameTrimmed) < 2:
      errors.name = "El nombre debe tener al menos 2 caracteres."
      
    // Validación Email: obligatorio, formato estándar usuario@dominio
    emailTrimmed = (data.email || "").trim()
    emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    IF NOT emailPattern.test(emailTrimmed):
      errors.email = "El formato del correo electrónico no es válido."
      
    // Validación Teléfono: opcional, si existe debe ser numérico/telefónico
    phoneTrimmed = (data.phone || "").trim()
    IF length(phoneTrimmed) > 0:
      phonePattern = /^[0-9+\s()-]{7,15}$/
      IF NOT phonePattern.test(phoneTrimmed):
        errors.phone = "El teléfono solo debe contener números y signos válidos (+)."
        
    // Validación Mensaje: obligatorio, min 10 caracteres
    messageTrimmed = (data.message || "").trim()
    IF length(messageTrimmed) < 10:
      errors.message = "El mensaje debe tener al menos 10 caracteres."
      
    isValid = (keys(errors).length == 0)
    RETURN { isValid, errors }
  ```

### 4.2. Generación de Enlaces de WhatsApp (`src/lib/utils/whatsapp.js`)
**Firma:** `buildWhatsAppUrl(phone, contextType)`
- **Entrada:** `phone` (string), `contextType` (string: `'general' | 'data' | 'systems' | 'data-entry'`)
- **Pseudocódigo:**
  ```text
  CONSTANT MESSAGES = {
    "general": "Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.",
    "data": "Hola, me interesa una cotización para análisis de datos y dashboards.",
    "systems": "Hola, necesito soporte y asesoría en sistemas e infraestructura.",
    "data-entry": "Hola, requiero apoyo en digitación y automatización de datos."
  }

  FUNCTION buildWhatsAppUrl(phone, contextType):
    cleanPhone = phone.replace(/[^0-9]/g, "")
    messageText = MESSAGES[contextType] OR MESSAGES["general"]
    encodedMessage = encodeURIComponent(messageText)
    RETURN "https://wa.me/" + cleanPhone + "?text=" + encodedMessage
  ```

### 4.3. Analítica y Atribución (`src/lib/utils/analytics.js`)
**Firma:** `extractAttribution(queryString)`
- **Entrada:** `queryString` (ej. `?utm_source=fb&utm_medium=cpc&fbclid=xyz123`)
- **Pseudocódigo:**
  ```text
  FUNCTION extractAttribution(queryString):
    params = new URLSearchParams(queryString)
    keys = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid"]
    attribution = {}
    FOR EACH key IN keys:
      val = params.get(key)
      IF val AND val.trim() != "":
        attribution[key] = val.trim()
    RETURN attribution
  ```

**Firma:** `buildMetaEvent(eventType, payload, attribution)`
- **Entrada:** `eventType` (`'PageView' | 'Contact' | 'Lead' | 'DownloadCV'`), `payload` (objeto), `attribution` (objeto)
- **Pseudocódigo:**
  ```text
  FUNCTION buildMetaEvent(eventType, payload, attribution = {}):
    SWITCH eventType:
      CASE 'PageView':
        RETURN { name: 'PageView', isCustom: false, data: {} }
      CASE 'Contact':
        RETURN { name: 'Contact', isCustom: false, data: { channel: 'whatsapp', ...payload } }
      CASE 'Lead':
        RETURN { name: 'Lead', isCustom: false, data: { ...payload, ...attribution } }
      CASE 'DownloadCV':
        RETURN { name: 'DownloadCV', isCustom: true, data: { role: payload.role } }
      DEFAULT:
        RETURN { name: eventType, isCustom: true, data: payload }
  ```

---

## 5. Diseño de Interfaz y Navegación

### 5.1. Ruta Principal (`/`) — Portafolio Profesional
- **Hero Section**: Introducción profesional, foto/avatar, propuesta de valor general y enlaces de salto a perfiles y contacto.
- **Selector de Perfiles (`ProfileSelector`)**: Tabs estilizados con estado activo en *Analista de Datos* al cargar.
- **Cuadrícula Bento (`BentoGrid`)**:
  - Tarjeta 1: Perfil y resumen profesional dinámico.
  - Tarjeta 2: Competencias y herramientas técnicas dominadas.
  - Tarjeta 3: Trayectoria laboral y logros cuantificados.
  - Tarjeta 4: Proyectos demostrativos con enlaces.
  - Tarjeta 5: Botón de descarga directa de PDF (`download`) con comprobación de error (`onerror`) para disparar alerta de fallback con enlace a WhatsApp (CL-5).
- **Botón Flotante (`WhatsAppFloatingButton`)**: Posición `fixed bottom-6 right-6 z-50` con icono accesible y tooltip.

### 5.2. Ruta de Servicios (`/servicios`) — Landing Comercial Meta Ads
- **Diseño sin Fugas**: Sin barra de navegación con enlaces a páginas externas o redes que desvíen la atención.
- **Hero Comercial**:
  - *Titular*: "Soluciones en Datos, Infraestructura TI y Automatización Operativa para tu Negocio".
  - *Subtítulo*: "Optimiza hasta un 70% del tiempo operativo con reportes automatizados, soporte continuo y digitalización sin errores."
  - *Llamada a la Acción (CTA)*: Botón destacado de WhatsApp "Cotizar Solución por WhatsApp".
- **Catálogo Bento de Servicios**:
  1. *Análisis de Datos y Dashboards*: Indicadores clave, visualizaciones interactivas y modelos en Power BI / SQL. CTA contextual WhatsApp.
  2. *Soporte y Sistemas TI*: Mantenimiento preventivo, soporte a usuarios y configuración de redes seguras. CTA contextual WhatsApp.
  3. *Automatización y Data Entry*: Migración, limpieza masiva de datos y automatización de planillas. CTA contextual WhatsApp.
- **Prueba Social y Credibilidad**: Tarjetas de casos de uso reales con métricas de impacto.
- **Formulario de Contacto (`ContactForm`)**: 4 campos independientes, validaciones en línea, botón de envío con animación de carga (`disabled` mientras envía) y notificación visual de éxito.

---

## 6. Decisiones Justificadas

1. **Diseño Bento Grid modular**:
   - *Decisión*: Reutilizar el patrón Bento de `prabhukirankonda-portfolio` adaptándolo con Tailwind CSS.
   - *Alternativa descartada*: Maquetación tradicional lineal o listas genéricas.
   - *Motivo*: Mayor densidad de información visual, estética moderna de alto impacto para reclutadores y clientes, y adaptabilidad fluida a resoluciones móviles.
2. **Estructura homogénea en `profiles.json`**:
   - *Decisión*: Alimentar los 3 roles desde un único archivo estructurado estándar.
   - *Alternativa descartada*: Crear componentes o plantillas separadas para cada rol.
   - *Motivo*: Mantenimiento centralizado, facilidad para incorporar nuevos roles futuros y garantía de consistencia visual.
3. **Tests unitarios con `node --test` nativo**:
   - *Decisión*: Usar el ejecutor de pruebas de Node.js (`node --test`) y aserciones estrictas (`node:assert/strict`).
   - *Alternativa descartada*: Instalar Jest, Mocha o Vitest.
   - *Motivo*: Cumplimiento estricto de la Constitución (cero dependencias de testing), ejecución ultra rápida y portabilidad total.
4. **Almacenamiento de atribución en `sessionStorage`**:
   - *Decisión*: Capturar UTMs en la primera carga y persistirlas en la sesión del navegador para vincularlas a conversiones posteriores.
   - *Alternativa descartada*: Enviar UTMs solo en la página inicial o usar cookies invasivas.
   - *Motivo*: Respeto a la privacidad del usuario, funcionamiento sin fricción en Single Page Applications y trazabilidad íntegra del lead publicitario.

---

## 7. Estrategia de Pruebas Unitarias (`node --test`)

La suite de pruebas automatizadas no requiere dependencias externas y se ejecuta con `node --test tests/*.test.js`:

1. **`tests/validator.test.js`**:
   - Validación exitosa con todos los campos válidos (nombre >= 2, email válido, teléfono válido, mensaje >= 10).
   - Rechazo de nombre vacío o menor a 2 caracteres.
   - Rechazo de formato de correo inválido (sin @ o sin dominio).
   - Aceptación de teléfono omitido (campo opcional).
   - Rechazo de teléfono con caracteres alfabéticos no permitidos.
   - Rechazo de mensaje menor a 10 caracteres.
2. **`tests/whatsapp.test.js`**:
   - Construcción de URL con prefijo `https://wa.me/` y número limpio sin guiones ni espacios.
   - Verificación del mensaje predeterminado para rol `'data'`.
   - Verificación del mensaje predeterminado para rol `'systems'`.
   - Verificación del mensaje predeterminado para rol `'data-entry'`.
   - Verificación del mensaje general de fallback ante contexto desconocido.
   - Codificación correcta de espacios, acentos y signos de puntuación con `encodeURIComponent`.
3. **`tests/analytics.test.js`**:
   - Extracción correcta de parámetros `utm_source`, `utm_medium`, `utm_campaign` y `fbclid`.
   - Descarte de parámetros vacíos o no relacionados.
   - Generación del evento estándar `'PageView'`.
   - Generación del evento estándar `'Contact'` con canal y contexto.
   - Generación del evento estándar `'Lead'` adjuntando los parámetros de atribución.
   - Generación del evento personalizado `'DownloadCV'` con el objeto `{ role: 'data' }`.
