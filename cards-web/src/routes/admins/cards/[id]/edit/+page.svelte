<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';

	const API_URL = import.meta.env.VITE_API_URL;

	interface CardForUpdate {
		suit: string;
		rank: string;
		slugBe: string;
		nameBe: string;
		slugRu: string;
		nameRu: string;
		slugEn: string;
		nameEn: string;
		shortDescriptionBe: string;
		longDescriptionBe: string;
		shortDescriptionRu: string;
		longDescriptionRu: string;
		shortDescriptionEn: string;
		longDescriptionEn: string;
		divinatoryMeaningBe: string;
		divinatoryInterpretationBe: string;
		divinatoryMeaningRu: string;
		divinatoryInterpretationRu: string;
		divinatoryMeaningEn: string;
		divinatoryInterpretationEn: string;
	}

	let dataError = $state('');
	let submitError = $state('');
	let loading = $state(true);
	let card = $state<CardForUpdate | null>(null);

	const getCardForUpdate = async () => {
		const resp = await fetch(`${API_URL}/admins/cards/${page.params.id}`, {
			credentials: 'include',
		});

		if (!resp.ok) {
			switch (resp.status) {
				case 401:
					break;
				case 404:
					dataError = 'Карта не найдена';
					break;
				default:
					break;
			}
		}

		card = await resp.json();
		loading = false;
	};

	getCardForUpdate();

	const updateCard = async (e: SubmitEvent) => {
		e.preventDefault();

		console.debug(card);

		// const resp = await fetch(`${API_URL}/admins/cards/${page.params.id}/edit`, {
		// 	method: 'PATCH',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	body: JSON.stringify(card),
		// 	credentials: 'include',
		// });

		// if (!resp.ok) {
		// 	submitError = String(resp.status);
		// }
	};
</script>

<svelte:head>
	<title>{card?.nameRu} | Редактирование</title>
</svelte:head>

{#if loading}
	<p>Загрузка...</p>
{:else if card !== null}
	<div class="card-page">
		<h1 class="mb-5">{card.nameRu}</h1>

		<form class="card-form" onsubmit={updateCard}>
			<div class="form-floating">
				<input
					type="text"
					class="form-control"
					id="nameBeInput"
					required
					bind:value={card.nameBe}
				/>
				<label for="nameBeInput">Название карты (BE)</label>
			</div>
			<div class="form-floating">
				<input
					type="text"
					class="form-control"
					id="nameRuInput"
					required
					bind:value={card.nameRu}
				/>
				<label for="nameRuInput">Название карты (RU)</label>
			</div>
			<div class="form-floating">
				<input
					type="text"
					class="form-control"
					id="nameEnInput"
					required
					bind:value={card.nameEn}
				/>
				<label for="nameEnInput">Название карты (EN)</label>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="shortDescriptionBe"
					style="height: 150px"
					required
					bind:value={card.shortDescriptionBe}
				></textarea>
				<label for="shortDescriptionBe">Краткое описание (BE)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="shortDescriptionRu"
					style="height: 150px"
					required
					bind:value={card.shortDescriptionRu}
				></textarea>
				<label for="shortDescriptionRu">Краткое описание (RU)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="shortDescriptionEn"
					style="height: 150px"
					bind:value={card.shortDescriptionEn}
					required
				></textarea>
				<label for="shortDescriptionEn">Краткое описание (EN)</label>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionBe"
					style="height: 150px"
					bind:value={card.longDescriptionBe}
				></textarea>
				<label for="longDescriptionBe">Полное описание (BE)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionRu"
					style="height: 150px"
					bind:value={card.longDescriptionRu}
				></textarea>
				<label for="longDescriptionRu">Полное описание (RU)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionEn"
					style="height: 150px"
					bind:value={card.longDescriptionEn}
				></textarea>
				<label for="longDescriptionEn">Полное описание (EN)</label>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningBe"
					style="height: 150px"
					bind:value={card.divinatoryMeaningBe}
				></textarea>
				<label for="divinatoryMeaningBe">Гадательное значение (BE)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningRu"
					style="height: 150px"
					bind:value={card.divinatoryMeaningRu}
				></textarea>
				<label for="divinatoryMeaningRu">Гадательное значение (RU)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningEn"
					style="height: 150px"
					bind:value={card.divinatoryMeaningEn}
				></textarea>
				<label for="divinatoryMeaningEn">Гадательное значение (EN)</label>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationBe"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationBe}
				></textarea>
				<label for="divinatoryInterpretationBe">Интерпретация гадательного значения (BE)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationRu"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationRu}
				></textarea>
				<label for="divinatoryInterpretationRu">Интерпретация гадательного значения (RU)</label>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationEn"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationEn}
				></textarea>
				<label for="divinatoryInterpretationEn">Интерпретация гадательного значения (EN)</label>
			</div>

			{#if submitError}
				<p>{submitError}</p>
			{/if}
			<button type="submit" class="btn btn-primary card-button">Сохранить изменения</button>
			<a href={resolve('/admins/cards')}>Вернуться к списку карт</a>
		</form>
	</div>
{/if}

<style>
	.card-page {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.card-form {
		display: flex;
		flex-direction: column;
		row-gap: 20px;
		justify-content: center;
		width: 100%;
		max-width: 1000px;
	}

	.card-form p {
		margin-bottom: 0;
		color: crimson;
	}

	.card-button {
		width: 100%;
	}
</style>
