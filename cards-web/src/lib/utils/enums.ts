export const SUITS = {
	SPADES: 'Пики',
	HEARTS: 'Черви',
	CLUBS: 'Крести',
	DIAMONDS: 'Бубны',
};

export const RANKS = {
	TWO: 'Двойка',
	THREE: 'Тройка',
	FOUR: 'Четвёрка',
	FIVE: 'Пятёрка',
	SIX: 'Шестёрка',
	SEVEN: 'Семёрка',
	EIGHT: 'Восьмёрка',
	NINE: 'Девятка',
	TEN: 'Десятка',
	JACK: 'Валет',
	QUEEN: 'Дама',
	KING: 'Король',
	ACE: 'Туз',
};

export const getSuitName = (suit: keyof typeof SUITS) => {
	return SUITS[suit] ?? 'Неизвестно';
};

export const getRankName = (rank: keyof typeof RANKS) => {
	return RANKS[rank] ?? 'Неизвестно';
};
