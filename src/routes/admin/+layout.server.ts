import { ADMIN_ACCESS } from '$env/static/private';
import { PostgrestError } from '@supabase/supabase-js';
import { fail, redirect } from '@sveltejs/kit';
interface DbProfile {
	name: string;
	user_id: string;
	do_not_match: string[] | null;
	matches_2023: {
		match: string;
	};
	private: {
		email: string;
		confirmed: boolean;
	};
}
export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();
	const hasAdminAccess = ADMIN_ACCESS && session?.user?.user_metadata.name === ADMIN_ACCESS;
	if (!hasAdminAccess) {
		throw redirect(303, '/wishlist');
	}
	const { data, error } = (await supabase
		.from('profiles')
		.select(
			`name, user_id, do_not_match, matches_2023!matches_2023_santa_fkey(match), private(email,confirmed)`
		)) as {
		data: DbProfile[] | null;
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
			return {
				...d,
				do_not_match: dnm,
				private: { email: d.private.email, confirmed: d.private?.confirmed === true }
			};
		})
	};
};
