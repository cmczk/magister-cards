<script lang="ts">
	const API_URL = import.meta.env.VITE_API_URL;

	interface CardForWiki {
		id: number;
		suit: string;
		rank: string;
		name: string;
		slug: string;
		shortDescription: string;
		imageUrl: string;
	}

	const getAllCards = async (): Promise<CardForWiki[]> => {
		const resp = await fetch(`${API_URL}/cards/be`);
		return resp.json();
	};

	const data = $state(getAllCards());
</script>

<svelte:head>
	<title>Энциклопедия карт | Magister's Cards</title>
</svelte:head>

<h1 class="magister-h-one">Энциклопедия карт</h1>

{#await data}
	<p>Загрузка...</p>
{:then cards}
	<ul class="cards-wiki-list">
		{#each cards as card}
			<li>
				<div class="card">
					<img
						src="{API_URL}/{card.imageUrl}"
						class="card-img-top"
						alt="Изображение карты {card.name}"
						loading="lazy"
					/>
					<div class="card-body">
						<h5 class="card-title">{card.name}</h5>
						<p class="card-text">{card.shortDescription}</p>
						<a href="cards/{card.slug}" class="btn btn-primary">Подробнее</a>
					</div>
				</div>
			</li>
		{/each}
	</ul>
{/await}

<style>
	.cards-wiki-list {
		display: flex;
		flex-wrap: wrap;
		gap: 1rem;
		list-style: none;
		padding: 0;
		justify-content: center;
		margin-left: auto;
		margin-right: auto;
	}

	.cards-wiki-list li {
		flex: 0 0 auto;
		width: 24rem;
	}

	.card {
		height: 100%;
	}

	.card-body {
		display: flex;
		flex-direction: column;
	}

	.card-body .btn {
		margin-top: auto;
	}
</style>
