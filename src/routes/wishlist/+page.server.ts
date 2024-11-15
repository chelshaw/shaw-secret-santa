import { visited } from '$lib/cookie-names.js';
import { fail, redirect } from '@sveltejs/kit';
export interface Profile {
	name: string;
	need: string;
	hobbies: string;
	style: string;
	genres: string;
	brands: string;
	color: string;
	diet: string;
	pamper: string;
	[key: string]: string;
}
const defaultProfile = {
	name: '',
	need: '',
	hobbies: '',
	style: '',
	genres: '',
	brands: '',
	color: '',
	diet: '',
	pamper: ''
};
export const load = async ({ cookies, locals: { getSession, supabase } }) => {
	const session = await getSession()
	const v = cookies.get(visited);
	
	if (!session) {
		throw redirect(303, '/');
	}
	const { userId } = session.user.user_metadata;
	let profile: Profile = defaultProfile;
	const { data, error } = await supabase
		.from('profiles')
		.select(`name`)
		.eq('user_id', userId)
		.single();
	if (error) {
		profile = defaultProfile;
	} else {
		profile = data as Profile;
	}
	const {data: answers} = await supabase.from('answers').select('id,q_key,answer').eq('user_id', userId)

	cookies.set(visited, 'true', { path: '/wishlist' });
	return {
		profile,
		answers,
		firstTime: !v
	};
};

export const actions = {
	add: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const qKey = formData.get('qKey') as string;
		const answer = formData.get('answer') as string;
		if (!qKey || !answer || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		const { userId } = session.user.user_metadata

		const { data, error } = await supabase
			.from('answers')
			.insert({
				user_id: userId,
				q_key: qKey,
				answer,
				updated_at: new Date()
			})
			.select();
		if (error) {
			return fail(500, {
				qKey,
				answer,
				error: 'unable to add answer',
				message: error.message,
			});
		}

		return { qKey, answer, answerId: data[0].id, action: 'add' };
	},
	remove: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const answerId = formData.get('answerId') as string;
		if (!answerId || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		const { error } = await supabase
			.from('answers')
			.delete()
			.eq('id', parseInt(answerId, 10))
		if (error) {
			return fail(500, {
				error: 'unable to add answer',
				message: error.message,
			});
		}

		return { answerId, action: 'remove' };
	},
	update: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const answerId = formData.get('answerId') as string;
		const qKey = formData.get('qKey') as string;
		const answer = formData.get('answer') as string;
		if (!answerId || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		const { error } = await supabase
			.from('answers')
			.update({
				answer,
				updated_at: new Date()
			})
			.eq('id', parseInt(answerId));
		if (error) {
			return fail(500, {
				qKey,
				answer,
				answerId,
				action: 'update',
				message: error.message,
			});
		}

		return {
			qKey,
			answer,
			answerId,
			action: 'update',
		};
	}
};
