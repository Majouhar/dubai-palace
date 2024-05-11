-- AlterTable
ALTER TABLE "items" ALTER COLUMN "date" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "order_items" ALTER COLUMN "date_added" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "orders" ALTER COLUMN "date_ordered" SET DATA TYPE VARCHAR(255);
