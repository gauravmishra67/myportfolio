SET local check_function_bodies = off;

CREATE TABLE "public"."admin_users" (
  "id"         uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "email"      text                     NOT NULL,
  "role"       text                     NOT NULL DEFAULT 'admin'::text,
  "created_at" timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT "admin_users_email_key" UNIQUE (email),
  CONSTRAINT "admin_users_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."admin_users"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."certificates" (
  "id"             uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "title"          text                     NOT NULL,
  "issuer"         text                     NOT NULL,
  "issue_date"     date,
  "credential_id"  text,
  "credential_url" text,
  "image"          text,
  "description"    text,
  "skills"         text[],
  "featured"       boolean                  DEFAULT false,
  "sort_order"     integer                  DEFAULT 0,
  "created_at"     timestamp with time zone DEFAULT now(),
  "updated_at"     timestamp with time zone DEFAULT now(),
  CONSTRAINT "certificates_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."certificates"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."education" (
  "id"             uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "institution"    text                     NOT NULL,
  "degree"         text                     NOT NULL,
  "field_of_study" text,
  "location"       text,
  "start_date"     date,
  "end_date"       date,
  "grade"          text,
  "description"    text,
  "is_current"     boolean                  DEFAULT false,
  "sort_order"     integer                  DEFAULT 0,
  "created_at"     timestamp with time zone DEFAULT now(),
  "updated_at"     timestamp with time zone DEFAULT now(),
  "level"          text,
  "gpa"            text,
  "year"           text,
  "status"         text,
  CONSTRAINT "education_pkey" PRIMARY KEY (id),
  CONSTRAINT "education_status_check" CHECK ((status = ANY (ARRAY['completed'::text, 'ongoing'::text])))
);

ALTER TABLE "public"."education"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."experience" (
  "id"               uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "organization"     text                     NOT NULL,
  "role"             text                     NOT NULL,
  "employment_type"  text,
  "location"         text,
  "start_date"       date,
  "end_date"         date,
  "is_current"       boolean                  DEFAULT false,
  "description"      text,
  "responsibilities" text[],
  "technologies"     text[],
  "organization_url" text,
  "sort_order"       integer                  DEFAULT 0,
  "created_at"       timestamp with time zone DEFAULT now(),
  "updated_at"       timestamp with time zone DEFAULT now(),
  "year"             text,
  CONSTRAINT "experience_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."experience"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."goals" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "title"       text                     NOT NULL,
  "description" text,
  "category"    text,
  "target_date" date,
  "status"      text                     DEFAULT 'current'::text,
  "featured"    boolean                  DEFAULT false,
  "sort_order"  integer                  DEFAULT 0,
  "created_at"  timestamp with time zone DEFAULT now(),
  "updated_at"  timestamp with time zone DEFAULT now(),
  CONSTRAINT "goals_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."goals"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."learning" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"        text                     NOT NULL,
  "description" text                     NOT NULL,
  "icon"        text                     NOT NULL,
  "progress"    integer,
  "status"      text                     NOT NULL DEFAULT 'active'::text,
  "sort_order"  integer                  DEFAULT 0,
  "created_at"  timestamp with time zone DEFAULT now(),
  "updated_at"  timestamp with time zone DEFAULT now(),
  CONSTRAINT "learning_pkey" PRIMARY KEY (id),
  CONSTRAINT "learning_progress_check" CHECK (((progress >= 0) AND (progress <= 100))),
  CONSTRAINT "learning_status_check" CHECK ((status = ANY (ARRAY['active'::text, 'planned'::text, 'paused'::text])))
);

ALTER TABLE "public"."learning"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."profile" (
  "id"                  uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"                text                     NOT NULL,
  "title"               text,
  "tagline"             text,
  "short_bio"           text,
  "about"               text,
  "location"            text,
  "email"               text,
  "phone"               text,
  "profile_image"       text,
  "logo"                text,
  "github_url"          text,
  "linkedin_url"        text,
  "instagram_url"       text,
  "resume_url"          text,
  "availability_status" text,
  "created_at"          timestamp with time zone DEFAULT now(),
  "updated_at"          timestamp with time zone DEFAULT now(),
  "short_name"          text,
  "hero_headline"       text,
  "hero_subtext"        text,
  "about_sections"      jsonb,
  "identity_pillars"    jsonb,
  "stats"               jsonb,
  "contact_cta"         text,
  "formspree_endpoint"  text,
  CONSTRAINT "profile_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."profile"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."projects" (
  "id"                    bigint                   GENERATED BY DEFAULT AS IDENTITY NOT NULL,
  "created_at"            timestamp with time zone NOT NULL DEFAULT now(),
  "title"                 text,
  "category"              text,
  "description"           text,
  "technologies"          text[]                   NOT NULL DEFAULT '{}'::text[],
  "year"                  text,
  "live_url"              text,
  "github_url"            text,
  "image"                 text,
  "client_project"        boolean                  NOT NULL DEFAULT false,
  "source_code_available" boolean                  NOT NULL DEFAULT false,
  "is_novel"              boolean                  NOT NULL DEFAULT false,
  "featured"              boolean                  NOT NULL DEFAULT false,
  "sort_order"            integer                  NOT NULL DEFAULT 0,
  "details"               jsonb                    NOT NULL DEFAULT '{}'::jsonb,
  CONSTRAINT "projects_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."projects"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."skills" (
  "id"          uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "name"        text                     NOT NULL,
  "category"    text                     NOT NULL,
  "proficiency" integer,
  "icon"        text,
  "description" text,
  "featured"    boolean                  DEFAULT false,
  "sort_order"  integer                  DEFAULT 0,
  "created_at"  timestamp with time zone DEFAULT now(),
  "updated_at"  timestamp with time zone DEFAULT now(),
  "level"       integer,
  CONSTRAINT "skills_pkey" PRIMARY KEY (id)
);

ALTER TABLE "public"."skills"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.is_admin()
  RETURNS boolean
  LANGUAGE sql
  SECURITY DEFINER
  SET search_path TO 'public'
  AS $function$
  select exists (
    select 1
    from public.admin_users
    where email = (select auth.jwt() ->> 'email')
      and role = 'admin'
  );
$function$;

CREATE POLICY "Users can check their own admin record" ON "public"."admin_users"
  FOR SELECT
  TO "authenticated"
  USING ((email = ( SELECT (auth.jwt() ->> 'email'::text))));

CREATE POLICY "Admins can delete certificates" ON "public"."certificates"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert certificates" ON "public"."certificates"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update certificates" ON "public"."certificates"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view certificates" ON "public"."certificates"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view certificates" ON "public"."certificates"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete education" ON "public"."education"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert education" ON "public"."education"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update education" ON "public"."education"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view education" ON "public"."education"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view education" ON "public"."education"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete experience" ON "public"."experience"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert experience" ON "public"."experience"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update experience" ON "public"."experience"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view experience" ON "public"."experience"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view experience" ON "public"."experience"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete goals" ON "public"."goals"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert goals" ON "public"."goals"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update goals" ON "public"."goals"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view goals" ON "public"."goals"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view goals" ON "public"."goals"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete learning" ON "public"."learning"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert learning" ON "public"."learning"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update learning" ON "public"."learning"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view learning" ON "public"."learning"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view learning" ON "public"."learning"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete profile" ON "public"."profile"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert profile" ON "public"."profile"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update profile" ON "public"."profile"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view profile" ON "public"."profile"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view profile" ON "public"."profile"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete projects" ON "public"."projects"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert projects" ON "public"."projects"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update projects" ON "public"."projects"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view projects" ON "public"."projects"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view projects" ON "public"."projects"
  FOR SELECT
  TO "anon"
  USING (true);

CREATE POLICY "Admins can delete skills" ON "public"."skills"
  FOR DELETE
  TO "authenticated"
  USING (public.is_admin());

CREATE POLICY "Admins can insert skills" ON "public"."skills"
  FOR INSERT
  TO "authenticated"
  WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update skills" ON "public"."skills"
  FOR UPDATE
  TO "authenticated"
  USING (public.is_admin())
  WITH CHECK (public.is_admin());

CREATE POLICY "Authenticated users can view skills" ON "public"."skills"
  FOR SELECT
  TO "authenticated"
  USING (true);

CREATE POLICY "Public can view skills" ON "public"."skills"
  FOR SELECT
  TO "anon"
  USING (true);

COMMENT ON TABLE "public"."projects" IS 'my project of portfolio';

GRANT EXECUTE ON FUNCTION "public"."is_admin"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."admin_users" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."certificates" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."education" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."experience" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."goals" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."learning" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profile" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."projects" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."skills" TO "anon", "authenticated", "postgres", "service_role";

