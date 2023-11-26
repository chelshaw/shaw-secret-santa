import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data, error } = await supabase
		.from('matches_2023')
		.select(`matchProfile:match(name,need,hobbies,style,color,genres,brands,diet,pamper)`)
		.eq('santa', session.user.id);

	if (error) {
		fail(500, {
			message: 'unable to retrieve match'
		});
	}

	if (data && data.length > 0) {
		return {
			info: data[0].matchProfile
		};
	} else {
		fail(500, {
			message: 'no match available'
		});
	}
};
