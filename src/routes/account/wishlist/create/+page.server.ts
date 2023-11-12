import { fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const wishlist = formData.get('wishlist') as string;

		const session = await getSession();

		const { error } = await supabase
			.from('profiles')
			.update({
				wishlist
			})
			.eq('user_id', session?.user.id);

		if (error) {
			return fail(500, {
				user_id: session?.user.id,
				wishlist
			});
		}

		return {
			wishlist
		};
	}
};
