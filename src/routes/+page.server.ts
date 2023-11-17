// src/routes/+page.server.ts
import { fail, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url, locals: { getSession } }) => {
	const session = await getSession();

	// if the user is already logged in return them to the account page
	if (session) {
		throw redirect(303, '/account');
	}

	return { url: url.origin };
};

export const actions = {
	login: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;

		const { error } = await supabase.auth.signInWithOtp({
			email,
			options: {
				// set this to false if you do not want the user to be automatically signed up
				shouldCreateUser: false
				// emailRedirectTo: `${url.origin}/auth/callback'
			}
		});

		if (error) {
			return fail(500, {
				error: error.message
			});
		}

		return {
			email
		};
	},
	verify: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const email = formData.get('email') as string;
		const otp = formData.get('otp') as string;

		const { error } = await supabase.auth.verifyOtp({
			type: 'email',
			token: otp,
			email: email
		});

		if (error) {
			return fail(500, {
				email
			});
		}

		throw redirect(303, '/account');
	}
};
