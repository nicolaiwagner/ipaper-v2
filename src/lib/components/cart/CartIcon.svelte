<!-- src/lib/components/cart/CartIcon.svelte -->
<script lang="ts">
	import { createEventDispatcher, onMount, afterUpdate } from 'svelte';
	import { cartStats, getCartCount } from '$lib/stores/cartStore';
	import { Button, Badge } from 'flowbite-svelte';
	import { CartOutline } from 'flowbite-svelte-icons';

	// Props
	export let position: 'top-right' | 'bottom-right' = 'top-right';

	// Event dispatcher
	const dispatch = createEventDispatcher<{
		click: { action: 'open' };
	}>();

	// State for animations
	let prevItemCount = 0;
	let showCartAddedAnimation = false;
	let animating = false;

	// Setup initial count on mount
	onMount(() => {
		prevItemCount = getCartCount();
	});

	// Check for cart updates
	afterUpdate(() => {
		const currentCount = $cartStats.itemCount;

		// Only trigger animation when items are added (not removed)
		if (currentCount > prevItemCount && !animating) {
			triggerAddedAnimation();
		}

		prevItemCount = currentCount;
	});

	// Handle click
	function handleClick() {
		dispatch('click', { action: 'open' });
	}

	// Trigger animation for adding to cart
	function triggerAddedAnimation() {
		if (animating) return;

		animating = true;
		showCartAddedAnimation = true;

		// Reset animation state after animation completes
		setTimeout(() => {
			showCartAddedAnimation = false;
			animating = false;
		}, 1000); // Animation duration
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
	class="cart-icon fixed {positionClasses[
		position
	]} z-20 shadow-lg transition-transform duration-300 {showCartAddedAnimation
		? 'cart-added-animation'
		: ''}"
	color="light"
	on:click={handleClick}
>
	<div class="relative">
		<!-- Cart Icon -->
		<CartOutline class="w-6 h-6" />

		<!-- Item count badge -->
		{#if $cartStats.itemCount > 0}
			<Badge
				color="blue"
				class="absolute -top-4 -right-3 {showCartAddedAnimation ? 'badge-pulse' : 'animate-pop'}"
			>
				{$cartStats.itemCount > 99 ? '99+' : $cartStats.itemCount}
			</Badge>
		{/if}
	</div>
</Button>

<!-- Item added animation elements (only shown when adding to cart) -->
{#if showCartAddedAnimation}
	<div
		class="added-notification fixed {positionClasses[
			position
		]} z-20 text-xs text-green-600 font-medium bg-green-100 px-2 py-1 mr-16 rounded-full opacity-0 added-text-animation"
	>
		Item added!
	</div>
{/if}

<style>
	/* Pop animation for initial render */
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

	/* Pulse animation for badge when adding items */
	@keyframes badgePulse {
		0% {
			transform: scale(1);
			filter: brightness(100%);
		}
		50% {
			transform: scale(1.4);
			filter: brightness(120%);
		}
		100% {
			transform: scale(1);
			filter: brightness(100%);
		}
	}

	.badge-pulse {
		animation: badgePulse 0.6s ease-out;
	}

	/* Cart button animation when adding items */
	@keyframes cartBounce {
		0% {
			transform: scale(1);
		}
		40% {
			transform: scale(1.15);
		}
		70% {
			transform: scale(0.95);
		}
		100% {
			transform: scale(1);
		}
	}

	.cart-added-animation {
		animation: cartBounce 0.6s ease-out;
	}

	/* Added to cart notification animation */
	@keyframes addedTextAnimation {
		0% {
			opacity: 0;
			transform: translateY(15px);
		}
		30% {
			opacity: 1;
			transform: translateY(0);
		}
		70% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(-15px);
		}
	}

	.added-text-animation {
		animation: addedTextAnimation 1s ease-out forwards;
	}
</style>
