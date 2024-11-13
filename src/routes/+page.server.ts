import { fail, redirect } from '@sveltejs/kit';

const KEYPASS = 'shaws';

export function load({ cookies }) {
	const name = cookies.get('name');

	if (name) {
		throw redirect(303, '/wishlist');
	}
	return {};
}

export const actions = {
	enter: async ({ request, locals: { supabase } }) => {
		const formData = await request.formData();
		const passcode = formData.get('passcode') as string;
		
		if (passcode !== KEYPASS) {
			return fail(500, {
				error: 'incorrect passcode'
			});
		}
		const { data, error } = await supabase
			.from('profiles')
			.select(`user_id,name`);
		
		if (error) {
			return fail(500, {
				error: error.message
			});
		}
		return {
			data,
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
				data: { name, userId },
			}
		});

		if (error) {
			return fail(500, {
				error: error.message
			});
		}
		
		// cookies.set('name', name, { path: '/' });

		throw redirect(303, '/wishlist');
	}
};
