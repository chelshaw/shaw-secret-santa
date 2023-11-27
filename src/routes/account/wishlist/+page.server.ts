import { fail } from '@sveltejs/kit';

export const actions = {
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const key = formData.get('key') as string;
		if (!key) {
			return fail(500, {
				something: 'No key provided'
			});
		}
		const item = formData.get(key);
		const session = await getSession();

		const { error } = await supabase
			.from('profiles')
			.update({
				[key]: item,
				updated: new Date()
			})
			.eq('user_id', session?.user.id);

		if (error) {
			return fail(500, {
				userId: session?.user?.id,
				key,
				item
			});
		}

		return {
			userId: session?.user?.id,
			key,
			item
		};
	}
};
