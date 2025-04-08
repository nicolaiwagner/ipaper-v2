<!-- src/lib/components/cart/CartIcon.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cartStats } from '$lib/stores/cartStore';
	import { Button, Badge } from 'flowbite-svelte';

	// Props
	export let position: 'top-right' | 'bottom-right' = 'top-right';

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		click: { action: 'open' };
	}>();

	function handleClick() {
		dispatch('click', { action: 'open' });
	}

	// Position classes
	const positionClasses = {
		'top-right': 'top-4 right-4',
		'bottom-right': 'bottom-4 right-4'
	};
</script>

<Button
	pill={true}
	size="lg"
	class="cart-icon fixed {positionClasses[position]} z-20 shadow-lg"
	color="light"
	on:click={handleClick}
>
	<div class="relative">
		<!-- Cart Icon from Flowbite -->
		<svg
			class="w-6 h-6 text-gray-800"
			aria-hidden="true"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 18 20"
		>
			<path
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M6 15a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0h8m-8 0-1-4m9 4a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-9-4h10l2-7H3m2 7L3 4m0 0-.792-3H1"
			/>
		</svg>

		<!-- Item count badge -->
		{#if $cartStats.itemCount > 0}
			<Badge color="blue" class="absolute -top-2 -right-2 animate-pop">
				{$cartStats.itemCount > 99 ? '99+' : $cartStats.itemCount}
			</Badge>
		{/if}
	</div>
</Button>

<style>
	@keyframes pop {
		0% {
			transform: scale(0.8);
		}
		50% {
			transform: scale(1.1);
		}
		100% {
			transform: scale(1);
		}
	}

	.animate-pop {
		animation: pop 0.3s ease-out;
	}
</style>
