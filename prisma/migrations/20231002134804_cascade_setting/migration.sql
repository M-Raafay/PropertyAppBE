-- DropForeignKey
ALTER TABLE "agency" DROP CONSTRAINT "agency_agencyOwnerId_fkey";

-- DropForeignKey
ALTER TABLE "agencyMembers" DROP CONSTRAINT "agencyMembers_agency_fkey";

-- DropForeignKey
ALTER TABLE "agencyMembers" DROP CONSTRAINT "agencyMembers_user_fkey";

-- AddForeignKey
ALTER TABLE "agency" ADD CONSTRAINT "agency_agencyOwnerId_fkey" FOREIGN KEY ("agencyOwnerId") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencyMembers" ADD CONSTRAINT "agencyMembers_agency_fkey" FOREIGN KEY ("agency") REFERENCES "agency"("agencyId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "agencyMembers" ADD CONSTRAINT "agencyMembers_user_fkey" FOREIGN KEY ("user") REFERENCES "users"("userId") ON DELETE CASCADE ON UPDATE CASCADE;
