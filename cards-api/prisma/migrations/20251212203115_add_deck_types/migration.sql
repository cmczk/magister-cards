-- CreateTable
CREATE TABLE "deck_types" (
    "id" SERIAL NOT NULL,
    "name" "deck_type_name" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "deck_types_pkey" PRIMARY KEY ("id")
);
