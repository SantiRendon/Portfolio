/**
 * Default WhatsApp messages categorized by profile or page context.
 * Complies with RF-11.
 */
export const WHATSAPP_MESSAGES = {
	general: 'Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.',
	data: 'Hola, me interesa una cotización para análisis de datos y dashboards.',
	systems: 'Hola, necesito soporte y asesoría en sistemas e infraestructura.',
	'data-entry': 'Hola, requiero apoyo en digitación y automatización de datos.'
};

/**
 * Builds a valid WhatsApp direct click URL (wa.me) with contextual message and cleaned phone number.
 *
 * @param {string} [context='general'] - Context identifier ('general' | 'data' | 'systems' | 'data-entry')
 * @param {string} [phoneNumber=''] - Target phone number in international format
 * @param {string} [customMessage] - Optional custom message to override the contextual default
 * @returns {string} - Formatted WhatsApp URL
 */
export function buildWhatsAppUrl(context = 'general', phoneNumber = '', customMessage) {
	// Flexible argument handling if called as (phoneNumber, context)
	let resolvedContext = context;
	let resolvedPhone = phoneNumber;

	if (typeof context === 'string' && /^[+0-9]/.test(context) && !WHATSAPP_MESSAGES[context]) {
		resolvedPhone = context;
		resolvedContext = phoneNumber || 'general';
	}

	const cleanPhone = String(resolvedPhone || '').replace(/[^0-9]/g, '');
	const message = customMessage || WHATSAPP_MESSAGES[resolvedContext] || WHATSAPP_MESSAGES.general;
	const encodedMessage = encodeURIComponent(message);

	return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
