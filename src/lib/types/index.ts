export interface Product {
	id: string;
	name: string;
	description: string;
	price: number;
	imageUrl: string;
	details?: {
		[key: string]: string;
	};
}

export interface Hotspot {
	id: string;
	productId: string;
	position: {
		x: number; // percentage from left
		y: number; // percentage from top
	};
	size: number; // size of the hotspot in pixels
}

export interface CatalogPage {
	id: string;
	imageUrl: string;
	hotspots: Hotspot[];
}

export interface CartItem {
	productId: string;
	quantity: number;
}

export interface PageAnalytics {
	pageId: string;
	timeSpent: number;
	interactions: {
		hotspotId: string;
		count: number;
	}[];
}

export interface PageFlipEvents {
	flip: { page: number };
	changeState: { state: string };
	init: { pageCount: number };
	update: { page: number };
}
