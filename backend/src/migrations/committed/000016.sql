--! Previous: sha1:1d36938d73b47adf8764f6d04097f47d16c364ba
--! Hash: sha1:33d99fb3dc3d77bb5ee32044c2673a2f9f632ada

alter sequence "exercise_id_seq" restart ;
delete from "exercise";

insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Barbell', 'Bench Press', 13354162, 235);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Deadlift', 7724948, 344);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Squat', 7651637, 307);
insert into
  "exercise_alias" (id, name)
values
  (2, 'Back Squat');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Barbell',
    'Shoulder Press',
    1915786,
    154
  );
insert into
  "exercise_alias" (id, name)
values
  (3, 'Overhead Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'Pull Ups', 1097769, 21);
insert into
  "exercise_alias" (id, name)
values
  (4, 'Pullup');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Dumbbell Bench Press',
    986718,
    106
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Barbell Curl', 916536, 122);
insert into
  "exercise_alias" (id, name)
values
  (6, 'Bicep Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Dumbbell', 'Dumbbell Curl', 782061, 66);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Front Squat', 645762, 233);
insert into
  "exercise_alias" (id, name)
values
  (8, 'Barbell Front Squat');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Bent Over Row', 605088, 205);
insert into
  "exercise_alias" (id, name)
values
  (9, 'Barbell Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Push Ups', 564613, 67);
insert into
  "exercise_alias" (id, name)
values
  (10, 'Press Up');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Shoulder Press',
    486383,
    84
  );
insert into
  "exercise_alias" (id, name)
values
  (11, 'Dumbbell Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Power Clean', 475910, 200);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Barbell',
    'Incline Bench Press',
    440513,
    210
  );
insert into
  "exercise_alias" (id, name)
values
  (13, 'Incline Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Sled Leg Press', 439430, 601);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Bodyweight', 'Dips', 434271, 32);
insert into
  "exercise_alias" (id, name)
values
  (15, 'Tricep Dips');
insert into
  "exercise_alias" (id, name)
values
  (15, 'Chest Dip');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Barbell',
    'Military Press',
    321890,
    154
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Hex Bar Deadlift',
    321335,
    353
  );
insert into
  "exercise_alias" (id, name)
values
  (17, 'Trap Bar Deadlift');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Lat Pulldown', 316879, 186);
insert into
  "exercise_alias" (id, name)
values
  (18, 'Machine Pulldown');
insert into
  "exercise_alias" (id, name)
values
  (18, 'Back Lat Pulldown');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Incline Dumbbell Bench Press',
    265624,
    95
  );
insert into
  "exercise_alias" (id, name)
values
  (19, 'Incline Dumbbell Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'Chin Ups', 256834, 19);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Legs',
    'Machine',
    'Horizontal Leg Press',
    236861,
    514
  );
insert into
  "exercise_alias" (id, name)
values
  (21, 'Seated Leg Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Lateral Raise',
    214661,
    49
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Dumbbell Row', 214213, 115);
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Snatch', 199614, 173);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Clean and Jerk',
    196690,
    209
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Romanian Deadlift',
    188400,
    294
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Hip Thrust', 188151, 399);
insert into
  "exercise_alias" (id, name)
values
  (27, 'Barbell Hip Thrust');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Sumo Deadlift',
    166154,
    369
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Clean', 158297, 200);
insert into
  "exercise_alias" (id, name)
values
  (29, 'Squat Clean');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Leg Extension', 156665, 251);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Push Press', 144198, 203);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Clean and Press',
    136368,
    185
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Machine', 'Chest Press', 117104, 236);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Cable', 'Tricep Pushdown', 114113, 167);
insert into
  "exercise_alias" (id, name)
values
  (34, 'Tricep Pressdown');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Barbell Shrug', 110032, 371);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Machine Calf Raise', 98324, 422);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Vertical Leg Press', 97872, 588);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Barbell',
    'Decline Bench Press',
    97141,
    256
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Dumbbell', 'Hammer Curl', 90684, 65);
insert into
  "exercise_alias" (id, name)
values
  (39, 'Dumbbell Hammer Curl');
insert into
  "exercise_alias" (id, name)
values
  (39, 'Hammer Curls');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Seated Cable Row', 85784, 201);
insert into
  "exercise_alias" (id, name)
values
  (40, 'Seated Row');
insert into
  "exercise_alias" (id, name)
values
  (40, 'Low Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Cable',
    'Tricep Rope Pushdown',
    85490,
    138
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Dumbbell Shrug', 85464, 133);
insert into
  "exercise_alias" (id, name)
values
  (42, 'Shoulder Shrug');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Barbell',
    'Close Grip Bench Press',
    85277,
    218
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Dumbbell', 'Dumbbell Fly', 85262, 72);
insert into
  "exercise_alias" (id, name)
values
  (44, 'Dumbbell Chest Fly');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Pendlay Row', 82540, 207);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Seated Leg Curl', 76493, 206);
insert into
  "exercise_alias" (id, name)
values
  (46, 'Hamstring Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Dumbbell', 'Dumbbell Lunge', 76227, 91);
insert into
  "exercise_alias" (id, name)
values
  (47, 'Dumbbell Lunges');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'T-Bar Row', 75586, 228);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Dumbbell',
    'Dumbbell Tricep Extension',
    74163,
    79
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Barbell', 'Tricep Extension', 73719, 159);
insert into
  "exercise_alias" (id, name)
values
  (50, 'French Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Upright Row', 72743, 179);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Preacher Curl', 69945, 124);
insert into
  "exercise_alias" (id, name)
values
  (52, 'Barbell Preacher Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Dumbbell', 'Goblet Squat', 68753, 116);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Rack Pull', 68314, 430);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Barbell',
    'Lying Tricep Extension',
    67626,
    133
  );
insert into
  "exercise_alias" (id, name)
values
  (55, 'Skull Crusher');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Lying Leg Curl', 67495, 177);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Front Raise',
    64522,
    62
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Sit Ups', 64216, 91);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Machine',
    'Machine Shoulder Press',
    64007,
    219
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'EZ Bar Curl', 60909, 118);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Muscle Ups', 59791, 12);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Dumbbell',
    'Dumbbell Concentration Curl',
    59477,
    62
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Machine', 'Machine Chest Fly', 54909, 222);
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Good Morning', 54162, 260);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Bodyweight Squat', 54141, 101);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Legs',
    'Dumbbell',
    'Dumbbell Bulgarian Split Squat',
    52172,
    85
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Box Squat', 52037, 353);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Dumbbell', 'Arnold Press', 48498, 69);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Hack Squat', 48468, 433);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Thruster', 47769, 197);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Overhead Squat', 46670, 233);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Barbell', 'Floor Press', 45923, 270);
insert into
  "exercise_alias" (id, name)
values
  (72, 'Barbell Floor Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Barbell',
    'Seated Shoulder Press',
    44960,
    187
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Stiff Leg Deadlift',
    44850,
    298
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Incline Dumbbell Fly',
    43718,
    80
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Dumbbell',
    'Lying Dumbbell Tricep Extension',
    43355,
    74
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Push Jerk', 42885, 211);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Zercher Squat', 41278, 279);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Face Pull', 40942, 144);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Barbell Lunge', 40333, 225);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Cable', 'Cable Fly', 39375, 154);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Legs',
    'Barbell',
    'Bulgarian Split Squat',
    38661,
    210
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Seated Calf Raise', 38644, 319);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Dumbbell',
    'Incline Dumbbell Curl',
    38591,
    57
  );
insert into
  "exercise_alias" (id, name)
values
  (84, 'Incline Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Hang Clean', 38301, 194);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Hip Abduction', 38296, 294);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Forearms', 'Barbell', 'Wrist Curl', 37940, 233);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Power Snatch', 36647, 178);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Crunches', 36198, 95);
insert into
  "exercise_alias" (id, name)
values
  (89, 'Ab Crunch');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Dumbbell',
    'Dumbbell Romanian Deadlift',
    35711,
    126
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Dumbbell Pullover', 35404, 101);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Dumbbell Floor Press',
    34592,
    98
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Hip Adduction', 34224, 312);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Dumbbell',
    'Dumbbell Reverse Fly',
    30802,
    64
  );
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Decline Dumbbell Bench Press',
    30536,
    101
  );
insert into
  "exercise_alias" (id, name)
values
  (95, 'Decline Dumbbell Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Split Squat', 30315, 269);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Barbell',
    'Reverse Grip Bench Press',
    29703,
    266
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Dumbbell',
    'Dumbbell Tricep Kickback',
    29435,
    56
  );
insert into
  "exercise_alias" (id, name)
values
  (98, 'Dumbbell Kickback');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Landmine Squat', 29407, 303);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Cable', 'Cable Bicep Curl', 29233, 161);
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Forearms',
    'Barbell',
    'Reverse Wrist Curl',
    28669,
    247
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Cable', 'Cable Crunch', 26284, 245);
insert into
  "exercise_alias" (id, name)
values
  (102, 'Cable Crunches');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Dumbbell',
    'Chest Supported Dumbbell Row',
    25567,
    112
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Single Leg Squat', 25275, 34);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Cable',
    'Cable Lateral Raise',
    25119,
    82
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Cable', 'Cable Pull Through', 24990, 192);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Barbell',
    'Reverse Barbell Curl',
    24812,
    136
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Cable',
    'One Arm Cable Bicep Curl',
    23906,
    140
  );
insert into
  "exercise_alias" (id, name)
values
  (108, 'One Arm Cable Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'One Arm Push Ups', 20202, 32);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Bodyweight',
    'Handstand Push Ups',
    16188,
    31
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Burpees', 15144, 72);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Lunge', 11349, 72);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Diamond Push Ups', 10362, 46);
insert into
  "exercise_alias" (id, name)
values
  (113, 'Diamond Pushups');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'One Arm Pull Ups', 7339, 9);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Bodyweight',
    'Neutral Grip Pull Ups',
    5616,
    28
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Hanging Leg Raise', 4474, 33);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Russian Twist', 3979, 74);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Glute Bridge', 3857, 89);
insert into
  "exercise_alias" (id, name)
values
  (118, 'Bridging');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'Inverted Row', 3775, 36);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'Back Extension', 3450, 66);
insert into
  "exercise_alias" (id, name)
values
  (120, 'Hyper Extension');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Toes To Bar', 2942, 34);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Lying Leg Raise', 2701, 74);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Glute Ham Raise', 1187, 58);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Strict Curl', 46, 119);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Dumbbell', 'Dumbbell Squat', 36, 105);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Barbell', 'Paused Bench Press', 32, 241);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Barbell Reverse Lunge', 22, 290);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Renegade Row', 20, 89);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Machine',
    'Machine Tricep Press',
    20,
    224
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Dumbbell', 'Dumbbell Side Bend', 19, 128);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Dumbbell', 'Dumbbell Calf Raise', 19, 151);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Machine', 'Machine Bicep Curl', 19, 148);
insert into
  "exercise_alias" (id, name)
values
  (132, 'Machine Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Pistol Squat', 18, 30);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Dumbbell',
    'Dumbbell Deadlift',
    18,
    117
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Barbell Calf Raise', 17, 340);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Smith Machine Squat', 17, 299);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Cable',
    'Reverse Grip Lat Pulldown',
    16,
    237
  );
insert into
  "exercise_alias" (id, name)
values
  (137, 'Reverse Grip Pulldown');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Forearms',
    'Dumbbell',
    'Dumbbell Wrist Curl',
    15,
    107
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Machine', 'Machine Row', 15, 264);
insert into
  "exercise_alias" (id, name)
values
  (139, 'Hammer Strength Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Dumbbell', 'Dumbbell Z Press', 14, 82);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Dumbbell Bench Pull', 13, 89);
insert into
  "exercise_alias" (id, name)
values
  (141, 'Dumbbell Seal Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Pause Squat', 12, 291);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Hang Power Clean', 12, 182);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Legs',
    'Bodyweight',
    'Bodyweight Calf Raise',
    11,
    122
  );
insert into
  "exercise_alias" (id, name)
values
  (144, 'Standing Calf Raise');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Dumbbell', 'Tate Press', 11, 72);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Machine',
    'Close Grip Lat Pulldown',
    11,
    207
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Barbell',
    'Smith Machine Bench Press',
    11,
    243
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Safety Bar Squat', 10, 318);
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Machine', 'Seated Dip Machine', 10, 292);
insert into
  "exercise_alias" (id, name)
values
  (149, 'Machine Dip');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Neck Curl', 9, 272);
insert into
  "exercise_alias" (id, name)
values
  (150, 'Neck Flexion');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Deficit Deadlift', 9, 369);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Split Jerk', 9, 193);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Machine',
    'Machine Lateral Raise',
    9,
    177
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Log Press', 8, 210);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Upright Row',
    8,
    112
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Machine', 'Machine Reverse Fly', 8, 185);
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Cable', 'Cable Crossover', 8, 160);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Barbell', 'Wide Grip Bench Press', 7, 253);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Sumo Squat', 7, 312);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Dumbbell',
    'Dumbbell Preacher Curl',
    7,
    71
  );
insert into
  "exercise_alias" (id, name)
values
  (160, 'One Arm Dumbbell Preacher Curl');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Sled Press Calf Raise', 7, 687);
insert into
  "exercise_alias" (id, name)
values
  (161, 'Leg Press Calf Raise');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Single Leg Press', 7, 453);
insert into
  "exercise_alias" (id, name)
values
  (162, 'Single Leg Leg Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Single Leg Deadlift',
    6,
    161
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Bodyweight', 'Bench Dips', 6, 57);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Straight Arm Pulldown', 6, 158);
insert into
  "exercise_alias" (id, name)
values
  (165, 'Straight Arm Lat Pulldown');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Hanging Knee Raise', 5, 31);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Machine', 'Machine Seated Crunch', 5, 231);
insert into
  "exercise_alias" (id, name)
values
  (167, 'Machine Crunches');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Cable',
    'Cable Overhead Tricep Extension',
    5,
    154
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
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Cable', 'Cable Woodchoppers', 5, 104);
insert into
  "exercise_alias" (id, name)
values
  (169, 'Wood Chopper');
insert into
  "exercise_alias" (id, name)
values
  (169, 'Cable Wood Chop');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Neck Extension', 4, 63);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Barbell Glute Bridge', 4, 363);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Chest',
    'Dumbbell',
    'Close Grip Dumbbell Bench Press',
    4,
    129
  );
insert into
  "exercise_alias" (id, name)
values
  (172, 'Close Grip Dumbbell Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Pause Deadlift', 3, 307);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Barbell', 'JM Press', 3, 169);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Ab Wheel Rollout', 3, 42);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Bench Pull', 3, 161);
insert into
  "exercise_alias" (id, name)
values
  (176, 'Seal Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Snatch Grip Deadlift',
    3,
    339
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Clean Pull', 3, 198);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Dumbbell', 'Dumbbell Snatch', 3, 107);
insert into
  "exercise_alias" (id, name)
values
  (179, 'One Arm Dumbbell Snatch');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Dumbbell', 'Incline Hammer Curl', 3, 131);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Cable',
    'Reverse Grip Tricep Pushdown',
    3,
    208
  );
insert into
  "exercise_alias" (id, name)
values
  (181, 'Reverse Grip Tricep Extension');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Barbell', 'Bench Pin Press', 2, 224);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Barbell',
    'Behind The Neck Press',
    2,
    177
  );
insert into
  "exercise_alias" (id, name)
values
  (183, 'Back Press');
insert into
  "exercise_alias" (id, name)
values
  (183, 'Press Behind Neck');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Barbell Hack Squat', 2, 308);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Landmine Press', 2, 162);
insert into
  "exercise_alias" (id, name)
values
  (185, 'Landmine Chest Press');
insert into
  "exercise_alias" (id, name)
values
  (185, 'Standing Landmine Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Bodyweight', 'Australian Pull Ups', 2, 46);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Ring Muscle Ups', 2, 19);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Reverse Lunge', 2, 46);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Muscle Snatch', 2, 164);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Machine', 'Machine Back Extension', 2, 313);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Pin Squat', 1, 269);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Snatch Deadlift', 1, 251);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Barbell',
    'Barbell Front Raise',
    1,
    104
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Belt Squat', 1, 457);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Reverse Curl', 1, 200);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Yates Row', 1, 214);
insert into
  "exercise_alias" (id, name)
values
  (196, 'Reverse Grip Bent Over Row');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Cable', 'High Pulley Crunch', 1, 158);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Barbell', 'Walking Lunge', 0, 225);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Machine Shrug', 0, 244);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Jefferson Squat', 0, 271);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Barbell',
    'Behind The Back Barbell Shrug',
    0,
    371
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Barbell Power Shrug', 0, 371);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Barbell',
    'Bent Arm Barbell Pullover',
    0,
    72
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Cheat Curl', 0, 122);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Donkey Calf Raise', 0, 119);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Viking Press', 0, 168);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Barbell', 'Spider Curl', 0, 127);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Shoulder Pin Press', 0, 170);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Barbell Pullover', 0, 72);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Wall Ball', 0, 64);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Single Leg Romanian Deadlift',
    0,
    443
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Shoulders', 'Barbell', 'Z Press', 0, 158);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Barbell',
    'Jefferson Deadlift',
    0,
    377
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Star Jump', 0, 98);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Squat Thrust', 0, 65);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Squat Jump', 0, 86);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Side Lunge', 0, 70);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Side Crunch', 0, 81);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Roman Chair Side Bend', 0, 53);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Pike Push Up', 0, 48);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Mountain Climbers', 0, 73);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Leg Lift', 0, 51);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Jumping Jack', 0, 93);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Jump Squat', 0, 84);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Incline Push Up', 0, 56);
insert into
  "exercise_alias" (id, name)
values
  (225, 'Incline Press Up');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Incline Bench Sit Up', 0, 93);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Hip Extension', 0, 63);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Flutter Kick', 0, 81);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Floor Hip Extension', 0, 39);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Floor Hip Abduction', 0, 39);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Decline Push Up', 0, 56);
insert into
  "exercise_alias" (id, name)
values
  (231, 'Decline Press Up');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Decline Crunch', 0, 76);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Bodyweight', 'Clap Pull Up', 0, 17);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Bicycle Crunch', 0, 64);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Sissy Squat', 0, 40);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Bodyweight', 'Close Grip Push Up', 0, 56);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Bodyweight', 'Nordic Hamstring Curl', 0, 34);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Bodyweight', 'Reverse Crunches', 0, 56);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Triceps', 'Bodyweight', 'Ring Dips', 0, 21);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell Push Press',
    0,
    82
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Dumbbell',
    'Dumbbell High Pull',
    0,
    81
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Whole Body',
    'Dumbbell',
    'Dumbbell Hang Clean',
    0,
    89
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Snatch Pull', 0, 184);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Whole Body', 'Barbell', 'Clean High Pull', 0, 198);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Back',
    'Dumbbell',
    'Dumbbell Incline Y Raise',
    0,
    83
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Dumbbell',
    'Seated Dumbbell Tricep Extension',
    0,
    83
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Seated Dumbbell Shoulder Press',
    0,
    104
  );
insert into
  "exercise_alias" (id, name)
values
  (247, 'Seated Dumbbell Press');
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Forearms',
    'Dumbbell',
    'Dumbbell Reverse Wrist Curl',
    0,
    115
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Dumbbell', 'Dumbbell Front Squat', 0, 106);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Chest', 'Dumbbell', 'Decline Dumbbell Fly', 0, 76);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Dumbbell',
    'Dumbbell External Rotation',
    0,
    53
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Dumbbell', 'Bent Over Dumbbell Row', 0, 101);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Dumbbell', 'Seated Dumbbell Curl', 0, 66);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Dumbbell', 'Zottman Curl', 0, 64);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Barbell', 'Smith Machine Shrug', 0, 371);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Legs',
    'Machine',
    'Single Leg Seated Calf Raise',
    0,
    197
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Triceps',
    'Machine',
    'Machine Tricep Extension',
    0,
    139
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Machine', 'Standing Leg Curl', 0, 191);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Core', 'Cable', 'Standing Cable Crunch', 0, 235);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Cable', 'Overhead Cable Curl', 0, 164);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'One Arm Seated Cable Row', 0, 172);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Cable', 'One Arm Pulldown', 0, 141);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Cable', 'Lying Cable Curl', 0, 163);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Biceps', 'Cable', 'Incline Cable Curl', 0, 152);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Cable Upright Row', 0, 171);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Cable Shrug', 0, 256);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Cable', 'Cable Leg Extension', 0, 118);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Shoulders',
    'Cable',
    'Cable External Rotation',
    0,
    70
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  (
    'Biceps',
    'Cable',
    'Behind The Back Cable Curl',
    0,
    99
  );
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Back', 'Cable', 'Cable Reverse Fly', 0, 104);
insert into
  "exercise" (
    body_part,
    exercise_type,
    name,
    count,
    elite_strength_baseline
  )
values
  ('Legs', 'Cable', 'Cable Kickback', 0, 65);
