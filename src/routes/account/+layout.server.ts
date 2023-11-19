import { redirect } from '@sveltejs/kit';

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
export const load = async ({ locals: { supabase, getSession } }) => {
	const session = await getSession();

	if (!session) {
		throw redirect(303, '/');
	}

	let profile: Profile;
	const { data, error } = await supabase
		.from('profiles')
		.select(`name,need,hobbies,style,color,genres,brands,diet,pamper`)
		.eq('user_id', session.user.id)
		.single();

	if (error) {
		profile = defaultProfile;
	} else {
		profile = data as Profile;
	}

	const questions = [
		{
			key: 'need',
			label: 'Is there something specific you want or need?',
			subtext: 'Feel free to add links to specific items if you have them.'
		},
		{
			key: 'hobbies',
			label: 'What are your hobbies or interests?',
			subtext: 'Think of any activities you do that might need more materials.'
		},
		{
			key: 'style',
			label: 'How would you describe your style?',
			subtext: "How does someone know you'll love a piece of clothing or home decor?"
		},
		{
			key: 'color',
			label: "What's your favorite color to wear?",
			subtext: "Or, tell us what colors you DON'T like to wear. But be sure to specify which!"
		},
		{
			key: 'genres',
			label: 'Favorite TV, movie, or book genres?',
			subtext: 'Are you part of any fandoms? Who do you stan?'
		},
		{
			key: 'brands',
			label: 'Any specific brands or stores you like to shop from?',
			subtext: 'Think of stores someone is likely to pick up something you like.'
		},
		{
			key: 'diet',
			label: 'Any dietary restrictions or preferences?',
			subtext: "Pretty self explanitory -- anything you don't eat?"
		},
		{
			key: 'pamper',
			label: 'How do you enjoy pampering yourself?',
			subtext: 'What scents, sensations, and activities make you feel relaxed and cared for?'
		}
	];

	return {
		session,
		profile,
		questions
	};
};
