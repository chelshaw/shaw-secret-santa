import { fail } from '@sveltejs/kit';

export const actions = {
	save: async ({ request, locals: { supabase } }) => {
		const table = 'matches_2024';
		const formData = await request.formData();
		const matchString = formData.get('matches') as string;
		const matches = JSON.parse(matchString).map((match: { user_id: string; match: string }) => ({
			santa: match.user_id,
			match: match.match
		}));

		const { error } = await supabase
			.from(table)
			.upsert(matches, { onConflict: 'santa', ignoreDuplicates: false });

		if (error) {
			return fail(500, {
				error: error.message
			});
		}

		return {
			success: true,
			matchCount: matches.length
		};
	}
};
