/*
  Warnings:

  - You are about to drop the column `divinatory_interpretation` on the `magister_cards_images` table. All the data in the column will be lost.
  - You are about to drop the column `divinatory_meaning` on the `magister_cards_images` table. All the data in the column will be lost.
  - You are about to drop the column `language` on the `magister_cards_images` table. All the data in the column will be lost.
  - Added the required column `deck_type_id` to the `magister_cards_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_url` to the `magister_cards_images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "magister_cards_images" DROP COLUMN "divinatory_interpretation",
DROP COLUMN "divinatory_meaning",
DROP COLUMN "language",
ADD COLUMN     "deck_type_id" INTEGER NOT NULL,
ADD COLUMN     "image_url" VARCHAR(300) NOT NULL;

-- AddForeignKey
ALTER TABLE "magister_cards_images" ADD CONSTRAINT "magister_cards_images_deck_type_id_fkey" FOREIGN KEY ("deck_type_id") REFERENCES "deck_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
