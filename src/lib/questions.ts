const questions: Record<string, {option: string; label: string; subtext: string}> = {
    'need': {
        option: 'Specific want or need',
        label: 'Is there something specific you want or need?',
        subtext: 'Feel free to add links to specific items if you have them.'
    },
    'hobbies': {
        option: 'Hobbies & interests',
        label: 'What are your hobbies or interests?',
        subtext: 'Think of any activities you do that might need more materials.'
    },
    'style': {
        option: 'Your style and tastes',
        label: 'How would you describe your style?',
        subtext: "How does someone know you'll love a piece of clothing or home decor?"
    },
    'color': {
        option: 'Favorite colors',
        label: "What's your favorite color to wear?",
        subtext: "Or, tell us what colors you DON'T like to wear. But be sure to specify which!"
    },
    'genres': {
        option: 'Favorite types of media',
        label: 'Favorite TV, movie, or book genres?',
        subtext: 'Are you part of any fandoms? Who do you stan?'
    },
    'brands': {
        option: 'Favorite brands or stores',
        label: 'Any specific brands or stores you like to shop from?',
        subtext: 'Think of stores someone is likely to pick up something you like.'
    },
    'diet': {
        option: 'Dietary preferences',
        label: 'Any dietary restrictions or preferences?',
        subtext: "Pretty self explanitory -- anything you don't eat?"
    },
    'pamper': {
        option: 'How you relax',
        label: 'How do you enjoy pampering yourself?',
        subtext: 'What scents, sensations, and activities make you feel relaxed and cared for?'
    }
}

export default questions;