const questions: Record<string, { option: string; label: string; subtext?: string }> = {
	need: {
		option: 'Specific want or need',
		label: 'Are there any specific items you want or need?',
		subtext: 'Feel free to add links to specific items if you have them.'
	},
	hobbies: {
		option: 'Hobbies & interests',
		label: 'What are your hobbies, interests, or current obsessions?',
		subtext: 'Think of any activities you do that could use more materials or accessories.'
	},
	style: {
		option: 'Your style and tastes',
		label: "How does someone know you'll love a piece of clothing or home decor?"
	},
	color: {
		option: 'Favorite colors',
		label: 'What colors do you love?',
		subtext: "Or, tell us what colors you DON'T like. But be sure to specify which!"
	},
	genres: {
		option: 'Favorite types of media',
		label: 'Any mediums you collect or consume? Favorite genres of those items?',
		subtext: 'Do you collect cookbooks, vinyl records, or anything else?'
	},
	brands: {
		option: 'Favorite brands or stores',
		label: 'Any specific brands or stores you like to shop from?',
		subtext: 'Think of stores someone is likely to pick up something you like.'
	},
	diet: {
		option: 'Dietary preferences',
		label: 'Any dietary restrictions or preferences?'
	},
	pamper: {
		option: 'How you relax',
		label: 'How do you enjoy pampering yourself?',
		subtext: 'What scents, sensations, and activities make you feel relaxed and cared for?'
	},
	pet: {
		option: 'About your pet',
		label: 'Tell us about your pet -- what do they like, what size are they?'
	},
	freestyle: {
		option: 'Freestyle',
		label: 'Say whatever you want to say!'
	}
};

export default questions;
