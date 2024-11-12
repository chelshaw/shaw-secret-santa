// src/routes/+page.server.ts
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies }) => {
	cookies.delete('name', { path: '/' });

	throw redirect(303, '/');
};
