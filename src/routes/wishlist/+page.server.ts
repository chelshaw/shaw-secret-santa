import { visited } from '$lib/cookie-names.js';
import { fail, redirect } from '@sveltejs/kit';

interface Profile {
	name: string;
	answers: { id: number; q_key: string; answer: string }[];
	private: {
		email: string;
		confirmed: boolean;
	};
}

export const load = async ({ cookies, locals: { getSession, supabase } }) => {
	const session = await getSession();
	const v = cookies.get(visited);

	if (!session) {
		throw redirect(303, '/');
	}
	const { userId } = session.user.user_metadata;
	const { data }: { data: Profile | null } = await supabase
		.from('profiles')
		.select(
			`
			name,
			answers (
				id,q_key,answer
			),
			private (
				email,confirmed
			)
		`
		)
		.order('id', { referencedTable: 'answers', ascending: false })
		.eq('user_id', userId)
		.single();
	cookies.set(visited, 'true', { path: '/wishlist' });
	return {
		firstTime: !v,
		name: data?.name || '',
		answers: data?.answers || [],
		email: data?.private.email || '',
		confirmed: data?.private.confirmed || false
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
		const { userId } = session.user.user_metadata;

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
				message: error.message
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
				action: 'remove',
				message: 'missing data'
			});
		}
		const { error } = await supabase
			.from('answers')
			.delete()
			.eq('id', parseInt(answerId, 10))
			.select();
		// data returns null when it fails due to no RLS present
		// https://github.com/supabase/supabase-js/issues/902
		const { data } = await supabase
			.from('answers')
			.select('id')
			.eq('id', parseInt(answerId, 10))
			.limit(1)
			.maybeSingle();

		if (error || data) {
			return fail(500, {
				action: 'remove',
				message: error?.message || 'failed to remove answer'
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
				action: 'update',
				message: 'missing data'
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
				action: 'update',
				message: error.message
			});
		}

		return {
			qKey,
			answer,
			answerId,
			action: 'update'
		};
	},
	email: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const email = formData.get('email') as string;
		if (!email || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		const { error } = await supabase
			.from('private')
			.update({
				email,
				confirmed: true
			})
			.eq('user_id', session.user.user_metadata.userId);

		if (error) {
			return fail(500, {
				action: 'email',
				message: error.message
			});
		}

		return {
			action: 'email'
		};
	}
};
