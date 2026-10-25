import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const SERVICIOS_PAGE_PATH = path.resolve('src/routes/servicios/+page.svelte');

test('servicios/+page.svelte exists and is readable', () => {
	assert.ok(fs.existsSync(SERVICIOS_PAGE_PATH), 'servicios/+page.svelte must exist');
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(content.length > 0, 'servicios/+page.svelte must not be empty');
});

test('servicios page uses DEFAULT_WHATSAPP_PHONE and eliminates dummy phone 573001234567', () => {
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(
		content.includes('DEFAULT_WHATSAPP_PHONE'),
		'Must import and use DEFAULT_WHATSAPP_PHONE from $lib/utils/whatsapp'
	);
	assert.ok(
		!content.includes('573001234567'),
		'Must not contain the hardcoded legacy dummy phone 573001234567'
	);
});

test('servicios page defines contextual WhatsApp URLs for data, systems, and ai (no data-entry)', () => {
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(content.includes("buildWhatsAppUrl('data'"), 'Must build WhatsApp URL for data context');
	assert.ok(content.includes("buildWhatsAppUrl('systems'"), 'Must build WhatsApp URL for systems context');
	assert.ok(content.includes("buildWhatsAppUrl('ai'"), 'Must build WhatsApp URL for ai context');
	assert.ok(!content.includes("buildWhatsAppUrl('data-entry'"), 'Must not reference data-entry context');
});

test('servicios page renders the 3 canonical commercial service pillars', () => {
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(
		content.includes('Análisis de Datos y Dashboards Ejecutivos') || content.includes('Análisis de Datos & Dashboards Ejecutivos'),
		'Must contain Service 1: Análisis de Datos y Dashboards Ejecutivos'
	);
	assert.ok(
		content.includes('Business Intelligence & Arquitectura de Datos') || content.includes('Business Intelligence y Arquitectura de Datos'),
		'Must contain Service 2: Business Intelligence & Arquitectura de Datos'
	);
	assert.ok(
		content.includes('Ingeniería de Inteligencia Artificial & Automatización') || content.includes('Ingeniería de Inteligencia Artificial y Automatización'),
		'Must contain Service 3: Ingeniería de Inteligencia Artificial & Automatización'
	);
});

test('servicios page includes verified credibility metrics (+50%, 100%, 99.9%)', () => {
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(
		content.includes('+50%') || content.includes('>50%'),
		'Must highlight metric for operational time reduction (+50%)'
	);
	assert.ok(
		content.includes('100%') || content.includes('Tiempo Real'),
		'Must highlight metric for real-time executive dashboards'
	);
	assert.ok(
		content.includes('99.9%'),
		'Must highlight metric for data pipelines reliability (99.9%)'
	);
});

test('servicios page embeds ContactForm with attribution and MetaPixel', () => {
	const content = fs.readFileSync(SERVICIOS_PAGE_PATH, 'utf-8');
	assert.ok(content.includes('<ContactForm'), 'Must include ContactForm component');
	assert.ok(content.includes('serviceContext="servicios"'), 'Must set serviceContext="servicios"');
	assert.ok(content.includes('{attribution}'), 'Must pass attribution object');
	assert.ok(content.includes('<MetaPixel'), 'Must include MetaPixel component');
	assert.ok(content.includes('<WhatsAppFloatingButton'), 'Must include WhatsAppFloatingButton component');
});
