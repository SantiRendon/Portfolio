/**
 * Santiago Rendon's official default WhatsApp phone number.
 */
export const DEFAULT_WHATSAPP_PHONE = '573023233342';

/**
 * Default WhatsApp messages categorized by profile or page context.
 * Complies with RF-11.
 */
export const WHATSAPP_MESSAGES = {
	general: 'Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.',
	data: 'Hola, me interesa una cotización para análisis de datos y dashboards.',
	systems: 'Hola, necesito soporte y asesoría en BI y sistemas.',
	ai: 'Hola, me interesa una asesoría/cotización en soluciones con IA y automatizaciones.'
};

/**
 * Builds a valid WhatsApp direct click URL (wa.me) with contextual message and cleaned phone number.
 *
 * @param {string} [context='general'] - Context identifier ('general' | 'data' | 'systems' | 'ai')
 * @param {string} [phoneNumber=DEFAULT_WHATSAPP_PHONE] - Target phone number in international format
 * @param {string} [customMessage] - Optional custom message to override the contextual default
 * @returns {string} - Formatted WhatsApp URL
 */
export function buildWhatsAppUrl(
	context = 'general',
	phoneNumber = DEFAULT_WHATSAPP_PHONE,
	customMessage
) {
	// Flexible argument handling if called as (phoneNumber, context)
	let resolvedContext = context;
	let resolvedPhone = phoneNumber || DEFAULT_WHATSAPP_PHONE;

	if (typeof context === 'string' && /^[+0-9]/.test(context) && !WHATSAPP_MESSAGES[context]) {
		resolvedPhone = context;
		resolvedContext = phoneNumber || 'general';
	}

	const cleanPhone = String(resolvedPhone || DEFAULT_WHATSAPP_PHONE).replace(/[^0-9]/g, '');
	const message = customMessage || WHATSAPP_MESSAGES[resolvedContext] || WHATSAPP_MESSAGES.general;
	const encodedMessage = encodeURIComponent(message);

	return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}
