// src/routes/+page.server.ts
import { visited } from '$lib/cookie-names.js';
import { redirect } from '@sveltejs/kit';

export const load = async ({ cookies, locals: { supabase } }) => {
	cookies.delete(visited, { path: '/wishlist' });
	await supabase.auth.signOut();

	throw redirect(303, '/');
};
