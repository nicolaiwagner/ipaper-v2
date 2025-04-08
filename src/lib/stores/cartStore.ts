// src/lib/stores/cartStore.ts
import { writable, derived } from 'svelte/store';
import type { CartItem } from '$lib/types';
import { getProductById } from '$lib/data/sampleData';

// Initialize the cart store
const createCartStore = () => {
	// Create the writable store with an empty array of cart items
	const { subscribe, update, set } = writable<CartItem[]>([]);

	return {
		subscribe,

		// Add an item to the cart or update its quantity if it already exists
		addItem: (productId: string, quantity: number = 1) => {
			update((items) => {
				const existingItemIndex = items.findIndex((item) => item.productId === productId);

				if (existingItemIndex !== -1) {
					// Item already exists, update quantity
					const updatedItems = [...items];
					updatedItems[existingItemIndex] = {
						...updatedItems[existingItemIndex],
						quantity: updatedItems[existingItemIndex].quantity + quantity
					};
					return updatedItems;
				} else {
					// Item doesn't exist, add it
					return [...items, { productId, quantity }];
				}
			});
		},

		// Remove an item from the cart
		removeItem: (productId: string) => {
			update((items) => items.filter((item) => item.productId !== productId));
		},

		// Update the quantity of an item in the cart
		updateQuantity: (productId: string, quantity: number) => {
			if (quantity <= 0) {
				// If quantity is zero or negative, remove the item
				update((items) => items.filter((item) => item.productId !== productId));
			} else {
				// Otherwise update the quantity
				update((items) =>
					items.map((item) => (item.productId === productId ? { ...item, quantity } : item))
				);
			}
		},

		// Clear the entire cart
		clearCart: () => {
			set([]);
		}
	};
};

// Create and export the cart store
export const cartStore = createCartStore();

// Derived store for cart statistics
export const cartStats = derived(cartStore, ($cartStore) => {
	// Calculate total items count
	const itemCount = $cartStore.reduce((total, item) => total + item.quantity, 0);

	// Calculate total price
	const totalPrice = $cartStore.reduce((total, item) => {
		const product = getProductById(item.productId);
		return total + (product ? product.price * item.quantity : 0);
	}, 0);

	return {
		itemCount,
		totalPrice
	};
});

// Derived store with full cart item details
export const cartItems = derived(cartStore, ($cartStore) => {
	return $cartStore.map((item) => {
		const product = getProductById(item.productId);
		return {
			...item,
			product
		};
	});
});
