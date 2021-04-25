--! Previous: sha1:8542c5a8435fc729b069900575ed7e9f023f082d
--! Hash: sha1:d78ee62ce99871b8a7944c132b8dd7ba52686dc3

-- Enter migration here

update "exercise"
SET exercise_type=initcap(exercise_type);
