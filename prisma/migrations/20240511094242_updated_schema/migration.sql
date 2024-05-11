-- AlterTable
ALTER TABLE "order_items" ADD COLUMN     "date_delivered" VARCHAR(255),
ADD COLUMN     "price_while_order" DECIMAL(10,2);

-- AlterTable
ALTER TABLE "orders" ADD COLUMN     "delivered_date" VARCHAR(255),
ADD COLUMN     "expected_delivery_date" VARCHAR(255),
ADD COLUMN     "shipped_date" VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "returns" INTEGER[];

-- CreateTable
CREATE TABLE "returns" (
    "return_id" SERIAL NOT NULL,
    "items" JSONB NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date_returned" VARCHAR(255),
    "expected_date_returned" VARCHAR(255) NOT NULL,

    CONSTRAINT "returns_pkey" PRIMARY KEY ("return_id")
);
