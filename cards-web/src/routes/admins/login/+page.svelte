<script lang="ts">
	import { goto } from '$app/navigation';

	const API_URL = import.meta.env.VITE_API_URL;

	interface AdminLoginForm {
		email: string;
		password: string;
	}

	let form = $state<AdminLoginForm>({ email: '', password: '' });
	let submitError = $state('');

	const loginAdmin = async (e: SubmitEvent) => {
		e.preventDefault();

		const resp = await fetch(`${API_URL}/admins/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(form),
			credentials: 'include',
		});

		if (!resp.ok) {
			switch (resp.status) {
				case 401:
					submitError = 'Неверное имя пользователя или пароль';
					break;
				default:
					submitError = 'Что-то пошло не так, попробуй ещё раз';
					break;
			}

			return;
		}

		goto('/admins');
	};
</script>

<div class="admins-login-page">
	<h1 class="mb-5">Вход в админку</h1>

	<form class="admins-login-form" onsubmit={loginAdmin}>
		<div class="form-floating">
			<input
				type="email"
				class="form-control"
				id="floatingInput"
				placeholder="name@example.com"
				required
				bind:value={form.email}
			/>
			<label for="floatingInput">Email</label>
		</div>
		<div class="form-floating">
			<input
				type="password"
				class="form-control"
				id="floatingPassword"
				placeholder="Пароль"
				required
				bind:value={form.password}
			/>
			<label for="floatingPassword">Пароль</label>
		</div>
		{#if submitError}
			<p>{submitError}</p>
		{/if}
		<button type="submit" class="btn btn-primary login-form-button">Войти</button>
	</form>
</div>

<style>
	.admins-login-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.admins-login-form {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		justify-content: center;
		width: 100%;
		max-width: 400px;
	}

	.admins-login-form p {
		margin-bottom: 0;
		color: crimson;
	}

	.login-form-button {
		width: 100%;
	}
</style>
