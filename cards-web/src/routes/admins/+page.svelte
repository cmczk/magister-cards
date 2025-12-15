<script lang="ts">
	import { goto } from '$app/navigation';

	const logout = async () => {
		const resp = await fetch(`${import.meta.env.VITE_API_URL}/admins/logout`, {
			method: 'POST',
			credentials: 'include',
		});

		if (!resp.ok) {
			switch (resp.status) {
				case 401:
					goto('/admins/login');
					break;
				default:
					break;
			}

			return;
		}

		goto('/');
	};
</script>

<svelte:head>
	<title>Административная панель | Magister's Cards</title>
</svelte:head>

<h1>Административная панель</h1>

<h2>Ресурсы сайта</h2>

<ul>
	<li>
		<a href="/admins/cards">Список карт</a>
	</li>
</ul>

<button class="btn btn-danger" onclick={logout}>Выйти</button>
