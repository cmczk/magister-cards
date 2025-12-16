<script lang="ts">
	import { page } from '$app/state';
	import { getRankName, getSuitName } from '$lib/utils/enums';

	const API_URL = import.meta.env.VITE_API_URL;

	let notFoundMessage = $state('');

	const getCardDetails = async () => {
		const resp = await fetch(`${API_URL}/cards/be/${page.params.slug}`);

		if (!resp.ok) {
			switch (resp.status) {
				case 404:
					notFoundMessage = 'Карта не найдена';
					break;
				default:
					break;
			}
		}

		return resp.json();
	};

	let data = $state(getCardDetails());
</script>

<svelte:head>
	<title>Magister's Cards</title>
</svelte:head>

{#await data}
	<p>Загрузка...</p>
{:then card}
	{#if notFoundMessage}
		<p>{notFoundMessage}</p>
	{:else}
		<h1 class="magister-h-one">{card.name}</h1>
		<div class="card-image-wrapper">
			<img
				src="{API_URL}/static/{card.imageUrl}"
				alt={card.name}
				width="465"
				height="665"
				class="card-image"
				loading="lazy"
			/>
		</div>
		<h2>Масть</h2>
		<p>{getSuitName(card.suit)}</p>
		<h2>Ранг</h2>
		<p>{getRankName(card.rank)}</p>
		<h2>Краткое описание</h2>
		<p>{card.shortDescription}</p>
		<h2>Полное описание</h2>
		<p>{card.longDescription}</p>
		<h2>Гадательное значение</h2>
		<p>{card.divinatoryMeaning}</p>
		<h2>Интерпретация гадательного значения</h2>
		<p>{card.divinatoryInterpretation}</p>
	{/if}
{/await}

<style>
	.card-image-wrapper {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.card-image {
		width: clamp(370px, 24.22vw, 465px);
		height: clamp(530px, 34.64vw, 665px);
	}
</style>
