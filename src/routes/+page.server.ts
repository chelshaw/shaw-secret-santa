import { fail, redirect } from '@sveltejs/kit';

const KEYPASS = '2024shaws';
const PARTICIPANTS = [
	'Tony',
	'Christine',
	// Todd fam
	'Todd',
	'Amy',
	'Ian',
	// Steve fam
	'Tula',
	'Zoe',
	'Cade',
	'Athena',
	// Gregg fam
	'Gregg',
	'Rebecca',
	'Chelsea',
	'Zac',
	'Trevor',
	'Amber',
	'Lillian',
	'Travis',
	'Ella',
	// Zac fam
	'Denys',
	'Peter'
];

export function load({ cookies }) {
	const name = cookies.get('name');

	if (name) {
		throw redirect(303, '/wishlist');
	}
	return {};
}

export const actions = {
	enter: async ({ request }) => {
		const formData = await request.formData();
		const passcode = formData.get('passcode') as string;
		console.log({ passcode });
		if (passcode !== KEYPASS) {
			return fail(500, {
				error: 'incorrect passcode'
			});
		}
		return {
			names: PARTICIPANTS
		};
	},
	name: async ({ request, cookies }) => {
		const formData = await request.formData();
		const name = formData.get('name') as string;

		if (!name) {
			return fail(500, {
				error: 'no name provided'
			});
		}
		cookies.set('name', name, { path: '/' });

		throw redirect(303, '/wishlist');
	}
};
