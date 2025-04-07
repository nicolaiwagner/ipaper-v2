// src/lib/data/sampleData.ts
import type { Product, CatalogPage } from '$lib/types';

// Sample products
export const products: Product[] = [
	{
		id: 'p1',
		name: 'Modern Desk Lamp',
		description:
			'Sleek, adjustable desk lamp with USB charging port. Perfect for your home office.',
		price: 49.99,
		imageUrl: '/images/desk-lamp.jpg',
		details: {
			Material: 'Aluminum and Steel',
			Color: 'Matte Black',
			Height: '45 cm'
		}
	},
	{
		id: 'p2',
		name: 'Ergonomic Office Chair',
		description:
			'High-back mesh chair with lumbar support and adjustable armrests for all-day comfort.',
		price: 199.99,
		imageUrl: '/images/office-chair.jpg',
		details: {
			Material: 'Mesh and Steel Frame',
			Color: 'Black',
			'Weight Capacity': '120 kg'
		}
	},
	{
		id: 'p3',
		name: 'Wireless Keyboard',
		description: 'Ultra-slim wireless keyboard with backlit keys and multi-device connectivity.',
		price: 79.99,
		imageUrl: '/images/wireless-keyboard.jpg',
		details: {
			Connectivity: 'Bluetooth 5.0',
			'Battery Life': 'Up to 2 months',
			'Compatible with': 'Windows, macOS, iOS, Android'
		}
	},
	{
		id: 'p4',
		name: 'Premium Notebook',
		description: 'A5 hardcover notebook with premium paper, bookmark ribbons, and elastic closure.',
		price: 19.99,
		imageUrl: '/images/notebook.jpg',
		details: {
			Size: 'A5 (148 x 210 mm)',
			Pages: '192 (96 sheets)',
			Paper: '100 gsm, Acid-free'
		}
	},
	{
		id: 'p5',
		name: 'Minimalist Desk Organizer',
		description: 'Wooden desk organizer with compartments for supplies and smartphone stand.',
		price: 34.99,
		imageUrl: '/images/desk-organizer.jpg',
		details: {
			Material: 'Bamboo',
			Dimensions: '25 x 15 x 12 cm',
			Compartments: '5'
		}
	},
	{
		id: 'p6',
		name: 'Smart LED Bulb Pack',
		description:
			'Set of 2 Wi-Fi enabled color-changing LED bulbs. Control via app or voice assistant.',
		price: 29.99,
		imageUrl: '/images/smart-bulbs.jpg',
		details: {
			Brightness: '800 lumens',
			'Color Temperature': '2700K-6500K',
			Compatibility: 'Alexa, Google Home, HomeKit'
		}
	}
];

// Sample catalog pages with hotspots
export const catalogPages: CatalogPage[] = [
	{
		id: 'page1',
		imageUrl: '/images/catalog-page-1.jpg',
		hotspots: [
			{
				id: 'hs1',
				productId: 'p1', // Desk Lamp
				position: { x: 30, y: 40 },
				size: 24
			},
			{
				id: 'hs2',
				productId: 'p5', // Desk Organizer
				position: { x: 70, y: 60 },
				size: 24
			}
		]
	},
	{
		id: 'page2',
		imageUrl: '/images/catalog-page-2.jpg',
		hotspots: [
			{
				id: 'hs3',
				productId: 'p2', // Office Chair
				position: { x: 50, y: 50 },
				size: 28
			},
			{
				id: 'hs4',
				productId: 'p3', // Wireless Keyboard
				position: { x: 75, y: 30 },
				size: 22
			}
		]
	},
	{
		id: 'page3',
		imageUrl: '/images/catalog-page-3.jpg',
		hotspots: [
			{
				id: 'hs5',
				productId: 'p6', // Smart LED Bulbs
				position: { x: 25, y: 35 },
				size: 22
			},
			{
				id: 'hs6',
				productId: 'p4', // Premium Notebook
				position: { x: 40, y: 70 },
				size: 18
			}
		]
	},
	{
		id: 'page4',
		imageUrl: '/images/catalog-page-4.jpg',
		hotspots: [
			{
				id: 'hs7',
				productId: 'p3', // Wireless Keyboard (appearing again)
				position: { x: 55, y: 45 },
				size: 26
			}
		]
	}
];

// Helper function to get a product by ID
export function getProductById(productId: string): Product | undefined {
	return products.find((product) => product.id === productId);
}
