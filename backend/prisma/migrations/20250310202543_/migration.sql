/*
  Warnings:

  - You are about to drop the column `itemName` on the `cart` table. All the data in the column will be lost.
  - You are about to drop the column `price` on the `cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "cart" DROP COLUMN "itemName",
DROP COLUMN "price";
