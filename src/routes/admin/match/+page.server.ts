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

		// const { data } = await supabase.from(table).select('santa');
		// if (!data) {
		// 	console.log('no existing data');
		// 	return {};
		// }
		// console.log('existing santas', data);

		// // Delete all first
		// const { error: deleteError } = await supabase
		// 	.from(table)
		// 	.delete()
		// 	.in(
		// 		'santa',
		// 		data.map((d) => d.santa)
		// 	);
		// console.log({ deleteError });
		// if (deleteError) {
		// 	return fail(500, {
		// 		matches,
		// 		error: deleteError.message
		// 	});
		// }

		const { error } = await supabase
			.from(table)
			.upsert(matches, { onConflict: 'santa', ignoreDuplicates: false });
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
