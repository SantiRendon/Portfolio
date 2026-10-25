<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import defaultData from '$lib/data/profiles.json';

	export let profiles: Array<{ id: string; roleName: string }> = defaultData.profiles;
	export let activeProfileId: string = 'data';

	const dispatch = createEventDispatcher<{ change: { id: string } }>();

	function handleSelect(id: string) {
		if (activeProfileId === id) return;
		activeProfileId = id;
		dispatch('change', { id });
	}

	function handleKeyDown(event: KeyboardEvent, index: number) {
		let newIndex = index;
		if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
			event.preventDefault();
			newIndex = (index + 1) % profiles.length;
		} else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
			event.preventDefault();
			newIndex = (index - 1 + profiles.length) % profiles.length;
		} else if (event.key === 'Home') {
			event.preventDefault();
			newIndex = 0;
		} else if (event.key === 'End') {
			event.preventDefault();
			newIndex = profiles.length - 1;
		}

		if (newIndex !== index) {
			handleSelect(profiles[newIndex].id);
			const targetBtn = document.getElementById(`tab-profile-${profiles[newIndex].id}`);
			targetBtn?.focus();
		}
	}
</script>

<div
	role="tablist"
	aria-label="Selector de rol profesional"
	class="inline-flex flex-wrap items-center justify-center p-1.5 rounded-2xl bg-muted/70 border border-border/80 backdrop-blur-md shadow-inner gap-1.5 w-full max-w-2xl mx-auto"
>
	{#each profiles as profile, i (profile.id)}
		{@const isActive = activeProfileId === profile.id}
		<button
			id={`tab-profile-${profile.id}`}
			role="tab"
			type="button"
			aria-selected={isActive}
			aria-controls={`panel-profile-${profile.id}`}
			tabindex={isActive ? 0 : -1}
			on:click={() => handleSelect(profile.id)}
			on:keydown={(e) => handleKeyDown(e, i)}
			class="flex-1 min-w-[150px] sm:min-w-[170px] inline-flex items-center justify-center gap-2 py-2.5 px-4 text-xs sm:text-sm font-medium rounded-xl transition-all duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 {isActive
				? 'bg-background text-foreground shadow-sm font-semibold border border-border/90'
				: 'text-muted-foreground hover:text-foreground hover:bg-background/40'}"
		>
			{#if profile.id === 'data'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-emerald-500 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M3 3v18h18" />
					<path d="m19 9-5 5-4-4-3 3" />
				</svg>
			{:else if profile.id === 'systems'}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-sky-500 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<rect width="20" height="8" x="2" y="2" rx="2" />
					<rect width="20" height="8" x="2" y="14" rx="2" />
					<line x1="6" x2="6.01" y1="6" y2="6" />
					<line x1="6" x2="6.01" y1="18" y2="18" />
				</svg>
			{:else}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="w-4 h-4 text-amber-500 shrink-0"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
					aria-hidden="true"
				>
					<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
					<path d="M14 2v4a2 2 0 0 0 2 2h4" />
					<path d="M10 13h4" />
					<path d="M10 17h4" />
				</svg>
			{/if}
			<span class="truncate">{profile.roleName}</span>
		</button>
	{/each}
</div>
