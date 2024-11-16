-- Create users
insert into auth.users
  (id, email)
values
  ('bbf7b042-d013-46a6-9f37-0e37b2da1aae', 'kaylee@example.com'),
  ('6c18136e-2169-4485-8eaa-fddc2fef8dc5', 'sadie@example.com'),
  ('8e0d1488-7a1c-4df5-ae30-ee8be424e211', 'zac@example.com'),
  ('b21e068b-9983-4f7b-8cd8-0f4adf50f143', 'chelshaw@hotmail.com');

-- Create profiles with matching UID
insert into profiles
  (user_id, name)
values
  ('bbf7b042-d013-46a6-9f37-0e37b2da1aae', 'Kaylee'),
  ('6c18136e-2169-4485-8eaa-fddc2fef8dc5', 'Sadie'),
  ('8e0d1488-7a1c-4df5-ae30-ee8be424e211', 'Zac'),
  ('b21e068b-9983-4f7b-8cd8-0f4adf50f143', 'Chelsea');

-- Update profile with answers data
update profiles 
set hobbies = nv.hobbies
from
    ( values
        ('bbf7b042-d013-46a6-9f37-0e37b2da1aae', 'walking, chewing, sleeping', 'bath'),
        ('6c18136e-2169-4485-8eaa-fddc2fef8dc5', 'sunning', 'bath'),
        ('8e0d1488-7a1c-4df5-ae30-ee8be424e211', 'running', 'hugs'),
        ('b21e068b-9983-4f7b-8cd8-0f4adf50f143', 'sleeping', 'bath')
    ) as nv (id, hobbies, need)
where profiles.user_id::text = nv.id;

-- Create matches
insert into matches_2023
(santa, match)
values
('bbf7b042-d013-46a6-9f37-0e37b2da1aae', '6c18136e-2169-4485-8eaa-fddc2fef8dc5'),
('6c18136e-2169-4485-8eaa-fddc2fef8dc5', '8e0d1488-7a1c-4df5-ae30-ee8be424e211'),
('8e0d1488-7a1c-4df5-ae30-ee8be424e211', 'b21e068b-9983-4f7b-8cd8-0f4adf50f143'),
('b21e068b-9983-4f7b-8cd8-0f4adf50f143', 'bbf7b042-d013-46a6-9f37-0e37b2da1aae')
