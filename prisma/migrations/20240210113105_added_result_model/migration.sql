-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "refresh_token_expires_in" INTEGER;

-- CreateTable
CREATE TABLE "Result" (
    "id" TEXT NOT NULL,
    "wpm" INTEGER NOT NULL,
    "acc" INTEGER NOT NULL,
    "time" INTEGER NOT NULL,
    "authorId" TEXT NOT NULL,

    CONSTRAINT "Result_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Result" ADD CONSTRAINT "Result_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
