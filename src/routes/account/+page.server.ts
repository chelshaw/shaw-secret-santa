import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`name, wishlist`)
		.eq('user_id', session.user.id)
		.single();

	return { session, profile };
};

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;
		const wishlist = formData.get('wishlist') as string;

		const session = await getSession();

		const { error } = await supabase.from('profiles').upsert({
			user_id: session?.user.id,
			name,
			updated_at: new Date()
		});

		if (error) {
			return fail(500, {
				name,
				wishlist
			});
		}

		return {
			name,
			wishlist
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
