<script>
	import '../app.postcss';
	import { ModeWatcher } from 'mode-watcher';
	import { onNavigate } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import { openMobileMenu } from '$lib/stores';
	import { preparePageTransition } from '$lib/scripts/page-transitions';
	import { Navbar, Footer, MetaTags, MobileNav, Jarvis } from '$lib/components/site';
	import { Toaster } from 'svelte-french-toast';
	// import MobileNavbar from '$lib/components/site/mobile-navbar.svelte';

	onNavigate(() => {
		if ($openMobileMenu) {
			$openMobileMenu = false;
		}
	});

	preparePageTransition();

	$: isLanding = $page.url.pathname.startsWith('/servicios');

	$: {
		if (browser) {
			if ($openMobileMenu) {
				document.body.classList.add('overflow-hidden');
			} else if (!$openMobileMenu) {
				document.body.classList.remove('overflow-hidden');
			}
		}
	}
</script>

<ModeWatcher />
<MetaTags />
<Toaster />

{#if !isLanding}
	<Navbar />
{/if}

<div class="flex flex-col min-h-screen {isLanding ? '' : 'md:pt-10'}" data-vaul-drawer-wrapper>
	<div class="flex-1 {isLanding ? '' : 'mb-20 md:mb-0'}">
		<slot />
	</div>
	{#if !isLanding}
		<footer class="hidden border-t md:block">
			<Footer />
		</footer>
		<div class="fixed bottom-0 right-0 h-full pointer-events-none">
			<Jarvis />
		</div>
	{/if}
</div>

{#if !isLanding}
	<!-- no-highlight (touch highlights in mobile) -->
	<div class="no-highlight">
		<!-- <MobileNavbar /> -->
		<MobileNav />
	</div>
{/if}
