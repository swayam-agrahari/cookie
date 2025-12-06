/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `category` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Tables" (
    "tid" SERIAL NOT NULL,
    "tablename" TEXT NOT NULL,

    CONSTRAINT "Tables_pkey" PRIMARY KEY ("tid")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_name_key" ON "category"("name");

-- AddForeignKey
ALTER TABLE "items" ADD CONSTRAINT "items_category_fkey" FOREIGN KEY ("category") REFERENCES "category"("name") ON DELETE CASCADE ON UPDATE CASCADE;
