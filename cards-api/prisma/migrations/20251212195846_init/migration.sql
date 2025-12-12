/*
  Warnings:

  - You are about to drop the column `magisterCardId` on the `magister_cards_descriptions` table. All the data in the column will be lost.
  - You are about to drop the column `magisterCardId` on the `magister_cards_divinations` table. All the data in the column will be lost.
  - You are about to drop the column `magisterCardId` on the `magister_cards_images` table. All the data in the column will be lost.
  - You are about to drop the column `magisterCardId` on the `magister_cards_names` table. All the data in the column will be lost.
  - Added the required column `magister_card_id` to the `magister_cards_descriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magister_card_id` to the `magister_cards_divinations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magister_card_id` to the `magister_cards_images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `magister_card_id` to the `magister_cards_names` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "magister_cards_descriptions" DROP CONSTRAINT "magister_cards_descriptions_magisterCardId_fkey";

-- DropForeignKey
ALTER TABLE "magister_cards_divinations" DROP CONSTRAINT "magister_cards_divinations_magisterCardId_fkey";

-- DropForeignKey
ALTER TABLE "magister_cards_images" DROP CONSTRAINT "magister_cards_images_magisterCardId_fkey";

-- DropForeignKey
ALTER TABLE "magister_cards_names" DROP CONSTRAINT "magister_cards_names_magisterCardId_fkey";

-- AlterTable
ALTER TABLE "magister_cards_descriptions" DROP COLUMN "magisterCardId",
ADD COLUMN     "magister_card_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "magister_cards_divinations" DROP COLUMN "magisterCardId",
ADD COLUMN     "magister_card_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "magister_cards_images" DROP COLUMN "magisterCardId",
ADD COLUMN     "magister_card_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "magister_cards_names" DROP COLUMN "magisterCardId",
ADD COLUMN     "magister_card_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "magister_cards_names" ADD CONSTRAINT "magister_cards_names_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_descriptions" ADD CONSTRAINT "magister_cards_descriptions_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_divinations" ADD CONSTRAINT "magister_cards_divinations_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "magister_cards_images" ADD CONSTRAINT "magister_cards_images_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
