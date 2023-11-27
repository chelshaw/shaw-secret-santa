import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data, error } = await supabase
		.from('matches_2023')
		.select(`matchProfile:match(name,need,hobbies,style,color,genres,brands,diet,pamper,updated)`)
		.eq('santa', session.user.id);

	if (error) {
		return {
			info: null,
			error: error.message
		};
	}

	if (data && data.length > 0) {
		return {
			info: data[0].matchProfile
		};
	} else {
		return {
			info: null,
			error: 'no match found'
		};
	}
};
