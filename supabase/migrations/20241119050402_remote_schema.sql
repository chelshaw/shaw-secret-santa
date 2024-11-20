drop policy "Authd users can update their own with access key" on "public"."answers";

set check_function_bodies = off;

create policy "Users can delete answers of their own with access key"
on "public"."answers"
as permissive
for delete
to authenticated
using (((((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'access'::text) = access_key()) AND (((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'userId'::text) = (user_id)::text)));


create policy "Authd users can update their own with access key"
on "public"."answers"
as permissive
for update
to authenticated
using ((((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'access'::text) = access_key()))
with check ((((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'userId'::text) = (user_id)::text));



