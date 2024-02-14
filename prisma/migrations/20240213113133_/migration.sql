/*
  Warnings:

  - You are about to drop the column `old_price` on the `service` table. All the data in the column will be lost.
  - You are about to drop the `_CategoryToService` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_children` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `about` to the `offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `term` to the `service` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "request_type" ADD VALUE 'NULL';

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToService" DROP CONSTRAINT "_CategoryToService_B_fkey";

-- DropForeignKey
ALTER TABLE "_children" DROP CONSTRAINT "_children_A_fkey";

-- DropForeignKey
ALTER TABLE "_children" DROP CONSTRAINT "_children_B_fkey";

-- AlterTable
ALTER TABLE "offer" ADD COLUMN     "about" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "service" DROP COLUMN "old_price",
ADD COLUMN     "term" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CategoryToService";

-- DropTable
DROP TABLE "_children";

-- CreateTable
CREATE TABLE "rubric" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "status" "status" NOT NULL DEFAULT 'HIDDEN',

    CONSTRAINT "rubric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToRubric" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_GroupToService" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "rubric_name_key" ON "rubric"("name");

-- CreateIndex
CREATE UNIQUE INDEX "rubric_slug_key" ON "rubric"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToRubric_AB_unique" ON "_CategoryToRubric"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToRubric_B_index" ON "_CategoryToRubric"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_GroupToService_AB_unique" ON "_GroupToService"("A", "B");

-- CreateIndex
CREATE INDEX "_GroupToService_B_index" ON "_GroupToService"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToRubric" ADD CONSTRAINT "_CategoryToRubric_A_fkey" FOREIGN KEY ("A") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToRubric" ADD CONSTRAINT "_CategoryToRubric_B_fkey" FOREIGN KEY ("B") REFERENCES "rubric"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToService" ADD CONSTRAINT "_GroupToService_A_fkey" FOREIGN KEY ("A") REFERENCES "group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_GroupToService" ADD CONSTRAINT "_GroupToService_B_fkey" FOREIGN KEY ("B") REFERENCES "service"("id") ON DELETE CASCADE ON UPDATE CASCADE;
