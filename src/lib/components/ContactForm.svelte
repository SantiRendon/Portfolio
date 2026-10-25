<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { validateContactForm } from '$lib/utils/validator';
	import { buildMetaEvent } from '$lib/utils/analytics';

	export let serviceContext: string = 'general';
	export let attribution: Record<string, string> = {};
	export let title: string = 'Contáctame para una cotización';
	export let subtitle: string = 'Completa el formulario y responderé en menos de 24 horas.';
	export let submitHandler: ((data: typeof formData) => Promise<{ success: boolean; message?: string }>) | undefined = undefined;

	const dispatch = createEventDispatcher<{
		submitSuccess: { data: typeof formData; leadEvent: any };
		submitError: { error: string };
	}>();

	let formData = {
		name: '',
		email: '',
		phone: '',
		message: ''
	};

	let errors: Record<string, string> = {};
	let isLoading: boolean = false;
	let isSuccess: boolean = false;
	let serverErrorMessage: string = '';

	async function handleSubmit(e: Event) {
		e.preventDefault();
		serverErrorMessage = '';

		// 1. Pure validation
		const validation = validateContactForm(formData);
		if (!validation.isValid) {
			errors = validation.errors;
			return;
		}

		errors = {};
		isLoading = true;

		try {
			// 2. Process form (custom handler or default simulation)
			if (submitHandler) {
				const response = await submitHandler(formData);
				if (!response.success) {
					throw new Error(response.message || 'Ocurrió un error al procesar el mensaje.');
				}
			} else {
				// Default reliable simulation for frontend delivery
				await new Promise((resolve) => setTimeout(resolve, 800));
			}

			// 3. Lead Conversion tracking
			const leadEvent = buildMetaEvent('Lead', {
				service: serviceContext,
				name: formData.name,
				email: formData.email
			}, attribution);

			if (typeof window !== 'undefined' && (window as any).fbq) {
				(window as any).fbq(
					leadEvent.isCustom ? 'trackCustom' : 'track',
					leadEvent.name,
					leadEvent.data
				);
			}

			dispatch('submitSuccess', { data: { ...formData }, leadEvent });

			// 4. Reset on success (RF-13)
			isSuccess = true;
			formData = { name: '', email: '', phone: '', message: '' };
		} catch (err: any) {
			// 5. Preserve form data on error (CL-2)
			serverErrorMessage = err?.message || 'Error de conexión. Tus datos están a salvo; por favor reintenta.';
			dispatch('submitError', { error: serverErrorMessage });
		} finally {
			isLoading = false;
		}
	}

	function resetSuccess() {
		isSuccess = false;
	}
</script>

<div class="w-full max-w-xl mx-auto rounded-3xl bg-card border border-border/80 shadow-2xl p-6 sm:p-8 backdrop-blur-xl">
	<div class="mb-6 text-center">
		<h3 class="text-xl sm:text-2xl font-bold tracking-tight text-foreground">{title}</h3>
		{#if subtitle}
			<p class="mt-2 text-sm text-muted-foreground">{subtitle}</p>
		{/if}
	</div>

	{#if isSuccess}
		<div
			role="status"
			aria-live="polite"
			class="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center animate-in fade-in duration-300"
		>
			<div class="w-12 h-12 mx-auto mb-3 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
				<svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
					<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
				</svg>
			</div>
			<h4 class="text-lg font-semibold text-foreground">¡Mensaje enviado con éxito!</h4>
			<p class="mt-1 text-sm text-muted-foreground">
				Gracias por escribir. He recibido tus datos y te contactaré a la brevedad.
			</p>
			<button
				type="button"
				on:click={resetSuccess}
				class="mt-4 px-4 py-2 text-xs font-medium rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
			>
				Enviar otro mensaje
			</button>
		</div>
	{:else}
		<form on:submit={handleSubmit} novalidate class="space-y-4">
			{#if serverErrorMessage}
				<div
					role="alert"
					class="p-3.5 rounded-xl bg-destructive/15 border border-destructive/30 text-destructive text-sm flex items-center gap-2"
				>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<circle cx="12" cy="12" r="10" />
						<line x1="12" y1="8" x2="12" y2="12" />
						<line x1="12" y1="16" x2="12.01" y2="16" />
					</svg>
					<span>{serverErrorMessage}</span>
				</div>
			{/if}

			<!-- Field: Name -->
			<div>
				<label for="contact-name" class="block text-xs font-semibold text-foreground mb-1.5">
					Nombre completo <span class="text-destructive">*</span>
				</label>
				<input
					id="contact-name"
					type="text"
					bind:value={formData.name}
					placeholder="Ej. Ana María Torres"
					disabled={isLoading}
					aria-invalid={errors.name ? 'true' : 'false'}
					aria-describedby={errors.name ? 'error-contact-name' : undefined}
					class="w-full px-4 py-2.5 rounded-xl bg-background/60 border {errors.name ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'} text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				{#if errors.name}
					<p id="error-contact-name" role="alert" class="mt-1 text-xs text-destructive font-medium">
						{errors.name}
					</p>
				{/if}
			</div>

			<!-- Field: Email -->
			<div>
				<label for="contact-email" class="block text-xs font-semibold text-foreground mb-1.5">
					Correo electrónico <span class="text-destructive">*</span>
				</label>
				<input
					id="contact-email"
					type="email"
					bind:value={formData.email}
					placeholder="tu@empresa.com"
					disabled={isLoading}
					aria-invalid={errors.email ? 'true' : 'false'}
					aria-describedby={errors.email ? 'error-contact-email' : undefined}
					class="w-full px-4 py-2.5 rounded-xl bg-background/60 border {errors.email ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'} text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				{#if errors.email}
					<p id="error-contact-email" role="alert" class="mt-1 text-xs text-destructive font-medium">
						{errors.email}
					</p>
				{/if}
			</div>

			<!-- Field: Phone (Optional) -->
			<div>
				<label for="contact-phone" class="block text-xs font-semibold text-foreground mb-1.5">
					Teléfono / WhatsApp <span class="text-muted-foreground font-normal">(opcional)</span>
				</label>
				<input
					id="contact-phone"
					type="tel"
					bind:value={formData.phone}
					placeholder="+57 300 123 4567"
					disabled={isLoading}
					aria-invalid={errors.phone ? 'true' : 'false'}
					aria-describedby={errors.phone ? 'error-contact-phone' : undefined}
					class="w-full px-4 py-2.5 rounded-xl bg-background/60 border {errors.phone ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'} text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
				/>
				{#if errors.phone}
					<p id="error-contact-phone" role="alert" class="mt-1 text-xs text-destructive font-medium">
						{errors.phone}
					</p>
				{/if}
			</div>

			<!-- Field: Message -->
			<div>
				<label for="contact-message" class="block text-xs font-semibold text-foreground mb-1.5">
					Mensaje o requerimiento <span class="text-destructive">*</span>
				</label>
				<textarea
					id="contact-message"
					rows="4"
					bind:value={formData.message}
					placeholder="Cuéntame sobre tu proyecto, volumen de datos o requerimiento técnico..."
					disabled={isLoading}
					aria-invalid={errors.message ? 'true' : 'false'}
					aria-describedby={errors.message ? 'error-contact-message' : undefined}
					class="w-full px-4 py-2.5 rounded-xl bg-background/60 border {errors.message ? 'border-destructive focus:ring-destructive' : 'border-input focus:ring-primary'} text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed resize-none"
				></textarea>
				{#if errors.message}
					<p id="error-contact-message" role="alert" class="mt-1 text-xs text-destructive font-medium">
						{errors.message}
					</p>
				{/if}
			</div>

			<!-- Submit Button -->
			<button
				type="submit"
				disabled={isLoading}
				class="w-full mt-2 py-3 px-6 rounded-xl font-semibold text-sm bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed"
			>
				{#if isLoading}
					<svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-primary-foreground" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
						<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
						<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
					</svg>
					<span>Enviando mensaje...</span>
				{:else}
					<span>Enviar Solicitud</span>
					<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
						<line x1="22" y1="2" x2="11" y2="13" />
						<polygon points="22 2 15 22 11 13 2 9 22 2" />
					</svg>
				{/if}
			</button>
		</form>
	{/if}
</div>
