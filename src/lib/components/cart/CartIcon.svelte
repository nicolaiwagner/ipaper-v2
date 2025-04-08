<!-- src/lib/components/cart/CartIcon.svelte -->
<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { cartStats } from '$lib/stores/cartStore';
	import { Button, Badge } from 'flowbite-svelte';
	import { CartOutline } from 'flowbite-svelte-icons';

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
		<CartOutline class="w-8 h-8" />

		<!-- Item count badge -->
		{#if $cartStats.itemCount > 0}
			<Badge color="blue" class="absolute -top-4 -right-3 animate-pop">
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

	/* .animate-pop {
		animation: pop 0.3s ease-out;
	} */
</style>
