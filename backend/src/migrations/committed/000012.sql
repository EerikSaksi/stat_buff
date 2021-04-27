--! Previous: sha1:38f79a787992a715ce6642406bff26c329105536
--! Hash: sha1:28ef2524a70a92896db46b8b7b289dd7baa9c8ec

delete from
  "exercise";
alter sequence "exercise_id_seq" restart;
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Bench Press', 13354162);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Deadlift', 7724948);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Squat', 7651637);
insert into
  "exercise_alias" (id, name)
values
  (2, 'Back Squat');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Shoulder Press', 1915786);
insert into
  "exercise_alias" (id, name)
values
  (3, 'Overhead Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Pull Ups', 1097769);
insert into
  "exercise_alias" (id, name)
values
  (4, 'Pullup');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Dumbbell Bench Press', 986718);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Barbell Curl', 916536);
insert into
  "exercise_alias" (id, name)
values
  (6, 'Bicep Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Dumbbell Curl', 782061);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Front Squat', 645762);
insert into
  "exercise_alias" (id, name)
values
  (8, 'Barbell Front Squat');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Bent Over Row', 605088);
insert into
  "exercise_alias" (id, name)
values
  (9, 'Barbell Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Push Ups', 564613);
insert into
  "exercise_alias" (id, name)
values
  (10, 'Press Up');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Shoulder Press',
    486383
  );
insert into
  "exercise_alias" (id, name)
values
  (11, 'Dumbbell Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Power Clean', 475910);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Incline Bench Press', 440513);
insert into
  "exercise_alias" (id, name)
values
  (13, 'Incline Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Sled Leg Press', 439430);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Bodyweight', 'Dips', 434271);
insert into
  "exercise_alias" (id, name)
values
  (15, 'Tricep Dips');
insert into
  "exercise_alias" (id, name)
values
  (15, 'Chest Dip');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Military Press', 321890);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Hex Bar Deadlift', 321335);
insert into
  "exercise_alias" (id, name)
values
  (17, 'Trap Bar Deadlift');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Lat Pulldown', 316879);
insert into
  "exercise_alias" (id, name)
values
  (18, 'Machine Pulldown');
insert into
  "exercise_alias" (id, name)
values
  (18, 'Back Lat Pulldown');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Chest',
    'Dumbbell',
    'Incline Dumbbell Bench Press',
    265624
  );
insert into
  "exercise_alias" (id, name)
values
  (19, 'Incline Dumbbell Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Chin Ups', 256834);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Horizontal Leg Press', 236861);
insert into
  "exercise_alias" (id, name)
values
  (21, 'Seated Leg Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Lateral Raise',
    214661
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Row', 214213);
insert into
  "exercise_alias" (id, name)
values
  (23, 'Dumbbell Bent Over Row');
insert into
  "exercise_alias" (id, name)
values
  (23, 'One Arm Dumbbell Row');
insert into
  "exercise_alias" (id, name)
values
  (23, 'One Arm Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Snatch', 199614);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Clean and Jerk', 196690);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Whole Body',
    'Barbell',
    'Romanian Deadlift',
    188400
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Hip Thrust', 188151);
insert into
  "exercise_alias" (id, name)
values
  (27, 'Barbell Hip Thrust');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Sumo Deadlift', 166154);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Clean', 158297);
insert into
  "exercise_alias" (id, name)
values
  (29, 'Squat Clean');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Leg Extension', 156665);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Push Press', 144198);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Clean and Press', 136368);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Machine', 'Chest Press', 117104);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Cable', 'Tricep Pushdown', 114113);
insert into
  "exercise_alias" (id, name)
values
  (34, 'Tricep Pressdown');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Barbell Shrug', 110032);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Machine Calf Raise', 98324);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Vertical Leg Press', 97872);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Decline Bench Press', 97141);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Hammer Curl', 90684);
insert into
  "exercise_alias" (id, name)
values
  (39, 'Dumbbell Hammer Curl');
insert into
  "exercise_alias" (id, name)
values
  (39, 'Hammer Curls');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Seated Cable Row', 85784);
insert into
  "exercise_alias" (id, name)
values
  (40, 'Seated Row');
insert into
  "exercise_alias" (id, name)
values
  (40, 'Low Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Cable', 'Tricep Rope Pushdown', 85490);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Shrug', 85464);
insert into
  "exercise_alias" (id, name)
values
  (42, 'Shoulder Shrug');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Close Grip Bench Press', 85277);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Dumbbell Fly', 85262);
insert into
  "exercise_alias" (id, name)
values
  (44, 'Dumbbell Chest Fly');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Pendlay Row', 82540);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Seated Leg Curl', 76493);
insert into
  "exercise_alias" (id, name)
values
  (46, 'Hamstring Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Dumbbell', 'Dumbbell Lunge', 76227);
insert into
  "exercise_alias" (id, name)
values
  (47, 'Dumbbell Lunges');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'T-Bar Row', 75586);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Dumbbell',
    'Dumbbell Tricep Extension',
    74163
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Barbell', 'Tricep Extension', 73719);
insert into
  "exercise_alias" (id, name)
values
  (50, 'French Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Upright Row', 72743);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Preacher Curl', 69945);
insert into
  "exercise_alias" (id, name)
values
  (52, 'Barbell Preacher Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Dumbbell', 'Goblet Squat', 68753);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Rack Pull', 68314);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Barbell',
    'Lying Tricep Extension',
    67626
  );
insert into
  "exercise_alias" (id, name)
values
  (55, 'Skull Crusher');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Lying Leg Curl', 67495);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Front Raise',
    64522
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Sit Ups', 64216);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Machine',
    'Machine Shoulder Press',
    64007
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'EZ Bar Curl', 60909);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Muscle Ups', 59791);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Biceps',
    'Dumbbell',
    'Dumbbell Concentration Curl',
    59477
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Machine', 'Machine Chest Fly', 54909);
insert into
  "exercise_alias" (id, name)
values
  (63, 'Pec Deck Fly');
insert into
  "exercise_alias" (id, name)
values
  (63, 'Butterfly');
insert into
  "exercise_alias" (id, name)
values
  (63, 'Machine Fly');
insert into
  "exercise_alias" (id, name)
values
  (63, 'Fly Machine');
insert into
  "exercise_alias" (id, name)
values
  (63, 'Pec Deck');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Good Morning', 54162);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Bodyweight Squat', 54141);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Legs',
    'Dumbbell',
    'Dumbbell Bulgarian Split Squat',
    52172
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Box Squat', 52037);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Arnold Press', 48498);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Hack Squat', 48468);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Thruster', 47769);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Overhead Squat', 46670);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Floor Press', 45923);
insert into
  "exercise_alias" (id, name)
values
  (72, 'Barbell Floor Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Barbell',
    'Seated Shoulder Press',
    44960
  );
insert into
  "exercise_alias" (id, name)
values
  (73, 'Seated Barbell Shoulder Press');
insert into
  "exercise_alias" (id, name)
values
  (73, 'Seated Barbell Overhead Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Whole Body',
    'Barbell',
    'Stiff Leg Deadlift',
    44850
  );
insert into
  "exercise_alias" (id, name)
values
  (74, 'Stiff Legged Deadlift');
insert into
  "exercise_alias" (id, name)
values
  (74, 'Straight Legged Deadlift');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Incline Dumbbell Fly', 43718);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Dumbbell',
    'Lying Dumbbell Tricep Extension',
    43355
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Push Jerk', 42885);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Zercher Squat', 41278);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Face Pull', 40942);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Barbell Lunge', 40333);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Cable', 'Cable Fly', 39375);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Bulgarian Split Squat', 38661);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Seated Calf Raise', 38644);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Biceps',
    'Dumbbell',
    'Incline Dumbbell Curl',
    38591
  );
insert into
  "exercise_alias" (id, name)
values
  (84, 'Incline Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Hang Clean', 38301);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Hip Abduction', 38296);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Forearms', 'Barbell', 'Wrist Curl', 37940);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Power Snatch', 36647);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Crunches', 36198);
insert into
  "exercise_alias" (id, name)
values
  (89, 'Ab Crunch');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Whole Body',
    'Dumbbell',
    'Dumbbell Romanian Deadlift',
    35711
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Pullover', 35404);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Dumbbell Floor Press', 34592);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Hip Adduction', 34224);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Reverse Fly', 30802);
insert into
  "exercise_alias" (id, name)
values
  (94, 'Rear Delt Fly');
insert into
  "exercise_alias" (id, name)
values
  (94, 'Bent Over Lateral Raise');
insert into
  "exercise_alias" (id, name)
values
  (94, 'Bent Over Raise');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Chest',
    'Dumbbell',
    'Decline Dumbbell Bench Press',
    30536
  );
insert into
  "exercise_alias" (id, name)
values
  (95, 'Decline Dumbbell Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Split Squat', 30315);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Chest',
    'Barbell',
    'Reverse Grip Bench Press',
    29703
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Dumbbell',
    'Dumbbell Tricep Kickback',
    29435
  );
insert into
  "exercise_alias" (id, name)
values
  (98, 'Dumbbell Kickback');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Landmine Squat', 29407);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'Cable Bicep Curl', 29233);
insert into
  "exercise_alias" (id, name)
values
  (100, 'Cable Curl');
insert into
  "exercise_alias" (id, name)
values
  (100, 'Biceps Cable Curl');
insert into
  "exercise_alias" (id, name)
values
  (100, 'Standing Cable Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Forearms', 'Barbell', 'Reverse Wrist Curl', 28669);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Cable', 'Cable Crunch', 26284);
insert into
  "exercise_alias" (id, name)
values
  (102, 'Cable Crunches');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Back',
    'Dumbbell',
    'Chest Supported Dumbbell Row',
    25567
  );
insert into
  "exercise_alias" (id, name)
values
  (103, 'Chest Supported Row');
insert into
  "exercise_alias" (id, name)
values
  (103, 'Incline Dumbbell Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Single Leg Squat', 25275);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Cable', 'Cable Lateral Raise', 25119);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Cable', 'Cable Pull Through', 24990);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Reverse Barbell Curl', 24812);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Biceps',
    'Cable',
    'One Arm Cable Bicep Curl',
    23906
  );
insert into
  "exercise_alias" (id, name)
values
  (108, 'One Arm Cable Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'One Arm Push Ups', 20202);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Handstand Push Ups', 16188);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Burpees', 15144);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Lunge', 11349);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Diamond Push Ups', 10362);
insert into
  "exercise_alias" (id, name)
values
  (113, 'Diamond Pushups');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'One Arm Pull Ups', 7339);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Neutral Grip Pull Ups', 5616);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Hanging Leg Raise', 4474);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Russian Twist', 3979);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Glute Bridge', 3857);
insert into
  "exercise_alias" (id, name)
values
  (118, 'Bridging');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Inverted Row', 3775);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Back Extension', 3450);
insert into
  "exercise_alias" (id, name)
values
  (120, 'Hyper Extension');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Toes To Bar', 2942);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Lying Leg Raise', 2701);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Glute Ham Raise', 1187);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Strict Curl', 46);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Dumbbell', 'Dumbbell Squat', 36);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Paused Bench Press', 32);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Barbell Reverse Lunge', 22);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Renegade Row', 20);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Machine', 'Machine Tricep Press', 20);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Dumbbell', 'Dumbbell Side Bend', 19);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Dumbbell', 'Dumbbell Calf Raise', 19);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Machine', 'Machine Bicep Curl', 19);
insert into
  "exercise_alias" (id, name)
values
  (132, 'Machine Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Pistol Squat', 18);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Dumbbell', 'Dumbbell Deadlift', 18);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Barbell Calf Raise', 17);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Smith Machine Squat', 17);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Reverse Grip Lat Pulldown', 16);
insert into
  "exercise_alias" (id, name)
values
  (137, 'Reverse Grip Pulldown');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Forearms', 'Dumbbell', 'Dumbbell Wrist Curl', 15);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Machine', 'Machine Row', 15);
insert into
  "exercise_alias" (id, name)
values
  (139, 'Hammer Strength Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Dumbbell', 'Dumbbell Z Press', 14);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Bench Pull', 13);
insert into
  "exercise_alias" (id, name)
values
  (141, 'Dumbbell Seal Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Pause Squat', 12);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Hang Power Clean', 12);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Bodyweight Calf Raise', 11);
insert into
  "exercise_alias" (id, name)
values
  (144, 'Standing Calf Raise');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Dumbbell', 'Tate Press', 11);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Machine', 'Close Grip Lat Pulldown', 11);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Smith Machine Bench Press', 11);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Safety Bar Squat', 10);
insert into
  "exercise_alias" (id, name)
values
  (148, 'Ssb Squat');
insert into
  "exercise_alias" (id, name)
values
  (148, 'Safety Squat Bar');
insert into
  "exercise_alias" (id, name)
values
  (148, 'Safety Squat');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Machine', 'Seated Dip Machine', 10);
insert into
  "exercise_alias" (id, name)
values
  (149, 'Machine Dip');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Neck Curl', 9);
insert into
  "exercise_alias" (id, name)
values
  (150, 'Neck Flexion');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Deficit Deadlift', 9);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Split Jerk', 9);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Machine', 'Machine Lateral Raise', 9);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Log Press', 8);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Dumbbell', 'Dumbbell Upright Row', 8);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Machine', 'Machine Reverse Fly', 8);
insert into
  "exercise_alias" (id, name)
values
  (156, 'Machine Rear Deltoid Fly');
insert into
  "exercise_alias" (id, name)
values
  (156, 'Rear Delt Machine');
insert into
  "exercise_alias" (id, name)
values
  (156, 'Reverse Pec Deck Fly');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Cable', 'Cable Crossover', 8);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Wide Grip Bench Press', 7);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Sumo Squat', 7);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Dumbbell Preacher Curl', 7);
insert into
  "exercise_alias" (id, name)
values
  (160, 'One Arm Dumbbell Preacher Curl');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Sled Press Calf Raise', 7);
insert into
  "exercise_alias" (id, name)
values
  (161, 'Leg Press Calf Raise');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Single Leg Press', 7);
insert into
  "exercise_alias" (id, name)
values
  (162, 'Single Leg Leg Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Single Leg Deadlift', 6);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Bodyweight', 'Bench Dips', 6);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Straight Arm Pulldown', 6);
insert into
  "exercise_alias" (id, name)
values
  (165, 'Straight Arm Lat Pulldown');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Hanging Knee Raise', 5);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Machine', 'Machine Seated Crunch', 5);
insert into
  "exercise_alias" (id, name)
values
  (167, 'Machine Crunches');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Cable',
    'Cable Overhead Tricep Extension',
    5
  );
insert into
  "exercise_alias" (id, name)
values
  (168, 'Overhead Tricep Rope Extension');
insert into
  "exercise_alias" (id, name)
values
  (168, 'Overhead Tricep Cable Extension');
insert into
  "exercise_alias" (id, name)
values
  (168, 'Overhead Cable Tricep Extension');
insert into
  "exercise_alias" (id, name)
values
  (168, 'Tricep Overhead Extension');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Cable', 'Cable Woodchoppers', 5);
insert into
  "exercise_alias" (id, name)
values
  (169, 'Wood Chopper');
insert into
  "exercise_alias" (id, name)
values
  (169, 'Cable Wood Chop');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Neck Extension', 4);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Barbell Glute Bridge', 4);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Chest',
    'Dumbbell',
    'Close Grip Dumbbell Bench Press',
    4
  );
insert into
  "exercise_alias" (id, name)
values
  (172, 'Close Grip Dumbbell Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Pause Deadlift', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Barbell', 'JM Press', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Ab Wheel Rollout', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Bench Pull', 3);
insert into
  "exercise_alias" (id, name)
values
  (176, 'Seal Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Snatch Grip Deadlift', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Clean Pull', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Dumbbell', 'Dumbbell Snatch', 3);
insert into
  "exercise_alias" (id, name)
values
  (179, 'One Arm Dumbbell Snatch');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Incline Hammer Curl', 3);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Cable',
    'Reverse Grip Tricep Pushdown',
    3
  );
insert into
  "exercise_alias" (id, name)
values
  (181, 'Reverse Grip Tricep Extension');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Barbell', 'Bench Pin Press', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Behind The Neck Press', 2);
insert into
  "exercise_alias" (id, name)
values
  (183, 'Back Press');
insert into
  "exercise_alias" (id, name)
values
  (183, 'Press Behind Neck');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Barbell Hack Squat', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Landmine Press', 2);
insert into
  "exercise_alias" (id, name)
values
  (185, 'Landmine Chest Press');
insert into
  "exercise_alias" (id, name)
values
  (185, 'Standing Landmine Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Bodyweight', 'Australian Pull Ups', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Ring Muscle Ups', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Reverse Lunge', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Muscle Snatch', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Machine', 'Machine Back Extension', 2);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Pin Squat', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Snatch Deadlift', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Barbell Front Raise', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Belt Squat', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Reverse Curl', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Yates Row', 1);
insert into
  "exercise_alias" (id, name)
values
  (196, 'Reverse Grip Bent Over Row');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Cable', 'High Pulley Crunch', 1);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Barbell', 'Walking Lunge', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Machine Shrug', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Jefferson Squat', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Back',
    'Barbell',
    'Behind The Back Barbell Shrug',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Barbell Power Shrug', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Bent Arm Barbell Pullover', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Cheat Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Donkey Calf Raise', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Viking Press', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Barbell', 'Spider Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Shoulder Pin Press', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Barbell Pullover', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Wall Ball', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Whole Body',
    'Barbell',
    'Single Leg Romanian Deadlift',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Barbell', 'Z Press', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Jefferson Deadlift', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Star Jump', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Squat Thrust', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Squat Jump', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Side Lunge', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Side Crunch', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Roman Chair Side Bend', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Pike Push Up', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Mountain Climbers', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Leg Lift', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Jumping Jack', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Jump Squat', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Incline Push Up', 0);
insert into
  "exercise_alias" (id, name)
values
  (225, 'Incline Press Up');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Incline Bench Sit Up', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Hip Extension', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Flutter Kick', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Floor Hip Extension', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Floor Hip Abduction', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Decline Push Up', 0);
insert into
  "exercise_alias" (id, name)
values
  (231, 'Decline Press Up');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Decline Crunch', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Bodyweight', 'Clap Pull Up', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Bicycle Crunch', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Sissy Squat', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Bodyweight', 'Close Grip Push Up', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Bodyweight', 'Nordic Hamstring Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Bodyweight', 'Reverse Crunches', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Bodyweight', 'Ring Dips', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Dumbbell', 'Dumbbell Push Press', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Dumbbell', 'Dumbbell High Pull', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Dumbbell', 'Dumbbell Hang Clean', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Snatch Pull', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Whole Body', 'Barbell', 'Clean High Pull', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Dumbbell Incline Y Raise', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Triceps',
    'Dumbbell',
    'Seated Dumbbell Tricep Extension',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Dumbbell',
    'Seated Dumbbell Shoulder Press',
    0
  );
insert into
  "exercise_alias" (id, name)
values
  (247, 'Seated Dumbbell Press');
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Forearms',
    'Dumbbell',
    'Dumbbell Reverse Wrist Curl',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Dumbbell', 'Dumbbell Front Squat', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Chest', 'Dumbbell', 'Decline Dumbbell Fly', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell External Rotation',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Dumbbell', 'Bent Over Dumbbell Row', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Seated Dumbbell Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Dumbbell', 'Zottman Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Barbell', 'Smith Machine Shrug', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  (
    'Legs',
    'Machine',
    'Single Leg Seated Calf Raise',
    0
  );
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Triceps', 'Machine', 'Machine Tricep Extension', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Machine', 'Standing Leg Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Core', 'Cable', 'Standing Cable Crunch', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'Overhead Cable Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'One Arm Seated Cable Row', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'One Arm Pulldown', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'Lying Cable Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'Incline Cable Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Cable Upright Row', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Cable Shrug', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Cable', 'Cable Leg Extension', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Shoulders', 'Cable', 'Cable External Rotation', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Biceps', 'Cable', 'Behind The Back Cable Curl', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Back', 'Cable', 'Cable Reverse Fly', 0);
insert into
  "exercise" (body_part, exercise_type, name, count)
values
  ('Legs', 'Cable', 'Cable Kickback', 0);
