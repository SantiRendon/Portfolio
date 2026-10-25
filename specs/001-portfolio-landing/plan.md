# Plan Técnico — Spec 001: Portafolio Profesional y Landing Page de Conversión

## 1. Arquitectura y Stack Tecnológico
- **Base Técnica y Repositorio**: SvelteKit con Tailwind CSS y estructura Bento Grid basada en `https://github.com/PrabhuKiran8790/prabhukirankonda-portfolio.git`. El proyecto se inicializa clonando dicha base en el directorio de trabajo, reasignando el control de versiones remoto (`origin`) al repositorio personal `https://github.com/SantiRendon/Portfolio.git`, realizando el respaldo inicial (push) e instalando y verificando dependencias.
- **Estrategia de Código**: Componentes visuales desacoplados en Svelte y módulos de lógica pura en JavaScript estándar para validación, URLs de WhatsApp y analítica publicitaria.
- **Datos Estructurados**: Adopción estricta del esquema `cv_template.json` para modelar de forma homogénea los 3 perfiles profesionales reales (*Analista de Datos*, *Desarrollador BI y Sistemas*, e *Ingeniero de IA*).
- **Pruebas Unitarias**: Suite automatizada con `node --test` y `node:assert/strict` sin librerías de testing externas.

---

## 2. Archivos y Responsabilidades

| Archivo | Responsabilidad | RF Cubiertos |
| :--- | :--- | :--- |
| `src/lib/data/profiles.json` | Esquema homogéneo basado en `cv_template.json` con la información de los 3 perfiles técnicos reales (*Analista de Datos*, *Desarrollador BI y Sistemas*, *Ingeniero de IA*), sus secciones (`personal`, `education`, `experience`, `skills`) y enlaces a sus PDFs. | RF-2, RF-4, RF-5 |
| `src/lib/utils/validator.js` | Funciones puras para validación de datos del formulario (longitud de nombre, formato de email, teléfono numérico opcional y longitud de mensaje). | RF-12, RF-14 |
| `src/lib/utils/whatsapp.js` | Generación pura de URLs de WhatsApp contextualizadas (`wa.me`) con el número `573023233342` y mensajes para roles (`data`, `systems`, `ai`, `general`). | RF-7, RF-10, RF-11 |
| `src/lib/utils/analytics.js` | Funciones puras para captura y parseo de parámetros UTM / fbclid y construcción de payloads de eventos Meta Pixel (`PageView`, `Contact`, `Lead`, `DownloadCV`). | RF-16, RF-17, RF-18, RF-19 |
| `src/lib/components/ProfileSelector.svelte` | Selector interactivo de pestañas (Tabs) para alternar entre los roles técnicos (*Analista de Datos*, *Desarrollador BI y Sistemas*, *Ingeniero de IA*) con estado por defecto en *Analista de Datos*. | RF-2, RF-3, RF-4 |
| `src/lib/components/BentoGrid.svelte` | Cuadrícula responsiva Bento adaptada para renderizar las secciones de `cv_template.json` (`personal.summary`, `experience` con viñetas, `education`, `skills.technical`, certificaciones, idiomas y descarga de PDF con fallback). | RF-4, RF-5, RF-6 |
| `src/lib/components/WhatsAppFloatingButton.svelte` | Botón flotante accesible fijado en pantalla con acceso rápido a WhatsApp (`573023233342`) y mensaje contextual predeterminado. | RF-10, RF-11 |
| `src/lib/components/ContactForm.svelte` | Formulario de 4 campos independientes con validación reactiva en cliente, estado de envío (carga/deshabilitado) y confirmación en pantalla. | RF-12, RF-13, RF-14, RF-15 |
| `src/lib/components/MetaPixel.svelte` | Componente de integración del script de Meta Pixel y despachador de eventos a `window.fbq`. | RF-16, RF-17, RF-18, RF-19 |
| `src/routes/+page.svelte` | Página principal de Portafolio: Hero profesional, ProfileSelector, BentoGrid multi-perfil, botón flotante de WhatsApp y pie de página. | RF-1, RF-2, RF-3, RF-4, RF-5, RF-6, RF-10 |
| `src/routes/servicios/+page.svelte` | Landing comercial dedicada para Meta Ads: Titular y subtítulo cuantificable, catálogo de 3 servicios Bento (Datos & BI, Sistemas/Infraestructura, Soluciones con IA), CTAs a WhatsApp, formulario de contacto y botón flotante. | RF-1, RF-7, RF-8, RF-9, RF-10, RF-11, RF-12, RF-13 |
| `tests/profiles.test.js` | Pruebas unitarias de conformidad de `profiles.json` contra el esquema estándar de `cv_template.json` con `node --test`. | RF-2 |
| `tests/validator.test.js` | Pruebas unitarias automatizadas para la validación de formularios con `node --test`. | RF-12, RF-14 |
| `tests/whatsapp.test.js` | Pruebas unitarias para la generación de URLs de WhatsApp con el número real y contextos `data`, `systems`, `ai` y `general`. | RF-7, RF-11 |
| `tests/analytics.test.js` | Pruebas unitarias para extracción de UTMs y construcción de eventos Pixel con `node --test`. | RF-16, RF-17, RF-18, RF-19 |

---

## 3. Esquema de Datos Homogéneo (`src/lib/data/profiles.json`)
La estructura de cada perfil se alinea estrictamente al esquema de `cv_template.json`:
```json
{
  "profiles": [
    {
      "id": "data",
      "roleName": "Analista de Datos",
      "pdfUrl": "/cv/cv-analista-datos.pdf",
      "whatsappContext": "data",
      "personal": {
        "name": "Santiago Rendón",
        "title": "Analista de Datos y Automatización (Power BI, SQL & IA)",
        "email": "santirendon32@gmail.com",
        "phone": "+57 302 323 334 2",
        "location": "Armenia, Quindío, Colombia",
        "website": "https://santirendon.github.io/Portfolio",
        "github": "https://github.com/SantiRendon",
        "gitlab": "https://gitlab.com/SantiRendon",
        "summary": "Analista de datos enfocado en transformar requerimientos de negocio en soluciones analíticas..."
      },
      "education": [
        {
          "institution": "Universidad / Instituto",
          "degree": "Ingeniería / Especialización",
          "location": "Colombia",
          "startDate": "2018",
          "endDate": "2023",
          "description": "Formación integral en ciencias de la computación..."
        }
      ],
      "experience": [
        {
          "company": "Empresa / Cliente",
          "position": "Analista de Datos & BI",
          "location": "Remoto",
          "startDate": "2022",
          "endDate": "Presente",
          "description": "Diseño y despliegue de modelos de datos y dashboards ejecutivos en Power BI..."
        }
      ],
      "skills": {
        "technical": ["Power BI", "SQL (PostgreSQL, SQL Server)", "Python", "DAX", "ETL", "Excel Avanzado"],
        "languages": ["Español (Nativo)", "Inglés (Técnico / B2)"],
        "certifications": ["Certificaciones Microsoft / BI"],
        "additional": ["Automatización de procesos", "Metodologías Ágiles"]
      }
    },
    {
      "id": "systems",
      "roleName": "Desarrollador BI y Sistemas",
      "pdfUrl": "/cv/cv-sistemas.pdf",
      "whatsappContext": "systems",
      "personal": {
        "name": "Santiago Rendón",
        "title": "Business Intelligence Developer & Power BI Specialist (Sistemas / BI)",
        "email": "santirendon32@gmail.com",
        "phone": "+57 302 323 334 2",
        "location": "Armenia, Quindío, Colombia",
        "summary": "Especialista en desarrollo de soluciones de Inteligencia de Negocios, modelado relacional y administración de sistemas..."
      },
      "education": [...],
      "experience": [...],
      "skills": {
        "technical": ["Power BI", "SQL Server", "ETL Pipelines", "Data Warehousing", "Linux / Windows Server", "Redes"],
        "languages": ["Español (Nativo)", "Inglés"],
        "certifications": [...],
        "additional": [...]
      }
    },
    {
      "id": "ai",
      "roleName": "Ingeniero de IA",
      "pdfUrl": "/cv/cv-ingeniero-ia.pdf",
      "whatsappContext": "ai",
      "personal": {
        "name": "Santiago Rendón",
        "title": "Ingeniero de IA y Analista de Datos (Python, IA Generativa & Cloud)",
        "email": "santirendon32@gmail.com",
        "phone": "+57 302 323 334 2",
        "location": "Armenia, Quindío, Colombia",
        "summary": "Ingeniero enfocado en el desarrollo de agentes inteligentes, integración de LLMs, automatización avanzada y analítica con Python..."
      },
      "education": [...],
      "experience": [...],
      "skills": {
        "technical": ["Python", "OpenAI / Claude APIs", "LangChain / LLMs", "FastAPI", "Prompt Engineering", "SQL", "Cloud Computing"],
        "languages": ["Español (Nativo)", "Inglés"],
        "certifications": [...],
        "additional": ["Automatización de flujos con IA", "Agentes autónomos"]
      }
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
- **Entrada:** `phone` (string, por defecto `'573023233342'`), `contextType` (string: `'general' | 'data' | 'systems' | 'ai'`)
- **Pseudocódigo:**
  ```text
  CONSTANT DEFAULT_PHONE = "573023233342"

  CONSTANT MESSAGES = {
    "general": "Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.",
    "data": "Hola, me interesa una cotización para análisis de datos y dashboards.",
    "systems": "Hola, necesito soporte y asesoría en BI y sistemas.",
    "ai": "Hola, me interesa una asesoría/cotización en soluciones con IA y automatizaciones."
  }

  FUNCTION buildWhatsAppUrl(phone = DEFAULT_PHONE, contextType = "general"):
    cleanPhone = (phone || DEFAULT_PHONE).replace(/[^0-9]/g, "")
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
- **Hero Section**: Introducción profesional de Santiago Rendón, foto/avatar, propuesta de valor multirrol y enlaces rápidos a contacto y servicios.
- **Selector de Perfiles (`ProfileSelector`)**: Tabs estilizados (*Analista de Datos*, *Desarrollador BI y Sistemas*, *Ingeniero de IA*) con estado activo en *Analista de Datos* al cargar.
- **Cuadrícula Bento (`BentoGrid`)**: Adaptada a los bloques de `cv_template.json`:
  - Tarjeta 1 (Perfil): `personal.name`, `personal.title` y `personal.summary`.
  - Tarjeta 2 (Skills): `skills.technical` (tags visuales interactivos), `skills.certifications` y `skills.languages`.
  - Tarjeta 3 (Experiencia): Lista cronológica de `experience` (empresa, cargo, periodo y viñetas descriptivas).
  - Tarjeta 4 (Educación): Formación de `education` y enlaces profesionales (`github`, `gitlab`, `linkedin`).
  - Tarjeta 5 (Descarga CV): Botón de descarga directa del archivo PDF correspondiente con disparador de fallback a WhatsApp en caso de error (CL-5).
- **Botón Flotante (`WhatsAppFloatingButton`)**: Posición fija inferior derecha enlazando a `https://wa.me/573023233342` con texto contextual general.

### 5.2. Ruta de Servicios (`/servicios`) — Landing Comercial Meta Ads
- **Diseño sin Fugas**: Sin barra de navegación dispersa ni enlaces salientes.
- **Hero Comercial**:
  - *Titular*: "Soluciones en Datos, Business Intelligence e Inteligencia Artificial para tu Negocio".
  - *Subtítulo*: "Optimiza la toma de decisiones y automatiza procesos operativos con dashboards ejecutivos, analítica avanzada y agentes con IA."
  - *Llamada a la Acción (CTA)*: Botón destacado "Cotizar Solución por WhatsApp".
- **Catálogo Bento de Servicios**:
  1. *Análisis de Datos y Dashboards*: Indicadores clave, visualizaciones interactivas y modelos en Power BI / SQL. CTA contextual WhatsApp (`data`).
  2. *Desarrollo de BI y Sistemas*: Data warehousing, pipelines ETL, modelado relacional y arquitectura de información. CTA contextual WhatsApp (`systems`).
  3. *Soluciones con IA Generativa y Automatización*: Implementación de agentes con LLMs, automatizaciones con Python e integración de APIs cognitivas. CTA contextual WhatsApp (`ai`).
- **Prueba Social y Casos de Éxito**: Métricas cuantificadas de impacto y reducción de costos operativos.
- **Formulario de Contacto (`ContactForm`)**: 4 campos independientes, validación en tiempo real, prevención de envíos duplicados y confirmación en pantalla.

---

## 6. Decisiones Justificadas

1. **Adopción estricta de `cv_template.json`**:
   - *Decisión*: Reutilizar exactamente la plantilla modular provista por el usuario (`personal`, `education`, `experience`, `skills`).
   - *Alternativa descartada*: Mantener un formato ad-hoc simplificado o mezclar esquemas heterogéneos.
   - *Motivo*: Compatibilidad con los 3 CVs reales del usuario, estandarización de datos e interoperabilidad para futuras expansiones.
2. **Centralización del número de WhatsApp (`573023233342`)**:
   - *Decisión*: Definir el número real como constante por defecto en `whatsapp.js` y configurable mediante variable de entorno opcional.
   - *Alternativa descartada*: Hardcodear diferentes números en distintos componentes.
   - *Motivo*: Consistencia en todas las llamadas a la acción y facilidad de mantenimiento.
3. **Tests unitarios con `node --test` nativo**:
   - *Decisión*: Usar el ejecutor nativo de Node.js y aserciones estrictas (`node:assert/strict`).
   - *Alternativa descartada*: Instalar librerías de testing de terceros.
   - *Motivo*: Cumplimiento estricto de la Constitución del proyecto (cero dependencias de testing).

---

## 7. Estrategia de Pruebas Unitarias (`node --test`)

La suite de pruebas automatizadas se ejecuta con `node --test tests/*.test.js`:

1. **`tests/profiles.test.js`**:
   - Validación de que `profiles.json` contiene los 3 perfiles con IDs `data`, `systems` y `ai`.
   - Verificación de presencia de los bloques requeridos por `cv_template.json`: `personal`, `education`, `experience` y `skills`.
   - Comprobación de que `personal.summary` es una cadena no vacía y `skills.technical` es un arreglo con elementos.
   - Verificación de enlaces válidos en `pdfUrl`.
2. **`tests/validator.test.js`**:
   - Validación exitosa con todos los campos válidos (nombre >= 2, email válido, teléfono válido, mensaje >= 10).
   - Rechazo de nombre vacío o menor a 2 caracteres.
   - Rechazo de formato de correo inválido (sin @ o sin dominio).
   - Aceptación de teléfono omitido (campo opcional).
   - Rechazo de teléfono con caracteres no numéricos.
   - Rechazo de mensaje menor a 10 caracteres.
3. **`tests/whatsapp.test.js`**:
   - Verificación de prefijo `https://wa.me/573023233342`.
   - Validación del mensaje predeterminado para rol `'data'`.
   - Validación del mensaje predeterminado para rol `'systems'`.
   - Validación del mensaje predeterminado para rol `'ai'`.
   - Validación del mensaje general de fallback ante contexto desconocido.
   - Codificación correcta de caracteres especiales con `encodeURIComponent`.
4. **`tests/analytics.test.js`**:
   - Extracción de parámetros `utm_source`, `utm_medium`, `utm_campaign` y `fbclid`.
   - Generación de eventos `PageView`, `Contact`, `Lead` (con atribución) y `DownloadCV` (con `{ role }`).
