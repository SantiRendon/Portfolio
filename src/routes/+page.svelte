<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import ProfileSelector from '$lib/components/ProfileSelector.svelte';
	import BentoGrid from '$lib/components/BentoGrid.svelte';
	import WhatsAppFloatingButton from '$lib/components/WhatsAppFloatingButton.svelte';
	import MetaPixel from '$lib/components/MetaPixel.svelte';
	import { extractAttribution } from '$lib/utils/analytics';
	import { buildWhatsAppUrl, DEFAULT_WHATSAPP_PHONE } from '$lib/utils/whatsapp';

	// Default active profile is 'data' (Analista de Datos) per RF-3
	let activeProfileId: string = 'data';
	const phoneNumber: string = DEFAULT_WHATSAPP_PHONE;

	onMount(() => {
		if (browser) {
			// Capture attribution parameters in session storage (RF-16)
			const attr = extractAttribution(window.location.search);
			if (Object.keys(attr).length > 0) {
				sessionStorage.setItem('attribution', JSON.stringify(attr));
			}
		}
	});

	$: generalWhatsAppUrl = buildWhatsAppUrl('general', phoneNumber);
</script>

<svelte:head>
	<title>Santiago Rendón — Portafolio Profesional</title>
	<meta
		name="description"
		content="Portafolio profesional de Santiago Rendón: Analista de Datos, Especialista en Soporte y Sistemas, y Automatización de Operaciones."
	/>
</svelte:head>

<MetaPixel pixelId="1234567890" autoTrackPageView={true} />

<main class="min-h-screen px-4 py-8 sm:px-6 sm:py-12 lg:px-8 max-w-7xl mx-auto space-y-16">
	<!-- 1. Hero Section: Marca Personal y Propuesta de Valor -->
	<section class="text-center pt-4 sm:pt-10 max-w-3xl mx-auto space-y-6">
		<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-primary/10 text-primary border border-primary/20 backdrop-blur-md">
			<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
			<span>Portafolio Profesional Multidisciplinario</span>
		</div>

		<div class="space-y-3">
			<h1 class="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-foreground">
				Santiago Rendón
			</h1>
			<p class="text-lg sm:text-xl font-medium text-primary">
				Analista de Datos • Soporte TI & Sistemas • Operaciones y Data Entry
			</p>
		</div>

		<p class="text-sm sm:text-base leading-relaxed text-muted-foreground max-w-2xl mx-auto">
			Transformo datos dispersos en decisiones estratégicas con dashboards en Power BI y SQL, garantizo alta disponibilidad en infraestructura de redes y servidores, y optimizo hasta un 70% del tiempo operativo con automatización y digitalización precisa.
		</p>

		<!-- CTAs de Conversión y Navegación -->
		<div class="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
			<a
				href="/servicios"
				class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-95 transition-all"
			>
				<span>Ver Servicios Comerciales</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
				</svg>
			</a>

			<a
				href={generalWhatsAppUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold bg-muted/80 text-foreground border border-border/80 hover:bg-muted hover:border-primary/40 active:scale-95 transition-all"
			>
				<span>Hablar por WhatsApp</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-emerald-500 fill-current" viewBox="0 0 24 24">
					<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
				</svg>
			</a>
		</div>
	</section>

	<!-- 2. Selector de Perfiles (Tabs) -->
	<section id="roles" class="space-y-6 scroll-mt-10">
		<div class="text-center space-y-2">
			<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
				Especialidad Técnica & Trayectoria
			</h2>
			<p class="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
				Alterna entre los roles profesionales para consultar experiencia, competencias, proyectos demostrativos y descargar el CV oficial en PDF.
			</p>
		</div>

		<ProfileSelector
			bind:activeProfileId
			on:change={(e) => (activeProfileId = e.detail.id)}
		/>
	</section>

	<!-- 3. Cuadrícula Bento Dinámica Multi-Perfil -->
	<section aria-label="Detalle del perfil profesional activo" class="space-y-8">
		<BentoGrid profileId={activeProfileId} {phoneNumber} />
	</section>
</main>

<!-- Botón Flotante de WhatsApp Contextualizado (RF-10, RF-11) -->
<WhatsAppFloatingButton context={activeProfileId} {phoneNumber} />
