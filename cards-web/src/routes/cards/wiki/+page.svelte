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
					<div class="image-wrapper">
						<img
							src="{API_URL}/static/{card.imageUrl}"
							class="card-img-top"
							alt="Изображение карты {card.name}"
							loading="lazy"
						/>
						<button
							class="btn btn-light show-full-image"
							type="button"
							data-bs-toggle="modal"
							data-bs-target="#card{card.id}ImageModal"
							aria-label="Увеличить изображение">Увеличить</button
						>
					</div>
					<div class="card-body">
						<h5 class="card-title">{card.name}</h5>
						<p class="card-text">{card.shortDescription}</p>
						<a href="/cards/wiki/{card.slug}" class="btn btn-primary">Подробнее</a>
					</div>
				</div>
			</li>
			<div
				class="modal fade"
				id="card{card.id}ImageModal"
				tabindex="-1"
				aria-labelledby="exampleModalLabel"
				aria-hidden="true"
			>
				<div class="modal-dialog modal-dialog-centered magister-modal-dialog">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"
							></button>
						</div>
						<div class="modal-body magister-modal-body">
							<img
								class="full-image"
								src="{import.meta.env.VITE_API_URL}/static/{card.imageUrl}"
								alt={card.name}
							/>
						</div>
					</div>
				</div>
			</div>
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

	.image-wrapper {
		position: relative;
	}

	.show-full-image {
		display: none;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		@media (max-width: 1250px) {
			display: block;
			border: 1px solid white;
			color: white;
			background-color: transparent;
			font-size: 24px;
		}
	}

	.image-wrapper:hover .show-full-image {
		display: block;
	}

	.magister-modal-dialog {
		max-width: 1000px;
	}

	.magister-modal-body {
		padding: 0;
	}

	.full-image {
		max-width: 1000px;
		width: 100%;
	}
</style>
