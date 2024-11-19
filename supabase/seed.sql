-- Create users
insert into auth.users
  (id, email)
values
  ('011f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'kaylee@example.com'),
  ('022f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'sadie@example.com'),
  ('033f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'zac@example.com'),
  ('044f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'chelshaw@hotmail.com');

-- Create profiles with matching UID
insert into profiles
  (user_id, name)
values
  ('011f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'Kaylee'),
  ('022f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'Sadie'),
  ('033f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'Zac'),
  ('044f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'Chelsea');

insert into private
  (user_id, email, confirmed)
values
  ('011f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'kaylee@example.com', TRUE),
  ('022f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'sadie@example.com', FALSE),
  ('033f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'zac@example.com', TRUE),
  ('044f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'chelshaw@hotmail.com', TRUE);


-- Add answers data
insert into answers
  (user_id, q_key, answer)
values
  ('011f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'need', 'Donut'),
  ('022f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'style', 'white and pink'),
  ('033f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'pamper', 'run'),
  ('044f99ef-3696-4e6f-9f9b-90bf40e8bfee', 'hobbies', 'coding');

-- Create matches
insert into matches_2023
(santa, match)
values
('011f99ef-3696-4e6f-9f9b-90bf40e8bfee', '022f99ef-3696-4e6f-9f9b-90bf40e8bfee'),
('022f99ef-3696-4e6f-9f9b-90bf40e8bfee', '011f99ef-3696-4e6f-9f9b-90bf40e8bfee'),
('033f99ef-3696-4e6f-9f9b-90bf40e8bfee', '044f99ef-3696-4e6f-9f9b-90bf40e8bfee'),
('044f99ef-3696-4e6f-9f9b-90bf40e8bfee', '033f99ef-3696-4e6f-9f9b-90bf40e8bfee');
