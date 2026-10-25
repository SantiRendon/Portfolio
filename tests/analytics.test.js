import test from 'node:test';
import assert from 'node:assert/strict';
import { extractAttribution, buildMetaEvent, ATTRIBUTION_KEYS } from '../src/lib/utils/analytics.js';

test('extractAttribution parses UTMs and fbclid from query string', () => {
	const query = '?utm_source=facebook&utm_medium=cpc&utm_campaign=summer_promo&utm_content=ad_v1&utm_term=data_analyst&fbclid=fb123456';
	const attr = extractAttribution(query);

	assert.deepStrictEqual(attr, {
		utm_source: 'facebook',
		utm_medium: 'cpc',
		utm_campaign: 'summer_promo',
		utm_content: 'ad_v1',
		utm_term: 'data_analyst',
		fbclid: 'fb123456'
	});
});

test('extractAttribution extracts from full URL string', () => {
	const fullUrl = 'https://santiagorendon.com/servicios?utm_source=instagram&utm_campaign=lead_gen&fbclid=xyz987&other_param=ignore_me';
	const attr = extractAttribution(fullUrl);

	assert.deepStrictEqual(attr, {
		utm_source: 'instagram',
		utm_campaign: 'lead_gen',
		fbclid: 'xyz987'
	});
	assert.strictEqual(attr.other_param, undefined, 'Irrelevant parameters must be excluded');
});

test('extractAttribution ignores empty or whitespace values', () => {
	const query = '?utm_source=facebook&utm_medium=&utm_campaign=   &fbclid=valid_id';
	const attr = extractAttribution(query);

	assert.deepStrictEqual(attr, {
		utm_source: 'facebook',
		fbclid: 'valid_id'
	});
});

test('extractAttribution safely handles empty, organic or invalid inputs', () => {
	assert.deepStrictEqual(extractAttribution(''), {});
	assert.deepStrictEqual(extractAttribution('https://santiagorendon.com/servicios'), {});
	assert.deepStrictEqual(extractAttribution(null), {});
	assert.deepStrictEqual(extractAttribution(undefined), {});
});

test('buildMetaEvent formats standard PageView event', () => {
	const event = buildMetaEvent('PageView');
	assert.deepStrictEqual(event, {
		name: 'PageView',
		isCustom: false,
		data: {}
	});
});

test('buildMetaEvent formats standard Contact event with whatsapp channel and context', () => {
	const event = buildMetaEvent('Contact', { context: 'data' });
	assert.deepStrictEqual(event, {
		name: 'Contact',
		isCustom: false,
		data: {
			channel: 'whatsapp',
			context: 'data'
		}
	});
});

test('buildMetaEvent formats standard Lead event merging payload and attribution', () => {
	const payload = { formId: 'contact_form', service: 'dashboards' };
	const attribution = { utm_source: 'facebook', fbclid: 'fb_abc' };

	const event = buildMetaEvent('Lead', payload, attribution);
	assert.deepStrictEqual(event, {
		name: 'Lead',
		isCustom: false,
		data: {
			formId: 'contact_form',
			service: 'dashboards',
			utm_source: 'facebook',
			fbclid: 'fb_abc'
		}
	});
});

test('buildMetaEvent formats custom DownloadCV event with role', () => {
	const event = buildMetaEvent('DownloadCV', { role: 'data' });
	assert.deepStrictEqual(event, {
		name: 'DownloadCV',
		isCustom: true,
		data: {
			role: 'data'
		}
	});
});

test('buildMetaEvent handles unknown custom event types as fallback', () => {
	const event = buildMetaEvent('CustomAction', { someKey: 123 });
	assert.deepStrictEqual(event, {
		name: 'CustomAction',
		isCustom: true,
		data: {
			someKey: 123
		}
	});
});

test('ATTRIBUTION_KEYS contains the required 6 tracking parameters', () => {
	assert.deepStrictEqual(ATTRIBUTION_KEYS, [
		'utm_source',
		'utm_medium',
		'utm_campaign',
		'utm_content',
		'utm_term',
		'fbclid'
	]);
});
