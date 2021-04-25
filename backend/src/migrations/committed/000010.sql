--! Previous: sha1:4352b4eabd06f20183301cc1b11c7aa52bd3fe7e
--! Hash: sha1:34267d94e82f16a798bb30e5cf195a9944db60f5

-- Enter migration here

CREATE INDEX ON "public"."bodystat"("user_id");
CREATE INDEX ON "public"."user_exercise"("user_id");
CREATE INDEX ON "public"."chat_message"("user_id");
CREATE INDEX ON "public"."session_analytics"("user_id");
