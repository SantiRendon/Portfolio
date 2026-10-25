/**
 * Validates contact form data according to RF-12 and RF-14 rules.
 *
 * @param {Object} data
 * @param {string} [data.name] - Full name (required, min 2 chars)
 * @param {string} [data.email] - Email address (required, standard user@domain format)
 * @param {string} [data.phone] - Phone number (optional, 7-15 telephone characters)
 * @param {string} [data.message] - Message content (required, min 10 chars)
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateContactForm(data) {
	const errors = {};
	const safeData = data || {};

	// 1. Name validation
	const nameTrimmed = (safeData.name || '').trim();
	if (nameTrimmed.length < 2) {
		errors.name = 'El nombre debe tener al menos 2 caracteres.';
	}

	// 2. Email validation
	const emailTrimmed = (safeData.email || '').trim();
	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailPattern.test(emailTrimmed)) {
		errors.email = 'El formato del correo electrónico no es válido.';
	}

	// 3. Phone validation (optional)
	const phoneTrimmed = (safeData.phone || '').trim();
	if (phoneTrimmed.length > 0) {
		const allowedPattern = /^[0-9+\s()-]+$/;
		const digits = phoneTrimmed.replace(/\D/g, '');
		if (!allowedPattern.test(phoneTrimmed) || digits.length < 7 || digits.length > 15) {
			errors.phone = 'El teléfono solo debe contener números y signos válidos (+).';
		}
	}

	// 4. Message validation
	const messageTrimmed = (safeData.message || '').trim();
	if (messageTrimmed.length < 10) {
		errors.message = 'El mensaje debe tener al menos 10 caracteres.';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		errors
	};
}
