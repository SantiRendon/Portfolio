import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const PROFILES_PATH = path.resolve('src/lib/data/profiles.json');

test('profiles.json exists and is valid JSON', () => {
	assert.ok(fs.existsSync(PROFILES_PATH), 'src/lib/data/profiles.json does not exist');
	const content = fs.readFileSync(PROFILES_PATH, 'utf-8');
	const data = JSON.parse(content);
	assert.ok(Array.isArray(data.profiles), 'profiles must be an array');
	assert.strictEqual(data.profiles.length, 3, 'Must contain exactly 3 profiles');
});

test('profiles schema conforms to cv_template.json with data, systems, and ai roles', () => {
	const content = fs.readFileSync(PROFILES_PATH, 'utf-8');
	const { profiles } = JSON.parse(content);

	const expectedIds = ['data', 'systems', 'ai'];
	const foundIds = profiles.map((p) => p.id);
	assert.deepStrictEqual(foundIds, expectedIds, 'Profile IDs must match data, systems, ai');

	const expectedRoles = {
		data: 'Analista de Datos',
		systems: 'Desarrollador BI y Sistemas',
		ai: 'Ingeniero de IA'
	};

	const expectedPdfs = {
		data: '/cv/cv-analista-datos.pdf',
		systems: '/cv/cv-sistemas.pdf',
		ai: '/cv/cv-ingeniero-ia.pdf'
	};

	for (const profile of profiles) {
		assert.strictEqual(profile.roleName, expectedRoles[profile.id], `roleName mismatch for ${profile.id}`);
		assert.strictEqual(profile.pdfUrl, expectedPdfs[profile.id], `pdfUrl mismatch for ${profile.id}`);
		assert.strictEqual(profile.whatsappContext, profile.id, `whatsappContext mismatch for ${profile.id}`);

		// 1. Personal section
		assert.ok(typeof profile.personal === 'object' && profile.personal !== null, 'personal must be an object');
		assert.ok(typeof profile.personal.name === 'string' && profile.personal.name.length > 0, 'personal.name is required');
		assert.ok(typeof profile.personal.title === 'string' && profile.personal.title.length > 0, 'personal.title is required');
		assert.ok(typeof profile.personal.email === 'string' && profile.personal.email.length > 0, 'personal.email is required');
		assert.ok(typeof profile.personal.phone === 'string' && profile.personal.phone.length > 0, 'personal.phone is required');
		assert.ok(typeof profile.personal.location === 'string' && profile.personal.location.length > 0, 'personal.location is required');
		assert.ok(typeof profile.personal.summary === 'string' && profile.personal.summary.length > 0, 'personal.summary is required');

		// 2. Education section
		assert.ok(Array.isArray(profile.education) && profile.education.length > 0, 'education must be a non-empty array');
		for (const edu of profile.education) {
			assert.ok(typeof edu.institution === 'string' && edu.institution.length > 0, 'edu.institution is required');
			assert.ok(typeof edu.degree === 'string' && edu.degree.length > 0, 'edu.degree is required');
			assert.ok(typeof edu.location === 'string', 'edu.location is required');
			assert.ok(typeof edu.startDate === 'string', 'edu.startDate is required');
			assert.ok(typeof edu.endDate === 'string', 'edu.endDate is required');
			assert.ok(typeof edu.description === 'string', 'edu.description is required');
		}

		// 3. Experience section
		assert.ok(Array.isArray(profile.experience) && profile.experience.length > 0, 'experience must be a non-empty array');
		for (const exp of profile.experience) {
			assert.ok(typeof exp.company === 'string' && exp.company.length > 0, 'exp.company is required');
			assert.ok(typeof exp.position === 'string' && exp.position.length > 0, 'exp.position is required');
			assert.ok(typeof exp.location === 'string', 'exp.location is required');
			assert.ok(typeof exp.startDate === 'string', 'exp.startDate is required');
			assert.ok(typeof exp.endDate === 'string', 'exp.endDate is required');
			assert.ok(typeof exp.description === 'string' && exp.description.length > 0, 'exp.description is required');
		}

		// 4. Skills section
		assert.ok(typeof profile.skills === 'object' && profile.skills !== null, 'skills must be an object');
		assert.ok(typeof profile.skills.technical === 'string' && profile.skills.technical.length > 0, 'skills.technical is required');
		assert.ok(typeof profile.skills.languages === 'string' && profile.skills.languages.length > 0, 'skills.languages is required');
		assert.ok(Array.isArray(profile.skills.certifications), 'skills.certifications must be an array');
		assert.ok(typeof profile.skills.additional === 'string' && profile.skills.additional.length > 0, 'skills.additional is required');
	}
});

test('static CV PDF files exist on disk and are non-empty', () => {
	const content = fs.readFileSync(PROFILES_PATH, 'utf-8');
	const { profiles } = JSON.parse(content);

	for (const profile of profiles) {
		const relativePdfPath = profile.pdfUrl.replace(/^\//, '');
		const fullPath = path.resolve(relativePdfPath.startsWith('cv/') ? path.join('static', relativePdfPath) : relativePdfPath);
		assert.ok(fs.existsSync(fullPath), `CV file does not exist: ${fullPath}`);
		const stats = fs.statSync(fullPath);
		assert.ok(stats.size > 0, `CV file is empty: ${fullPath}`);
	}
});
