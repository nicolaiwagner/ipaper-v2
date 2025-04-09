<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { Button } from 'flowbite-svelte';
	import { page } from '$app/stores'; // Import the page store to access the current URL
	import { ArrowLeftOutline, PaperPlaneSolid, ArrowRightOutline } from 'flowbite-svelte-icons'; // Import the icon for the button

	// Determine if we're on the catalog page
</script>

<header class="absolute top-0 left-0 right-0 z-10 p-4">
	<div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
		<div>
			<a
				href="/"
				class="text-xl font-bold text-[color:var(--color-happy-headline)] hover:text-[color:var(--color-happy-highlight)] transition-colors duration-200"
			>
				<span class="flex items-center">
					<PaperPlaneSolid class="w-6 h-6 mr-2 text-happy-button" />
					<!-- Use the imported icon here -->
					iPaper Catalog
				</span>
			</a>
		</div>

		<nav>
			{#if $page.url.pathname.includes('/catalog')}
				<a href="/" class="no-underline">
					<Button color="light" size="sm" class="hover:bg-[color:var(--color-happy-secondary)]">
						<ArrowLeftOutline />
						Back to Home
					</Button>
				</a>
			{:else}
				<a href="/catalog" class="no-underline">
					<Button color="light" size="sm" class="hover:bg-[color:var(--color-happy-secondary)]">
						<ArrowRightOutline />
						View Catalog
					</Button>
				</a>
			{/if}
		</nav>
	</div>
</header>
