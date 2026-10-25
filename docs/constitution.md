# Constitución del Proyecto

Principios innegociables de arquitectura, desarrollo y código para la plataforma web de portafolio y landing de conversión.

1. **Simplicidad del Stack**: La solución se construye con SvelteKit y Tailwind CSS aprovechando la cuadrícula Bento, minimizando dependencias externas y evitando sobreingeniería.
2. **La Spec Manda**: Ningún código ni funcionalidad se implementa si no está formalmente especificado en `specs/`. Cualquier requerimiento nuevo debe actualizar primero la especificación.
3. **Separación Estricta entre Lógica Pura e Interfaz**: Toda la lógica de negocio (validación de formularios, generación de enlaces contextuales y formateo de eventos analíticos) reside en funciones puras y desacopladas de la interfaz y del DOM.
4. **Política de Pruebas con `node --test`**: La suite de pruebas automatizadas utiliza exclusivamente el test runner nativo de Node.js (`node --test`), sin frameworks ni dependencias adicionales de testing.
5. **Privacidad y Protección de Datos**: Los datos recolectados en el formulario de contacto se tratan con fines estrictos de comunicación solicitada; los parámetros de atribución se gestionan en sesión sin comprometer la privacidad del visitante.
6. **Convención de Idioma**: El código de programación (nombres de variables, funciones, archivos, tipos y comentarios técnicos) se escribe en inglés; la interfaz de usuario, contenidos visibles y documentación funcional se redactan en español.
