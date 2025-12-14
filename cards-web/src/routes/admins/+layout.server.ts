import { redirect } from '@sveltejs/kit';

export async function load({ fetch, route }) {
	if (route.id === '/admins/login') {
		return;
	}

	const resp = await fetch(`${import.meta.env.VITE_API_URL}/admins/me`, {
		credentials: 'include'
	});

	if (!resp.ok) {
		throw redirect(302, '/');
	}
}
