// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('name', { path: '/' });
	cookies.delete('visited', { path: '/wishlist' });

	throw redirect(303, '/');
};
