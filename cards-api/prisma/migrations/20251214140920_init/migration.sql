-- CreateTable
CREATE TABLE "magister_cards" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "suit" TEXT NOT NULL,
    "rank" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "magister_cards_names" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "magister_card_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "magister_cards_names_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "magister_cards_descriptions" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "short_description" TEXT NOT NULL,
    "long_description" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "magister_card_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "magister_cards_descriptions_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "magister_cards_divinations" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "divinatory_meaning" TEXT NOT NULL,
    "divinatory_interpretation" TEXT NOT NULL,
    "language" TEXT NOT NULL,
    "magister_card_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "magister_cards_divinations_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "magister_cards_images" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "image_url" TEXT NOT NULL,
    "magister_card_id" INTEGER NOT NULL,
    "deck_type_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME,
    CONSTRAINT "magister_cards_images_magister_card_id_fkey" FOREIGN KEY ("magister_card_id") REFERENCES "magister_cards" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "magister_cards_images_deck_type_id_fkey" FOREIGN KEY ("deck_type_id") REFERENCES "deck_types" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "deck_types" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);

-- CreateTable
CREATE TABLE "users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "user_type" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    "deleted_at" DATETIME
);

-- CreateIndex
CREATE UNIQUE INDEX "magister_cards_names_slug_key" ON "magister_cards_names"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
