import { PostgrestError } from '@supabase/supabase-js';
import { fail } from '@sveltejs/kit';

interface DbResponse {
	name: string;
	matches_2024: { match: string } | null;
	private: { email: string } | null;
}

export const load = async ({ locals: { supabase } }) => {
	const matchTable = 'matches_2024';
	const { data, error }: { data: DbResponse[] | null; error: PostgrestError | null } =
		await supabase
			.from('profiles')
			.select(`name,${matchTable}!${matchTable}_santa_fkey(match),private(email)`);
	if (error) {
		fail(500, {
			message: 'unable to retrieve list'
		});
	}
	return {
		profiles: data
			?.filter((profile) => profile.matches_2024?.match)
			.map((p) => ({
				name: p.name,
				email: p.private?.email || '',
				match: p.matches_2024?.match || ''
			}))
	};
};
