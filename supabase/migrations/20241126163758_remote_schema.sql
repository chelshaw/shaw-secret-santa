create table "public"."matches_2024" (
    "santa" uuid not null,
    "match" uuid
);

alter table "public"."matches_2024" enable row level security;

CREATE UNIQUE INDEX matches_2024_pkey ON public.matches_2024 USING btree (santa);

alter table "public"."matches_2024" add constraint "matches_2024_pkey" PRIMARY KEY using index "matches_2024_pkey";

alter table "public"."matches_2024" add constraint "matches_2024_match_fkey" FOREIGN KEY (match) REFERENCES profiles(user_id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."matches_2024" validate constraint "matches_2024_match_fkey";

alter table "public"."matches_2024" add constraint "matches_2024_santa_fkey" FOREIGN KEY (santa) REFERENCES profiles(user_id) ON UPDATE CASCADE not valid;

alter table "public"."matches_2024" validate constraint "matches_2024_santa_fkey";

set check_function_bodies = off;

grant delete on table "public"."matches_2024" to "anon";

grant insert on table "public"."matches_2024" to "anon";

grant references on table "public"."matches_2024" to "anon";

grant select on table "public"."matches_2024" to "anon";

grant trigger on table "public"."matches_2024" to "anon";

grant truncate on table "public"."matches_2024" to "anon";

grant update on table "public"."matches_2024" to "anon";

grant delete on table "public"."matches_2024" to "authenticated";

grant insert on table "public"."matches_2024" to "authenticated";

grant references on table "public"."matches_2024" to "authenticated";

grant select on table "public"."matches_2024" to "authenticated";

grant trigger on table "public"."matches_2024" to "authenticated";

grant truncate on table "public"."matches_2024" to "authenticated";

grant update on table "public"."matches_2024" to "authenticated";

grant delete on table "public"."matches_2024" to "service_role";

grant insert on table "public"."matches_2024" to "service_role";

grant references on table "public"."matches_2024" to "service_role";

grant select on table "public"."matches_2024" to "service_role";

grant trigger on table "public"."matches_2024" to "service_role";

grant truncate on table "public"."matches_2024" to "service_role";

grant update on table "public"."matches_2024" to "service_role";

create policy "has access key"
on "public"."matches_2024"
as restrictive
for all
to authenticated
using ((((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'access'::text) = access_key()));


create policy "when user is santa"
on "public"."matches_2024"
as restrictive
for select
to authenticated
using ((((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'userId'::text) = (santa)::text));



