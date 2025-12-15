/*
  Warnings:

  - A unique constraint covering the columns `[magister_card_id,language]` on the table `magister_cards_descriptions` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[magister_card_id,language]` on the table `magister_cards_divinations` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[magister_card_id,language]` on the table `magister_cards_names` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "magister_cards_descriptions_magister_card_id_language_key" ON "magister_cards_descriptions"("magister_card_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "magister_cards_divinations_magister_card_id_language_key" ON "magister_cards_divinations"("magister_card_id", "language");

-- CreateIndex
CREATE UNIQUE INDEX "magister_cards_names_magister_card_id_language_key" ON "magister_cards_names"("magister_card_id", "language");
