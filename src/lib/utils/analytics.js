/**
 * Standard attribution keys to capture from advertising campaigns.
 * Complies with RF-16 and RF-18.
 */
export const ATTRIBUTION_KEYS = [
	'utm_source',
	'utm_medium',
	'utm_campaign',
	'utm_content',
	'utm_term',
	'fbclid'
];

/**
 * Extracts marketing and ad attribution parameters from a URL or query string.
 *
 * @param {string} [urlOrSearch] - Full URL, query string (with or without '?')
 * @returns {Record<string, string>} - Extracted attribution key-value pairs
 */
export function extractAttribution(urlOrSearch) {
	if (!urlOrSearch || typeof urlOrSearch !== 'string') {
		return {};
	}

	const queryString = urlOrSearch.includes('?')
		? urlOrSearch.slice(urlOrSearch.indexOf('?') + 1)
		: (urlOrSearch.includes('=') ? urlOrSearch : '');

	if (!queryString) {
		return {};
	}

	const params = new URLSearchParams(queryString);
	const attribution = {};

	for (const key of ATTRIBUTION_KEYS) {
		const value = params.get(key);
		if (value && value.trim().length > 0) {
			attribution[key] = value.trim();
		}
	}

	return attribution;
}

/**
 * Builds standard or custom Meta Pixel event payloads.
 * Complies with RF-16, RF-17, RF-18, and RF-19.
 *
 * @param {'PageView' | 'Contact' | 'Lead' | 'DownloadCV' | string} eventType
 * @param {Record<string, any>} [payload={}]
 * @param {Record<string, string>} [attribution={}]
 * @returns {{ name: string, isCustom: boolean, data: Record<string, any> }}
 */
export function buildMetaEvent(eventType, payload = {}, attribution = {}) {
	const safePayload = payload || {};
	const safeAttribution = attribution || {};

	switch (eventType) {
		case 'PageView':
			return {
				name: 'PageView',
				isCustom: false,
				data: {}
			};

		case 'Contact':
			return {
				name: 'Contact',
				isCustom: false,
				data: {
					channel: 'whatsapp',
					...safePayload
				}
			};

		case 'Lead':
			return {
				name: 'Lead',
				isCustom: false,
				data: {
					...safePayload,
					...safeAttribution
				}
			};

		case 'DownloadCV':
			return {
				name: 'DownloadCV',
				isCustom: true,
				data: {
					role: safePayload.role
				}
			};

		default:
			return {
				name: eventType,
				isCustom: true,
				data: safePayload
			};
	}
}
