import test from 'node:test';
import assert from 'node:assert/strict';
import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from '../src/lib/utils/whatsapp.js';

const TEST_PHONE = '+57 300 123-4567';
const CLEAN_PHONE = '573001234567';

test('builds general / floating button WhatsApp URL by default or with "general" context', () => {
	const expectedMsg = 'Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.';
	const encodedMsg = encodeURIComponent(expectedMsg);

	const urlGeneral = buildWhatsAppUrl('general', TEST_PHONE);
	assert.strictEqual(urlGeneral, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);

	const urlDefault = buildWhatsAppUrl(undefined, TEST_PHONE);
	assert.strictEqual(urlDefault, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);

	const urlUnknown = buildWhatsAppUrl('unknown-context', TEST_PHONE);
	assert.strictEqual(urlUnknown, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);
});

test('builds data analyst context WhatsApp URL', () => {
	const expectedMsg = 'Hola, me interesa una cotización para análisis de datos y dashboards.';
	const encodedMsg = encodeURIComponent(expectedMsg);

	const url = buildWhatsAppUrl('data', TEST_PHONE);
	assert.strictEqual(url, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);
});

test('builds systems and support context WhatsApp URL', () => {
	const expectedMsg = 'Hola, necesito soporte y asesoría en sistemas e infraestructura.';
	const encodedMsg = encodeURIComponent(expectedMsg);

	const url = buildWhatsAppUrl('systems', TEST_PHONE);
	assert.strictEqual(url, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);
});

test('builds data-entry context WhatsApp URL', () => {
	const expectedMsg = 'Hola, requiero apoyo en digitación y automatización de datos.';
	const encodedMsg = encodeURIComponent(expectedMsg);

	const url = buildWhatsAppUrl('data-entry', TEST_PHONE);
	assert.strictEqual(url, `https://wa.me/${CLEAN_PHONE}?text=${encodedMsg}`);
});

test('cleans phone number removing spaces, plus signs, dashes and parenthesis', () => {
	const messyPhone = ' +1 (800) 555-0199 ';
	const clean = '18005550199';
	const url = buildWhatsAppUrl('general', messyPhone);
	assert.ok(url.startsWith(`https://wa.me/${clean}?text=`));
});

test('supports custom message override', () => {
	const custom = 'Hola! Mensaje personalizado de prueba.';
	const url = buildWhatsAppUrl('data', TEST_PHONE, custom);
	assert.strictEqual(url, `https://wa.me/${CLEAN_PHONE}?text=${encodeURIComponent(custom)}`);
});

test('encodes special characters, accents and spaces properly', () => {
	const url = buildWhatsAppUrl('data', TEST_PHONE);
	assert.ok(url.includes('%C3%A1')); // 'á' in cotización / análisis
	assert.ok(!url.includes(' ')); // No raw spaces allowed in URL
});

test('exposes WHATSAPP_MESSAGES constant map', () => {
	assert.ok(typeof WHATSAPP_MESSAGES === 'object');
	assert.strictEqual(WHATSAPP_MESSAGES.general, 'Hola, vi tu portafolio y me gustaría consultar sobre tus servicios.');
	assert.strictEqual(WHATSAPP_MESSAGES.data, 'Hola, me interesa una cotización para análisis de datos y dashboards.');
	assert.strictEqual(WHATSAPP_MESSAGES.systems, 'Hola, necesito soporte y asesoría en sistemas e infraestructura.');
	assert.strictEqual(WHATSAPP_MESSAGES['data-entry'], 'Hola, requiero apoyo en digitación y automatización de datos.');
});
