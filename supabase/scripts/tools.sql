-- Move answers from profile to answers
insert into answers(user_id, answer, q_key)
select x.* from profiles
cross join lateral (values
    (profiles.user_id, profiles.hobbies, 'hobbies'),
    (profiles.user_id, profiles.need, 'need')
) as x(user_id, answer, q_key)
where answer is not null

-- retrieve santa names
SELECT A.*, B1.name AS santa, B2.name AS match
FROM matches_2023 A
LEFT JOIN profiles B1 ON A.santa = B1.user_id
LEFT JOIN profiles B2 ON A.match = B2.user_id

SELECT P.name, P.user_id, A.email from profiles P
JOIN auth.users A ON A.id = P.user_id

-- move auth.email into private table
insert into private(user_id, email)
SELECT P.user_id, A.email from profiles P
JOIN auth.users A ON A.id = P.user_id

-- policy
-- using:
(((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'access'::text) = access_key()::text)
-- with check:
  (((( SELECT auth.jwt() AS jwt) -> 'user_metadata'::text) ->> 'user_id'::text) = user_id::text)