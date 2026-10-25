<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import WhatsAppFloatingButton from '$lib/components/WhatsAppFloatingButton.svelte';
	import MetaPixel from '$lib/components/MetaPixel.svelte';
	import { extractAttribution } from '$lib/utils/analytics';
	import { buildWhatsAppUrl, DEFAULT_WHATSAPP_PHONE } from '$lib/utils/whatsapp';

	const phoneNumber = DEFAULT_WHATSAPP_PHONE;
	let attribution: Record<string, string> = {};

	onMount(() => {
		if (browser) {
			// Extract and persist UTM / fbclid attribution parameters (RF-16)
			const urlAttr = extractAttribution(window.location.search);
			const stored = sessionStorage.getItem('attribution');
			const existingAttr = stored ? JSON.parse(stored) : {};

			attribution = { ...existingAttr, ...urlAttr };

			if (Object.keys(attribution).length > 0) {
				sessionStorage.setItem('attribution', JSON.stringify(attribution));
			}
		}
	});

	// Contextual WhatsApp URLs for services (RF-11)
	$: dataWhatsAppUrl = buildWhatsAppUrl('data', phoneNumber);
	$: systemsWhatsAppUrl = buildWhatsAppUrl('systems', phoneNumber);
	$: aiWhatsAppUrl = buildWhatsAppUrl('ai', phoneNumber);
	$: generalWhatsAppUrl = buildWhatsAppUrl('general', phoneNumber);
</script>

<svelte:head>
	<title>Servicios Especializados — Santiago Rendón | Datos, BI e Inteligencia Artificial</title>
	<meta
		name="description"
		content="Soluciones en Análisis de Datos, Business Intelligence e Ingeniería de Inteligencia Artificial. Optimiza más del 50% de tus tiempos operativos con dashboards ejecutivos y agentes de IA."
	/>
</svelte:head>

<MetaPixel pixelId="1234567890" autoTrackPageView={true} />

<!-- Barra superior minimalista sin fugas de tráfico (RF-1) -->
<header class="w-full border-b border-border/70 bg-card/60 backdrop-blur-md sticky top-0 z-40">
	<div class="max-w-6xl mx-auto px-4 py-3 sm:px-6 flex items-center justify-between">
		<div class="flex items-center gap-2">
			<span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
			<span class="font-extrabold text-sm sm:text-base tracking-tight text-foreground">
				Santiago Rendón <span class="font-normal text-muted-foreground">• Servicios</span>
			</span>
		</div>

		<div class="flex items-center gap-3">
			<a
				href="/"
				class="hidden sm:inline-flex text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
			>
				Ver Portafolio
			</a>
			<a
				href={generalWhatsAppUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#25D366] text-white hover:bg-[#20ba5a] active:scale-95 transition-all shadow-sm"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
					<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
				</svg>
				<span>WhatsApp</span>
			</a>
		</div>
	</div>
</header>

<main class="min-h-screen px-4 py-8 sm:px-6 sm:py-14 lg:px-8 max-w-6xl mx-auto space-y-20">
	<!-- 1. Hero Comercial Directo (RF-7) -->
	<section class="text-center max-w-3xl mx-auto space-y-6 pt-4 sm:pt-6">
		<div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 backdrop-blur-md">
			<span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
			<span>Consultoría y Servicios Técnicos Especializados</span>
		</div>

		<h1 class="text-3xl sm:text-5xl font-black tracking-tight text-foreground leading-tight">
			Soluciones en Datos, Business Intelligence e Inteligencia Artificial para tu Negocio
		</h1>

		<p class="text-base sm:text-xl text-muted-foreground leading-relaxed">
			Reduce más de un <strong>+50% del tiempo operativo</strong> con dashboards ejecutivos en tiempo real, arquitecturas de datos confiables y agentes de IA autónomos diseñados a medida.
		</p>

		<!-- CTAs Primarios -->
		<div class="pt-2 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
			<a
				href={generalWhatsAppUrl}
				target="_blank"
				rel="noopener noreferrer"
				class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-bold bg-[#25D366] text-white shadow-xl hover:bg-[#20ba5a] active:scale-95 transition-all"
			>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 fill-current" viewBox="0 0 24 24">
					<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
				</svg>
				<span>Cotizar Solución por WhatsApp</span>
			</a>

			<a
				href="#contacto"
				class="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold bg-muted/80 text-foreground border border-border/80 hover:bg-muted hover:border-primary/40 active:scale-95 transition-all"
			>
				<span>Solicitar Propuesta Escrita</span>
				<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
				</svg>
			</a>
		</div>
	</section>

	<!-- 2. Catálogo Bento de 3 Servicios (RF-8) -->
	<section id="servicios" class="space-y-8 scroll-mt-20">
		<div class="text-center space-y-2">
			<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
				Servicios Técnicos Especializados
			</h2>
			<p class="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
				Elige el área donde tu empresa necesita acelerar resultados o cotiza una solución técnica integral.
			</p>
		</div>

		<div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
			<!-- Servicio 1: Análisis de Datos y Dashboards Ejecutivos -->
			<div class="rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-emerald-500/50 transition-all duration-300">
				<div>
					<div class="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mb-5">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
						</svg>
					</div>

					<h3 class="text-xl font-bold text-foreground">Análisis de Datos y Dashboards Ejecutivos</h3>
					<p class="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Diseño de tableros interactivos de alto impacto en Power BI con modelado estrella y DAX avanzado para monitorear ventas, finanzas, inventarios y KPIs en tiempo real.
					</p>

					<div class="mt-5 space-y-2 text-xs text-foreground/90">
						<div class="flex items-center gap-2">
							<span class="text-emerald-500 font-bold">✓</span>
							<span>Dashboards ejecutivos en Power BI con DAX avanzado</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-emerald-500 font-bold">✓</span>
							<span>Modelado multidimensional de datos (esquemas estrella y copo de nieve)</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-emerald-500 font-bold">✓</span>
							<span>Monitoreo de KPIs y generación de insights para decisiones estratégicas</span>
						</div>
					</div>
				</div>

				<div class="mt-8 pt-4 border-t border-border/50">
					<a
						href={dataWhatsAppUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center gap-2"
					>
						<span>Cotizar Dashboards</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
							<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Servicio 2: Business Intelligence & Arquitectura de Datos -->
			<div class="rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-sky-500/50 transition-all duration-300">
				<div>
					<div class="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 text-sky-500 flex items-center justify-center mb-5">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
						</svg>
					</div>

					<h3 class="text-xl font-bold text-foreground">Business Intelligence & Arquitectura de Datos</h3>
					<p class="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Pipelines ETL robustos en Python, estructuración de bases de datos relacionales, consumo e integración de APIs REST y optimización SQL para datos limpios y consistentes.
					</p>

					<div class="mt-5 space-y-2 text-xs text-foreground/90">
						<div class="flex items-center gap-2">
							<span class="text-sky-500 font-bold">✓</span>
							<span>Pipelines de ingesta y transformación ETL/ELT con Python y SQL</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sky-500 font-bold">✓</span>
							<span>Estructuración y optimización de bases de datos relacionales</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-sky-500 font-bold">✓</span>
							<span>Integración de APIs REST y automatización de flujos de datos</span>
						</div>
					</div>
				</div>

				<div class="mt-8 pt-4 border-t border-border/50">
					<a
						href={systemsWhatsAppUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/30 hover:bg-sky-500 hover:text-white transition-all flex items-center justify-center gap-2"
					>
						<span>Cotizar Solución BI</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
							<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
						</svg>
					</a>
				</div>
			</div>

			<!-- Servicio 3: Ingeniería de Inteligencia Artificial & Automatización -->
			<div class="rounded-3xl bg-card/75 border border-border/80 backdrop-blur-xl p-6 sm:p-8 shadow-xl flex flex-col justify-between hover:border-violet-500/50 transition-all duration-300">
				<div>
					<div class="w-12 h-12 rounded-2xl bg-violet-500/10 border border-violet-500/20 text-violet-500 flex items-center justify-center mb-5">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<rect x="4" y="4" width="16" height="16" rx="2" />
							<rect x="9" y="9" width="6" height="6" />
							<path stroke-linecap="round" stroke-linejoin="round" d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
						</svg>
					</div>

					<h3 class="text-xl font-bold text-foreground">Ingeniería de Inteligencia Artificial & Automatización</h3>
					<p class="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
						Agentes de IA autónomos, soluciones con IA Generativa y LLMs, automatización robótica de procesos, web scraping masivo y microservicios escalables en nube (AWS / GCP).
					</p>

					<div class="mt-5 space-y-2 text-xs text-foreground/90">
						<div class="flex items-center gap-2">
							<span class="text-violet-500 font-bold">✓</span>
							<span>Agentes de IA y pipelines de IA Generativa con LLMs</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-violet-500 font-bold">✓</span>
							<span>Automatización de tareas repetitivas y web scraping masivo</span>
						</div>
						<div class="flex items-center gap-2">
							<span class="text-violet-500 font-bold">✓</span>
							<span>Arquitecturas serverless y despliegues en nube (AWS / GCP)</span>
						</div>
					</div>
				</div>

				<div class="mt-8 pt-4 border-t border-border/50">
					<a
						href={aiWhatsAppUrl}
						target="_blank"
						rel="noopener noreferrer"
						class="w-full py-2.5 px-4 rounded-xl font-semibold text-xs bg-violet-500/10 text-violet-600 dark:text-violet-400 border border-violet-500/30 hover:bg-violet-500 hover:text-white transition-all flex items-center justify-center gap-2"
					>
						<span>Cotizar Solución de IA</span>
						<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
							<path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2z"/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</section>

	<!-- 3. Sección de Casos de Uso y Credibilidad (RF-9) -->
	<section class="space-y-8">
		<div class="text-center space-y-2">
			<h2 class="text-2xl sm:text-3xl font-extrabold tracking-tight text-foreground">
				Impacto y Resultados Medibles
			</h2>
			<p class="text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto">
				Métricas concretas obtenidas en optimización técnica y operativa para empresas y organizaciones.
			</p>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<div class="rounded-3xl bg-card/60 border border-border/80 p-6 text-center shadow-lg">
				<div class="text-4xl sm:text-5xl font-black text-violet-500 tracking-tight">+50%</div>
				<h4 class="mt-2 text-base font-bold text-foreground">Reducción de Tiempos Operativos</h4>
				<p class="mt-2 text-xs text-muted-foreground">
					Implementación de agentes de IA y automatizaciones inteligentes para tareas analíticas y flujos de trabajo repetitivos.
				</p>
			</div>

			<div class="rounded-3xl bg-card/60 border border-border/80 p-6 text-center shadow-lg">
				<div class="text-4xl sm:text-5xl font-black text-emerald-500 tracking-tight">100%</div>
				<h4 class="mt-2 text-base font-bold text-foreground">Dashboards en Tiempo Real</h4>
				<p class="mt-2 text-xs text-muted-foreground">
					Visibilidad continua y sin retrasos de métricas financieras, comerciales y operativas para comités gerenciales.
				</p>
			</div>

			<div class="rounded-3xl bg-card/60 border border-border/80 p-6 text-center shadow-lg">
				<div class="text-4xl sm:text-5xl font-black text-sky-500 tracking-tight">99.9%</div>
				<h4 class="mt-2 text-base font-bold text-foreground">Confiabilidad en Datos</h4>
				<p class="mt-2 text-xs text-muted-foreground">
					Pipelines ETL en Python y estructuras SQL robustas con validaciones automatizadas y sincronización sin discrepancias.
				</p>
			</div>
		</div>
	</section>

	<!-- 4. Formulario de Contacto Directo (RF-12, RF-13, RF-14, RF-15, RF-18) -->
	<section id="contacto" class="space-y-6 scroll-mt-20">
		<ContactForm
			serviceContext="servicios"
			{attribution}
			title="Cotiza tu Solución o Proyecto"
			subtitle="Cuéntame sobre tu requerimiento. Recibirás respuesta técnica y cotización estimada en menos de 24 horas."
		/>
	</section>
</main>

<!-- Pie de página comercial sobrio -->
<footer class="border-t border-border/70 py-8 px-4 text-center text-xs text-muted-foreground bg-card/40">
	<p>© {new Date().getFullYear()} Santiago Rendón • Servicios en Datos, BI e Inteligencia Artificial</p>
	<p class="mt-1">
		<a href="/" class="hover:text-foreground underline underline-offset-4">Ir al Portafolio Profesional</a>
	</p>
</footer>

<!-- Botón Flotante de WhatsApp para la Landing (RF-10, RF-11, RF-17) -->
<WhatsAppFloatingButton context="general" {phoneNumber} />
