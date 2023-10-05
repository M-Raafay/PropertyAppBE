-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('GeneralUser', 'Owner', 'Manager', 'AssistantManager', 'Agent');

-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('Manager', 'AssistantManager', 'Agent');

-- CreateEnum
CREATE TYPE "PropertyType" AS ENUM ('Residential', 'Commercial');

-- CreateEnum
CREATE TYPE "PropertyAction" AS ENUM ('Buy', 'Sell', 'Rent');

-- CreateTable
CREATE TABLE "users" (
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "contactNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "agency" (
    "agencyId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "contactNo" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "agencyOwnerId" TEXT NOT NULL,
    "logoURL" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "facebook" TEXT,
    "instagram" TEXT,
    "whatsapp" TEXT,
    "youtube" TEXT,

    CONSTRAINT "agency_pkey" PRIMARY KEY ("agencyId")
);

-- CreateTable
CREATE TABLE "agencyMembers" (
    "memberId" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,

    CONSTRAINT "agencyMembers_pkey" PRIMARY KEY ("memberId")
);

-- CreateTable
CREATE TABLE "property" (
    "propertyId" TEXT NOT NULL,
    "propertyType" "PropertyType" NOT NULL,
    "propertyAction" "PropertyAction" NOT NULL,
    "agencyID" TEXT,
    "agencyLogo" TEXT,
    "listedByUserID" TEXT NOT NULL,
    "listedByRole" "UserRole" NOT NULL,
    "listedByContact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "area" DOUBLE PRECISION NOT NULL,
    "amenitiesFacilities" JSONB NOT NULL,
    "features" JSONB NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "images" TEXT[],
    "description" TEXT NOT NULL,
    "mapLocation" TEXT NOT NULL,

    CONSTRAINT "property_pkey" PRIMARY KEY ("propertyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agency_email_key" ON "agency"("email");

-- CreateIndex
CREATE UNIQUE INDEX "agency_agencyOwnerId_key" ON "agency"("agencyOwnerId");

-- CreateIndex
CREATE UNIQUE INDEX "agencyMembers_user_key" ON "agencyMembers"("user");

-- AddForeignKey
ALTER TABLE "agency" ADD CONSTRAINT "agency_agencyOwnerId_fkey" FOREIGN KEY ("agencyOwnerId") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencyMembers" ADD CONSTRAINT "agencyMembers_agency_fkey" FOREIGN KEY ("agency") REFERENCES "agency"("agencyId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencyMembers" ADD CONSTRAINT "agencyMembers_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_agencyID_fkey" FOREIGN KEY ("agencyID") REFERENCES "agency"("agencyId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "property" ADD CONSTRAINT "property_listedByUserID_fkey" FOREIGN KEY ("listedByUserID") REFERENCES "users"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
