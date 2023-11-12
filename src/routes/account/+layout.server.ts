import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	const { data: profile } = await supabase
		.from('profiles')
		.select(`name, wishlist`)
		.eq('user_id', session.user.id)
		.single();

	const questions = [
		{ key: 'need', label: 'Is there something specific you want or need?' },
		{ key: 'hobbies', label: 'What are your hobbies or interests' },
		{ key: 'style', label: 'How would you describe your style' },
		{ key: 'genres', label: 'Favorite TV, movie, or book genres?' },
		{ key: 'brands', label: 'Any specific brands or stores you like to shop from?' },
		{ key: 'color', label: "What's your favorite color to wear?" },
		{ key: 'diet', label: 'Any dietary restrictions or preferences?' },
		{ key: 'pamper', label: 'Do you enjoy pampering yourself?' }
	];

	return { session, profile, questions };
};
