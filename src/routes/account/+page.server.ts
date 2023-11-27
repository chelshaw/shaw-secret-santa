import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data, error } = await supabase.from('profiles').select(`name`);

	if (error) {
		return fail(500, {
			list: 'unable to retrieve list'
		});
	}

	return {
		santas: data
	};
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		const session = await getSession();

		const { error } = await supabase.from('profiles').upsert({
			user_id: session?.user.id,
			name,
			updated: new Date()
		});

		if (error) {
			return fail(500, {
				name
			});
		}

		return {
			name
		};
	},
	signout: async ({ locals: { supabase, getSession } }) => {
		const session = await getSession();
		if (session) {
			await supabase.auth.signOut();
			throw redirect(303, '/');
		}
	}
};
