-- CreateTable
CREATE TABLE "carts" (
    "cart_id" SERIAL NOT NULL,
    "items" JSONB NOT NULL,

    CONSTRAINT "carts_pkey" PRIMARY KEY ("cart_id")
);

-- CreateTable
CREATE TABLE "items" (
    "id" VARCHAR(255) NOT NULL,
    "group_id" INTEGER NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "brand" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "tags" TEXT[],
    "size" VARCHAR(255),
    "discount" DECIMAL(5,2) NOT NULL,
    "inventory" INTEGER NOT NULL,
    "color" VARCHAR(255) NOT NULL,
    "images" TEXT[],
    "date" DATE NOT NULL,
    "features" TEXT[],
    "order_multiple" INTEGER,
    "order_quantity" INTEGER,

    CONSTRAINT "items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "order_item_id" SERIAL NOT NULL,
    "item_id" VARCHAR(255),
    "quantity" INTEGER NOT NULL,
    "date_added" DATE NOT NULL,

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("order_item_id")
);

-- CreateTable
CREATE TABLE "orders" (
    "order_id" SERIAL NOT NULL,
    "items" JSONB NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date_ordered" DATE NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("order_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" SERIAL NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255),
    "mobile" VARCHAR(255) NOT NULL,
    "address_line1" VARCHAR(255),
    "address_line2" VARCHAR(255),
    "pincode" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255),
    "district" VARCHAR(255),
    "cart_id" INTEGER,
    "orders" INTEGER[],
    "wish_list_id" INTEGER,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "wish_lists" (
    "wish_list_id" SERIAL NOT NULL,
    "item_ids" VARCHAR(255)[],

    CONSTRAINT "wish_lists_pkey" PRIMARY KEY ("wish_list_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "items_name_key" ON "items"("name");

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_item_id_fkey" FOREIGN KEY ("item_id") REFERENCES "items"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("cart_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_wish_list_id_fkey" FOREIGN KEY ("wish_list_id") REFERENCES "wish_lists"("wish_list_id") ON DELETE NO ACTION ON UPDATE NO ACTION;

