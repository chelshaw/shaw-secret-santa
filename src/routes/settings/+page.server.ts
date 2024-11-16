import { fail, redirect } from '@sveltejs/kit';

interface Profile {
	do_not_match: string[];
	private: {
		email: string;
	};
}

export const load = async ({ locals: { getSession, supabase } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}
	const { userId } = session.user.user_metadata;
	const { data: profiles } = await supabase.from('profiles').select('name,user_id');
	const { data: profile }: { data: Profile | null } = await supabase
		.from('profiles')
		.select('do_not_match,private(email)')
		.eq('user_id', userId)
		.single();
	const { data } = await supabase.from('matches_2023').select(`match`).eq('santa', userId).single();
	return {
		profiles: profiles || [],
		match: data?.match,
		blockList: profile?.do_not_match || [],
		email: profile?.private.email || '',
		self: userId
	};
};

export const actions = {
	block: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const blockUser = formData.get('userId') as string;
		const listString = formData.get('blocklist') as string;
		const blockList = listString.split(',').filter((b) => !!b);
		if (!blockUser || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		blockList.push(blockUser);
		const { userId } = session.user.user_metadata;
		const { data, error } = await supabase
			.from('profiles')
			.update({
				do_not_match: blockList,
				updated: new Date()
			})
			.eq('user_id', userId);
		return { blockList, data, error };
	},
	unblock: async ({ request, locals: { supabase, getSession } }) => {
		const formData = await request.formData();
		const session = await getSession();
		const user = formData.get('userId') as string;
		const listString = formData.get('blocklist') as string;
		const blockList = listString.split(',').filter((b) => !!b);
		if (!user || !session) {
			return fail(500, {
				error: 'missing data'
			});
		}
		const idx = blockList.indexOf(user);
		if (idx < 0) {
			return {};
		}
		blockList.splice(idx, 1);
		const { userId } = session.user.user_metadata;
		const { data, error } = await supabase
			.from('profiles')
			.update({
				do_not_match: blockList,
				updated: new Date()
			})
			.eq('user_id', userId);
		return { blockList, data, error };
	}
};
