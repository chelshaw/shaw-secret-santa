import { PostgrestError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';

interface Profile {
	name: string;
	user_id: string;
	do_not_match: string[] | null;
	matches_2023: {
		match: string;
	};
}

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session || session.access_token !== 'Chelsea') {
		throw redirect(303, '/');
	}

	const { data, error } = (await supabase
		.from('profiles')
		.select(`name, user_id, do_not_match, matches_2023!matches_2023_santa_fkey(match)`)) as {
		data: Profile[] | null;
		error: PostgrestError | null;
	};

	if (error) {
		fail(500, {
			list: 'unable to retrieve list'
		});
	}

	return {
		profiles: data?.map((d: Profile) => {
			const dnm = d.do_not_match || [];
			const lyMatch = d.matches_2023 ? d.matches_2023?.match : null;
			if (lyMatch) {
				dnm.push(lyMatch);
			}
			return { ...d, do_not_match: dnm };
		})
	};
};

export const actions = {
	save: async ({ request, locals: { supabase } }) => {
		const table = 'matches_2024';
		const formData = await request.formData();
		const matchString = formData.get('matches') as string;
		const matches = JSON.parse(matchString).map((match: { user_id: string; match: string }) => ({
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
