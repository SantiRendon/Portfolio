<script lang="ts">
	import defaultData from '$lib/data/profiles.json';
	import { buildWhatsAppUrl, DEFAULT_WHATSAPP_PHONE } from '$lib/utils/whatsapp';
	import { buildMetaEvent } from '$lib/utils/analytics';

	export let profileId: string = 'data';
	export let profile: any = undefined;
	export let phoneNumber: string = DEFAULT_WHATSAPP_PHONE;

	$: resolvedProfile =
		profile ||
		defaultData.profiles.find((p: any) => p.id === profileId) ||
		defaultData.profiles[0];

	let downloadFailed = false;
	let isCheckingDownload = false;

	// Reset error state if profile changes
	$: if (resolvedProfile) {
		downloadFailed = false;
	}

	async function handleDownloadClick(event: MouseEvent) {
		downloadFailed = false;
		isCheckingDownload = true;

		// Track Meta Pixel custom event (RF-19)
		if (typeof window !== 'undefined' && (window as any).fbq) {
			const metaEvent = buildMetaEvent('DownloadCV', { role: resolvedProfile.id });
			(window as any).fbq('trackCustom', metaEvent.name, metaEvent.data);
		}

		try {
			// Verify file exists before triggering native download (CL-5 / RF-6)
			const res = await fetch(resolvedProfile.pdfUrl, { method: 'HEAD' });
			if (!res.ok) {
				throw new Error(`HTTP ${res.status}`);
			}
		} catch {
			event.preventDefault();
			downloadFailed = true;
		} finally {
			isCheckingDownload = false;
		}
	}

	$: fallbackWhatsAppUrl = buildWhatsAppUrl(
		resolvedProfile.whatsappContext || resolvedProfile.id,
		phoneNumber,
		`Hola, intenté descargar tu CV de ${resolvedProfile.roleName} pero prefiero solicitarlo directamente por aquí.`
	);

	function parseBullets(desc: string = ''): string[] {
		return desc
			.split('\n')
			.map((l) => l.replace(/^•\s*/, '').trim())
			.filter(Boolean);
	}
</script>

<div class="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
	<!-- 1. Perfil y Resumen Ejecutivo (Span 3) -->
	<div
		class="col-span-1 md:col-span-2 lg:col-span-3 rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-primary/30 transition-all duration-300"
	>
		<div>
			<div class="flex flex-wrap items-center justify-between gap-2 mb-3">
				<div class="flex items-center gap-2">
					<span class="px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20">
						{resolvedProfile.roleName}
					</span>
					<span class="text-xs text-muted-foreground">Perfil Técnico</span>
				</div>

				{#if resolvedProfile.personal?.website}
					<a
						href={resolvedProfile.personal.website}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors"
					>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
							<path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.46 1.46 0 1 0 0-2.92 1.46 1.46 0 0 0 0 2.92M7.86 18.5V10.13H5.07V18.5h2.79z" />
						</svg>
						<span>LinkedIn</span>
					</a>
				{/if}
			</div>

			<h3 class="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-foreground">
				{resolvedProfile.personal?.title || resolvedProfile.title}
			</h3>

			<p class="mt-4 text-sm sm:text-base leading-relaxed text-muted-foreground">
				{resolvedProfile.personal?.summary || resolvedProfile.summary}
			</p>
		</div>

		<div class="mt-6 pt-4 border-t border-border/50 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
			<div class="flex items-center gap-1.5">
				<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
				<span>{resolvedProfile.personal?.location || 'Medellín, Colombia'}</span>
			</div>
			<div class="hidden sm:inline-block">•</div>
			<div>Modalidad: Remoto / Híbrido</div>
			<div class="hidden sm:inline-block">•</div>
			<div>Contacto: {resolvedProfile.personal?.email || 'santirendon.castrillon@gmail.com'}</div>
		</div>
	</div>

	<!-- 2. Descarga de CV en PDF & Fallback a WhatsApp (Span 1) -->
	<div
		class="col-span-1 md:col-span-2 lg:col-span-1 rounded-3xl bg-gradient-to-br from-card/90 via-card/60 to-primary/5 border border-border/80 backdrop-blur-xl p-6 shadow-xl flex flex-col justify-between hover:border-primary/40 transition-all duration-300"
	>
		<div>
			<div class="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
				</svg>
			</div>
			<h4 class="text-lg font-bold text-foreground">Currículum Vitae</h4>
			<p class="mt-1 text-xs text-muted-foreground">
				Descarga directa en formato PDF oficial para el rol de {resolvedProfile.roleName}.
			</p>
		</div>

		<div class="mt-6 space-y-3">
			<a
				href={resolvedProfile.pdfUrl}
				download
				on:click={handleDownloadClick}
				class="w-full py-3 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-primary text-primary-foreground shadow-md hover:bg-primary/90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
			>
				{#if isCheckingDownload}
					<svg class="animate-spin h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
					</svg>
					<span>Preparando...</span>
				{:else}
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
					</svg>
					<span>Descargar CV (PDF)</span>
				{/if}
			</a>

			<!-- Fallback a WhatsApp si el archivo no estuviera disponible (RF-6, CL-5) -->
			{#if downloadFailed}
				<div
					role="alert"
					class="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 text-xs space-y-2 animate-in fade-in duration-200"
				>
					<p class="font-medium">El archivo no está disponible temporalmente.</p>
					<a
						href={fallbackWhatsAppUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
					>
						<span>Solicitar CV por WhatsApp</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
							<path d="M12 2C6.48 2 2 6.48 2 12c0 2.17.7 4.19 1.94 5.86L2 22l4.28-1.9A9.97 9.97 0 0012 22c5.52 0 10-4.48 10-10S17.52 2 12 2z"/>
						</svg>
					</a>
				</div>
			{/if}
		</div>
	</div>

	<!-- 3. Experiencia Profesional (Span 2) -->
	<div
		class="col-span-1 md:col-span-2 rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl hover:border-primary/30 transition-all duration-300"
	>
		<div class="flex items-center gap-2 mb-5">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
			</svg>
			<h4 class="text-lg font-bold text-foreground">Experiencia Laboral</h4>
		</div>

		<div class="space-y-4 max-h-[500px] overflow-y-auto pr-1">
			{#each (resolvedProfile.experience || []) as exp}
				<div class="p-4 rounded-2xl bg-muted/30 border border-border/50">
					<div class="flex flex-wrap items-baseline justify-between gap-1 mb-1">
						<h5 class="text-sm font-bold text-foreground">{exp.position}</h5>
						<span class="text-xs text-muted-foreground font-mono">
							{exp.startDate} - {exp.endDate}
						</span>
					</div>
					<div class="flex items-center gap-2 text-xs font-medium text-primary mb-2">
						<span>{exp.company}</span>
						{#if exp.location}
							<span class="text-muted-foreground">• {exp.location}</span>
						{/if}
					</div>
					<ul class="space-y-1.5 text-xs text-muted-foreground list-disc list-inside">
						{#each parseBullets(exp.description) as bullet}
							<li class="leading-relaxed">{bullet}</li>
						{/each}
					</ul>
				</div>
			{/each}
		</div>
	</div>

	<!-- 4. Habilidades y Competencias (Span 2) -->
	<div
		class="col-span-1 md:col-span-2 rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
	>
		<div>
			<div class="flex items-center gap-2 mb-5">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
				</svg>
				<h4 class="text-lg font-bold text-foreground">Habilidades Técnicas & Idiomas</h4>
			</div>

			<!-- Technical Skills -->
			<div class="mb-5">
				<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
					Competencias Principales
				</h5>
				<p class="text-xs sm:text-sm text-foreground/90 leading-relaxed p-3.5 rounded-2xl bg-muted/40 border border-border/60">
					{resolvedProfile.skills?.technical || ''}
				</p>
			</div>

			<!-- Languages -->
			<div class="mb-5">
				<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
					Idiomas
				</h5>
				<p class="text-xs text-foreground/80 p-3 rounded-xl bg-muted/30 border border-border/50">
					{resolvedProfile.skills?.languages || 'Español (Nativo)'}
				</p>
			</div>
		</div>

		<!-- Additional skills / Soft skills -->
		{#if resolvedProfile.skills?.additional}
			<div class="pt-4 border-t border-border/50">
				<h5 class="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
					Habilidades Interpersonales y de Gestión
				</h5>
				<p class="text-xs text-muted-foreground leading-relaxed">
					{resolvedProfile.skills.additional}
				</p>
			</div>
		{/if}
	</div>

	<!-- 5. Educación y Certificaciones Oficiales (Span 4) -->
	<div
		class="col-span-1 md:col-span-2 lg:col-span-4 rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl hover:border-primary/30 transition-all duration-300"
	>
		<div class="flex items-center gap-2 mb-6">
			<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
			</svg>
			<h4 class="text-lg font-bold text-foreground">Educación & Certificaciones</h4>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
			<!-- Columna Educación -->
			<div class="space-y-4">
				<h5 class="text-xs font-bold uppercase tracking-wider text-primary mb-1">
					Formación Académica
				</h5>
				{#each (resolvedProfile.education || []) as edu}
					<div class="p-4 rounded-2xl bg-muted/30 border border-border/50">
						<div class="flex flex-wrap items-baseline justify-between gap-1 mb-1">
							<h6 class="text-sm font-bold text-foreground">{edu.degree}</h6>
							<span class="text-xs text-muted-foreground font-mono">
								{edu.startDate} - {edu.endDate}
							</span>
						</div>
						<p class="text-xs font-semibold text-primary mb-1.5">{edu.institution}</p>
						<p class="text-xs text-muted-foreground leading-relaxed">{edu.description}</p>
					</div>
				{/each}
			</div>

			<!-- Columna Certificaciones -->
			<div class="space-y-4">
				<h5 class="text-xs font-bold uppercase tracking-wider text-primary mb-1">
					Certificaciones Destacadas
				</h5>
				<div class="space-y-3">
					{#each (resolvedProfile.skills?.certifications || []) as cert}
						<div class="p-3.5 rounded-2xl bg-muted/30 border border-border/50 flex items-center justify-between gap-3">
							<div class="flex items-center gap-2.5">
								<div class="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
									<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
										<path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
									</svg>
								</div>
								<span class="text-xs font-medium text-foreground">{cert.name}</span>
							</div>
							<span class="text-[11px] font-mono text-muted-foreground shrink-0">{cert.date}</span>
						</div>
					{/each}
				</div>
			</div>
		</div>
	</div>
</div>
