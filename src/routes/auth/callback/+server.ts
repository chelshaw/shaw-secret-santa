// src/routes/auth/callback/+server.ts
import { redirect } from '@sveltejs/kit';
import type { Config } from '@sveltejs/adapter-vercel';

export const GET = async ({ url, locals: { supabase } }) => {
	const code = url.searchParams.get('code');

	if (code) {
		await supabase.auth.exchangeCodeForSession(code);
	}

	throw redirect(303, '/account');
};

export const config: Config = {
	runtime: 'edge'
};
