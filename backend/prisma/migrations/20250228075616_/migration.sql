-- CreateTable
CREATE TABLE "items" (
    "itemId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bio" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "subcategory" TEXT NOT NULL,
    "isvegan" BOOLEAN NOT NULL,
    "cost" INTEGER NOT NULL,
    "availability" BOOLEAN NOT NULL,

    CONSTRAINT "items_pkey" PRIMARY KEY ("itemId")
);

-- CreateTable
CREATE TABLE "orders" (
    "orderId" SERIAL NOT NULL,
    "tableId" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "cart" (
    "orderId" INTEGER NOT NULL,
    "itemId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "cart_pkey" PRIMARY KEY ("orderId","itemId")
);

-- CreateTable
CREATE TABLE "users" (
    "userId" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "isAdmin" BOOLEAN NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("itemId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;
