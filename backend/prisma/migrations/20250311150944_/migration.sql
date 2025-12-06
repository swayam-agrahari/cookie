/*
  Warnings:

  - You are about to drop the column `productCount` on the `category` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "category" DROP COLUMN "productCount";

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "status" DROP DEFAULT;
