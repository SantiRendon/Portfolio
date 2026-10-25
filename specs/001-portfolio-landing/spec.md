# Spec 001 — Portafolio Profesional y Landing Page de Conversión
Estado: aprobada

## Contexto y objetivo
El usuario requiere una plataforma web personal que cumpla dos funciones complementarias de negocio mediante experiencias de navegación diferenciadas:
1. **Portafolio profesional (Ruta Principal `/`)**: Orientado a reclutadores, líderes técnicos y empresas contratantes. Presenta una visión integral de la experiencia laboral mediante un selector interactivo de tres roles técnicos (**Analista de Datos**, **Desarrollador BI y Sistemas**, e **Ingeniero de IA**), alimentados desde una estructura de datos homogénea basada en el esquema estándar de plantilla de CV (`cv_template.json`) y con descarga directa de sus currículums en formato PDF.
2. **Página de aterrizaje comercial (Ruta Dedicada `/servicios`)**: Orientada exclusivamente a la conversión de clientes potenciales provenientes de campañas publicitarias (Meta Ads / Facebook Ads). Presenta una propuesta de valor enfocada en resolver problemas operativos específicos de negocio (dashboards en Power BI, infraestructura y desarrollo de Business Intelligence, e implementación de soluciones con Inteligencia Artificial y automatización), con diseño directo sin distracciones, botón flotante y botones de acción a WhatsApp prioritarios, formulario de contacto ágil y registro de eventos de conversión para atribución publicitaria.

## Usuarios
1. **Reclutador / Evaluador de talento**: Accede a la ruta principal para evaluar trayectoria, competencias y proyectos de un rol técnico específico (Analista de Datos, Desarrollador BI y Sistemas, o Ingeniero de IA), visualizando los detalles y descargando el CV correspondiente en PDF.
2. **Cliente potencial (Lead comercial desde anuncios)**: Accede a la landing page dedicada buscando resolver una necesidad urgente o recurrente en su negocio, requiriendo claridad de servicios, prueba de resultados y opciones de contacto inmediato.
3. **Propietario de la plataforma**: Profesional técnico que administra sus perfiles de forma estructurada, centraliza la captación comercial y mide el retorno de inversión y eventos de sus campañas de publicidad.

## Historias de usuario
- **HU-1**: Como reclutador técnico en la página principal, quiero alternar entre los perfiles de Analista de Datos, Desarrollador BI y Sistemas, e Ingeniero de IA, para consultar la experiencia, habilidades y proyectos estructurados pertinentes a cada rol.
- **HU-2**: Como reclutador, quiero descargar una versión formal en PDF del currículum activo con un solo clic, para compartirlo o almacenarlo en procesos de selección.
- **HU-3**: Como cliente potencial que llega desde un anuncio publicitario a la página dedicada de servicios, quiero encontrar una propuesta de valor concreta sin elementos de distracción externos, para entender con rapidez cómo se resuelven mis requerimientos operativos.
- **HU-4**: Como cliente potencial en cualquier punto de la navegación, quiero tener acceso inmediato y visible a un botón de WhatsApp (destacado y flotante) con un mensaje preconfigurado, para iniciar una conversación instantánea con el profesional.
- **HU-5**: Como cliente potencial que prefiere comunicación escrita formal, quiero disponer de un formulario breve de contacto, para solicitar una cotización o propuesta detallada.
- **HU-6**: Como propietario de la plataforma, quiero que cada interacción clave (ingreso a la landing, clics en WhatsApp, envíos de formulario y descargas de CV) emita eventos de seguimiento compatibles con píxeles publicitarios, para auditar y optimizar las campañas de conversión.

## Definiciones
- **Perfil de CV**: Conjunto estructurado y uniforme de datos que describe un rol profesional concreto conforme al esquema base de `cv_template.json` (información personal y resumen, formación académica, experiencia laboral detallada y habilidades clasificadas), junto al documento PDF descargable.
- **Estructura de Datos Homogénea (`cv_template.json`)**: Esquema estándar que define los bloques esenciales de cada perfil: `personal` (nombre, título, contacto, enlaces y resumen), `education` (institución, título, fechas, descripción), `experience` (empresa, cargo, fechas, funciones/logros) y `skills` (competencias técnicas, idiomas, certificaciones y adicionales).
- **Página de Conversión Dedicada**: Vista web despojada de menús o enlaces externos innecesarios que puedan provocar fugas de tráfico, optimizada para guiar al visitante directamente hacia WhatsApp o el formulario.
- **Evento de Conversión**: Acción de negocio registrada (evento estándar como PageView, Contact, Lead, o evento personalizado como DownloadCV) para atribución y medición publicitaria.

## Requisitos funcionales

### 1. Estructura y Navegación
- **RF-1**: EL SISTEMA dispondrá de dos rutas principales claramente delimitadas:
  - Ruta de Portafolio (`/`): Enfocada en la marca profesional, selector multi-perfil, experiencia y descarga de CVs.
  - Ruta de Servicios / Conversión (`/servicios`): Enfocada en captación comercial para tráfico de anuncios, desprovista de menús complejos o enlaces salientes que desvíen al visitante del objetivo de conversión.

### 2. Portafolio Multi-Perfil y Gestión de CVs
- **RF-2**: EL SISTEMA consumirá la información de los perfiles profesionales a partir de una estructura de datos estándar y homogénea basada en el esquema de `cv_template.json` (secciones `personal`, `education`, `experience` y `skills`, con enlace al PDF correspondiente) para los tres roles: *Analista de Datos*, *Desarrollador BI y Sistemas*, e *Ingeniero de IA*.
- **RF-3**: EL SISTEMA presentará un selector interactivo de perfil en la ruta de portafolio (`/`) que permita alternar fluidamente entre los tres roles técnicos (*Analista de Datos*, *Desarrollador BI y Sistemas*, e *Ingeniero de IA*), seleccionando por defecto el perfil *Analista de Datos* durante la carga inicial.
- **RF-4**: CUANDO el usuario selecciona un perfil técnico en el selector, EL SISTEMA actualizará instantáneamente en pantalla el resumen profesional (`personal.summary`), la experiencia (`experience`), la formación (`education`), las competencias clasificadas (`skills`) y el enlace de descarga del CV asociado a dicho rol.
- **RF-5**: CUANDO el usuario acciona el botón de descarga de CV, EL SISTEMA iniciará la descarga directa del archivo PDF correspondiente al perfil actualmente seleccionado.
- **RF-6**: SI el archivo PDF solicitado no estuviera disponible temporalmente o fallara la descarga, ENTONCES EL SISTEMA mostrará un mensaje amigable indicando la situación y ofrecerá un botón para solicitarlo directamente a través de WhatsApp.

### 3. Landing Page Comercial y Servicios
- **RF-7**: EL SISTEMA exhibirá en la cabecera de la ruta de conversión (`/servicios`) un titular que declare el servicio freelance principal y el problema operativo resuelto, un subtítulo que especifique el beneficio cuantificable para el negocio y un botón de llamada a la acción principal enlazado a WhatsApp.
- **RF-8**: EL SISTEMA detallará los servicios freelance clasificados en las tres áreas clave (análisis de datos y dashboards empresariales, desarrollo de Business Intelligence y sistemas, e ingeniería de inteligencia artificial y automatización de procesos), describiendo entregables tangibles y beneficios de negocio.
- **RF-9**: EL SISTEMA incluirá una sección de casos de uso y credibilidad con resultados medibles (ej. horas ahorradas en tareas repetitivas mediante IA, tiempos de respuesta en soporte/BI, visualización de métricas de negocio).

### 4. Canales de Contacto y Conversión
- **RF-10**: EL SISTEMA mantendrá visible en ambas rutas un botón flotante prioritario de WhatsApp fijado en pantalla, accesible en cualquier punto del desplazamiento vertical tanto en móvil como en escritorio.
- **RF-11**: CUANDO el usuario pulsa cualquier botón de contacto por WhatsApp (bloque de contenido o botón flotante), EL SISTEMA abrirá la aplicación o versión web de WhatsApp con el mensaje predeterminado correspondiente según el contexto:
  - Botón flotante o contacto general: `"Hola, vi tu portafolio y me gustaría consultar sobre tus servicios."`
  - Sección de Analista de Datos: `"Hola, me interesa una cotización para análisis de datos y dashboards."`
  - Sección de Desarrollador BI y Sistemas: `"Hola, necesito soporte y asesoría en BI y sistemas."`
  - Sección de Ingeniero de IA: `"Hola, me interesa una asesoría/cotización en soluciones con IA y automatizaciones."`
- **RF-12**: EL SISTEMA ofrecerá un formulario de contacto directo compuesto por cuatro campos independientes: Nombre (obligatorio), Correo electrónico (obligatorio), Teléfono/WhatsApp (opcional) y Mensaje (obligatorio).
- **RF-13**: CUANDO el usuario envíe el formulario con todos los campos obligatorios válidos, EL SISTEMA transmitirá los datos a un servicio de recepción de formularios (vía webhook o servicio de entrega de correo), mostrará un mensaje visual de confirmación de recepción en pantalla y limpiará los campos del formulario.
- **RF-14**: SI el usuario intenta enviar el formulario con datos inválidos (Nombre menor a 2 caracteres, Correo electrónico sin formato estándar usuario@dominio, Teléfono con caracteres no numéricos o Mensaje menor a 10 caracteres), ENTONCES EL SISTEMA impedirá el envío y mostrará mensajes de error contextuales indicando la regla no cumplida junto al campo afectado.
- **RF-15**: MIENTRAS el formulario esté procesando una solicitud, EL SISTEMA deshabilitará los controles de envío y exhibirá un indicador de estado ocupado para evitar solicitudes duplicadas.

### 5. Medición Publicitaria y Analítica
- **RF-16**: CUANDO un usuario acceda a cualquiera de las rutas, EL SISTEMA registrará el evento estándar `'PageView'` y capturará los parámetros de atribución publicitaria (utm_source, utm_medium, utm_campaign y fbclid) en la sesión para adjuntarlos al evento `'Lead'` y al envío del formulario de contacto.
- **RF-17**: CUANDO el usuario haga clic en cualquier botón de WhatsApp, EL SISTEMA registrará el evento estándar de conversión `'Contact'`.
- **RF-18**: CUANDO el usuario complete exitosamente el envío del formulario de contacto, EL SISTEMA registrará el evento estándar de conversión `'Lead'` incluyendo los parámetros de atribución capturados.
- **RF-19**: CUANDO el usuario descargue cualquier versión de CV, EL SISTEMA registrará el evento personalizado `'DownloadCV'` asociando el parámetro `{ role: string }` con el identificador del perfil descargado.

## Requisitos no funcionales
- **RNF-1 (Velocidad de Carga y Rendimiento)**: La ruta de conversión y la ruta principal deben alcanzar interactividad plena en menos de 2.0 segundos sobre conexiones móviles 4G estándar, priorizando la entrega de recursos críticos.
- **RNF-2 (Diseño Adaptativo Móvil)**: La navegación, los botones flotantes de WhatsApp y los formularios deben estar optimizados para interacción táctil fluida con una sola mano en pantallas a partir de 320px de ancho.
- **RNF-3 (Accesibilidad)**: Todos los controles interactivos, campos de formulario y botones flotantes deben poseer etiquetas ARIA claras, contraste cromático conforme a WCAG 2.1 AA y soporte completo de navegación por teclado.
- **RNF-4 (Privacidad y Manejo de Información)**: Los datos recolectados en el formulario de contacto se utilizarán estrictamente para responder a la solicitud comercial y el registro de eventos analíticos cumplirá con estándares de privacidad y consentimiento.

## Casos límite
- **CL-1 (Navegador integrado de redes sociales)**: Al abrir la plataforma desde Instagram o Facebook (In-App Browser), tanto la apertura del protocolo `wa.me` de WhatsApp como la descarga de los archivos PDF deben completarse sin congelar la ventana ni generar pantallas en blanco.
- **CL-2 (Interrupción de red durante envío)**: En caso de falla de conectividad al enviar el formulario, el sistema notificará el inconveniente al usuario sin borrar los datos ya diligenciados, permitiendo el reintento.
- **CL-3 (Tráfico orgánico o sin parámetros UTM)**: Si la visita llega de forma directa o sin etiquetas de campaña, el sistema funcionará de manera transparente sin generar advertencias ni romper la secuencia de eventos.
- **CL-4 (Pantallas de ancho ultra reducido)**: En pantallas de 320px, el botón flotante no debe superponerse con los botones de acción principales ni tapar el botón de envío del formulario.
- **CL-5 (Inaccesibilidad o fallo de descarga de PDF)**: Si el archivo PDF de un rol no se encuentra disponible o la descarga es interrumpida, el sistema debe presentar un aviso informativo no intrusivo con una llamada a la acción para solicitar el CV directamente vía WhatsApp.
- **CL-6 (Entorno de escritorio sin aplicación nativa de WhatsApp)**: Al accionar los enlaces de WhatsApp desde navegadores de escritorio que carecen de aplicación instalada, el sistema debe abrir fluidamente la interfaz de WhatsApp Web sin romper la experiencia de usuario.

## Fuera de alcance
- Panel administrativo con autenticación de usuarios para editar datos en caliente (los datos estructurados se gestionan a nivel de archivo de configuración).
- Pasarela de procesamiento de pagos online o contratación automatizada.
- Generador o maquetador dinámico de PDFs en tiempo de ejecución.
- Módulo de blog o gestión editorial de artículos para esta fase.

## Criterios de finalización
- La ruta principal (`/`) carga por defecto el perfil *Analista de Datos*, permite alternar fluidamente entre los 3 perfiles técnicos (*Analista de Datos*, *Desarrollador BI y Sistemas*, *Ingeniero de IA*) cargados desde la estructura homogénea `cv_template.json` y descargar sus respectivos PDFs.
- La ruta de conversión (`/servicios`) presenta titular, subtítulo cuantificable y llamadas a WhatsApp orientadas a las 3 áreas de especialidad sin elementos distractores.
- El botón flotante y los enlaces integrados abren WhatsApp con los textos predeterminados según el perfil o sección activa (incluyendo la nueva opción de IA).
- El formulario de contacto valida las reglas mínimas de longitud y formato, maneja estados de carga y remite la información a un servicio de formularios.
- Los eventos de Meta Pixel (`PageView`, `Contact`, `Lead`, `DownloadCV`) son emitidos con sus parámetros y atribución publicitaria correspondiente.

## Dudas abiertas
*Ninguna en esta fase. Todas las definiciones de negocio, navegación y nuevos perfiles con esquema cv_template.json han sido aclaradas y validadas.*
