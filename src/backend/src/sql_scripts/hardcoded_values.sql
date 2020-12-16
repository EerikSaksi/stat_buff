insert into
  "enemy" (level, max_health, name)
values
  (1, 10, 'Earth Golem');


insert into
  "user" (username, googleID)
values
  ('orek', 'uh oh'),
  ('eerik', 'stinky');

insert into
  "group" (name, creator_username)
values
  ('Dream Team', 'orek'),
  ('Team Rocket', 'eerik');

update "user"
  set groupName = 'Dream Team' 
  where username = 'orek';

update "user"
  set groupName = 'Dream Team' 
  where username = 'eerik';

insert into
  "bodystat" (bodymass, isMale, username)
values
  (85, true, 'orek');

insert into
  "bodystat" (bodymass, isMale, username)
values
  (69, false, 'eerik');


insert into
  "exercise" (popularity_ranking, slug_name)
values
  (1, 'bench-press'),
  (2, 'deadlift'),
  (3, 'squat'),
  (4, 'shoulder-press'),
  (5, 'pull-ups'),
  (6, 'dumbbell-bench-press'),
  (7, 'barbell-curl'),
  (8, 'dumbbell-curl'),
  (9, 'front-squat'),
  (10, 'bent-over-row'),
  (11, 'push-ups'),
  (12, 'dumbbell-shoulder-press'),
  (13, 'power-clean'),
  (14, 'incline-bench-press'),
  (15, 'sled-leg-press'),
  (16, 'dips'),
  (17, 'military-press'),
  (18, 'hex-bar-deadlift'),
  (19, 'lat-pulldown'),
  (20, 'incline-dumbbell-bench-press'),
  (21, 'chin-ups'),
  (22, 'horizontal-leg-press'),
  (23, 'dumbbell-lateral-raise'),
  (24, 'dumbbell-row'),
  (25, 'snatch'),
  (26, 'clean-and-jerk'),
  (27, 'romanian-deadlift'),
  (28, 'hip-thrust'),
  (29, 'sumo-deadlift'),
  (30, 'clean'),
  (31, 'leg-extension'),
  (32, 'push-press'),
  (33, 'clean-and-press'),
  (34, 'chest-press'),
  (35, 'tricep-pushdown'),
  (36, 'barbell-shrug'),
  (37, 'machine-calf-raise'),
  (38, 'vertical-leg-press'),
  (39, 'decline-bench-press'),
  (40, 'hammer-curl'),
  (41, 'seated-cable-row'),
  (42, 'tricep-rope-pushdown'),
  (43, 'dumbbell-shrug'),
  (44, 'close-grip-bench-press'),
  (45, 'dumbbell-fly'),
  (46, 'pendlay-row'),
  (47, 'seated-leg-curl'),
  (48, 'dumbbell-lunge'),
  (49, 't-bar-row'),
  (50, 'dumbbell-tricep-extension'),
  (51, 'tricep-extension'),
  (52, 'upright-row'),
  (53, 'preacher-curl'),
  (54, 'goblet-squat'),
  (55, 'rack-pull'),
  (56, 'lying-tricep-extension'),
  (57, 'lying-leg-curl'),
  (58, 'dumbbell-front-raise'),
  (59, 'sit-ups'),
  (60, 'machine-shoulder-press'),
  (61, 'ez-bar-curl'),
  (62, 'muscle-ups'),
  (63, 'dumbbell-concentration-curl'),
  (64, 'machine-chest-fly'),
  (65, 'good-morning'),
  (66, 'bodyweight-squat'),
  (67, 'dumbbell-bulgarian-split-squat'),
  (68, 'box-squat'),
  (69, 'arnold-press'),
  (70, 'hack-squat'),
  (71, 'thruster'),
  (72, 'overhead-squat'),
  (73, 'floor-press'),
  (74, 'seated-shoulder-press'),
  (75, 'stiff-leg-deadlift'),
  (76, 'incline-dumbbell-fly'),
  (77, 'lying-dumbbell-tricep-extension'),
  (78, 'push-jerk'),
  (79, 'zercher-squat'),
  (80, 'face-pull'),
  (81, 'barbell-lunge'),
  (82, 'cable-fly'),
  (83, 'bulgarian-split-squat'),
  (84, 'seated-calf-raise'),
  (85, 'incline-dumbbell-curl'),
  (86, 'hang-clean'),
  (87, 'hip-abduction'),
  (88, 'wrist-curl'),
  (89, 'power-snatch'),
  (90, 'crunches'),
  (91, 'dumbbell-romanian-deadlift'),
  (92, 'dumbbell-pullover'),
  (93, 'dumbbell-floor-press'),
  (94, 'hip-adduction'),
  (95, 'dumbbell-reverse-fly'),
  (96, 'decline-dumbbell-bench-press'),
  (97, 'split-squat'),
  (98, 'reverse-grip-bench-press'),
  (99, 'dumbbell-tricep-kickback'),
  (100, 'landmine-squat'),
  (101, 'cable-bicep-curl'),
  (102, 'reverse-wrist-curl'),
  (103, 'cable-crunch'),
  (104, 'chest-supported-dumbbell-row'),
  (105, 'single-leg-squat'),
  (106, 'cable-lateral-raise'),
  (107, 'cable-pull-through'),
  (108, 'reverse-barbell-curl'),
  (109, 'one-arm-cable-bicep-curl'),
  (110, 'one-arm-push-ups'),
  (111, 'handstand-push-ups'),
  (112, 'burpees'),
  (113, 'lunge'),
  (114, 'diamond-push-ups'),
  (115, 'one-arm-pull-ups'),
  (116, 'neutral-grip-pull-ups'),
  (117, 'hanging-leg-raise'),
  (118, 'russian-twist'),
  (119, 'glute-bridge'),
  (120, 'inverted-row'),
  (121, 'back-extension'),
  (122, 'toes-to-bar'),
  (123, 'lying-leg-raise'),
  (124, 'glute-ham-raise'),
  (125, 'strict-curl'),
  (126, 'dumbbell-squat'),
  (127, 'paused-bench-press'),
  (128, 'barbell-reverse-lunge'),
  (129, 'renegade-row'),
  (130, 'machine-tricep-press'),
  (131, 'dumbbell-side-bend'),
  (132, 'dumbbell-calf-raise'),
  (133, 'machine-bicep-curl'),
  (134, 'pistol-squat'),
  (135, 'dumbbell-deadlift'),
  (136, 'barbell-calf-raise'),
  (137, 'smith-machine-squat'),
  (138, 'reverse-grip-lat-pulldown'),
  (139, 'dumbbell-wrist-curl'),
  (140, 'machine-row'),
  (141, 'dumbbell-z-press'),
  (142, 'dumbbell-bench-pull'),
  (143, 'pause-squat'),
  (144, 'hang-power-clean'),
  (145, 'bodyweight-calf-raise'),
  (146, 'tate-press'),
  (147, 'close-grip-lat-pulldown'),
  (148, 'smith-machine-bench-press'),
  (149, 'safety-bar-squat'),
  (150, 'seated-dip-machine'),
  (151, 'neck-curl'),
  (152, 'deficit-deadlift'),
  (153, 'split-jerk'),
  (154, 'machine-lateral-raise'),
  (155, 'log-press'),
  (156, 'dumbbell-upright-row'),
  (157, 'machine-reverse-fly'),
  (158, 'cable-crossover'),
  (159, 'wide-grip-bench-press'),
  (160, 'sumo-squat'),
  (161, 'dumbbell-preacher-curl'),
  (162, 'sled-press-calf-raise'),
  (163, 'single-leg-press'),
  (164, 'single-leg-deadlift'),
  (165, 'bench-dips'),
  (166, 'straight-arm-pulldown'),
  (167, 'hanging-knee-raise'),
  (168, 'machine-seated-crunch'),
  (169, 'cable-overhead-tricep-extension'),
  (170, 'cable-woodchoppers'),
  (171, 'neck-extension'),
  (172, 'barbell-glute-bridge'),
  (173, 'close-grip-dumbbell-bench-press'),
  (174, 'pause-deadlift'),
  (175, 'jm-press'),
  (176, 'ab-wheel-rollout'),
  (177, 'bench-pull'),
  (178, 'snatch-grip-deadlift'),
  (179, 'clean-pull'),
  (180, 'dumbbell-snatch'),
  (181, 'incline-hammer-curl'),
  (182, 'reverse-grip-tricep-pushdown'),
  (183, 'bench-pin-press'),
  (184, 'behind-the-neck-press'),
  (185, 'barbell-hack-squat'),
  (186, 'landmine-press'),
  (187, 'australian-pull-ups'),
  (188, 'ring-muscle-ups'),
  (189, 'reverse-lunge'),
  (190, 'muscle-snatch'),
  (191, 'machine-back-extension'),
  (192, 'pin-squat'),
  (193, 'snatch-deadlift'),
  (194, 'barbell-front-raise'),
  (195, 'belt-squat'),
  (196, 'reverse-curl'),
  (197, 'yates-row'),
  (198, 'high-pulley-crunch'),
  (199, 'walking-lunge'),
  (200, 'machine-shrug'),
  (201, 'jefferson-squat'),
  (202, 'behind-the-back-barbell-shrug'),
  (203, 'barbell-power-shrug'),
  (204, 'bent-arm-barbell-pullover');

insert into
  "user_exercise" 
  (slug_name,  username,  repetitions,  liftmass,  strongerPercentage, groupName, battle_number)
values
  ('bench-press', 'orek', 8, 80, 52, 'Dream Team', 1);

insert into
  "user_exercise" 
  (slug_name,  username,  repetitions,  liftmass,  strongerPercentage)
values
  ('shoulder-press', 'eerik', 8, 50, 52);

insert into
  "user_exercise" 
  (slug_name,  username,  repetitions,  liftmass,  strongerPercentage)
values
  ('deadlift', 'orek', 12, 180, 80);
insert into
  "user_exercise" 
  (slug_name,  username,  repetitions,  liftmass,  strongerPercentage)
values
  ('front-squat', 'orek', 12, 140, 90);

--we want to change the updated at times, but changing the update times triggers the set update time trigger. Oh the irony

ALTER TABLE "user_exercise" DISABLE TRIGGER set_timestamp;
update "user_exercise"
set updated_at = '2020-12-03'
where username = 'orek';

update "user_exercise"
set updated_at = '2020-12-04'
where username = 'eerik';
ALTER TABLE "user_exercise" enable TRIGGER set_timestamp;


insert into
  "workout" (average_rir, sets, username)
values
  (8, 2, 'orek');

insert into
  "workout" (average_rir, sets, username)
values
  (9, 5, 'orek');

insert into
  "workout" (average_rir, sets, username)
values
  (1, 20, 'orek');

update "workout"
set created_at = '2020-12-14'
where username = 'orek';

