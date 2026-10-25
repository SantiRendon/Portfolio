<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	export let pixelId: string = '1234567890';
	export let autoTrackPageView: boolean = true;

	onMount(() => {
		if (!browser || !pixelId) return;

		// Initialize Meta Pixel stub if not already present
		if (!(window as any).fbq) {
			const n: any = ((window as any).fbq = function (...args: any[]) {
				if (n.callMethod) {
					n.callMethod.apply(n, args);
				} else {
					n.queue.push(args);
				}
			});
			if (!(window as any)._fbq) (window as any)._fbq = n;
			n.push = n;
			n.loaded = true;
			n.version = '2.0';
			n.queue = [];

			const t = document.createElement('script');
			t.async = true;
			t.src = 'https://connect.facebook.net/en_US/fbevents.js';
			const s = document.getElementsByTagName('script')[0];
			s?.parentNode?.insertBefore(t, s);
		}

		(window as any).fbq('init', pixelId);

		if (autoTrackPageView) {
			(window as any).fbq('track', 'PageView');
		}
	});
</script>

<svelte:head>
	{#if pixelId}
		<noscript>
			<img
				height="1"
				width="1"
				style="display:none"
				src={`https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`}
				alt=""
			/>
		</noscript>
	{/if}
</svelte:head>
