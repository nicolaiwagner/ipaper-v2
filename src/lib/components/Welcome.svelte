<!-- src/lib/components/Welcome.svelte -->
<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Button } from 'flowbite-svelte';

	// Animation state
	let showContent = false;

	// Navigation function
	function navigateToCatalog() {
		goto('/catalog');
	}

	onMount(() => {
		// Animate content in after a small delay
		setTimeout(() => {
			showContent = true;
		}, 100);
	});
</script>

<div
	class="flex flex-col items-center justify-center min-h-screen p-8 bg-[color:var(--color-happy-background)]"
>
	<div
		class={`max-w-2xl mx-auto text-center transform transition-all duration-800 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`}
	>
		<div class="mb-8">
			<div class="inline-block logo">
				<svg
					class="w-20 h-20 text-[color:var(--color-happy-highlight)]"
					fill="currentColor"
					viewBox="0 0 20 20"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"
					></path>
				</svg>
			</div>
		</div>

		<h1 class="text-4xl font-bold mb-4 text-[color:var(--color-happy-headline)]">
			Interactive Product Catalog
		</h1>
		<p class="text-xl mb-6 text-[color:var(--color-happy-paragraph)]">
			Explore our carefully curated selection of premium office products.
		</p>
		<p class="text-base mb-8 opacity-80 text-[color:var(--color-happy-paragraph)]">
			• Interactive page flipping • Product hotspots • Detailed product information
		</p>

		<div class="my-8">
			<Button
				size="xl"
				class="bg-[color:var(--color-happy-button)] text-[color:var(--color-happy-buttonText)] hover:bg-[color:var(--color-happy-button)]/90 font-semibold shadow-lg border-none"
				on:click={navigateToCatalog}
			>
				Start Browsing
			</Button>
		</div>

		<div class="mt-12 opacity-70">
			<p class="text-sm text-[color:var(--color-happy-paragraph)]">
				A demo for iPaper's digital catalog platform
			</p>
		</div>
	</div>
</div>

<style>
	.logo {
		animation: float 6s ease-in-out infinite;
	}

	@keyframes float {
		0% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-10px);
		}
		100% {
			transform: translateY(0);
		}
	}
</style>
