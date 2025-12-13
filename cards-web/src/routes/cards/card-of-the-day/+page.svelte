<script lang="ts">
	const API_URL = import.meta.env.VITE_API_URL;

	interface CardOfTheDay {
		id: number;
		name: string;
		slug: string;
		imageUrl: string;
		coverUrl: string;
		suit: string;
		rank: string;
		shortDescription: string;
	}

	const getCardOfTheDay = async (): Promise<CardOfTheDay> => {
		const resp = await fetch(`${API_URL}/cards/be/card-of-the-day`);
		return resp.json();
	};

	const data = $state(getCardOfTheDay());

	let isFlipped = $state(false);
	const toggleFlipped = () => {
		isFlipped = !isFlipped;
	};
</script>

<h1 class="card-of-the-day-h-one">Карта Дня</h1>

{#await data}
	<p>Загрузка...</p>
{:then card}
	<div class="card-of-the-day-wrapper">
		<h2>{card.name}</h2>

		<div class="card-container {isFlipped ? 'flipped' : ''}">
			<div class="card">
				<div class="card-front">
					<img
						src="{API_URL}/{card.imageUrl}"
						alt={card.name}
						width="465"
						height="665"
						loading="lazy"
					/>
				</div>
				<div class="card-back">
					<img
						src="{API_URL}/{card.coverUrl}"
						alt="Обложка карты {card.name}"
						width="465"
						height="665"
						class="card-cover-image"
						loading="lazy"
					/>

					<div class="card-dark-overlay"></div>

					<div class="card-text-wrapper">
						<p class="card-text-head">Масть:</p>
						<p>{card.suit}</p>
						<p class="card-text-head">Ранг:</p>
						<p>{card.rank}</p>
						<p class="card-text-head">Описание:</p>
						<p>{card.shortDescription}</p>
					</div>
				</div>
			</div>
		</div>

		<button class="show-card-button btn btn-primary" type="button" onclick={toggleFlipped}>
			{isFlipped ? 'Вернуться к карте' : 'Посмотреть описание'}
		</button>
	</div>
{/await}

<style>
	.card-of-the-day-h-one {
		text-align: center;
		margin-top: 10px;
		margin-bottom: 30px;
	}

	.card-of-the-day-wrapper {
		display: flex;
		flex-direction: column;
		row-gap: 15px;
		align-items: center;
		justify-content: center;
	}

	.show-card-button {
		margin-top: 10px;
	}

	.card-container {
		width: clamp(370px, 24.22vw, 465px);
		height: clamp(530px, 34.64vw, 665px);
		perspective: 1000px;
	}

	.card {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 0.6s ease;
		will-change: transform;
	}

	.card-front,
	.card-back {
		position: absolute;
		width: 100%;
		height: 100%;
		backface-visibility: hidden;
		pointer-events: none;
	}

	.card-back {
		position: relative;
	}

	.card-dark-overlay {
		position: absolute;
		inset: 0;
		background: rgba(0, 0, 0, 0.3);
		border-radius: inherit;
		pointer-events: none;
		z-index: 1;
	}

	.card-text-wrapper {
		position: absolute;
		inset: 0;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		color: white;
		font-size: clamp(22px, 1.45vw, 28px);
		text-align: center;
		pointer-events: none;
		padding: 30px;
		text-shadow: 1px 1px 2px black;
		z-index: 2;
	}

	.card-text-head {
		text-decoration: underline;
	}

	.card-front img,
	.card-back img {
		width: 100%;
		height: 100%;
		display: block;
		backface-visibility: hidden;
	}

	.card-back {
		transform: rotateY(180deg);
	}

	.card-container.flipped .card {
		transform: rotateY(180deg);
	}
</style>
