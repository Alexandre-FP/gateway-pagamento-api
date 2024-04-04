/*
  Warnings:

  - Added the required column `city` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `neighborhood` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `number` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `customers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `zipCode` to the `customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "customers" ADD COLUMN     "city" VARCHAR(255) NOT NULL,
ADD COLUMN     "complement" VARCHAR(255),
ADD COLUMN     "neighborhood" VARCHAR(255) NOT NULL,
ADD COLUMN     "number" VARCHAR(255) NOT NULL,
ADD COLUMN     "state" CHAR(2) NOT NULL,
ADD COLUMN     "street" VARCHAR(255) NOT NULL,
ADD COLUMN     "zipCode" VARCHAR(255) NOT NULL;
