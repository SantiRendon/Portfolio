import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm } from '../src/lib/utils/validator.js';

test('valid form with all fields (including phone)', () => {
	const result = validateContactForm({
		name: 'Santiago Rendón',
		email: 'santiago@example.com',
		phone: '+57 300 123 4567',
		message: 'Hola, me gustaría solicitar una cotización para un dashboard.'
	});

	assert.strictEqual(result.isValid, true);
	assert.deepStrictEqual(result.errors, {});
});

test('valid form with phone omitted or empty', () => {
	const result1 = validateContactForm({
		name: 'Ana Pérez',
		email: 'ana.perez@dominio.com',
		message: 'Requiero soporte y mantenimiento para mi infraestructura de servidores.'
	});
	assert.strictEqual(result1.isValid, true);
	assert.deepStrictEqual(result1.errors, {});

	const result2 = validateContactForm({
		name: 'Carlos Ruiz',
		email: 'carlos@empresa.org',
		phone: '   ',
		message: 'Necesito apoyo en digitación masiva de planillas de inventario.'
	});
	assert.strictEqual(result2.isValid, true);
	assert.deepStrictEqual(result2.errors, {});
});

test('invalid name: missing, empty, whitespace or shorter than 2 chars', () => {
	const emptyName = validateContactForm({
		name: '',
		email: 'test@example.com',
		message: 'Mensaje con más de diez caracteres válidos.'
	});
	assert.strictEqual(emptyName.isValid, false);
	assert.ok(emptyName.errors.name, 'Expected error on empty name');

	const shortName = validateContactForm({
		name: ' A ',
		email: 'test@example.com',
		message: 'Mensaje con más de diez caracteres válidos.'
	});
	assert.strictEqual(shortName.isValid, false);
	assert.ok(shortName.errors.name, 'Expected error on single char name');
});

test('invalid email: missing @, invalid domain or syntax', () => {
	const invalidEmails = ['plainaddress', '@missingusername.com', 'user@', 'user@domain,com', 'user space@domain.com'];

	for (const badEmail of invalidEmails) {
		const result = validateContactForm({
			name: 'Usuario Prueba',
			email: badEmail,
			message: 'Mensaje con suficiente longitud de caracteres.'
		});
		assert.strictEqual(result.isValid, false, `Expected failure for email: ${badEmail}`);
		assert.ok(result.errors.email, `Expected email error key for: ${badEmail}`);
	}
});

test('invalid phone: non-numeric characters or invalid format', () => {
	const invalidPhones = ['abc123456', '300-123-abc', '123', '1234567890123456789'];

	for (const badPhone of invalidPhones) {
		const result = validateContactForm({
			name: 'Usuario Prueba',
			email: 'user@example.com',
			phone: badPhone,
			message: 'Mensaje con suficiente longitud de caracteres.'
		});
		assert.strictEqual(result.isValid, false, `Expected failure for phone: ${badPhone}`);
		assert.ok(result.errors.phone, `Expected phone error key for: ${badPhone}`);
	}
});

test('invalid message: missing, empty or shorter than 10 chars', () => {
	const shortMessage = validateContactForm({
		name: 'Usuario Prueba',
		email: 'user@example.com',
		message: 'Hola!'
	});
	assert.strictEqual(shortMessage.isValid, false);
	assert.ok(shortMessage.errors.message, 'Expected error on short message');

	const emptyMessage = validateContactForm({
		name: 'Usuario Prueba',
		email: 'user@example.com',
		message: '          '
	});
	assert.strictEqual(emptyMessage.isValid, false);
	assert.ok(emptyMessage.errors.message, 'Expected error on empty message');
});

test('empty input object produces all required field errors', () => {
	const result = validateContactForm({});
	assert.strictEqual(result.isValid, false);
	assert.ok(result.errors.name);
	assert.ok(result.errors.email);
	assert.ok(result.errors.message);
	assert.strictEqual(result.errors.phone, undefined, 'Optional phone should not have error when omitted');
});

test('handles undefined / null input safely without throwing', () => {
	const resultNull = validateContactForm(null);
	assert.strictEqual(resultNull.isValid, false);
	assert.ok(resultNull.errors.name);

	const resultUndef = validateContactForm(undefined);
	assert.strictEqual(resultUndef.isValid, false);
	assert.ok(resultUndef.errors.name);
});
