<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import MagisterSuccess from '$lib/components/magister/MagisterSuccess.svelte';
	import { onMount } from 'svelte';

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

	let successMessage = $state('');
	let dataError = $state('');
	let submitError = $state('');
	let loading = $state(true);
	let card = $state<CardForUpdate | null>(null);
	let lens = $derived({
		nameBe: card?.nameBe.length,
		nameRu: card?.nameRu.length,
		nameEn: card?.nameEn.length,
		shortDescriptionBe: card?.shortDescriptionBe.length,
		shortDescriptionRu: card?.shortDescriptionRu.length,
		shortDescriptionEn: card?.shortDescriptionEn.length,
		longDescriptionBe: card?.longDescriptionBe.length,
		longDescriptionRu: card?.longDescriptionRu.length,
		longDescriptionEn: card?.longDescriptionEn.length,
		divinatoryMeaningBe: card?.divinatoryMeaningBe.length,
		divinatoryMeaningRu: card?.divinatoryMeaningRu.length,
		divinatoryMeaningEn: card?.divinatoryMeaningEn.length,
		divinatoryInterpretationBe: card?.divinatoryInterpretationBe.length,
		divinatoryInterpretationRu: card?.divinatoryInterpretationRu.length,
		divinatoryInterpretationEn: card?.divinatoryInterpretationEn.length,
	});

	let cardName = $state('');

	onMount(() => {
		getCardForUpdate();
	});

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

			return;
		}

		card = await resp.json();

		if (!card) {
			return;
		}

		cardName = card.nameRu;

		loading = false;
	};

	const updateCard = async (e: SubmitEvent) => {
		e.preventDefault();

		const resp = await fetch(`${API_URL}/admins/cards/${page.params.id}/edit`, {
			method: 'PATCH',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(card),
			credentials: 'include',
		});

		if (!resp.ok) {
			switch (resp.status) {
				case 401:
					goto('/admins/login');
					break;
				case 500:
					submitError = 'Что-то пошло не так, попробуй ещё раз';
				default:
					break;
			}
		}

		successMessage = 'Информация обновлена успешно';
		setTimeout(() => {
			successMessage = '';
		}, 3000);
	};
</script>

<svelte:head>
	<title>{card?.nameRu} | Редактирование</title>
</svelte:head>

{#if loading}
	<p>Загрузка...</p>
{:else if card !== null}
	<div class="card-page">
		<h1 class="mb-5">{cardName}</h1>

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
				<p class="symbols-counter {(lens.nameBe ?? 250) > 250 ? 'overflow' : ''}">
					{lens.nameBe} / 250
				</p>
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
				<p class="symbols-counter {(lens.nameRu ?? 250) > 250 ? 'overflow' : ''}">
					{lens.nameRu} / 250
				</p>
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
				<p class="symbols-counter {(lens.nameEn ?? 250) > 250 ? 'overflow' : ''}">
					{lens.nameEn} / 250
				</p>
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
				<p class="symbols-counter {(lens.shortDescriptionBe ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.shortDescriptionBe} / 1000
				</p>
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
				<p class="symbols-counter {(lens.shortDescriptionRu ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.shortDescriptionRu} / 1000
				</p>
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
				<p class="symbols-counter {(lens.shortDescriptionEn ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.shortDescriptionEn} / 1000
				</p>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionBe"
					style="height: 150px"
					bind:value={card.longDescriptionBe}
				></textarea>
				<label for="longDescriptionBe">Полное описание (BE)</label>
				<p class="symbols-counter {(lens.longDescriptionBe ?? 5000) > 5000 ? 'overflow' : ''}">
					{lens.longDescriptionBe} / 5000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionRu"
					style="height: 150px"
					bind:value={card.longDescriptionRu}
				></textarea>
				<label for="longDescriptionRu">Полное описание (RU)</label>
				<p class="symbols-counter {(lens.longDescriptionRu ?? 5000) > 5000 ? 'overflow' : ''}">
					{lens.longDescriptionRu} / 5000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="longDescriptionEn"
					style="height: 150px"
					bind:value={card.longDescriptionEn}
				></textarea>
				<label for="longDescriptionEn">Полное описание (EN)</label>
				<p class="symbols-counter {(lens.longDescriptionEn ?? 5000) > 5000 ? 'overflow' : ''}">
					{lens.longDescriptionEn} / 5000
				</p>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningBe"
					style="height: 150px"
					bind:value={card.divinatoryMeaningBe}
				></textarea>
				<label for="divinatoryMeaningBe">Гадательное значение (BE)</label>
				<p class="symbols-counter {(lens.divinatoryMeaningBe ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.divinatoryMeaningBe} / 1000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningRu"
					style="height: 150px"
					bind:value={card.divinatoryMeaningRu}
				></textarea>
				<label for="divinatoryMeaningRu">Гадательное значение (RU)</label>
				<p class="symbols-counter {(lens.divinatoryMeaningRu ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.divinatoryMeaningRu} / 1000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryMeaningEn"
					style="height: 150px"
					bind:value={card.divinatoryMeaningEn}
				></textarea>
				<label for="divinatoryMeaningEn">Гадательное значение (EN)</label>
				<p class="symbols-counter {(lens.divinatoryMeaningEn ?? 1000) > 1000 ? 'overflow' : ''}">
					{lens.divinatoryMeaningEn} / 1000
				</p>
			</div>

			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationBe"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationBe}
				></textarea>
				<label for="divinatoryInterpretationBe">Интерпретация гадательного значения (BE)</label>
				<p
					class="symbols-counter {(lens.divinatoryInterpretationBe ?? 1000) > 1000
						? 'overflow'
						: ''}"
				>
					{lens.divinatoryInterpretationBe} / 5000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationRu"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationRu}
				></textarea>
				<label for="divinatoryInterpretationRu">Интерпретация гадательного значения (RU)</label>
				<p
					class="symbols-counter {(lens.divinatoryInterpretationRu ?? 1000) > 1000
						? 'overflow'
						: ''}"
				>
					{lens.divinatoryInterpretationRu} / 5000
				</p>
			</div>
			<div class="form-floating">
				<textarea
					class="form-control"
					id="divinatoryInterpretationEn"
					style="height: 150px"
					bind:value={card.divinatoryInterpretationEn}
				></textarea>
				<label for="divinatoryInterpretationEn">Интерпретация гадательного значения (EN)</label>
				<p
					class="symbols-counter {(lens.divinatoryInterpretationEn ?? 1000) > 1000
						? 'overflow'
						: ''}"
				>
					{lens.divinatoryInterpretationEn} / 5000
				</p>
			</div>

			{#if submitError}
				<p class="submit-error">{submitError}</p>
			{/if}

			{#if successMessage}
				<MagisterSuccess message={successMessage} />
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

	.card-form .submit-error {
		margin-bottom: 0;
		color: crimson;
	}

	.card-button {
		width: 100%;
	}

	.symbols-counter {
		color: var(--bs-success);
		padding-top: 7px;
	}

	.overflow {
		color: var(--bs-danger);
	}
</style>
