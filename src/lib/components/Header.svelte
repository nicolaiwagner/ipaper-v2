<!-- src/lib/components/Header.svelte -->
<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from 'flowbite-svelte';

	// Determine if we're on the catalog page
	$: isCatalogPage = $page.url.pathname.includes('/catalog');
</script>

<header class="absolute top-0 left-0 right-0 z-10 p-4">
	<div class="max-w-7xl mx-auto px-4 flex justify-between items-center">
		<div>
			<a
				href="/"
				class="text-xl font-bold text-[color:var(--color-happy-headline)] hover:text-[color:var(--color-happy-highlight)] transition-colors duration-200"
			>
				<span class="flex items-center">
					<svg
						class="w-6 h-6 mr-2 text-[color:var(--color-happy-highlight)]"
						fill="currentColor"
						viewBox="0 0 20 20"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fill-rule="evenodd"
							d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
							clip-rule="evenodd"
						></path>
					</svg>
					iPaper Catalog
				</span>
			</a>
		</div>

		<nav>
			{#if isCatalogPage}
				<a href="/" class="no-underline">
					<Button color="light" size="sm" class="hover:bg-[color:var(--color-happy-secondary)]">
						<svg
							class="w-4 h-4 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
						Back to Home
					</Button>
				</a>
			{:else}
				<a href="/catalog" class="no-underline">
					<Button color="light" size="sm" class="hover:bg-[color:var(--color-happy-secondary)]">
						<svg
							class="w-4 h-4 mr-2"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
								clip-rule="evenodd"
							></path>
						</svg>
						View Catalog
					</Button>
				</a>
			{/if}
		</nav>
	</div>
</header>
