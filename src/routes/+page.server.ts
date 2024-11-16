import { DB_ACCESS_KEY, KEYPASS } from '$env/static/private';
import { entered } from '$lib/cookie-names.js';
import { SupabaseClient } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

async function getProfiles(supabase: SupabaseClient) {
	const { data, error } = await supabase.from('profiles').select(`user_id,name`);

	if (error) {
		return [];
	}
	return data;
}

export async function load({ cookies, locals: { supabase, getSession } }) {
	const session = await getSession();
	if (session) {
		throw redirect(303, '/wishlist');
	}
	const pw = cookies.get(entered);
	if (pw && pw === KEYPASS) {
		// password was already correctly submitted
		const list = await getProfiles(supabase);
		return { list };
	}
	return {};
}

export const actions = {
	enter: async ({ request, cookies, locals: { supabase } }) => {
		const formData = await request.formData();
		const passcode = formData.get('passcode') as string;

		if (passcode !== KEYPASS) {
			return fail(500, {
				error: 'incorrect passcode'
			});
		}
		const { data, error } = await supabase.from('profiles').select(`user_id,name`);

		if (error) {
			return fail(500, {
				error: error.message
			});
		}
		cookies.set(entered, passcode, { path: '/' });
		return {
			data
		};
	},
	name: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const userId = formData.get('userId') as string;
		if (!name) {
			return fail(500, {
				error: 'no name provided'
			});
		}
		const { error } = await supabase.auth.signInAnonymously({
			options: {
				data: { name, userId, access: DB_ACCESS_KEY }
			}
		});

		if (error) {
			return fail(500, {
				error: error.message
			});
		}

		throw redirect(303, '/wishlist');
	}
};
