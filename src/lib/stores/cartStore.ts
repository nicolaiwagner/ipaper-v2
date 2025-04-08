// src/lib/stores/cartStore.ts
import { writable, derived, get } from 'svelte/store';
import type { CartItem } from '$lib/types';
import { getProductById } from '$lib/data/sampleData';
import { browser } from '$app/environment';

// Storage key for cart data
const CART_STORAGE_KEY = 'interactive-catalog-cart';

// Initialize the cart store
const createCartStore = () => {
	// Function to load cart from sessionStorage
	const loadCart = (): CartItem[] => {
		if (!browser) return []; // Skip on server-side rendering

		try {
			const storedCart = sessionStorage.getItem(CART_STORAGE_KEY);
			if (storedCart) {
				return JSON.parse(storedCart);
			}
		} catch (error) {
			console.error('Failed to load cart from sessionStorage:', error);
		}
		return [];
	};

	// Function to save cart to sessionStorage
	const saveCart = (items: CartItem[]): void => {
		if (!browser) return; // Skip on server-side rendering

		try {
			sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
		} catch (error) {
			console.error('Failed to save cart to sessionStorage:', error);
		}
	};

	// Create the writable store with initial data loaded from sessionStorage
	const { subscribe, update, set } = writable<CartItem[]>(loadCart());

	// Create a custom store with additional methods
	const customStore = {
		subscribe,

		// Add an item to the cart or update its quantity if it already exists
		addItem: (productId: string, quantity: number = 1) => {
			update((items) => {
				const existingItemIndex = items.findIndex((item) => item.productId === productId);

				let updatedItems;
				if (existingItemIndex !== -1) {
					// Item already exists, update quantity
					updatedItems = [...items];
					updatedItems[existingItemIndex] = {
						...updatedItems[existingItemIndex],
						quantity: updatedItems[existingItemIndex].quantity + quantity
					};
				} else {
					// Item doesn't exist, add it
					updatedItems = [...items, { productId, quantity }];
				}

				// Save to sessionStorage after update
				saveCart(updatedItems);
				return updatedItems;
			});
		},

		// Remove an item from the cart
		removeItem: (productId: string) => {
			update((items) => {
				const filteredItems = items.filter((item) => item.productId !== productId);
				// Save to sessionStorage after update
				saveCart(filteredItems);
				return filteredItems;
			});
		},

		// Update the quantity of an item in the cart
		updateQuantity: (productId: string, quantity: number) => {
			if (quantity <= 0) {
				// If quantity is zero or negative, remove the item
				customStore.removeItem(productId);
			} else {
				// Otherwise update the quantity
				update((items) => {
					const updatedItems = items.map((item) =>
						item.productId === productId ? { ...item, quantity } : item
					);
					// Save to sessionStorage after update
					saveCart(updatedItems);
					return updatedItems;
				});
			}
		},

		// Clear the entire cart
		clearCart: () => {
			// Clear from sessionStorage
			if (browser) {
				sessionStorage.removeItem(CART_STORAGE_KEY);
			}
			set([]);
		}
	};

	return customStore;
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

// Helper to get latest cart count without subscription
export function getCartCount(): number {
	const stats = get(cartStats);
	return stats.itemCount;
}
