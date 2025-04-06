// src/lib/stores/catalogStore.ts
import { writable } from 'svelte/store';
import { catalogPages } from '$lib/data/sampleData';

// Store for the current page index
export const currentPageIndex = writable(0);

// Derived values to get current page and total pages
export const totalPages = catalogPages.length;

// Function to go to a specific page
export function goToPage(index: number) {
	if (index >= 0 && index < totalPages) {
		currentPageIndex.set(index);
	}
}

// Function to go to next page
export function nextPage() {
	currentPageIndex.update((index) => {
		if (index < totalPages - 1) {
			return index + 1;
		}
		return index;
	});
}

// Function to go to previous page
export function previousPage() {
	currentPageIndex.update((index) => {
		if (index > 0) {
			return index - 1;
		}
		return index;
	});
}
