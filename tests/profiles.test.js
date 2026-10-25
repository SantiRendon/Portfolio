import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const PROFILES_PATH = path.resolve('src/lib/data/profiles.json');
const STATIC_CV_DIR = path.resolve('static/cv');

test('profiles.json exists and is valid JSON', () => {
	assert.ok(fs.existsSync(PROFILES_PATH), 'src/lib/data/profiles.json does not exist');
	const content = fs.readFileSync(PROFILES_PATH, 'utf-8');
	const data = JSON.parse(content);
	assert.ok(Array.isArray(data.profiles), 'profiles must be an array');
	assert.strictEqual(data.profiles.length, 3, 'Must contain exactly 3 profiles');
});

test('profiles schema and fields integrity', () => {
	const content = fs.readFileSync(PROFILES_PATH, 'utf-8');
	const { profiles } = JSON.parse(content);

	const expectedIds = ['data', 'systems', 'data-entry'];
	const foundIds = profiles.map((p) => p.id);
	assert.deepStrictEqual(foundIds, expectedIds, 'Profile IDs must match data, systems, data-entry');

	for (const profile of profiles) {
		assert.ok(typeof profile.id === 'string' && profile.id.length > 0, 'id is required');
		assert.ok(typeof profile.roleName === 'string' && profile.roleName.length > 0, 'roleName is required');
		assert.ok(typeof profile.title === 'string' && profile.title.length > 0, 'title is required');
		assert.ok(typeof profile.summary === 'string' && profile.summary.length > 0, 'summary is required');
		assert.ok(typeof profile.whatsappContext === 'string' && profile.whatsappContext.length > 0, 'whatsappContext is required');
		assert.ok(typeof profile.pdfUrl === 'string' && profile.pdfUrl.startsWith('/cv/'), 'pdfUrl must point to /cv/...');
		assert.ok(profile.pdfUrl.endsWith('.pdf'), 'pdfUrl must end with .pdf');

		assert.ok(Array.isArray(profile.skills) && profile.skills.length > 0, 'skills must be a non-empty array');
		assert.ok(Array.isArray(profile.experience) && profile.experience.length > 0, 'experience must be a non-empty array');
		assert.ok(Array.isArray(profile.projects) && profile.projects.length > 0, 'projects must be a non-empty array');

		for (const exp of profile.experience) {
			assert.ok(typeof exp.company === 'string' && exp.company.length > 0, 'exp.company is required');
			assert.ok(typeof exp.role === 'string' && exp.role.length > 0, 'exp.role is required');
			assert.ok(typeof exp.period === 'string' && exp.period.length > 0, 'exp.period is required');
			assert.ok(Array.isArray(exp.achievements) && exp.achievements.length > 0, 'exp.achievements must be non-empty array');
		}

		for (const proj of profile.projects) {
			assert.ok(typeof proj.name === 'string' && proj.name.length > 0, 'proj.name is required');
			assert.ok(typeof proj.description === 'string' && proj.description.length > 0, 'proj.description is required');
			assert.ok(Array.isArray(proj.technologies) && proj.technologies.length > 0, 'proj.technologies must be non-empty array');
		}
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
