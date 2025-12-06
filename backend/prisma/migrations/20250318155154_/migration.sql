/*
  Warnings:

  - Added the required column `changedId` to the `Activities` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Activities" ADD COLUMN     "changedId" INTEGER NOT NULL;
