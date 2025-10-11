/*
  Warnings:

  - Changed the type of `type` on the `Vulnerability` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "VulnerabilityType" AS ENUM ('SQL_INJECTION', 'CROSS_SITE_SCRIPTING', 'RCE', 'INFO_DISCLOSURE', 'OTHER');

-- AlterTable
ALTER TABLE "Scan" ALTER COLUMN "technologyFingerprint" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Vulnerability" ADD COLUMN     "resolvedAt" TIMESTAMP(3),
ADD COLUMN     "resolvedByUserId" TEXT,
DROP COLUMN "type",
ADD COLUMN     "type" "VulnerabilityType" NOT NULL;

-- CreateIndex
CREATE INDEX "AuditLog_organizationId_createdAt_idx" ON "AuditLog"("organizationId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Scan_organizationId_status_idx" ON "Scan"("organizationId", "status");

-- CreateIndex
CREATE INDEX "Target_organizationId_name_idx" ON "Target"("organizationId", "name");

-- CreateIndex
CREATE INDEX "Vulnerability_scanId_severity_idx" ON "Vulnerability"("scanId", "severity");

-- AddForeignKey
ALTER TABLE "Vulnerability" ADD CONSTRAINT "Vulnerability_resolvedByUserId_fkey" FOREIGN KEY ("resolvedByUserId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
