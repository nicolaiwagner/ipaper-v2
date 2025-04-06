// src/lib/data/sampleData.ts
import type { CatalogPage, Product } from '$lib/types';

export const products: Product[] = [
	{
		id: 'p1',
		name: 'Premium Office Chair',
		description: 'Ergonomic chair with lumbar support and adjustable armrests',
		price: 249.99,
		imageUrl: '/images/products/chair.jpg',
		details: {
			material: 'Breathable mesh and premium leather',
			warranty: '5 year manufacturer warranty',
			dimensions: '26"W x 26"D x 38-42"H',
			weight: '35 lbs',
			color: 'Black/Gray'
		}
	},
	{
		id: 'p2',
		name: 'Wooden Desk',
		description: 'Solid oak desk with cable management system',
		price: 399.99,
		imageUrl: '/images/products/desk.jpg',
		details: {
			material: 'Solid oak with metal accents',
			warranty: '3 year manufacturer warranty',
			dimensions: '60"W x 30"D x 29"H',
			weight: '65 lbs',
			color: 'Natural oak finish'
		}
	},
	{
		id: 'p3',
		name: 'Modern Lamp',
		description: 'LED desk lamp with adjustable brightness and color temperature',
		price: 79.99,
		imageUrl: '/images/products/lamp.jpg',
		details: {
			material: 'Aluminum and plastic',
			warranty: '2 year manufacturer warranty',
			dimensions: '6"W x 6"D x 18"H',
			weight: '3 lbs',
			features: 'USB charging port, touch controls'
		}
	},
	{
		id: 'p4',
		name: 'Wireless Keyboard',
		description: 'Slim profile keyboard with multi-device pairing',
		price: 89.99,
		imageUrl: '/images/products/keyboard.jpg',
		details: {
			material: 'Aluminum and ABS plastic',
			warranty: '1 year manufacturer warranty',
			dimensions: '17"W x 5"D x 0.8"H',
			weight: '1.5 lbs',
			features: 'Backlit keys, 6-month battery life'
		}
	},
	{
		id: 'p5',
		name: 'Monitor Stand',
		description: 'Adjustable height monitor stand with storage drawer',
		price: 59.99,
		imageUrl: '/images/products/monitor-stand.jpg',
		details: {
			material: 'Bamboo and aluminum',
			warranty: '1 year manufacturer warranty',
			dimensions: '22"W x 9"D x 3-6"H',
			weight: '4 lbs',
			features: 'Cable management, organizer drawer'
		}
	},
	{
		id: 'p6',
		name: 'Wireless Mouse',
		description: 'Ergonomic wireless mouse with programmable buttons',
		price: 49.99,
		imageUrl: '/images/products/mouse.jpg',
		details: {
			material: 'ABS plastic with soft-touch coating',
			warranty: '1 year manufacturer warranty',
			dimensions: '4.5"W x 2.5"D x 1.5"H',
			weight: '0.3 lbs',
			features: '12000 DPI, 6 programmable buttons'
		}
	}
];

export const catalogPages: CatalogPage[] = [
	{
		id: 'page1',
		imageUrl: '/images/catalog/page1.jpg',
		hotspots: [
			{
				id: 'hs1',
				productId: 'p1',
				position: { x: 30, y: 40 },
				size: 40
			},
			{
				id: 'hs2',
				productId: 'p2',
				position: { x: 70, y: 60 },
				size: 40
			}
		]
	},
	{
		id: 'page2',
		imageUrl: '/images/catalog/page2.jpg',
		hotspots: [
			{
				id: 'hs3',
				productId: 'p3',
				position: { x: 25, y: 45 },
				size: 40
			},
			{
				id: 'hs4',
				productId: 'p4',
				position: { x: 75, y: 30 },
				size: 40
			}
		]
	},
	{
		id: 'page3',
		imageUrl: '/images/catalog/page3.jpg',
		hotspots: [
			{
				id: 'hs5',
				productId: 'p5',
				position: { x: 40, y: 55 },
				size: 40
			},
			{
				id: 'hs6',
				productId: 'p6',
				position: { x: 65, y: 35 },
				size: 40
			}
		]
	}
];

// Function to get product by ID
export function getProductById(id: string): Product | undefined {
	return products.find((product) => product.id === id);
}
