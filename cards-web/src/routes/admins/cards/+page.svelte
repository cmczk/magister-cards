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
	<title>Список карт</title>
</svelte:head>

<h1 class="magister-h-one">Список карт</h1>

{#await data}
	<p>Загрузка...</p>
{:then cards}
	<ul class="cards-list">
		{#each cards as card}
			<li class="cards-list-item">
				<div class="card-wrapper">
					<img
						src="{API_URL}/static/{card.imageUrl}"
						alt="Изображение карты {card.name}"
						width="186"
						height="266"
						loading="lazy"
					/>
					<div class="card-info-wrapper">
						<div>
							<h5>{card.name}</h5>
							<p>{card.shortDescription}</p>
						</div>
						<a href="/admins/cards/{card.id}" class="edit-card-link">Редактировать</a>
					</div>
				</div>
			</li>
		{/each}
	</ul>
{/await}

<style>
	.cards-list {
		list-style: none;
		padding: 0;
	}

	.cards-list-item {
		max-width: 1000px;
	}

	.card-wrapper {
		display: flex;
	}

	.card-info-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
	}
</style>
