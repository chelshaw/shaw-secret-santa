import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session || session.user.id !== 'b21e068b-9983-4f7b-8cd8-0f4adf50f143') {
		throw redirect(303, '/');
	}

	const { data, error } = await supabase.from('profiles').select(`name, user_id, do_not_match`);

	if (error) {
		fail(500, {
			list: 'unable to retrieve list'
		});
	}

	return {
		profiles: data
	};
};

export const actions = {
	save: async ({ request, locals: { supabase } }) => {
		const table = 'matches_2023';
		const formData = await request.formData();
		const matchString = formData.get('matches') as string;
		const matches = JSON.parse(matchString).map((match) => ({
			santa: match.user_id,
			match: match.match
		}));

		// Delete all first
		const { error: deleteError } = await supabase.from(table).delete();
		if (deleteError) {
			return fail(500, {
				matches,
				error: deleteError.message
			});
		}

		const { error } = await supabase.from(table).insert(matches);

		if (error) {
			return fail(500, {
				matches,
				error: error.message
			});
		}

		return {
			matches
		};
	}
};
