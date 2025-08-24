-- CreateEnum
CREATE TYPE "public"."contact_subject" AS ENUM ('general_feedback', 'suggestion', 'bug_report', 'improvement', 'partnership_request', 'content_suggestion', 'other');

-- CreateTable
CREATE TABLE "public"."contact" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" "public"."contact_subject" NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_pkey" PRIMARY KEY ("uuid")
);
