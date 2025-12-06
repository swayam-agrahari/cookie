-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_itemId_fkey";

-- DropForeignKey
ALTER TABLE "cart" DROP CONSTRAINT "cart_orderId_fkey";

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "items"("itemId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "cart" ADD CONSTRAINT "cart_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("orderId") ON DELETE CASCADE ON UPDATE CASCADE;
