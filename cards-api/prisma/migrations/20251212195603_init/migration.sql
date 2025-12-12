-- CreateEnum
CREATE TYPE "card_suit" AS ENUM ('SPADES', 'HEARTS', 'CLUBS', 'DIAMONDS');

-- CreateEnum
CREATE TYPE "card_rank" AS ENUM ('TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'JACK', 'QUEEN', 'KING', 'ACE');

-- CreateEnum
CREATE TYPE "language" AS ENUM ('BE', 'RU', 'EN');

-- CreateEnum
CREATE TYPE "deck_type_name" AS ENUM ('WITH_CAPTIONS', 'WITHOUT_CAPTIONS', 'METAPHORICAL');

-- CreateTable
CREATE TABLE "magister_cards" (
    "id" SERIAL NOT NULL,
    "suit" "card_suit" NOT NULL,
    "rank" "card_rank" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "magister_cards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magister_cards_names" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "slug" VARCHAR(300) NOT NULL,
    "language" "language" NOT NULL,
    "magisterCardId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "magister_cards_names_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magister_cards_descriptions" (
    "id" SERIAL NOT NULL,
    "short_description" VARCHAR(1000) NOT NULL,
    "long_description" VARCHAR(5000) NOT NULL,
    "language" "language" NOT NULL,
    "magisterCardId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "magister_cards_descriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magister_cards_divinations" (
    "id" SERIAL NOT NULL,
    "divinatory_meaning" VARCHAR(1000) NOT NULL,
    "divinatory_interpretation" VARCHAR(5000) NOT NULL,
    "language" "language" NOT NULL,
    "magisterCardId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "magister_cards_divinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "magister_cards_images" (
    "id" SERIAL NOT NULL,
    "divinatory_meaning" VARCHAR(1000) NOT NULL,
    "divinatory_interpretation" VARCHAR(5000) NOT NULL,
    "language" "language" NOT NULL,
    "magisterCardId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "magister_cards_images_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "magister_cards_names_slug_key" ON "magister_cards_names"("slug");

-- AddForeignKey
ALTER TABLE "magister_cards_names" ADD CONSTRAINT "magister_cards_names_magisterCardId_fkey" FOREIGN KEY ("magisterCardId") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_descriptions" ADD CONSTRAINT "magister_cards_descriptions_magisterCardId_fkey" FOREIGN KEY ("magisterCardId") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_divinations" ADD CONSTRAINT "magister_cards_divinations_magisterCardId_fkey" FOREIGN KEY ("magisterCardId") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_images" ADD CONSTRAINT "magister_cards_images_magisterCardId_fkey" FOREIGN KEY ("magisterCardId") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
