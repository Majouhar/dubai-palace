/*
  Warnings:

  - A unique constraint covering the columns `[cart_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[wish_list_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_cart_id_key" ON "users"("cart_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_wish_list_id_key" ON "users"("wish_list_id");
