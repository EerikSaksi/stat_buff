--! Previous: sha1:b475414a4ab6153cbc20c4d82ae328019a09446e
--! Hash: sha1:8542c5a8435fc729b069900575ed7e9f023f082d

-- Enter migration here
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    1,
    'bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    4,
    'squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Squat'
  );
insert into
  "exercise_alias" (id, name)
values
  (4, 'Back Squat');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    5,
    'deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    6,
    'shoulder-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Shoulder Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (6, 'Overhead Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    9,
    'barbell-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Barbell Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (9, 'Bicep Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    7,
    'front-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Front Squat'
  );
insert into
  "exercise_alias" (id, name)
values
  (7, 'Barbell Front Squat');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    8,
    'bent-over-row',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Bent Over Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (8, 'Barbell Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    35,
    'incline-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Incline Bench Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (35, 'Incline Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    24,
    'hex-bar-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Hex Bar Deadlift'
  );
insert into
  "exercise_alias" (id, name)
values
  (24, 'Trap Bar Deadlift');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    59,
    'sumo-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Sumo Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    25,
    'hip-thrust',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Hip Thrust'
  );
insert into
  "exercise_alias" (id, name)
values
  (25, 'Barbell Hip Thrust');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    23,
    'romanian-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Romanian Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    90,
    'military-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Military Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    123,
    'seated-shoulder-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Seated Shoulder Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (123, 'Seated Barbell Shoulder Press');
insert into
  "exercise_alias" (id, name)
values
  (123, 'Seated Barbell Overhead Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    67,
    'close-grip-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Close Grip Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    111,
    'ez-bar-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'EZ Bar Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    31,
    'barbell-shrug',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Barbell Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    44,
    'lying-tricep-extension',
    'Triceps',
    'Barbell Both Arms',
    'barbell',
    'Lying Tricep Extension'
  );
insert into
  "exercise_alias" (id, name)
values
  (44, 'Skull Crusher');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    203,
    'strict-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Strict Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    33,
    'decline-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Decline Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    98,
    'zercher-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Zercher Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    46,
    'pendlay-row',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Pendlay Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    74,
    'box-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Box Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    50,
    't-bar-row',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'T-Bar Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    58,
    'preacher-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Preacher Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (58, 'Barbell Preacher Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    158,
    'paused-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Paused Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    64,
    'rack-pull',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Rack Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    27,
    'upright-row',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Upright Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    78,
    'floor-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Floor Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (78, 'Barbell Floor Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    169,
    'barbell-reverse-lunge',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Barbell Reverse Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    94,
    'wrist-curl',
    'Forearms',
    'Barbell Both Arms',
    'barbell',
    'Wrist Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    97,
    'stiff-leg-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Stiff Leg Deadlift'
  );
insert into
  "exercise_alias" (id, name)
values
  (97, 'Stiff Legged Deadlift');
insert into
  "exercise_alias" (id, name)
values
  (97, 'Straight Legged Deadlift');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    213,
    'barbell-calf-raise',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Barbell Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    65,
    'bulgarian-split-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Bulgarian Split Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    79,
    'barbell-lunge',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Barbell Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    41,
    'tricep-extension',
    'Triceps',
    'Barbell Both Arms',
    'barbell',
    'Tricep Extension'
  );
insert into
  "exercise_alias" (id, name)
values
  (41, 'French Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    26,
    'good-morning',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Good Morning'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    99,
    'split-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Split Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    147,
    'pause-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Pause Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    164,
    'bodyweight-calf-raise',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Bodyweight Calf Raise'
  );
insert into
  "exercise_alias" (id, name)
values
  (164, 'Standing Calf Raise');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    129,
    'safety-bar-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Safety Bar Squat'
  );
insert into
  "exercise_alias" (id, name)
values
  (129, 'Ssb Squat');
insert into
  "exercise_alias" (id, name)
values
  (129, 'Safety Squat Bar');
insert into
  "exercise_alias" (id, name)
values
  (129, 'Safety Squat');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    173,
    'neck-curl',
    'Shoulders',
    'Weight Both Arms',
    'barbell',
    'Neck Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (173, 'Neck Flexion');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    128,
    'deficit-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Deficit Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    126,
    'log-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Log Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    120,
    'reverse-barbell-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Reverse Barbell Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    193,
    'wide-grip-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Wide Grip Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    144,
    'sumo-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Sumo Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    156,
    'single-leg-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Single Leg Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    174,
    'neck-extension',
    'Shoulders',
    'Weight Both Arms',
    'barbell',
    'Neck Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    168,
    'barbell-glute-bridge',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Barbell Glute Bridge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    121,
    'reverse-grip-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Reverse Grip Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    95,
    'reverse-wrist-curl',
    'Forearms',
    'Barbell Both Arms',
    'barbell',
    'Reverse Wrist Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    195,
    'pause-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Pause Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    194,
    'jm-press',
    'Triceps',
    'Barbell Both Arms',
    'barbell',
    'JM Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    163,
    'ab-wheel-rollout',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Ab Wheel Rollout'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    139,
    'bench-pull',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Bench Pull'
  );
insert into
  "exercise_alias" (id, name)
values
  (139, 'Seal Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    130,
    'snatch-grip-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Snatch Grip Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    189,
    'bench-pin-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Bench Pin Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    183,
    'behind-the-neck-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Behind The Neck Press'
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
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    142,
    'barbell-hack-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Barbell Hack Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    132,
    'landmine-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Landmine Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (132, 'Landmine Chest Press');
insert into
  "exercise_alias" (id, name)
values
  (132, 'Standing Landmine Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    88,
    'landmine-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Landmine Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    208,
    'pin-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Pin Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    192,
    'snatch-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Snatch Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    177,
    'barbell-front-raise',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Barbell Front Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    149,
    'belt-squat',
    'Legs',
    'Plate Belt',
    'barbell',
    'Belt Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    148,
    'reverse-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Reverse Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    133,
    'yates-row',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Yates Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (133, 'Reverse Grip Bent Over Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    271,
    'walking-lunge',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Walking Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    253,
    'machine-shrug',
    'Back',
    'Machine Both Arms',
    'barbell',
    'Machine Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    248,
    'jefferson-squat',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Jefferson Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    223,
    'behind-the-back-barbell-shrug',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Behind The Back Barbell Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    222,
    'barbell-power-shrug',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Barbell Power Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    218,
    'bent-arm-barbell-pullover',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Bent Arm Barbell Pullover'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    217,
    'cheat-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Cheat Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    216,
    'donkey-calf-raise',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Donkey Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    204,
    'viking-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Viking Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    202,
    'spider-curl',
    'Biceps',
    'Barbell Both Arms',
    'barbell',
    'Spider Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    190,
    'shoulder-pin-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Shoulder Pin Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    178,
    'barbell-pullover',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Barbell Pullover'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    176,
    'wall-ball',
    'Whole Body',
    'Weight Both Arms',
    'barbell',
    'Wall Ball'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    161,
    'single-leg-romanian-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Single Leg Romanian Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    152,
    'z-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Z Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    131,
    'jefferson-deadlift',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Jefferson Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    14,
    'pull-ups',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Pull Ups'
  );
insert into
  "exercise_alias" (id, name)
values
  (14, 'Pullup');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    28,
    'push-ups',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Push Ups'
  );
insert into
  "exercise_alias" (id, name)
values
  (28, 'Press Up');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    15,
    'dips',
    'Triceps',
    'Bodyweight',
    'bodyweight',
    'Dips'
  );
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
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    32,
    'chin-ups',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Chin Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    81,
    'bodyweight-squat',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Bodyweight Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    54,
    'sit-ups',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Sit Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    86,
    'handstand-push-ups',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Handstand Push Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    53,
    'crunches',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Crunches'
  );
insert into
  "exercise_alias" (id, name)
values
  (53, 'Ab Crunch');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    100,
    'back-extension',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Back Extension'
  );
insert into
  "exercise_alias" (id, name)
values
  (100, 'Hyper Extension');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    91,
    'one-arm-push-ups',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'One Arm Push Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    209,
    'pistol-squat',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Pistol Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    107,
    'diamond-push-ups',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Diamond Push Ups'
  );
insert into
  "exercise_alias" (id, name)
values
  (107, 'Diamond Pushups');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    62,
    'single-leg-squat',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Single Leg Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    55,
    'muscle-ups',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Muscle Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    112,
    'glute-bridge',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Glute Bridge'
  );
insert into
  "exercise_alias" (id, name)
values
  (112, 'Bridging');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    80,
    'lunge',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    73,
    'burpees',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Burpees'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    118,
    'neutral-grip-pull-ups',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Neutral Grip Pull Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    115,
    'hanging-leg-raise',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Hanging Leg Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    113,
    'glute-ham-raise',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Glute Ham Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    122,
    'russian-twist',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Russian Twist'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    170,
    'bench-dips',
    'Triceps',
    'Bodyweight',
    'bodyweight',
    'Bench Dips'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    119,
    'one-arm-pull-ups',
    'Back',
    'Bodyweight',
    'bodyweight',
    'One Arm Pull Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    117,
    'lying-leg-raise',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Lying Leg Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    116,
    'inverted-row',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Inverted Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    206,
    'hanging-knee-raise',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Hanging Knee Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    205,
    'australian-pull-ups',
    'Back',
    'Bodyweight',
    'bodyweight',
    'Australian Pull Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    200,
    'ring-muscle-ups',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Ring Muscle Ups'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    199,
    'reverse-lunge',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Reverse Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    124,
    'toes-to-bar',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Toes To Bar'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    270,
    'star-jump',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Star Jump'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    268,
    'squat-thrust',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Squat Thrust'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    267,
    'squat-jump',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Squat Jump'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    263,
    'side-lunge',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Side Lunge'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    262,
    'side-crunch',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Side Crunch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    260,
    'roman-chair-side-bend',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Roman Chair Side Bend'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    259,
    'pike-push-up',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Pike Push Up'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    255,
    'mountain-climbers',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Mountain Climbers'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    251,
    'leg-lift',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Leg Lift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    250,
    'jumping-jack',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Jumping Jack'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    249,
    'jump-squat',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Jump Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    247,
    'incline-push-up',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Incline Push Up'
  );
insert into
  "exercise_alias" (id, name)
values
  (247, 'Incline Press Up');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    245,
    'incline-bench-sit-up',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Incline Bench Sit Up'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    244,
    'hip-extension',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Hip Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    243,
    'flutter-kick',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Flutter Kick'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    242,
    'floor-hip-extension',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Floor Hip Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    241,
    'floor-hip-abduction',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Floor Hip Abduction'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    235,
    'decline-push-up',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Decline Push Up'
  );
insert into
  "exercise_alias" (id, name)
values
  (235, 'Decline Press Up');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    233,
    'decline-crunch',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Decline Crunch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    232,
    'clap-pull-up',
    'Whole Body',
    'Bodyweight',
    'bodyweight',
    'Clap Pull Up'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    225,
    'bicycle-crunch',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Bicycle Crunch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    221,
    'sissy-squat',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Sissy Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    219,
    'close-grip-push-up',
    'Chest',
    'Bodyweight',
    'bodyweight',
    'Close Grip Push Up'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    207,
    'nordic-hamstring-curl',
    'Legs',
    'Bodyweight',
    'bodyweight',
    'Nordic Hamstring Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    196,
    'reverse-crunches',
    'Core',
    'Bodyweight',
    'bodyweight',
    'Reverse Crunches'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    141,
    'ring-dips',
    'Triceps',
    'Bodyweight',
    'bodyweight',
    'Ring Dips'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    2,
    'power-clean',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Power Clean'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    10,
    'snatch',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Snatch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    12,
    'clean',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Clean'
  );
insert into
  "exercise_alias" (id, name)
values
  (12, 'Squat Clean');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    13,
    'push-press',
    'Shoulders',
    'Barbell Both Arms',
    'barbell',
    'Push Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    11,
    'clean-and-jerk',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Clean and Jerk'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    49,
    'thruster',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Thruster'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    3,
    'clean-and-press',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Clean and Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    114,
    'hang-clean',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Hang Clean'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    61,
    'overhead-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Overhead Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    171,
    'hang-power-clean',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Hang Power Clean'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    71,
    'power-snatch',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Power Snatch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    48,
    'push-jerk',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Push Jerk'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    136,
    'split-jerk',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Split Jerk'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    157,
    'clean-pull',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Clean Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    155,
    'dumbbell-snatch',
    'Whole Body',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell Snatch'
  );
insert into
  "exercise_alias" (id, name)
values
  (155, 'One Arm Dumbbell Snatch');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    172,
    'muscle-snatch',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Muscle Snatch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    239,
    'dumbbell-push-press',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Push Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    238,
    'dumbbell-high-pull',
    'Whole Body',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell High Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    237,
    'dumbbell-hang-clean',
    'Whole Body',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Hang Clean'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    167,
    'snatch-pull',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Snatch Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    166,
    'clean-high-pull',
    'Whole Body',
    'Barbell Both Arms',
    'barbell',
    'Clean High Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    19,
    'dumbbell-bench-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    17,
    'dumbbell-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    18,
    'dumbbell-shoulder-press',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Shoulder Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (18, 'Dumbbell Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    47,
    'incline-dumbbell-bench-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Incline Dumbbell Bench Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (47, 'Incline Dumbbell Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    16,
    'dumbbell-row',
    'Back',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (16, 'Dumbbell Bent Over Row');
insert into
  "exercise_alias" (id, name)
values
  (16, 'One Arm Dumbbell Row');
insert into
  "exercise_alias" (id, name)
values
  (16, 'One Arm Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    29,
    'dumbbell-lateral-raise',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Lateral Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    60,
    'hammer-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Hammer Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (60, 'Dumbbell Hammer Curl');
insert into
  "exercise_alias" (id, name)
values
  (60, 'Hammer Curls');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    39,
    'dumbbell-fly',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Fly'
  );
insert into
  "exercise_alias" (id, name)
values
  (39, 'Dumbbell Chest Fly');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    85,
    'goblet-squat',
    'Legs',
    'Dumbbell Both Arms',
    'dumbbell',
    'Goblet Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    66,
    'dumbbell-bulgarian-split-squat',
    'Legs',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Bulgarian Split Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    34,
    'dumbbell-shrug',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Shrug'
  );
insert into
  "exercise_alias" (id, name)
values
  (34, 'Shoulder Shrug');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    42,
    'dumbbell-tricep-extension',
    'Triceps',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell Tricep Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    108,
    'dumbbell-floor-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Floor Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    43,
    'lying-dumbbell-tricep-extension',
    'Triceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Lying Dumbbell Tricep Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    57,
    'dumbbell-lunge',
    'Legs',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Lunge'
  );
insert into
  "exercise_alias" (id, name)
values
  (57, 'Dumbbell Lunges');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    56,
    'dumbbell-concentration-curl',
    'Biceps',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell Concentration Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    135,
    'dumbbell-squat',
    'Legs',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    77,
    'arnold-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Arnold Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    84,
    'dumbbell-pullover',
    'Back',
    'Dumbbell Both Arms',
    'dumbbell',
    'Dumbbell Pullover'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    93,
    'dumbbell-reverse-fly',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Reverse Fly'
  );
insert into
  "exercise_alias" (id, name)
values
  (93, 'Rear Delt Fly');
insert into
  "exercise_alias" (id, name)
values
  (93, 'Bent Over Lateral Raise');
insert into
  "exercise_alias" (id, name)
values
  (93, 'Bent Over Raise');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    30,
    'dumbbell-front-raise',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Front Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    151,
    'renegade-row',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Renegade Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    186,
    'dumbbell-side-bend',
    'Core',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell Side Bend'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    185,
    'dumbbell-calf-raise',
    'Legs',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    137,
    'dumbbell-deadlift',
    'Whole Body',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    106,
    'chest-supported-dumbbell-row',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Chest Supported Dumbbell Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (106, 'Chest Supported Row');
insert into
  "exercise_alias" (id, name)
values
  (106, 'Incline Dumbbell Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    187,
    'dumbbell-wrist-curl',
    'Forearms',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Wrist Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    153,
    'dumbbell-z-press',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Z Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    140,
    'dumbbell-bench-pull',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Bench Pull'
  );
insert into
  "exercise_alias" (id, name)
values
  (140, 'Dumbbell Seal Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    110,
    'dumbbell-romanian-deadlift',
    'Whole Body',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Romanian Deadlift'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    109,
    'dumbbell-tricep-kickback',
    'Triceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Tricep Kickback'
  );
insert into
  "exercise_alias" (id, name)
values
  (109, 'Dumbbell Kickback');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    210,
    'tate-press',
    'Triceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Tate Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    45,
    'incline-dumbbell-fly',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Incline Dumbbell Fly'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    165,
    'dumbbell-upright-row',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Upright Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    87,
    'incline-dumbbell-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Incline Dumbbell Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (87, 'Incline Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    160,
    'dumbbell-preacher-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Preacher Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (160, 'One Arm Dumbbell Preacher Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    75,
    'decline-dumbbell-bench-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Decline Dumbbell Bench Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (75, 'Decline Dumbbell Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    184,
    'close-grip-dumbbell-bench-press',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Close Grip Dumbbell Bench Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (184, 'Close Grip Dumbbell Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    214,
    'incline-hammer-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Incline Hammer Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    272,
    'dumbbell-incline-y-raise',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Incline Y Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    264,
    'seated-dumbbell-tricep-extension',
    'Triceps',
    'Dumbbell Both Arms',
    'dumbbell',
    'Seated Dumbbell Tricep Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    261,
    'seated-dumbbell-shoulder-press',
    'Shoulders',
    'Dumbbell Per Arm',
    'dumbbell',
    'Seated Dumbbell Shoulder Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (261, 'Seated Dumbbell Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    240,
    'dumbbell-reverse-wrist-curl',
    'Forearms',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Reverse Wrist Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    236,
    'dumbbell-front-squat',
    'Legs',
    'Dumbbell Per Arm',
    'dumbbell',
    'Dumbbell Front Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    234,
    'decline-dumbbell-fly',
    'Chest',
    'Dumbbell Per Arm',
    'dumbbell',
    'Decline Dumbbell Fly'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    228,
    'dumbbell-external-rotation',
    'Shoulders',
    'Dumbbell One Arm',
    'dumbbell',
    'Dumbbell External Rotation'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    226,
    'bent-over-dumbbell-row',
    'Back',
    'Dumbbell Per Arm',
    'dumbbell',
    'Bent Over Dumbbell Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    220,
    'seated-dumbbell-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Seated Dumbbell Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    162,
    'zottman-curl',
    'Biceps',
    'Dumbbell Per Arm',
    'dumbbell',
    'Zottman Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    20,
    'sled-leg-press',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Sled Leg Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    21,
    'horizontal-leg-press',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Horizontal Leg Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (21, 'Seated Leg Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    36,
    'leg-extension',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Leg Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    83,
    'chest-press',
    'Chest',
    'Machine Both Arms',
    'machine',
    'Chest Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    92,
    'machine-chest-fly',
    'Chest',
    'Machine Both Arms',
    'machine',
    'Machine Chest Fly'
  );
insert into
  "exercise_alias" (id, name)
values
  (92, 'Pec Deck Fly');
insert into
  "exercise_alias" (id, name)
values
  (92, 'Butterfly');
insert into
  "exercise_alias" (id, name)
values
  (92, 'Machine Fly');
insert into
  "exercise_alias" (id, name)
values
  (92, 'Fly Machine');
insert into
  "exercise_alias" (id, name)
values
  (92, 'Pec Deck');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    37,
    'lying-leg-curl',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Lying Leg Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    89,
    'machine-shoulder-press',
    'Shoulders',
    'Machine Both Arms',
    'machine',
    'Machine Shoulder Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    38,
    'seated-leg-curl',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Seated Leg Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (38, 'Hamstring Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    96,
    'seated-calf-raise',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Seated Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    181,
    'machine-tricep-press',
    'Triceps',
    'Machine Both Arms',
    'machine',
    'Machine Tricep Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    68,
    'hack-squat',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Hack Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    40,
    'machine-calf-raise',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Machine Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    146,
    'machine-bicep-curl',
    'Biceps',
    'Machine Both Arms',
    'machine',
    'Machine Bicep Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (146, 'Machine Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    175,
    'smith-machine-squat',
    'Legs',
    'Barbell Both Arms',
    'barbell',
    'Smith Machine Squat'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    143,
    'machine-row',
    'Back',
    'Machine Both Arms',
    'machine',
    'Machine Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (143, 'Hammer Strength Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    76,
    'vertical-leg-press',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Vertical Leg Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    211,
    'close-grip-lat-pulldown',
    'Back',
    'Machine Both Arms',
    'machine',
    'Close Grip Lat Pulldown'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    201,
    'smith-machine-bench-press',
    'Chest',
    'Barbell Both Arms',
    'barbell',
    'Smith Machine Bench Press'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    127,
    'seated-dip-machine',
    'Triceps',
    'Machine Both Arms',
    'machine',
    'Seated Dip Machine'
  );
insert into
  "exercise_alias" (id, name)
values
  (127, 'Machine Dip');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    215,
    'machine-lateral-raise',
    'Shoulders',
    'Machine Both Arms',
    'machine',
    'Machine Lateral Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    188,
    'machine-reverse-fly',
    'Back',
    'Machine Both Arms',
    'machine',
    'Machine Reverse Fly'
  );
insert into
  "exercise_alias" (id, name)
values
  (188, 'Machine Rear Deltoid Fly');
insert into
  "exercise_alias" (id, name)
values
  (188, 'Rear Delt Machine');
insert into
  "exercise_alias" (id, name)
values
  (188, 'Reverse Pec Deck Fly');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    70,
    'hip-abduction',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Hip Abduction'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    212,
    'sled-press-calf-raise',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Sled Press Calf Raise'
  );
insert into
  "exercise_alias" (id, name)
values
  (212, 'Leg Press Calf Raise');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    191,
    'single-leg-press',
    'Legs',
    'Machine One Leg',
    'machine',
    'Single Leg Press'
  );
insert into
  "exercise_alias" (id, name)
values
  (191, 'Single Leg Leg Press');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    69,
    'hip-adduction',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Hip Adduction'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    150,
    'machine-seated-crunch',
    'Core',
    'Machine Both Arms',
    'machine',
    'Machine Seated Crunch'
  );
insert into
  "exercise_alias" (id, name)
values
  (150, 'Machine Crunches');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    180,
    'machine-back-extension',
    'Back',
    'Machine Back',
    'machine',
    'Machine Back Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    266,
    'smith-machine-shrug',
    'Back',
    'Barbell Both Arms',
    'barbell',
    'Smith Machine Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    265,
    'single-leg-seated-calf-raise',
    'Legs',
    'Machine One Leg',
    'machine',
    'Single Leg Seated Calf Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    254,
    'machine-tricep-extension',
    'Triceps',
    'Machine Both Arms',
    'machine',
    'Machine Tricep Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    182,
    'standing-leg-curl',
    'Legs',
    'Machine Both Legs',
    'machine',
    'Standing Leg Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    22,
    'lat-pulldown',
    'Back',
    'Cable Both Arms',
    'cable',
    'Lat Pulldown'
  );
insert into
  "exercise_alias" (id, name)
values
  (22, 'Machine Pulldown');
insert into
  "exercise_alias" (id, name)
values
  (22, 'Back Lat Pulldown');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    51,
    'tricep-pushdown',
    'Triceps',
    'Cable Both Arms',
    'cable',
    'Tricep Pushdown'
  );
insert into
  "exercise_alias" (id, name)
values
  (51, 'Tricep Pressdown');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    63,
    'seated-cable-row',
    'Back',
    'Cable Both Arms',
    'cable',
    'Seated Cable Row'
  );
insert into
  "exercise_alias" (id, name)
values
  (63, 'Seated Row');
insert into
  "exercise_alias" (id, name)
values
  (63, 'Low Row');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    52,
    'tricep-rope-pushdown',
    'Triceps',
    'Cable Both Arms',
    'cable',
    'Tricep Rope Pushdown'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    82,
    'cable-fly',
    'Chest',
    'Cable Per Arm',
    'cable',
    'Cable Fly'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    72,
    'face-pull',
    'Back',
    'Cable Both Arms',
    'cable',
    'Face Pull'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    197,
    'reverse-grip-lat-pulldown',
    'Back',
    'Cable Both Arms',
    'cable',
    'Reverse Grip Lat Pulldown'
  );
insert into
  "exercise_alias" (id, name)
values
  (197, 'Reverse Grip Pulldown');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    102,
    'cable-bicep-curl',
    'Biceps',
    'Cable Both Arms',
    'cable',
    'Cable Bicep Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (102, 'Cable Curl');
insert into
  "exercise_alias" (id, name)
values
  (102, 'Biceps Cable Curl');
insert into
  "exercise_alias" (id, name)
values
  (102, 'Standing Cable Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    138,
    'cable-crossover',
    'Chest',
    'Cable Per Arm',
    'cable',
    'Cable Crossover'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    134,
    'straight-arm-pulldown',
    'Back',
    'Cable Both Arms',
    'cable',
    'Straight Arm Pulldown'
  );
insert into
  "exercise_alias" (id, name)
values
  (134, 'Straight Arm Lat Pulldown');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    145,
    'cable-overhead-tricep-extension',
    'Triceps',
    'Cable Both Arms',
    'cable',
    'Cable Overhead Tricep Extension'
  );
insert into
  "exercise_alias" (id, name)
values
  (145, 'Overhead Tricep Rope Extension');
insert into
  "exercise_alias" (id, name)
values
  (145, 'Overhead Tricep Cable Extension');
insert into
  "exercise_alias" (id, name)
values
  (145, 'Overhead Cable Tricep Extension');
insert into
  "exercise_alias" (id, name)
values
  (145, 'Tricep Overhead Extension');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    125,
    'cable-woodchoppers',
    'Core',
    'Cable Both Arms',
    'cable',
    'Cable Woodchoppers'
  );
insert into
  "exercise_alias" (id, name)
values
  (125, 'Wood Chopper');
insert into
  "exercise_alias" (id, name)
values
  (125, 'Cable Wood Chop');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    105,
    'cable-pull-through',
    'Legs',
    'Cable Both Arms',
    'cable',
    'Cable Pull Through'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    104,
    'cable-lateral-raise',
    'Shoulders',
    'Cable One Arm',
    'cable',
    'Cable Lateral Raise'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    198,
    'reverse-grip-tricep-pushdown',
    'Triceps',
    'Cable Both Arms',
    'cable',
    'Reverse Grip Tricep Pushdown'
  );
insert into
  "exercise_alias" (id, name)
values
  (198, 'Reverse Grip Tricep Extension');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    101,
    'cable-crunch',
    'Core',
    'Cable Both Arms',
    'cable',
    'Cable Crunch'
  );
insert into
  "exercise_alias" (id, name)
values
  (101, 'Cable Crunches');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    103,
    'one-arm-cable-bicep-curl',
    'Biceps',
    'Cable One Arm',
    'cable',
    'One Arm Cable Bicep Curl'
  );
insert into
  "exercise_alias" (id, name)
values
  (103, 'One Arm Cable Curl');
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    154,
    'high-pulley-crunch',
    'Core',
    'Cable Both Arms',
    'cable',
    'High Pulley Crunch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    269,
    'standing-cable-crunch',
    'Core',
    'Cable Both Arms',
    'cable',
    'Standing Cable Crunch'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    258,
    'overhead-cable-curl',
    'Biceps',
    'Cable Both Arms',
    'cable',
    'Overhead Cable Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    257,
    'one-arm-seated-cable-row',
    'Back',
    'Cable One Arm',
    'cable',
    'One Arm Seated Cable Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    256,
    'one-arm-pulldown',
    'Biceps',
    'Cable One Arm',
    'cable',
    'One Arm Pulldown'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    252,
    'lying-cable-curl',
    'Biceps',
    'Cable Both Arms',
    'cable',
    'Lying Cable Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    246,
    'incline-cable-curl',
    'Biceps',
    'Cable Both Arms',
    'cable',
    'Incline Cable Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    231,
    'cable-upright-row',
    'Back',
    'Cable Both Arms',
    'cable',
    'Cable Upright Row'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    230,
    'cable-shrug',
    'Back',
    'Cable Both Arms',
    'cable',
    'Cable Shrug'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    229,
    'cable-leg-extension',
    'Legs',
    'Cable One Leg',
    'cable',
    'Cable Leg Extension'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    227,
    'cable-external-rotation',
    'Shoulders',
    'Cable One Arm',
    'cable',
    'Cable External Rotation'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    224,
    'behind-the-back-cable-curl',
    'Biceps',
    'Cable One Arm',
    'cable',
    'Behind The Back Cable Curl'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    179,
    'cable-reverse-fly',
    'Back',
    'Cable Per Arm',
    'cable',
    'Cable Reverse Fly'
  );
insert into
  "exercise" (
    id,
    string_id,
    body_part,
    weight_connection,
    exercise_type,
    name
  )
values
  (
    159,
    'cable-kickback',
    'Legs',
    'Cable One Leg',
    'cable',
    'Cable Kickback'
  );
