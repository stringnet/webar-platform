-- CreateTable
CREATE TABLE "ARProject" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "markerUrl" TEXT NOT NULL,
    "contentUrl" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ARProject_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ARProject" ADD CONSTRAINT "ARProject_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
