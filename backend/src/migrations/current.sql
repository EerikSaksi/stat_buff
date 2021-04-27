drop table if exists exercise 

create type body_part_enum as enum ( "Back" , "Biceps" , "Chest" , "Core" , "Forearms" , "Legs" , "Shoulders" , "Triceps" , "Whole Body");
create type exercise_type_enum as enum ("Barbell", "Bodyweight", "Olympic", "Dumbbell", "Machine", "Cable");
create table exercise(
  id serial primary key,
  body_part body_part_enum not null,
  exercise_type exercise_type_enum not null,
  name varchar not null,
  count integer not null
);
grant all on exercise to public;
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (0, 'Chest', 'barbell', 'Bench Press', '13354162');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (1, 'Whole Body', 'barbell', 'Deadlift', '7724948');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (2, 'Legs', 'barbell', 'Squat', '7651637');
insert into
  "exercise_alias" (id, name)
values
  (2, 'Back Squat');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    3,
    'Shoulders',
    'barbell',
    'Shoulder Press',
    '1915786'
  );
insert into
  "exercise_alias" (id, name)
values
  (3, 'Overhead Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (4, 'Back', 'bodyweight', 'Pull Ups', '1097769');
insert into
  "exercise_alias" (id, name)
values
  (4, 'Pullup');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    5,
    'Chest',
    'dumbbell',
    'Dumbbell Bench Press',
    '986718'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (6, 'Biceps', 'barbell', 'Barbell Curl', '916536');
insert into
  "exercise_alias" (id, name)
values
  (6, 'Bicep Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (7, 'Biceps', 'dumbbell', 'Dumbbell Curl', '782061');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (8, 'Legs', 'barbell', 'Front Squat', '645762');
insert into
  "exercise_alias" (id, name)
values
  (8, 'Barbell Front Squat');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (9, 'Back', 'barbell', 'Bent Over Row', '605088');
insert into
  "exercise_alias" (id, name)
values
  (9, 'Barbell Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (10, 'Chest', 'bodyweight', 'Push Ups', '564613');
insert into
  "exercise_alias" (id, name)
values
  (10, 'Press Up');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    11,
    'Shoulders',
    'dumbbell',
    'Dumbbell Shoulder Press',
    '486383'
  );
insert into
  "exercise_alias" (id, name)
values
  (11, 'Dumbbell Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (12, 'Whole Body', 'barbell', 'Power Clean', '475910');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    13,
    'Chest',
    'barbell',
    'Incline Bench Press',
    '440513'
  );
insert into
  "exercise_alias" (id, name)
values
  (13, 'Incline Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (14, 'Legs', 'machine', 'Sled Leg Press', '439430');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (15, 'Triceps', 'bodyweight', 'Dips', '434271');
insert into
  "exercise_alias" (id, name)
values
  (15, 'Tricep Dips');
insert into
  "exercise_alias" (id, name)
values
  (15, 'Chest Dip');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    16,
    'Shoulders',
    'barbell',
    'Military Press',
    '321890'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    17,
    'Whole Body',
    'barbell',
    'Hex Bar Deadlift',
    '321335'
  );
insert into
  "exercise_alias" (id, name)
values
  (17, 'Trap Bar Deadlift');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (18, 'Back', 'cable', 'Lat Pulldown', '316879');
insert into
  "exercise_alias" (id, name)
values
  (18, 'Machine Pulldown');
insert into
  "exercise_alias" (id, name)
values
  (18, 'Back Lat Pulldown');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    19,
    'Chest',
    'dumbbell',
    'Incline Dumbbell Bench Press',
    '265624'
  );
insert into
  "exercise_alias" (id, name)
values
  (19, 'Incline Dumbbell Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (20, 'Back', 'bodyweight', 'Chin Ups', '256834');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    21,
    'Legs',
    'machine',
    'Horizontal Leg Press',
    '236861'
  );
insert into
  "exercise_alias" (id, name)
values
  (21, 'Seated Leg Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    22,
    'Shoulders',
    'dumbbell',
    'Dumbbell Lateral Raise',
    '214661'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (23, 'Back', 'dumbbell', 'Dumbbell Row', '214213');
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (24, 'Whole Body', 'barbell', 'Snatch', '199614');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    25,
    'Whole Body',
    'barbell',
    'Clean and Jerk',
    '196690'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    26,
    'Whole Body',
    'barbell',
    'Romanian Deadlift',
    '188400'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (27, 'Legs', 'barbell', 'Hip Thrust', '188151');
insert into
  "exercise_alias" (id, name)
values
  (27, 'Barbell Hip Thrust');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    28,
    'Whole Body',
    'barbell',
    'Sumo Deadlift',
    '166154'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (29, 'Whole Body', 'barbell', 'Clean', '158297');
insert into
  "exercise_alias" (id, name)
values
  (29, 'Squat Clean');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (30, 'Legs', 'machine', 'Leg Extension', '156665');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (31, 'Shoulders', 'barbell', 'Push Press', '144198');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    32,
    'Whole Body',
    'barbell',
    'Clean and Press',
    '136368'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (33, 'Chest', 'machine', 'Chest Press', '117104');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (34, 'Triceps', 'cable', 'Tricep Pushdown', '114113');
insert into
  "exercise_alias" (id, name)
values
  (34, 'Tricep Pressdown');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (35, 'Back', 'barbell', 'Barbell Shrug', '110032');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (36, 'Legs', 'machine', 'Machine Calf Raise', '98324');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (37, 'Legs', 'machine', 'Vertical Leg Press', '97872');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    38,
    'Chest',
    'barbell',
    'Decline Bench Press',
    '97141'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (39, 'Biceps', 'dumbbell', 'Hammer Curl', '90684');
insert into
  "exercise_alias" (id, name)
values
  (39, 'Dumbbell Hammer Curl');
insert into
  "exercise_alias" (id, name)
values
  (39, 'Hammer Curls');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (40, 'Back', 'cable', 'Seated Cable Row', '85784');
insert into
  "exercise_alias" (id, name)
values
  (40, 'Seated Row');
insert into
  "exercise_alias" (id, name)
values
  (40, 'Low Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    41,
    'Triceps',
    'cable',
    'Tricep Rope Pushdown',
    '85490'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (42, 'Back', 'dumbbell', 'Dumbbell Shrug', '85464');
insert into
  "exercise_alias" (id, name)
values
  (42, 'Shoulder Shrug');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    43,
    'Chest',
    'barbell',
    'Close Grip Bench Press',
    '85277'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (44, 'Chest', 'dumbbell', 'Dumbbell Fly', '85262');
insert into
  "exercise_alias" (id, name)
values
  (44, 'Dumbbell Chest Fly');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (45, 'Back', 'barbell', 'Pendlay Row', '82540');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (46, 'Legs', 'machine', 'Seated Leg Curl', '76493');
insert into
  "exercise_alias" (id, name)
values
  (46, 'Hamstring Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (47, 'Legs', 'dumbbell', 'Dumbbell Lunge', '76227');
insert into
  "exercise_alias" (id, name)
values
  (47, 'Dumbbell Lunges');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (48, 'Back', 'barbell', 'T-Bar Row', '75586');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    49,
    'Triceps',
    'dumbbell',
    'Dumbbell Tricep Extension',
    '74163'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    50,
    'Triceps',
    'barbell',
    'Tricep Extension',
    '73719'
  );
insert into
  "exercise_alias" (id, name)
values
  (50, 'French Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (51, 'Shoulders', 'barbell', 'Upright Row', '72743');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (52, 'Biceps', 'barbell', 'Preacher Curl', '69945');
insert into
  "exercise_alias" (id, name)
values
  (52, 'Barbell Preacher Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (53, 'Legs', 'dumbbell', 'Goblet Squat', '68753');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (54, 'Whole Body', 'barbell', 'Rack Pull', '68314');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    55,
    'Triceps',
    'barbell',
    'Lying Tricep Extension',
    '67626'
  );
insert into
  "exercise_alias" (id, name)
values
  (55, 'Skull Crusher');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (56, 'Legs', 'machine', 'Lying Leg Curl', '67495');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    57,
    'Shoulders',
    'dumbbell',
    'Dumbbell Front Raise',
    '64522'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (58, 'Core', 'bodyweight', 'Sit Ups', '64216');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    59,
    'Shoulders',
    'machine',
    'Machine Shoulder Press',
    '64007'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (60, 'Biceps', 'barbell', 'EZ Bar Curl', '60909');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    61,
    'Whole Body',
    'bodyweight',
    'Muscle Ups',
    '59791'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    62,
    'Biceps',
    'dumbbell',
    'Dumbbell Concentration Curl',
    '59477'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (63, 'Chest', 'machine', 'Machine Chest Fly', '54909');
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (64, 'Back', 'barbell', 'Good Morning', '54162');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    65,
    'Legs',
    'bodyweight',
    'Bodyweight Squat',
    '54141'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    66,
    'Legs',
    'dumbbell',
    'Dumbbell Bulgarian Split Squat',
    '52172'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (67, 'Legs', 'barbell', 'Box Squat', '52037');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (68, 'Chest', 'dumbbell', 'Arnold Press', '48498');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (69, 'Legs', 'machine', 'Hack Squat', '48468');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (70, 'Whole Body', 'barbell', 'Thruster', '47769');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (71, 'Legs', 'barbell', 'Overhead Squat', '46670');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (72, 'Chest', 'barbell', 'Floor Press', '45923');
insert into
  "exercise_alias" (id, name)
values
  (72, 'Barbell Floor Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    73,
    'Shoulders',
    'barbell',
    'Seated Shoulder Press',
    '44960'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    74,
    'Whole Body',
    'barbell',
    'Stiff Leg Deadlift',
    '44850'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    75,
    'Chest',
    'dumbbell',
    'Incline Dumbbell Fly',
    '43718'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    76,
    'Triceps',
    'dumbbell',
    'Lying Dumbbell Tricep Extension',
    '43355'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (77, 'Whole Body', 'barbell', 'Push Jerk', '42885');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (78, 'Legs', 'barbell', 'Zercher Squat', '41278');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (79, 'Back', 'cable', 'Face Pull', '40942');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (80, 'Legs', 'barbell', 'Barbell Lunge', '40333');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (81, 'Chest', 'cable', 'Cable Fly', '39375');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    82,
    'Legs',
    'barbell',
    'Bulgarian Split Squat',
    '38661'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (83, 'Legs', 'machine', 'Seated Calf Raise', '38644');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    84,
    'Biceps',
    'dumbbell',
    'Incline Dumbbell Curl',
    '38591'
  );
insert into
  "exercise_alias" (id, name)
values
  (84, 'Incline Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (85, 'Whole Body', 'barbell', 'Hang Clean', '38301');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (86, 'Legs', 'machine', 'Hip Abduction', '38296');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (87, 'Forearms', 'barbell', 'Wrist Curl', '37940');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (88, 'Whole Body', 'barbell', 'Power Snatch', '36647');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (89, 'Core', 'bodyweight', 'Crunches', '36198');
insert into
  "exercise_alias" (id, name)
values
  (89, 'Ab Crunch');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    90,
    'Whole Body',
    'dumbbell',
    'Dumbbell Romanian Deadlift',
    '35711'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (91, 'Back', 'dumbbell', 'Dumbbell Pullover', '35404');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    92,
    'Chest',
    'dumbbell',
    'Dumbbell Floor Press',
    '34592'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (93, 'Legs', 'machine', 'Hip Adduction', '34224');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    94,
    'Back',
    'dumbbell',
    'Dumbbell Reverse Fly',
    '30802'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    95,
    'Chest',
    'dumbbell',
    'Decline Dumbbell Bench Press',
    '30536'
  );
insert into
  "exercise_alias" (id, name)
values
  (95, 'Decline Dumbbell Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (96, 'Legs', 'barbell', 'Split Squat', '30315');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    97,
    'Chest',
    'barbell',
    'Reverse Grip Bench Press',
    '29703'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    98,
    'Triceps',
    'dumbbell',
    'Dumbbell Tricep Kickback',
    '29435'
  );
insert into
  "exercise_alias" (id, name)
values
  (98, 'Dumbbell Kickback');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (99, 'Legs', 'barbell', 'Landmine Squat', '29407');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (100, 'Biceps', 'cable', 'Cable Bicep Curl', '29233');
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    101,
    'Forearms',
    'barbell',
    'Reverse Wrist Curl',
    '28669'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (102, 'Core', 'cable', 'Cable Crunch', '26284');
insert into
  "exercise_alias" (id, name)
values
  (102, 'Cable Crunches');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    103,
    'Back',
    'dumbbell',
    'Chest Supported Dumbbell Row',
    '25567'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    104,
    'Legs',
    'bodyweight',
    'Single Leg Squat',
    '25275'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    105,
    'Shoulders',
    'cable',
    'Cable Lateral Raise',
    '25119'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (106, 'Legs', 'cable', 'Cable Pull Through', '24990');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    107,
    'Biceps',
    'barbell',
    'Reverse Barbell Curl',
    '24812'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    108,
    'Biceps',
    'cable',
    'One Arm Cable Bicep Curl',
    '23906'
  );
insert into
  "exercise_alias" (id, name)
values
  (108, 'One Arm Cable Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    109,
    'Chest',
    'bodyweight',
    'One Arm Push Ups',
    '20202'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    110,
    'Chest',
    'bodyweight',
    'Handstand Push Ups',
    '16188'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (111, 'Whole Body', 'bodyweight', 'Burpees', '15144');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (112, 'Legs', 'bodyweight', 'Lunge', '11349');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    113,
    'Chest',
    'bodyweight',
    'Diamond Push Ups',
    '10362'
  );
insert into
  "exercise_alias" (id, name)
values
  (113, 'Diamond Pushups');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    114,
    'Back',
    'bodyweight',
    'One Arm Pull Ups',
    '7339'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    115,
    'Back',
    'bodyweight',
    'Neutral Grip Pull Ups',
    '5616'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    116,
    'Core',
    'bodyweight',
    'Hanging Leg Raise',
    '4474'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (117, 'Core', 'bodyweight', 'Russian Twist', '3979');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (118, 'Legs', 'bodyweight', 'Glute Bridge', '3857');
insert into
  "exercise_alias" (id, name)
values
  (118, 'Bridging');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (119, 'Back', 'bodyweight', 'Inverted Row', '3775');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (120, 'Back', 'bodyweight', 'Back Extension', '3450');
insert into
  "exercise_alias" (id, name)
values
  (120, 'Hyper Extension');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (121, 'Core', 'bodyweight', 'Toes To Bar', '2942');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (122, 'Core', 'bodyweight', 'Lying Leg Raise', '2701');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (123, 'Legs', 'bodyweight', 'Glute Ham Raise', '1187');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (124, 'Biceps', 'barbell', 'Strict Curl', '46');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (125, 'Legs', 'dumbbell', 'Dumbbell Squat', '36');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (126, 'Chest', 'barbell', 'Paused Bench Press', '32');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    127,
    'Legs',
    'barbell',
    'Barbell Reverse Lunge',
    '22'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (128, 'Back', 'dumbbell', 'Renegade Row', '20');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    129,
    'Triceps',
    'machine',
    'Machine Tricep Press',
    '20'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (130, 'Core', 'dumbbell', 'Dumbbell Side Bend', '19');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (131, 'Legs', 'dumbbell', 'Dumbbell Calf Raise', '19');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (132, 'Biceps', 'machine', 'Machine Bicep Curl', '19');
insert into
  "exercise_alias" (id, name)
values
  (132, 'Machine Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (133, 'Legs', 'bodyweight', 'Pistol Squat', '18');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    134,
    'Whole Body',
    'dumbbell',
    'Dumbbell Deadlift',
    '18'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (135, 'Legs', 'barbell', 'Barbell Calf Raise', '17');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (136, 'Legs', 'barbell', 'Smith Machine Squat', '17');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    137,
    'Back',
    'cable',
    'Reverse Grip Lat Pulldown',
    '16'
  );
insert into
  "exercise_alias" (id, name)
values
  (137, 'Reverse Grip Pulldown');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    138,
    'Forearms',
    'dumbbell',
    'Dumbbell Wrist Curl',
    '15'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (139, 'Back', 'machine', 'Machine Row', '15');
insert into
  "exercise_alias" (id, name)
values
  (139, 'Hammer Strength Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    140,
    'Shoulders',
    'dumbbell',
    'Dumbbell Z Press',
    '14'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (141, 'Back', 'dumbbell', 'Dumbbell Bench Pull', '13');
insert into
  "exercise_alias" (id, name)
values
  (141, 'Dumbbell Seal Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (142, 'Legs', 'barbell', 'Pause Squat', '12');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    143,
    'Whole Body',
    'barbell',
    'Hang Power Clean',
    '12'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    144,
    'Legs',
    'bodyweight',
    'Bodyweight Calf Raise',
    '11'
  );
insert into
  "exercise_alias" (id, name)
values
  (144, 'Standing Calf Raise');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (145, 'Triceps', 'dumbbell', 'Tate Press', '11');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    146,
    'Back',
    'machine',
    'Close Grip Lat Pulldown',
    '11'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    147,
    'Chest',
    'barbell',
    'Smith Machine Bench Press',
    '11'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (148, 'Legs', 'barbell', 'Safety Bar Squat', '10');
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    149,
    'Triceps',
    'machine',
    'Seated Dip Machine',
    '10'
  );
insert into
  "exercise_alias" (id, name)
values
  (149, 'Machine Dip');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (150, 'Shoulders', 'barbell', 'Neck Curl', '9');
insert into
  "exercise_alias" (id, name)
values
  (150, 'Neck Flexion');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    151,
    'Whole Body',
    'barbell',
    'Deficit Deadlift',
    '9'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (152, 'Whole Body', 'barbell', 'Split Jerk', '9');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    153,
    'Shoulders',
    'machine',
    'Machine Lateral Raise',
    '9'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (154, 'Shoulders', 'barbell', 'Log Press', '8');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    155,
    'Shoulders',
    'dumbbell',
    'Dumbbell Upright Row',
    '8'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (156, 'Back', 'machine', 'Machine Reverse Fly', '8');
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (157, 'Chest', 'cable', 'Cable Crossover', '8');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    158,
    'Chest',
    'barbell',
    'Wide Grip Bench Press',
    '7'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (159, 'Legs', 'barbell', 'Sumo Squat', '7');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    160,
    'Biceps',
    'dumbbell',
    'Dumbbell Preacher Curl',
    '7'
  );
insert into
  "exercise_alias" (id, name)
values
  (160, 'One Arm Dumbbell Preacher Curl');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (161, 'Legs', 'machine', 'Sled Press Calf Raise', '7');
insert into
  "exercise_alias" (id, name)
values
  (161, 'Leg Press Calf Raise');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (162, 'Legs', 'machine', 'Single Leg Press', '7');
insert into
  "exercise_alias" (id, name)
values
  (162, 'Single Leg Leg Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    163,
    'Whole Body',
    'barbell',
    'Single Leg Deadlift',
    '6'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (164, 'Triceps', 'bodyweight', 'Bench Dips', '6');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (165, 'Back', 'cable', 'Straight Arm Pulldown', '6');
insert into
  "exercise_alias" (id, name)
values
  (165, 'Straight Arm Lat Pulldown');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (166, 'Core', 'bodyweight', 'Hanging Knee Raise', '5');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (167, 'Core', 'machine', 'Machine Seated Crunch', '5');
insert into
  "exercise_alias" (id, name)
values
  (167, 'Machine Crunches');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    168,
    'Triceps',
    'cable',
    'Cable Overhead Tricep Extension',
    '5'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (169, 'Core', 'cable', 'Cable Woodchoppers', '5');
insert into
  "exercise_alias" (id, name)
values
  (169, 'Wood Chopper');
insert into
  "exercise_alias" (id, name)
values
  (169, 'Cable Wood Chop');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (170, 'Shoulders', 'barbell', 'Neck Extension', '4');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (171, 'Legs', 'barbell', 'Barbell Glute Bridge', '4');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    172,
    'Chest',
    'dumbbell',
    'Close Grip Dumbbell Bench Press',
    '4'
  );
insert into
  "exercise_alias" (id, name)
values
  (172, 'Close Grip Dumbbell Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (173, 'Whole Body', 'barbell', 'Pause Deadlift', '3');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (174, 'Triceps', 'barbell', 'JM Press', '3');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (175, 'Core', 'bodyweight', 'Ab Wheel Rollout', '3');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (176, 'Back', 'barbell', 'Bench Pull', '3');
insert into
  "exercise_alias" (id, name)
values
  (176, 'Seal Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    177,
    'Whole Body',
    'barbell',
    'Snatch Grip Deadlift',
    '3'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (178, 'Whole Body', 'barbell', 'Clean Pull', '3');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    179,
    'Whole Body',
    'dumbbell',
    'Dumbbell Snatch',
    '3'
  );
insert into
  "exercise_alias" (id, name)
values
  (179, 'One Arm Dumbbell Snatch');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    180,
    'Biceps',
    'dumbbell',
    'Incline Hammer Curl',
    '3'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    181,
    'Triceps',
    'cable',
    'Reverse Grip Tricep Pushdown',
    '3'
  );
insert into
  "exercise_alias" (id, name)
values
  (181, 'Reverse Grip Tricep Extension');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (182, 'Chest', 'barbell', 'Bench Pin Press', '2');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    183,
    'Shoulders',
    'barbell',
    'Behind The Neck Press',
    '2'
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
  "exercise" (id, body_part, exercise_type, name, count)
values
  (184, 'Legs', 'barbell', 'Barbell Hack Squat', '2');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (185, 'Shoulders', 'barbell', 'Landmine Press', '2');
insert into
  "exercise_alias" (id, name)
values
  (185, 'Landmine Chest Press');
insert into
  "exercise_alias" (id, name)
values
  (185, 'Standing Landmine Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    186,
    'Back',
    'bodyweight',
    'Australian Pull Ups',
    '2'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    187,
    'Whole Body',
    'bodyweight',
    'Ring Muscle Ups',
    '2'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (188, 'Legs', 'bodyweight', 'Reverse Lunge', '2');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (189, 'Whole Body', 'barbell', 'Muscle Snatch', '2');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    190,
    'Back',
    'machine',
    'Machine Back Extension',
    '2'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (191, 'Legs', 'barbell', 'Pin Squat', '1');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (192, 'Whole Body', 'barbell', 'Snatch Deadlift', '1');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    193,
    'Shoulders',
    'barbell',
    'Barbell Front Raise',
    '1'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (194, 'Legs', 'barbell', 'Belt Squat', '1');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (195, 'Biceps', 'barbell', 'Reverse Curl', '1');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (196, 'Back', 'barbell', 'Yates Row', '1');
insert into
  "exercise_alias" (id, name)
values
  (196, 'Reverse Grip Bent Over Row');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (197, 'Core', 'cable', 'High Pulley Crunch', '1');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (198, 'Legs', 'barbell', 'Walking Lunge', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (199, 'Back', 'barbell', 'Machine Shrug', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (200, 'Whole Body', 'barbell', 'Jefferson Squat', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    201,
    'Back',
    'barbell',
    'Behind The Back Barbell Shrug',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (202, 'Back', 'barbell', 'Barbell Power Shrug', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    203,
    'Back',
    'barbell',
    'Bent Arm Barbell Pullover',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (204, 'Biceps', 'barbell', 'Cheat Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (205, 'Legs', 'bodyweight', 'Donkey Calf Raise', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (206, 'Shoulders', 'barbell', 'Viking Press', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (207, 'Biceps', 'barbell', 'Spider Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    208,
    'Shoulders',
    'barbell',
    'Shoulder Pin Press',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (209, 'Back', 'barbell', 'Barbell Pullover', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (210, 'Whole Body', 'barbell', 'Wall Ball', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    211,
    'Whole Body',
    'barbell',
    'Single Leg Romanian Deadlift',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (212, 'Shoulders', 'barbell', 'Z Press', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    213,
    'Whole Body',
    'barbell',
    'Jefferson Deadlift',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (214, 'Whole Body', 'bodyweight', 'Star Jump', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (215, 'Whole Body', 'bodyweight', 'Squat Thrust', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (216, 'Legs', 'bodyweight', 'Squat Jump', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (217, 'Legs', 'bodyweight', 'Side Lunge', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (218, 'Core', 'bodyweight', 'Side Crunch', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    219,
    'Core',
    'bodyweight',
    'Roman Chair Side Bend',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (220, 'Chest', 'bodyweight', 'Pike Push Up', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (221, 'Core', 'bodyweight', 'Mountain Climbers', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (222, 'Legs', 'bodyweight', 'Leg Lift', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (223, 'Core', 'bodyweight', 'Jumping Jack', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (224, 'Legs', 'bodyweight', 'Jump Squat', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (225, 'Chest', 'bodyweight', 'Incline Push Up', '0');
insert into
  "exercise_alias" (id, name)
values
  (225, 'Incline Press Up');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    226,
    'Core',
    'bodyweight',
    'Incline Bench Sit Up',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (227, 'Legs', 'bodyweight', 'Hip Extension', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (228, 'Core', 'bodyweight', 'Flutter Kick', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    229,
    'Legs',
    'bodyweight',
    'Floor Hip Extension',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    230,
    'Legs',
    'bodyweight',
    'Floor Hip Abduction',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (231, 'Chest', 'bodyweight', 'Decline Push Up', '0');
insert into
  "exercise_alias" (id, name)
values
  (231, 'Decline Press Up');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (232, 'Core', 'bodyweight', 'Decline Crunch', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (233, 'Whole Body', 'bodyweight', 'Clap Pull Up', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (234, 'Core', 'bodyweight', 'Bicycle Crunch', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (235, 'Legs', 'bodyweight', 'Sissy Squat', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    236,
    'Chest',
    'bodyweight',
    'Close Grip Push Up',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    237,
    'Legs',
    'bodyweight',
    'Nordic Hamstring Curl',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (238, 'Core', 'bodyweight', 'Reverse Crunches', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (239, 'Triceps', 'bodyweight', 'Ring Dips', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    240,
    'Shoulders',
    'dumbbell',
    'Dumbbell Push Press',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    241,
    'Whole Body',
    'dumbbell',
    'Dumbbell High Pull',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    242,
    'Whole Body',
    'dumbbell',
    'Dumbbell Hang Clean',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (243, 'Whole Body', 'barbell', 'Snatch Pull', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (244, 'Whole Body', 'barbell', 'Clean High Pull', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    245,
    'Back',
    'dumbbell',
    'Dumbbell Incline Y Raise',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    246,
    'Triceps',
    'dumbbell',
    'Seated Dumbbell Tricep Extension',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    247,
    'Shoulders',
    'dumbbell',
    'Seated Dumbbell Shoulder Press',
    '0'
  );
insert into
  "exercise_alias" (id, name)
values
  (247, 'Seated Dumbbell Press');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    248,
    'Forearms',
    'dumbbell',
    'Dumbbell Reverse Wrist Curl',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (249, 'Legs', 'dumbbell', 'Dumbbell Front Squat', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    250,
    'Chest',
    'dumbbell',
    'Decline Dumbbell Fly',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    251,
    'Shoulders',
    'dumbbell',
    'Dumbbell External Rotation',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    252,
    'Back',
    'dumbbell',
    'Bent Over Dumbbell Row',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    253,
    'Biceps',
    'dumbbell',
    'Seated Dumbbell Curl',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (254, 'Biceps', 'dumbbell', 'Zottman Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (255, 'Back', 'barbell', 'Smith Machine Shrug', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    256,
    'Legs',
    'machine',
    'Single Leg Seated Calf Raise',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    257,
    'Triceps',
    'machine',
    'Machine Tricep Extension',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (258, 'Legs', 'machine', 'Standing Leg Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (259, 'Core', 'cable', 'Standing Cable Crunch', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (260, 'Biceps', 'cable', 'Overhead Cable Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    261,
    'Back',
    'cable',
    'One Arm Seated Cable Row',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (262, 'Biceps', 'cable', 'One Arm Pulldown', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (263, 'Biceps', 'cable', 'Lying Cable Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (264, 'Biceps', 'cable', 'Incline Cable Curl', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (265, 'Back', 'cable', 'Cable Upright Row', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (266, 'Back', 'cable', 'Cable Shrug', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (267, 'Legs', 'cable', 'Cable Leg Extension', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    268,
    'Shoulders',
    'cable',
    'Cable External Rotation',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (
    269,
    'Biceps',
    'cable',
    'Behind The Back Cable Curl',
    '0'
  );
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (270, 'Back', 'cable', 'Cable Reverse Fly', '0');
insert into
  "exercise" (id, body_part, exercise_type, name, count)
values
  (271, 'Legs', 'cable', 'Cable Kickback', '0');
-- Enter migration here
drop table if exists workout_plan_exercise cascade;
create table workout_plan_exercise(
  id SERIAL primary key,
  exercise_id integer references "exercise"(id) not null,
  sets integer not null,
  reps integer not null
);
create index on "workout_plan_exercise"(exercise_id);
drop table if exists workout_plan cascade;
create table workout_plan (
  id SERIAL primary key,
  user_id SERIAL references "user"(id) not null,
  exercises workout_plan_exercise [ ] not null
);
CREATE TYPE mood AS ENUM ('sad', 'ok', 'happy');
grant all on workout to public;
create index on "workout_plan"(user_id);
grant all on "workout_plan_exercise" to public;
grant all on "workout_plan" to public;
