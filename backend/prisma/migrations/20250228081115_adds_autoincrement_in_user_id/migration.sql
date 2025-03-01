-- AlterTable
CREATE SEQUENCE users_userid_seq;
ALTER TABLE "users" ALTER COLUMN "userId" SET DEFAULT nextval('users_userid_seq');
ALTER SEQUENCE users_userid_seq OWNED BY "users"."userId";
