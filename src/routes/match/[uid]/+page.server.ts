import { KEYPASS } from '$env/static/private';
import { entered, intended_url } from '$lib/cookie-names.js';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params, cookies, locals: { supabase, getSession } }) {
	const matchYear = 'matches_2024';
	const session = await getSession();
	if (!session) {
		cookies.set(intended_url, `/match/${params.uid}`, { path: '/' });
		throw redirect(303, '/');
	}
	const pw = cookies.get(entered);
	if (pw && pw === KEYPASS) {
		const { userId } = session.user.user_metadata;
		// password was already correctly submitted
		const matchResult = await supabase
			.from(matchYear)
			.select(`match`)
			.match({ santa: userId, match: params.uid })
			.maybeSingle();
		if (matchResult.error || !matchResult.data) {
			return {
				error: 'Not allowed'
			};
		}
		const { data, error } = await supabase
			.from('profiles')
			.select(`name,answers(q_key,answer)`)
			.eq('user_id', matchResult.data.match)
			.single();
		if (error) {
			return {
				error: error.message
			};
		}
		return { name: data.name, answers: data.answers || [] };
	}
	return fail(403, {
		message: 'Not allowed'
	});
}

export const ssr = false;
