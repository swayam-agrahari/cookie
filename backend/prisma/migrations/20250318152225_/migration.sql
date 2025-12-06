-- CreateEnum
CREATE TYPE "Activity" AS ENUM ('PLACED_ORDER', 'COMPLETED_ORDER', 'ADDED_ITEM', 'UPDATED_ITEM', 'ADDED_CATEGORY', 'UPDATED_CATEGORY');

-- CreateTable
CREATE TABLE "Activities" (
    "activitId" SERIAL NOT NULL,
    "activity" "Activity" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Activities_pkey" PRIMARY KEY ("activitId")
);
