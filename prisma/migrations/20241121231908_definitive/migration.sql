-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "restaurantOwnerId" TEXT;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_restaurantOwnerId_fkey" FOREIGN KEY ("restaurantOwnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
