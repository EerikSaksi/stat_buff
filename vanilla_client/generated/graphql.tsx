import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
  /**
   * A JSON Web Token defined by [RFC 7519](https://tools.ietf.org/html/rfc7519)
   * which securely represents claims between two parties.
   */
  JwtToken: any;
};

export type AppUser = {
  __typename?: 'AppUser';
  username: Scalars['String'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  id: Scalars['Int'];
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
  isMale: Scalars['Boolean'];
  bodymass: Scalars['Float'];
  totalXp: Scalars['Int'];
  level?: Maybe<Scalars['Int']>;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercises: Array<UserExercise>;
  /** Reads and enables pagination through a set of `SessionAnalytic`. */
  sessionAnalytics: Array<SessionAnalytic>;
  /** Reads and enables pagination through a set of `CompletedWorkout`. */
  completedWorkouts: Array<CompletedWorkout>;
  /** Reads and enables pagination through a set of `WorkoutPlan`. */
  workoutPlans: Array<WorkoutPlan>;
};


export type AppUserUserExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
  condition?: Maybe<UserExerciseCondition>;
  filter?: Maybe<UserExerciseFilter>;
};


export type AppUserSessionAnalyticsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
  condition?: Maybe<SessionAnalyticCondition>;
  filter?: Maybe<SessionAnalyticFilter>;
};


export type AppUserCompletedWorkoutsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
  condition?: Maybe<CompletedWorkoutCondition>;
  filter?: Maybe<CompletedWorkoutFilter>;
};


export type AppUserWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
  condition?: Maybe<WorkoutPlanCondition>;
  filter?: Maybe<WorkoutPlanFilter>;
};

/** A condition to be used against `AppUser` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type AppUserCondition = {
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `currentWorkoutPlanId` field. */
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `AppUser` object types. All fields are combined with a logical ‘and.’ */
export type AppUserFilter = {
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `currentWorkoutPlanId` field. */
  currentWorkoutPlanId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<AppUserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<AppUserFilter>>;
  /** Negates the expression. */
  not?: Maybe<AppUserFilter>;
};

/** Represents an update to a `AppUser`. Fields that are set will be updated. */
export type AppUserPatch = {
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  id?: Maybe<Scalars['Int']>;
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
  isMale?: Maybe<Scalars['Boolean']>;
  bodymass?: Maybe<Scalars['Float']>;
  totalXp?: Maybe<Scalars['Int']>;
  level?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `AppUser`. */
export enum AppUsersOrderBy {
  Natural = 'NATURAL',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CurrentWorkoutPlanIdAsc = 'CURRENT_WORKOUT_PLAN_ID_ASC',
  CurrentWorkoutPlanIdDesc = 'CURRENT_WORKOUT_PLAN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export enum BodyPartEnum {
  Back = 'BACK',
  Biceps = 'BICEPS',
  Chest = 'CHEST',
  Core = 'CORE',
  Forearms = 'FOREARMS',
  Legs = 'LEGS',
  Shoulders = 'SHOULDERS',
  Triceps = 'TRICEPS',
  WholeBody = 'WHOLE_BODY'
}

export type CompletedSet = {
  __typename?: 'CompletedSet';
  id: Scalars['Int'];
  weight: Scalars['Int'];
  reps: Scalars['Int'];
  completedWorkoutExerciseId: Scalars['Int'];
  /** Reads a single `CompletedWorkoutExercise` that is related to this `CompletedSet`. */
  completedWorkoutExercise: CompletedWorkoutExercise;
};

/**
 * A condition to be used against `CompletedSet` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CompletedSetCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `completedWorkoutExerciseId` field. */
  completedWorkoutExerciseId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `CompletedSet` object types. All fields are combined with a logical ‘and.’ */
export type CompletedSetFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `completedWorkoutExerciseId` field. */
  completedWorkoutExerciseId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CompletedSetFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CompletedSetFilter>>;
  /** Negates the expression. */
  not?: Maybe<CompletedSetFilter>;
};

/** An input for mutations affecting `CompletedSet` */
export type CompletedSetInput = {
  weight: Scalars['Int'];
  reps: Scalars['Int'];
};

/** Represents an update to a `CompletedSet`. Fields that are set will be updated. */
export type CompletedSetPatch = {
  weight?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Int']>;
  completedWorkoutExerciseId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `CompletedSet`. */
export enum CompletedSetsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CompletedWorkoutExerciseIdAsc = 'COMPLETED_WORKOUT_EXERCISE_ID_ASC',
  CompletedWorkoutExerciseIdDesc = 'COMPLETED_WORKOUT_EXERCISE_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type CompletedWorkout = {
  __typename?: 'CompletedWorkout';
  id: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  appUserId: Scalars['Int'];
  /** Reads a single `AppUser` that is related to this `CompletedWorkout`. */
  appUser: AppUser;
  /** Reads and enables pagination through a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises: Array<CompletedWorkoutExercise>;
};


export type CompletedWorkoutCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
  condition?: Maybe<CompletedWorkoutExerciseCondition>;
  filter?: Maybe<CompletedWorkoutExerciseFilter>;
};

/**
 * A condition to be used against `CompletedWorkout` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type CompletedWorkoutCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `appUserId` field. */
  appUserId?: Maybe<Scalars['Int']>;
};

export type CompletedWorkoutExercise = {
  __typename?: 'CompletedWorkoutExercise';
  id: Scalars['Int'];
  exerciseId: Scalars['Int'];
  completedWorkoutId: Scalars['Int'];
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
  /** Reads and enables pagination through a set of `CompletedSet`. */
  completedSets: Array<CompletedSet>;
};


export type CompletedWorkoutExerciseCompletedSetsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedSetsOrderBy>>;
  condition?: Maybe<CompletedSetCondition>;
  filter?: Maybe<CompletedSetFilter>;
};

/**
 * A condition to be used against `CompletedWorkoutExercise` object types. All
 * fields are tested for equality and combined with a logical ‘and.’
 */
export type CompletedWorkoutExerciseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `exerciseId` field. */
  exerciseId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `completedWorkoutId` field. */
  completedWorkoutId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `CompletedWorkoutExercise` object types. All fields are combined with a logical ‘and.’ */
export type CompletedWorkoutExerciseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `exerciseId` field. */
  exerciseId?: Maybe<IntFilter>;
  /** Filter by the object’s `completedWorkoutId` field. */
  completedWorkoutId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CompletedWorkoutExerciseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CompletedWorkoutExerciseFilter>>;
  /** Negates the expression. */
  not?: Maybe<CompletedWorkoutExerciseFilter>;
};

/** An input for mutations affecting `CompletedWorkoutExercise` */
export type CompletedWorkoutExerciseInput = {
  id?: Maybe<Scalars['Int']>;
  exerciseId: Scalars['Int'];
  completedWorkoutId: Scalars['Int'];
};

/** Represents an update to a `CompletedWorkoutExercise`. Fields that are set will be updated. */
export type CompletedWorkoutExercisePatch = {
  id?: Maybe<Scalars['Int']>;
  exerciseId?: Maybe<Scalars['Int']>;
  completedWorkoutId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `CompletedWorkoutExercise`. */
export enum CompletedWorkoutExercisesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  ExerciseIdAsc = 'EXERCISE_ID_ASC',
  ExerciseIdDesc = 'EXERCISE_ID_DESC',
  CompletedWorkoutIdAsc = 'COMPLETED_WORKOUT_ID_ASC',
  CompletedWorkoutIdDesc = 'COMPLETED_WORKOUT_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against `CompletedWorkout` object types. All fields are combined with a logical ‘and.’ */
export type CompletedWorkoutFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `appUserId` field. */
  appUserId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CompletedWorkoutFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CompletedWorkoutFilter>>;
  /** Negates the expression. */
  not?: Maybe<CompletedWorkoutFilter>;
};

/** An input for mutations affecting `CompletedWorkout` */
export type CompletedWorkoutInput = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  appUserId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `CompletedWorkout`. Fields that are set will be updated. */
export type CompletedWorkoutPatch = {
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  appUserId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `CompletedWorkout`. */
export enum CompletedWorkoutsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  AppUserIdAsc = 'APP_USER_ID_ASC',
  AppUserIdDesc = 'APP_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `CompletedSet` mutation. */
export type CreateCompletedSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedSet` to be created by this mutation. */
  completedSet: CompletedSetInput;
};

/** The output of our create `CompletedSet` mutation. */
export type CreateCompletedSetPayload = {
  __typename?: 'CreateCompletedSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedSet` that was created by this mutation. */
  completedSet?: Maybe<CompletedSet>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CompletedWorkoutExercise` that is related to this `CompletedSet`. */
  completedWorkoutExercise: CompletedWorkoutExercise;
};

/** All input for the create `CompletedWorkoutExercise` mutation. */
export type CreateCompletedWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` to be created by this mutation. */
  completedWorkoutExercise: CompletedWorkoutExerciseInput;
};

/** The output of our create `CompletedWorkoutExercise` mutation. */
export type CreateCompletedWorkoutExercisePayload = {
  __typename?: 'CreateCompletedWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was created by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
};

/** All input for the create `CompletedWorkout` mutation. */
export type CreateCompletedWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` to be created by this mutation. */
  completedWorkout: CompletedWorkoutInput;
};

/** The output of our create `CompletedWorkout` mutation. */
export type CreateCompletedWorkoutPayload = {
  __typename?: 'CreateCompletedWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` that was created by this mutation. */
  completedWorkout?: Maybe<CompletedWorkout>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `CompletedWorkout`. */
  appUser: AppUser;
};

/** All input for the create `Exercise` mutation. */
export type CreateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` to be created by this mutation. */
  exercise: ExerciseInput;
};

/** The output of our create `Exercise` mutation. */
export type CreateExercisePayload = {
  __typename?: 'CreateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` that was created by this mutation. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `SessionAnalytic` mutation. */
export type CreateSessionAnalyticInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` to be created by this mutation. */
  sessionAnalytic: SessionAnalyticInput;
};

/** The output of our create `SessionAnalytic` mutation. */
export type CreateSessionAnalyticPayload = {
  __typename?: 'CreateSessionAnalyticPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` that was created by this mutation. */
  sessionAnalytic?: Maybe<SessionAnalytic>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `SessionAnalytic`. */
  appUser: AppUser;
};

/** All input for the create `SetsAndExerciseId` mutation. */
export type CreateSetsAndExerciseIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SetsAndExerciseId` to be created by this mutation. */
  setsAndExerciseId: SetsAndExerciseIdInput;
};

/** The output of our create `SetsAndExerciseId` mutation. */
export type CreateSetsAndExerciseIdPayload = {
  __typename?: 'CreateSetsAndExerciseIdPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SetsAndExerciseId` that was created by this mutation. */
  setsAndExerciseId?: Maybe<SetsAndExerciseId>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `UserExercise` mutation. */
export type CreateUserExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` to be created by this mutation. */
  userExercise: UserExerciseInput;
};

/** The output of our create `UserExercise` mutation. */
export type CreateUserExercisePayload = {
  __typename?: 'CreateUserExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` that was created by this mutation. */
  userExercise?: Maybe<UserExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `UserExercise`. */
  appUser: AppUser;
};

/** All input for the `createUser` mutation. */
export type CreateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
  password: Scalars['String'];
};

/** The output of our `createUser` mutation. */
export type CreateUserPayload = {
  __typename?: 'CreateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  appUser?: Maybe<AppUser>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `WorkoutPlanDay` mutation. */
export type CreateWorkoutPlanDayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` to be created by this mutation. */
  workoutPlanDay: WorkoutPlanDayInput;
};

/** The output of our create `WorkoutPlanDay` mutation. */
export type CreateWorkoutPlanDayPayload = {
  __typename?: 'CreateWorkoutPlanDayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` that was created by this mutation. */
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
};

/** All input for the create `WorkoutPlanExercise` mutation. */
export type CreateWorkoutPlanExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` to be created by this mutation. */
  workoutPlanExercise: WorkoutPlanExerciseInput;
};

/** The output of our create `WorkoutPlanExercise` mutation. */
export type CreateWorkoutPlanExercisePayload = {
  __typename?: 'CreateWorkoutPlanExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` that was created by this mutation. */
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise: Exercise;
  /** Reads a single `WorkoutPlanDay` that is related to this `WorkoutPlanExercise`. */
  workoutPlanDay: WorkoutPlanDay;
};

/** All input for the create `WorkoutPlan` mutation. */
export type CreateWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` to be created by this mutation. */
  workoutPlan: WorkoutPlanInput;
};

/** The output of our create `WorkoutPlan` mutation. */
export type CreateWorkoutPlanPayload = {
  __typename?: 'CreateWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` that was created by this mutation. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `WorkoutPlan`. */
  appUser: AppUser;
};


/** All input for the `deleteAppUserByUsername` mutation. */
export type DeleteAppUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

/** All input for the `deleteAppUser` mutation. */
export type DeleteAppUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `AppUser` mutation. */
export type DeleteAppUserPayload = {
  __typename?: 'DeleteAppUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AppUser` that was deleted by this mutation. */
  appUser?: Maybe<AppUser>;
  deletedAppUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteCompletedSet` mutation. */
export type DeleteCompletedSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `CompletedSet` mutation. */
export type DeleteCompletedSetPayload = {
  __typename?: 'DeleteCompletedSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedSet` that was deleted by this mutation. */
  completedSet?: Maybe<CompletedSet>;
  deletedCompletedSetNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CompletedWorkoutExercise` that is related to this `CompletedSet`. */
  completedWorkoutExercise: CompletedWorkoutExercise;
};

/** All input for the `deleteCompletedWorkoutExercise` mutation. */
export type DeleteCompletedWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `CompletedWorkoutExercise` mutation. */
export type DeleteCompletedWorkoutExercisePayload = {
  __typename?: 'DeleteCompletedWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was deleted by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  deletedCompletedWorkoutExerciseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
};

/** All input for the `deleteCompletedWorkout` mutation. */
export type DeleteCompletedWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `CompletedWorkout` mutation. */
export type DeleteCompletedWorkoutPayload = {
  __typename?: 'DeleteCompletedWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` that was deleted by this mutation. */
  completedWorkout?: Maybe<CompletedWorkout>;
  deletedCompletedWorkoutNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `CompletedWorkout`. */
  appUser: AppUser;
};

/** All input for the `deleteExercise` mutation. */
export type DeleteExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `Exercise` mutation. */
export type DeleteExercisePayload = {
  __typename?: 'DeleteExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` that was deleted by this mutation. */
  exercise?: Maybe<Exercise>;
  deletedExerciseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `deleteSessionAnalytic` mutation. */
export type DeleteSessionAnalyticInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `SessionAnalytic` mutation. */
export type DeleteSessionAnalyticPayload = {
  __typename?: 'DeleteSessionAnalyticPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` that was deleted by this mutation. */
  sessionAnalytic?: Maybe<SessionAnalytic>;
  deletedSessionAnalyticNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `SessionAnalytic`. */
  appUser: AppUser;
};

/** All input for the `deleteUserExercise` mutation. */
export type DeleteUserExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  username: Scalars['String'];
};

/** The output of our delete `UserExercise` mutation. */
export type DeleteUserExercisePayload = {
  __typename?: 'DeleteUserExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` that was deleted by this mutation. */
  userExercise?: Maybe<UserExercise>;
  deletedUserExerciseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `UserExercise`. */
  appUser: AppUser;
};

/** All input for the `deleteWorkoutPlanDay` mutation. */
export type DeleteWorkoutPlanDayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `WorkoutPlanDay` mutation. */
export type DeleteWorkoutPlanDayPayload = {
  __typename?: 'DeleteWorkoutPlanDayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` that was deleted by this mutation. */
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  deletedWorkoutPlanDayNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
};

/** All input for the `deleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId` mutation. */
export type DeleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  ordering: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
};

/** All input for the `deleteWorkoutPlanExercise` mutation. */
export type DeleteWorkoutPlanExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `WorkoutPlanExercise` mutation. */
export type DeleteWorkoutPlanExercisePayload = {
  __typename?: 'DeleteWorkoutPlanExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` that was deleted by this mutation. */
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  deletedWorkoutPlanExerciseNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise: Exercise;
  /** Reads a single `WorkoutPlanDay` that is related to this `WorkoutPlanExercise`. */
  workoutPlanDay: WorkoutPlanDay;
};

/** All input for the `deleteWorkoutPlan` mutation. */
export type DeleteWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `WorkoutPlan` mutation. */
export type DeleteWorkoutPlanPayload = {
  __typename?: 'DeleteWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` that was deleted by this mutation. */
  workoutPlan?: Maybe<WorkoutPlan>;
  deletedWorkoutPlanNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `WorkoutPlan`. */
  appUser: AppUser;
};

export type Exercise = {
  __typename?: 'Exercise';
  id: Scalars['Int'];
  bodyPart: BodyPartEnum;
  exerciseType: ExerciseTypeEnum;
  name: Scalars['String'];
  count: Scalars['Int'];
  eliteStrengthBaseline: Scalars['Int'];
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises: Array<WorkoutPlanExercise>;
  /** Reads and enables pagination through a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises: Array<CompletedWorkoutExercise>;
};


export type ExerciseWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
  condition?: Maybe<WorkoutPlanExerciseCondition>;
  filter?: Maybe<WorkoutPlanExerciseFilter>;
};


export type ExerciseCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
  condition?: Maybe<CompletedWorkoutExerciseCondition>;
  filter?: Maybe<CompletedWorkoutExerciseFilter>;
};

export type ExerciseAlias = {
  __typename?: 'ExerciseAlias';
  id: Scalars['Int'];
  name: Scalars['String'];
};

/**
 * A condition to be used against `ExerciseAlias` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type ExerciseAliasCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `ExerciseAlias` object types. All fields are combined with a logical ‘and.’ */
export type ExerciseAliasFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ExerciseAliasFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ExerciseAliasFilter>>;
  /** Negates the expression. */
  not?: Maybe<ExerciseAliasFilter>;
};

/** Methods to use when ordering `ExerciseAlias`. */
export enum ExerciseAliasesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC'
}

/**
 * A condition to be used against `Exercise` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ExerciseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Exercise` object types. All fields are combined with a logical ‘and.’ */
export type ExerciseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ExerciseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ExerciseFilter>>;
  /** Negates the expression. */
  not?: Maybe<ExerciseFilter>;
};

/** An input for mutations affecting `Exercise` */
export type ExerciseInput = {
  id?: Maybe<Scalars['Int']>;
  bodyPart: BodyPartEnum;
  exerciseType: ExerciseTypeEnum;
  name: Scalars['String'];
  count: Scalars['Int'];
  eliteStrengthBaseline: Scalars['Int'];
};

/** Represents an update to a `Exercise`. Fields that are set will be updated. */
export type ExercisePatch = {
  id?: Maybe<Scalars['Int']>;
  bodyPart?: Maybe<BodyPartEnum>;
  exerciseType?: Maybe<ExerciseTypeEnum>;
  name?: Maybe<Scalars['String']>;
  count?: Maybe<Scalars['Int']>;
  eliteStrengthBaseline?: Maybe<Scalars['Int']>;
};

export enum ExerciseTypeEnum {
  Barbell = 'BARBELL',
  Bodyweight = 'BODYWEIGHT',
  Olympic = 'OLYMPIC',
  Dumbbell = 'DUMBBELL',
  Machine = 'MACHINE',
  Cable = 'CABLE'
}

/** Methods to use when ordering `Exercise`. */
export enum ExercisesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  NameAsc = 'NAME_ASC',
  NameDesc = 'NAME_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against Int fields. All fields are combined with a logical ‘and.’ */
export type IntFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['Int']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['Int']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['Int']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['Int']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['Int']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['Int']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['Int']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['Int']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['Int']>;
};


export type ListenPayload = {
  __typename?: 'ListenPayload';
  /** Our root query field type. Allows us to run any query from our subscription payload. */
  query?: Maybe<Query>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `CompletedSet`. */
  createCompletedSet?: Maybe<CreateCompletedSetPayload>;
  /** Creates a single `CompletedWorkout`. */
  createCompletedWorkout?: Maybe<CreateCompletedWorkoutPayload>;
  /** Creates a single `CompletedWorkoutExercise`. */
  createCompletedWorkoutExercise?: Maybe<CreateCompletedWorkoutExercisePayload>;
  /** Creates a single `Exercise`. */
  createExercise?: Maybe<CreateExercisePayload>;
  /** Creates a single `SessionAnalytic`. */
  createSessionAnalytic?: Maybe<CreateSessionAnalyticPayload>;
  /** Creates a single `SetsAndExerciseId`. */
  createSetsAndExerciseId?: Maybe<CreateSetsAndExerciseIdPayload>;
  /** Creates a single `UserExercise`. */
  createUserExercise?: Maybe<CreateUserExercisePayload>;
  /** Creates a single `WorkoutPlan`. */
  createWorkoutPlan?: Maybe<CreateWorkoutPlanPayload>;
  /** Creates a single `WorkoutPlanDay`. */
  createWorkoutPlanDay?: Maybe<CreateWorkoutPlanDayPayload>;
  /** Creates a single `WorkoutPlanExercise`. */
  createWorkoutPlanExercise?: Maybe<CreateWorkoutPlanExercisePayload>;
  /** Updates a single `AppUser` using a unique key and a patch. */
  updateAppUserByUsername?: Maybe<UpdateAppUserPayload>;
  /** Updates a single `AppUser` using a unique key and a patch. */
  updateAppUser?: Maybe<UpdateAppUserPayload>;
  /** Updates a single `CompletedSet` using a unique key and a patch. */
  updateCompletedSet?: Maybe<UpdateCompletedSetPayload>;
  /** Updates a single `CompletedWorkout` using a unique key and a patch. */
  updateCompletedWorkout?: Maybe<UpdateCompletedWorkoutPayload>;
  /** Updates a single `CompletedWorkoutExercise` using a unique key and a patch. */
  updateCompletedWorkoutExercise?: Maybe<UpdateCompletedWorkoutExercisePayload>;
  /** Updates a single `Exercise` using a unique key and a patch. */
  updateExercise?: Maybe<UpdateExercisePayload>;
  /** Updates a single `UserExercise` using a unique key and a patch. */
  updateUserExercise?: Maybe<UpdateUserExercisePayload>;
  /** Updates a single `WorkoutPlan` using a unique key and a patch. */
  updateWorkoutPlan?: Maybe<UpdateWorkoutPlanPayload>;
  /** Updates a single `WorkoutPlanDay` using a unique key and a patch. */
  updateWorkoutPlanDay?: Maybe<UpdateWorkoutPlanDayPayload>;
  /** Updates a single `WorkoutPlanExercise` using a unique key and a patch. */
  updateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<UpdateWorkoutPlanExercisePayload>;
  /** Updates a single `WorkoutPlanExercise` using a unique key and a patch. */
  updateWorkoutPlanExercise?: Maybe<UpdateWorkoutPlanExercisePayload>;
  /** Deletes a single `AppUser` using a unique key. */
  deleteAppUserByUsername?: Maybe<DeleteAppUserPayload>;
  /** Deletes a single `AppUser` using a unique key. */
  deleteAppUser?: Maybe<DeleteAppUserPayload>;
  /** Deletes a single `CompletedSet` using a unique key. */
  deleteCompletedSet?: Maybe<DeleteCompletedSetPayload>;
  /** Deletes a single `CompletedWorkout` using a unique key. */
  deleteCompletedWorkout?: Maybe<DeleteCompletedWorkoutPayload>;
  /** Deletes a single `CompletedWorkoutExercise` using a unique key. */
  deleteCompletedWorkoutExercise?: Maybe<DeleteCompletedWorkoutExercisePayload>;
  /** Deletes a single `Exercise` using a unique key. */
  deleteExercise?: Maybe<DeleteExercisePayload>;
  /** Deletes a single `SessionAnalytic` using a unique key. */
  deleteSessionAnalytic?: Maybe<DeleteSessionAnalyticPayload>;
  /** Deletes a single `UserExercise` using a unique key. */
  deleteUserExercise?: Maybe<DeleteUserExercisePayload>;
  /** Deletes a single `WorkoutPlan` using a unique key. */
  deleteWorkoutPlan?: Maybe<DeleteWorkoutPlanPayload>;
  /** Deletes a single `WorkoutPlanDay` using a unique key. */
  deleteWorkoutPlanDay?: Maybe<DeleteWorkoutPlanDayPayload>;
  /** Deletes a single `WorkoutPlanExercise` using a unique key. */
  deleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<DeleteWorkoutPlanExercisePayload>;
  /** Deletes a single `WorkoutPlanExercise` using a unique key. */
  deleteWorkoutPlanExercise?: Maybe<DeleteWorkoutPlanExercisePayload>;
  createUser?: Maybe<CreateUserPayload>;
  saveWorkout?: Maybe<SaveWorkoutPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCompletedSetArgs = {
  input: CreateCompletedSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCompletedWorkoutArgs = {
  input: CreateCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateCompletedWorkoutExerciseArgs = {
  input: CreateCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateExerciseArgs = {
  input: CreateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSessionAnalyticArgs = {
  input: CreateSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSetsAndExerciseIdArgs = {
  input: CreateSetsAndExerciseIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserExerciseArgs = {
  input: CreateUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutPlanArgs = {
  input: CreateWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutPlanDayArgs = {
  input: CreateWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateWorkoutPlanExerciseArgs = {
  input: CreateWorkoutPlanExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppUserByUsernameArgs = {
  input: UpdateAppUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateAppUserArgs = {
  input: UpdateAppUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedSetArgs = {
  input: UpdateCompletedSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutArgs = {
  input: UpdateCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutExerciseArgs = {
  input: UpdateCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateExerciseArgs = {
  input: UpdateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserExerciseArgs = {
  input: UpdateUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanArgs = {
  input: UpdateWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanDayArgs = {
  input: UpdateWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdArgs = {
  input: UpdateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanExerciseArgs = {
  input: UpdateWorkoutPlanExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppUserByUsernameArgs = {
  input: DeleteAppUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteAppUserArgs = {
  input: DeleteAppUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedSetArgs = {
  input: DeleteCompletedSetInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutArgs = {
  input: DeleteCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutExerciseArgs = {
  input: DeleteCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteExerciseArgs = {
  input: DeleteExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionAnalyticArgs = {
  input: DeleteSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserExerciseArgs = {
  input: DeleteUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanArgs = {
  input: DeleteWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanDayArgs = {
  input: DeleteWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdArgs = {
  input: DeleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanExerciseArgs = {
  input: DeleteWorkoutPlanExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationSaveWorkoutArgs = {
  input: SaveWorkoutInput;
};

/** The root query type which gives access points into the data universe. */
export type Query = {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** Reads a set of `AppUser`. */
  appUsers?: Maybe<Array<AppUser>>;
  /** Reads a set of `CompletedSet`. */
  completedSets?: Maybe<Array<CompletedSet>>;
  /** Reads a set of `CompletedWorkout`. */
  completedWorkouts?: Maybe<Array<CompletedWorkout>>;
  /** Reads a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises?: Maybe<Array<CompletedWorkoutExercise>>;
  /** Reads a set of `Exercise`. */
  exercises?: Maybe<Array<Exercise>>;
  /** Reads a set of `ExerciseAlias`. */
  exerciseAliases?: Maybe<Array<ExerciseAlias>>;
  /** Reads a set of `SessionAnalytic`. */
  sessionAnalytics?: Maybe<Array<SessionAnalytic>>;
  /** Reads a set of `SetsAndExerciseId`. */
  setsAndExerciseIds?: Maybe<Array<SetsAndExerciseId>>;
  /** Reads a set of `UserExercise`. */
  userExercises?: Maybe<Array<UserExercise>>;
  /** Reads a set of `WorkoutPlan`. */
  workoutPlans?: Maybe<Array<WorkoutPlan>>;
  /** Reads a set of `WorkoutPlanDay`. */
  workoutPlanDays?: Maybe<Array<WorkoutPlanDay>>;
  /** Reads a set of `WorkoutPlanExercise`. */
  workoutPlanExercises?: Maybe<Array<WorkoutPlanExercise>>;
  appUserByUsername?: Maybe<AppUser>;
  appUser?: Maybe<AppUser>;
  completedSet?: Maybe<CompletedSet>;
  completedWorkout?: Maybe<CompletedWorkout>;
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  exercise?: Maybe<Exercise>;
  sessionAnalytic?: Maybe<SessionAnalytic>;
  userExercise?: Maybe<UserExercise>;
  workoutPlan?: Maybe<WorkoutPlan>;
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  workoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<WorkoutPlanExercise>;
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  activeUser?: Maybe<AppUser>;
  authenticate?: Maybe<UserIdAndJwt>;
  currentUserId?: Maybe<Scalars['Int']>;
  calculateStrength?: Maybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<AppUsersOrderBy>>;
  condition?: Maybe<AppUserCondition>;
  filter?: Maybe<AppUserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedSetsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedSetsOrderBy>>;
  condition?: Maybe<CompletedSetCondition>;
  filter?: Maybe<CompletedSetFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
  condition?: Maybe<CompletedWorkoutCondition>;
  filter?: Maybe<CompletedWorkoutFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
  condition?: Maybe<CompletedWorkoutExerciseCondition>;
  filter?: Maybe<CompletedWorkoutExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
  condition?: Maybe<ExerciseCondition>;
  filter?: Maybe<ExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseAliasesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<ExerciseAliasesOrderBy>>;
  condition?: Maybe<ExerciseAliasCondition>;
  filter?: Maybe<ExerciseAliasFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionAnalyticsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
  condition?: Maybe<SessionAnalyticCondition>;
  filter?: Maybe<SessionAnalyticFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySetsAndExerciseIdsArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<SetsAndExerciseIdsOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
  condition?: Maybe<UserExerciseCondition>;
  filter?: Maybe<UserExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
  condition?: Maybe<WorkoutPlanCondition>;
  filter?: Maybe<WorkoutPlanFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDaysArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
  condition?: Maybe<WorkoutPlanDayCondition>;
  filter?: Maybe<WorkoutPlanDayFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
  condition?: Maybe<WorkoutPlanExerciseCondition>;
  filter?: Maybe<WorkoutPlanExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryAppUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAppUserArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedSetArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutExerciseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionAnalyticArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserExerciseArgs = {
  id: Scalars['Int'];
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDayArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdArgs = {
  ordering: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanExerciseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryAuthenticateArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculateStrengthArgs = {
  exercise: Scalars['String'];
  liftmass: Scalars['Float'];
  repetitions: Scalars['Int'];
};

/** All input for the `saveWorkout` mutation. */
export type SaveWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  exerciseIdsAndSets?: Maybe<Array<Maybe<SetsAndExerciseIdInput>>>;
};

/** The output of our `saveWorkout` mutation. */
export type SaveWorkoutPayload = {
  __typename?: 'SaveWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  completedWorkout?: Maybe<CompletedWorkout>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `CompletedWorkout`. */
  appUser: AppUser;
};

export type SectionAndTimeSpent = {
  __typename?: 'SectionAndTimeSpent';
  section?: Maybe<Scalars['String']>;
  timeSpent?: Maybe<Scalars['Float']>;
};

/** An input for mutations affecting `SectionAndTimeSpent` */
export type SectionAndTimeSpentInput = {
  section?: Maybe<Scalars['String']>;
  timeSpent?: Maybe<Scalars['Float']>;
};

export type SessionAnalytic = {
  __typename?: 'SessionAnalytic';
  id: Scalars['Int'];
  username: Scalars['String'];
  analytics: Array<Maybe<SectionAndTimeSpent>>;
  createdAt: Scalars['Datetime'];
  appUserId: Scalars['Int'];
  /** Reads a single `AppUser` that is related to this `SessionAnalytic`. */
  appUser: AppUser;
};

/**
 * A condition to be used against `SessionAnalytic` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type SessionAnalyticCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `appUserId` field. */
  appUserId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `SessionAnalytic` object types. All fields are combined with a logical ‘and.’ */
export type SessionAnalyticFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `appUserId` field. */
  appUserId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<SessionAnalyticFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<SessionAnalyticFilter>>;
  /** Negates the expression. */
  not?: Maybe<SessionAnalyticFilter>;
};

/** An input for mutations affecting `SessionAnalytic` */
export type SessionAnalyticInput = {
  username: Scalars['String'];
  analytics: Array<Maybe<SectionAndTimeSpentInput>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  appUserId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `SessionAnalytic`. */
export enum SessionAnalyticsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  AppUserIdAsc = 'APP_USER_ID_ASC',
  AppUserIdDesc = 'APP_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type SetsAndExerciseId = {
  __typename?: 'SetsAndExerciseId';
  exerciseId: Scalars['Int'];
  completedSets: Array<Maybe<CompletedSet>>;
};

/** An input for mutations affecting `SetsAndExerciseId` */
export type SetsAndExerciseIdInput = {
  exerciseId: Scalars['Int'];
  completedSets: Array<Maybe<CompletedSetInput>>;
};

/** Methods to use when ordering `SetsAndExerciseId`. */
export enum SetsAndExerciseIdsOrderBy {
  Natural = 'NATURAL'
}

/** A filter to be used against String fields. All fields are combined with a logical ‘and.’ */
export type StringFilter = {
  /** Is null (if `true` is specified) or is not null (if `false` is specified). */
  isNull?: Maybe<Scalars['Boolean']>;
  /** Equal to the specified value. */
  equalTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value. */
  notEqualTo?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value. */
  distinctFrom?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value. */
  notDistinctFrom?: Maybe<Scalars['String']>;
  /** Included in the specified list. */
  in?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list. */
  notIn?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value. */
  lessThan?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value. */
  lessThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Greater than the specified value. */
  greaterThan?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value. */
  greaterThanOrEqualTo?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-sensitive). */
  includes?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-sensitive). */
  notIncludes?: Maybe<Scalars['String']>;
  /** Contains the specified string (case-insensitive). */
  includesInsensitive?: Maybe<Scalars['String']>;
  /** Does not contain the specified string (case-insensitive). */
  notIncludesInsensitive?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-sensitive). */
  startsWith?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-sensitive). */
  notStartsWith?: Maybe<Scalars['String']>;
  /** Starts with the specified string (case-insensitive). */
  startsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not start with the specified string (case-insensitive). */
  notStartsWithInsensitive?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-sensitive). */
  endsWith?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-sensitive). */
  notEndsWith?: Maybe<Scalars['String']>;
  /** Ends with the specified string (case-insensitive). */
  endsWithInsensitive?: Maybe<Scalars['String']>;
  /** Does not end with the specified string (case-insensitive). */
  notEndsWithInsensitive?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  like?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-sensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLike?: Maybe<Scalars['String']>;
  /** Matches the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  likeInsensitive?: Maybe<Scalars['String']>;
  /** Does not match the specified pattern (case-insensitive). An underscore (_) matches any single character; a percent sign (%) matches any sequence of zero or more characters. */
  notLikeInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value (case-insensitive). */
  equalToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value (case-insensitive). */
  notEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Not equal to the specified value, treating null like an ordinary value (case-insensitive). */
  distinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Equal to the specified value, treating null like an ordinary value (case-insensitive). */
  notDistinctFromInsensitive?: Maybe<Scalars['String']>;
  /** Included in the specified list (case-insensitive). */
  inInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Not included in the specified list (case-insensitive). */
  notInInsensitive?: Maybe<Array<Scalars['String']>>;
  /** Less than the specified value (case-insensitive). */
  lessThanInsensitive?: Maybe<Scalars['String']>;
  /** Less than or equal to the specified value (case-insensitive). */
  lessThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
  /** Greater than the specified value (case-insensitive). */
  greaterThanInsensitive?: Maybe<Scalars['String']>;
  /** Greater than or equal to the specified value (case-insensitive). */
  greaterThanOrEqualToInsensitive?: Maybe<Scalars['String']>;
};

/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type Subscription = {
  __typename?: 'Subscription';
  listen: ListenPayload;
};


/** The root subscription type: contains realtime events you can subscribe to with the `subscription` operation. */
export type SubscriptionListenArgs = {
  topic: Scalars['String'];
};

/** All input for the `updateAppUserByUsername` mutation. */
export type UpdateAppUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AppUser` being updated. */
  patch: AppUserPatch;
  username: Scalars['String'];
};

/** All input for the `updateAppUser` mutation. */
export type UpdateAppUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `AppUser` being updated. */
  patch: AppUserPatch;
  id: Scalars['Int'];
};

/** The output of our update `AppUser` mutation. */
export type UpdateAppUserPayload = {
  __typename?: 'UpdateAppUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `AppUser` that was updated by this mutation. */
  appUser?: Maybe<AppUser>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateCompletedSet` mutation. */
export type UpdateCompletedSetInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CompletedSet` being updated. */
  patch: CompletedSetPatch;
  id: Scalars['Int'];
};

/** The output of our update `CompletedSet` mutation. */
export type UpdateCompletedSetPayload = {
  __typename?: 'UpdateCompletedSetPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedSet` that was updated by this mutation. */
  completedSet?: Maybe<CompletedSet>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `CompletedWorkoutExercise` that is related to this `CompletedSet`. */
  completedWorkoutExercise: CompletedWorkoutExercise;
};

/** All input for the `updateCompletedWorkoutExercise` mutation. */
export type UpdateCompletedWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CompletedWorkoutExercise` being updated. */
  patch: CompletedWorkoutExercisePatch;
  id: Scalars['Int'];
};

/** The output of our update `CompletedWorkoutExercise` mutation. */
export type UpdateCompletedWorkoutExercisePayload = {
  __typename?: 'UpdateCompletedWorkoutExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was updated by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
};

/** All input for the `updateCompletedWorkout` mutation. */
export type UpdateCompletedWorkoutInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `CompletedWorkout` being updated. */
  patch: CompletedWorkoutPatch;
  id: Scalars['Int'];
};

/** The output of our update `CompletedWorkout` mutation. */
export type UpdateCompletedWorkoutPayload = {
  __typename?: 'UpdateCompletedWorkoutPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` that was updated by this mutation. */
  completedWorkout?: Maybe<CompletedWorkout>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `CompletedWorkout`. */
  appUser: AppUser;
};

/** All input for the `updateExercise` mutation. */
export type UpdateExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Exercise` being updated. */
  patch: ExercisePatch;
  id: Scalars['Int'];
};

/** The output of our update `Exercise` mutation. */
export type UpdateExercisePayload = {
  __typename?: 'UpdateExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` that was updated by this mutation. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `updateUserExercise` mutation. */
export type UpdateUserExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserExercise` being updated. */
  patch: UserExercisePatch;
  id: Scalars['Int'];
  username: Scalars['String'];
};

/** The output of our update `UserExercise` mutation. */
export type UpdateUserExercisePayload = {
  __typename?: 'UpdateUserExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` that was updated by this mutation. */
  userExercise?: Maybe<UserExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `UserExercise`. */
  appUser: AppUser;
};

/** All input for the `updateWorkoutPlanDay` mutation. */
export type UpdateWorkoutPlanDayInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlanDay` being updated. */
  patch: WorkoutPlanDayPatch;
  id: Scalars['Int'];
};

/** The output of our update `WorkoutPlanDay` mutation. */
export type UpdateWorkoutPlanDayPayload = {
  __typename?: 'UpdateWorkoutPlanDayPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` that was updated by this mutation. */
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
};

/** All input for the `updateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId` mutation. */
export type UpdateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlanExercise` being updated. */
  patch: WorkoutPlanExercisePatch;
  ordering: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
};

/** All input for the `updateWorkoutPlanExercise` mutation. */
export type UpdateWorkoutPlanExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlanExercise` being updated. */
  patch: WorkoutPlanExercisePatch;
  id: Scalars['Int'];
};

/** The output of our update `WorkoutPlanExercise` mutation. */
export type UpdateWorkoutPlanExercisePayload = {
  __typename?: 'UpdateWorkoutPlanExercisePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` that was updated by this mutation. */
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise: Exercise;
  /** Reads a single `WorkoutPlanDay` that is related to this `WorkoutPlanExercise`. */
  workoutPlanDay: WorkoutPlanDay;
};

/** All input for the `updateWorkoutPlan` mutation. */
export type UpdateWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlan` being updated. */
  patch: WorkoutPlanPatch;
  id: Scalars['Int'];
};

/** The output of our update `WorkoutPlan` mutation. */
export type UpdateWorkoutPlanPayload = {
  __typename?: 'UpdateWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` that was updated by this mutation. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `AppUser` that is related to this `WorkoutPlan`. */
  appUser: AppUser;
};

export type UserExercise = {
  __typename?: 'UserExercise';
  id: Scalars['Int'];
  username: Scalars['String'];
  repetitions: Scalars['Int'];
  liftmass: Scalars['Float'];
  strongerpercentage: Scalars['Int'];
  groupname?: Maybe<Scalars['String']>;
  battleNumber?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  appUserId: Scalars['Int'];
  /** Reads a single `AppUser` that is related to this `UserExercise`. */
  appUser: AppUser;
};

/**
 * A condition to be used against `UserExercise` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type UserExerciseCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `groupname` field. */
  groupname?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `appUserId` field. */
  appUserId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `UserExercise` object types. All fields are combined with a logical ‘and.’ */
export type UserExerciseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `groupname` field. */
  groupname?: Maybe<StringFilter>;
  /** Filter by the object’s `appUserId` field. */
  appUserId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserExerciseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserExerciseFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserExerciseFilter>;
};

/** An input for mutations affecting `UserExercise` */
export type UserExerciseInput = {
  id: Scalars['Int'];
  username: Scalars['String'];
  repetitions: Scalars['Int'];
  liftmass: Scalars['Float'];
  strongerpercentage: Scalars['Int'];
  appUserId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `UserExercise`. Fields that are set will be updated. */
export type UserExercisePatch = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  repetitions?: Maybe<Scalars['Int']>;
  liftmass?: Maybe<Scalars['Float']>;
  strongerpercentage?: Maybe<Scalars['Int']>;
  groupname?: Maybe<Scalars['String']>;
  battleNumber?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  appUserId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `UserExercise`. */
export enum UserExercisesOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  GroupnameAsc = 'GROUPNAME_ASC',
  GroupnameDesc = 'GROUPNAME_DESC',
  AppUserIdAsc = 'APP_USER_ID_ASC',
  AppUserIdDesc = 'APP_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type UserIdAndJwt = {
  __typename?: 'UserIdAndJwt';
  appUserId?: Maybe<Scalars['Int']>;
  token?: Maybe<Scalars['JwtToken']>;
};

export type WorkoutPlan = {
  __typename?: 'WorkoutPlan';
  id: Scalars['Int'];
  name: Scalars['String'];
  appUserId: Scalars['Int'];
  updatedAt: Scalars['Datetime'];
  createdAt: Scalars['Datetime'];
  /** Reads a single `AppUser` that is related to this `WorkoutPlan`. */
  appUser: AppUser;
  /** Reads and enables pagination through a set of `WorkoutPlanDay`. */
  workoutPlanDays: Array<WorkoutPlanDay>;
};


export type WorkoutPlanWorkoutPlanDaysArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
  condition?: Maybe<WorkoutPlanDayCondition>;
  filter?: Maybe<WorkoutPlanDayFilter>;
};

/**
 * A condition to be used against `WorkoutPlan` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type WorkoutPlanCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `appUserId` field. */
  appUserId?: Maybe<Scalars['Int']>;
};

export type WorkoutPlanDay = {
  __typename?: 'WorkoutPlanDay';
  id: Scalars['Int'];
  name: Scalars['String'];
  workoutPlanId: Scalars['Int'];
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises: Array<WorkoutPlanExercise>;
};


export type WorkoutPlanDayWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
  condition?: Maybe<WorkoutPlanExerciseCondition>;
  filter?: Maybe<WorkoutPlanExerciseFilter>;
};

/**
 * A condition to be used against `WorkoutPlanDay` object types. All fields are
 * tested for equality and combined with a logical ‘and.’
 */
export type WorkoutPlanDayCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `workoutPlanId` field. */
  workoutPlanId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `WorkoutPlanDay` object types. All fields are combined with a logical ‘and.’ */
export type WorkoutPlanDayFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `workoutPlanId` field. */
  workoutPlanId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<WorkoutPlanDayFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<WorkoutPlanDayFilter>>;
  /** Negates the expression. */
  not?: Maybe<WorkoutPlanDayFilter>;
};

/** An input for mutations affecting `WorkoutPlanDay` */
export type WorkoutPlanDayInput = {
  id?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  workoutPlanId: Scalars['Int'];
};

/** Represents an update to a `WorkoutPlanDay`. Fields that are set will be updated. */
export type WorkoutPlanDayPatch = {
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  workoutPlanId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `WorkoutPlanDay`. */
export enum WorkoutPlanDaysOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  WorkoutPlanIdAsc = 'WORKOUT_PLAN_ID_ASC',
  WorkoutPlanIdDesc = 'WORKOUT_PLAN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type WorkoutPlanExercise = {
  __typename?: 'WorkoutPlanExercise';
  exerciseId: Scalars['Int'];
  sets: Scalars['Int'];
  reps: Scalars['Int'];
  ordering: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
  id: Scalars['Int'];
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise: Exercise;
  /** Reads a single `WorkoutPlanDay` that is related to this `WorkoutPlanExercise`. */
  workoutPlanDay: WorkoutPlanDay;
};

/**
 * A condition to be used against `WorkoutPlanExercise` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type WorkoutPlanExerciseCondition = {
  /** Checks for equality with the object’s `exerciseId` field. */
  exerciseId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `ordering` field. */
  ordering?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `workoutPlanDayId` field. */
  workoutPlanDayId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `WorkoutPlanExercise` object types. All fields are combined with a logical ‘and.’ */
export type WorkoutPlanExerciseFilter = {
  /** Filter by the object’s `exerciseId` field. */
  exerciseId?: Maybe<IntFilter>;
  /** Filter by the object’s `ordering` field. */
  ordering?: Maybe<IntFilter>;
  /** Filter by the object’s `workoutPlanDayId` field. */
  workoutPlanDayId?: Maybe<IntFilter>;
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<WorkoutPlanExerciseFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<WorkoutPlanExerciseFilter>>;
  /** Negates the expression. */
  not?: Maybe<WorkoutPlanExerciseFilter>;
};

/** An input for mutations affecting `WorkoutPlanExercise` */
export type WorkoutPlanExerciseInput = {
  exerciseId: Scalars['Int'];
  sets: Scalars['Int'];
  reps: Scalars['Int'];
  ordering: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
};

/** Represents an update to a `WorkoutPlanExercise`. Fields that are set will be updated. */
export type WorkoutPlanExercisePatch = {
  exerciseId?: Maybe<Scalars['Int']>;
  sets?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Int']>;
  ordering?: Maybe<Scalars['Int']>;
  workoutPlanDayId?: Maybe<Scalars['Int']>;
};

/** Methods to use when ordering `WorkoutPlanExercise`. */
export enum WorkoutPlanExercisesOrderBy {
  Natural = 'NATURAL',
  ExerciseIdAsc = 'EXERCISE_ID_ASC',
  ExerciseIdDesc = 'EXERCISE_ID_DESC',
  OrderingAsc = 'ORDERING_ASC',
  OrderingDesc = 'ORDERING_DESC',
  WorkoutPlanDayIdAsc = 'WORKOUT_PLAN_DAY_ID_ASC',
  WorkoutPlanDayIdDesc = 'WORKOUT_PLAN_DAY_ID_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against `WorkoutPlan` object types. All fields are combined with a logical ‘and.’ */
export type WorkoutPlanFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `appUserId` field. */
  appUserId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<WorkoutPlanFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<WorkoutPlanFilter>>;
  /** Negates the expression. */
  not?: Maybe<WorkoutPlanFilter>;
};

/** An input for mutations affecting `WorkoutPlan` */
export type WorkoutPlanInput = {
  name: Scalars['String'];
  appUserId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `WorkoutPlan`. Fields that are set will be updated. */
export type WorkoutPlanPatch = {
  name?: Maybe<Scalars['String']>;
  appUserId?: Maybe<Scalars['Int']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Methods to use when ordering `WorkoutPlan`. */
export enum WorkoutPlansOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  AppUserIdAsc = 'APP_USER_ID_ASC',
  AppUserIdDesc = 'APP_USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type AuthenticateQueryVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type AuthenticateQuery = (
  { __typename?: 'Query' }
  & { authenticate?: Maybe<(
    { __typename?: 'UserIdAndJwt' }
    & Pick<UserIdAndJwt, 'token'>
  )> }
);

export type CreateUserMutationVariables = Exact<{
  password: Scalars['String'];
  username: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser?: Maybe<(
    { __typename?: 'CreateUserPayload' }
    & { appUser?: Maybe<(
      { __typename?: 'AppUser' }
      & Pick<AppUser, 'id'>
    )> }
  )> }
);

export type CheckTokenQueryVariables = Exact<{ [key: string]: never; }>;


export type CheckTokenQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'AppUser' }
    & Pick<AppUser, 'id'>
  )> }
);

export type DeleteExerciseInPlanMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteExerciseInPlanMutation = (
  { __typename?: 'Mutation' }
  & { deleteWorkoutPlanExercise?: Maybe<(
    { __typename?: 'DeleteWorkoutPlanExercisePayload' }
    & Pick<DeleteWorkoutPlanExercisePayload, 'clientMutationId'>
  )> }
);

export type ExerciseFragment = (
  { __typename?: 'Exercise' }
  & Pick<Exercise, 'id' | 'bodyPart' | 'exerciseType' | 'name' | 'eliteStrengthBaseline'>
);

export type ExerciseSearchQueryVariables = Exact<{
  query: Scalars['String'];
}>;


export type ExerciseSearchQuery = (
  { __typename?: 'Query' }
  & { exercises?: Maybe<Array<(
    { __typename?: 'Exercise' }
    & ExerciseFragment
  )>> }
);

export type InsertExerciseInPlanMutationVariables = Exact<{
  sets: Scalars['Int'];
  reps: Scalars['Int'];
  ordering: Scalars['Int'];
  exerciseId: Scalars['Int'];
  workoutPlanDayId: Scalars['Int'];
}>;


export type InsertExerciseInPlanMutation = (
  { __typename?: 'Mutation' }
  & { createWorkoutPlanExercise?: Maybe<(
    { __typename?: 'CreateWorkoutPlanExercisePayload' }
    & { workoutPlanExercise?: Maybe<(
      { __typename?: 'WorkoutPlanExercise' }
      & WorkoutPlanExerciseFragment
    )> }
  )> }
);

export type CompletedSetFragment = (
  { __typename?: 'CompletedSet' }
  & Pick<CompletedSet, 'id' | 'weight' | 'reps'>
);

export type CompletedWorkoutExerciseFragment = (
  { __typename?: 'CompletedWorkoutExercise' }
  & Pick<CompletedWorkoutExercise, 'id'>
  & { exercise: (
    { __typename?: 'Exercise' }
    & ExerciseFragment
  ), completedSets: Array<(
    { __typename?: 'CompletedSet' }
    & CompletedSetFragment
  )> }
);

export type CompletedWorkoutFragment = (
  { __typename?: 'CompletedWorkout' }
  & Pick<CompletedWorkout, 'id'>
  & { completedWorkoutExercises: Array<(
    { __typename?: 'CompletedWorkoutExercise' }
    & CompletedWorkoutExerciseFragment
  )> }
);

export type SaveWorkoutMutationVariables = Exact<{
  exerciseIdsAndSets: Array<Maybe<SetsAndExerciseIdInput>> | Maybe<SetsAndExerciseIdInput>;
}>;


export type SaveWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { saveWorkout?: Maybe<(
    { __typename?: 'SaveWorkoutPayload' }
    & { completedWorkout?: Maybe<(
      { __typename?: 'CompletedWorkout' }
      & { completedWorkoutExercises: Array<(
        { __typename?: 'CompletedWorkoutExercise' }
        & CompletedWorkoutExerciseFragment
      )> }
      & CompletedWorkoutFragment
    )> }
  )> }
);

export type UpdateWorkoutPlanExerciseSetsMutationVariables = Exact<{
  id: Scalars['Int'];
  sets: Scalars['Int'];
  reps: Scalars['Int'];
}>;


export type UpdateWorkoutPlanExerciseSetsMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkoutPlanExercise?: Maybe<(
    { __typename?: 'UpdateWorkoutPlanExercisePayload' }
    & { workoutPlanExercise?: Maybe<(
      { __typename?: 'WorkoutPlanExercise' }
      & WorkoutPlanExerciseFragment
    )> }
  )> }
);

export type WorkoutPlanDayByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkoutPlanDayByIdQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'AppUser' }
    & Pick<AppUser, 'id' | 'isMale' | 'bodymass'>
  )>, workoutPlanDay?: Maybe<(
    { __typename?: 'WorkoutPlanDay' }
    & { workoutPlanExercises: Array<(
      { __typename?: 'WorkoutPlanExercise' }
      & WorkoutPlanExerciseFragment
    )> }
    & WorkoutPlanDayFragment
  )> }
);

export type WorkoutPlanExerciseFragment = (
  { __typename?: 'WorkoutPlanExercise' }
  & Pick<WorkoutPlanExercise, 'exerciseId' | 'sets' | 'reps' | 'ordering' | 'id'>
  & { exercise: (
    { __typename?: 'Exercise' }
    & Pick<Exercise, 'id' | 'name'>
  ) }
);

export type CreateWorkoutPlanDayMutationVariables = Exact<{
  name: Scalars['String'];
  workoutPlanId: Scalars['Int'];
}>;


export type CreateWorkoutPlanDayMutation = (
  { __typename?: 'Mutation' }
  & { createWorkoutPlanDay?: Maybe<(
    { __typename?: 'CreateWorkoutPlanDayPayload' }
    & { workoutPlanDay?: Maybe<(
      { __typename?: 'WorkoutPlanDay' }
      & WorkoutPlanDayFragment
    )> }
  )> }
);

export type DeleteDayMutationVariables = Exact<{
  dayId: Scalars['Int'];
}>;


export type DeleteDayMutation = (
  { __typename?: 'Mutation' }
  & { deleteWorkoutPlanDay?: Maybe<(
    { __typename?: 'DeleteWorkoutPlanDayPayload' }
    & { workoutPlanDay?: Maybe<(
      { __typename?: 'WorkoutPlanDay' }
      & WorkoutPlanDayFragment
    )> }
  )> }
);

export type RenameDayMutationVariables = Exact<{
  dayId: Scalars['Int'];
  name: Scalars['String'];
}>;


export type RenameDayMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkoutPlanDay?: Maybe<(
    { __typename?: 'UpdateWorkoutPlanDayPayload' }
    & { workoutPlanDay?: Maybe<(
      { __typename?: 'WorkoutPlanDay' }
      & WorkoutPlanDayFragment
    )> }
  )> }
);

export type WorkoutPlanDayFragment = (
  { __typename?: 'WorkoutPlanDay' }
  & Pick<WorkoutPlanDay, 'name' | 'id'>
);

export type WorkoutPlanByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkoutPlanByIdQuery = (
  { __typename?: 'Query' }
  & { workoutPlan?: Maybe<(
    { __typename?: 'WorkoutPlan' }
    & { workoutPlanDays: Array<(
      { __typename?: 'WorkoutPlanDay' }
      & WorkoutPlanDayFragment
    )> }
    & WorkoutPlanFragment
  )> }
);

export type CreateWorkoutPlanMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type CreateWorkoutPlanMutation = (
  { __typename?: 'Mutation' }
  & { createWorkoutPlan?: Maybe<(
    { __typename?: 'CreateWorkoutPlanPayload' }
    & { workoutPlan?: Maybe<(
      { __typename?: 'WorkoutPlan' }
      & WorkoutPlanFragment
    )> }
  )> }
);

export type DeleteWorkoutPlanMutationVariables = Exact<{
  workoutPlanId: Scalars['Int'];
}>;


export type DeleteWorkoutPlanMutation = (
  { __typename?: 'Mutation' }
  & { deleteWorkoutPlan?: Maybe<(
    { __typename?: 'DeleteWorkoutPlanPayload' }
    & { workoutPlan?: Maybe<(
      { __typename?: 'WorkoutPlan' }
      & Pick<WorkoutPlan, 'id'>
    )> }
  )> }
);

export type RenameWorkoutPlanMutationVariables = Exact<{
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
}>;


export type RenameWorkoutPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkoutPlan?: Maybe<(
    { __typename?: 'UpdateWorkoutPlanPayload' }
    & { workoutPlan?: Maybe<(
      { __typename?: 'WorkoutPlan' }
      & WorkoutPlanFragment
    )> }
  )> }
);

export type UpdateUserCurrentWorkoutPlanMutationVariables = Exact<{
  userId: Scalars['Int'];
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
}>;


export type UpdateUserCurrentWorkoutPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateAppUser?: Maybe<(
    { __typename?: 'UpdateAppUserPayload' }
    & { appUser?: Maybe<(
      { __typename?: 'AppUser' }
      & Pick<AppUser, 'id' | 'currentWorkoutPlanId'>
    )> }
  )> }
);

export type WorkoutPlanFragment = (
  { __typename?: 'WorkoutPlan' }
  & Pick<WorkoutPlan, 'name' | 'id'>
);

export type WorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'AppUser' }
    & Pick<AppUser, 'id' | 'currentWorkoutPlanId'>
    & { workoutPlans: Array<(
      { __typename?: 'WorkoutPlan' }
      & WorkoutPlanFragment
    )> }
  )> }
);

export const ExerciseFragmentDoc = gql`
    fragment Exercise on Exercise {
  id
  bodyPart
  exerciseType
  name
  eliteStrengthBaseline
}
    `;
export const CompletedSetFragmentDoc = gql`
    fragment CompletedSet on CompletedSet {
  id
  weight
  reps
}
    `;
export const CompletedWorkoutExerciseFragmentDoc = gql`
    fragment CompletedWorkoutExercise on CompletedWorkoutExercise {
  id
  exercise {
    ...Exercise
  }
  completedSets {
    ...CompletedSet
  }
}
    ${ExerciseFragmentDoc}
${CompletedSetFragmentDoc}`;
export const CompletedWorkoutFragmentDoc = gql`
    fragment CompletedWorkout on CompletedWorkout {
  id
  completedWorkoutExercises {
    ...CompletedWorkoutExercise
  }
}
    ${CompletedWorkoutExerciseFragmentDoc}`;
export const WorkoutPlanExerciseFragmentDoc = gql`
    fragment WorkoutPlanExercise on WorkoutPlanExercise {
  exerciseId
  sets
  reps
  ordering
  id
  exercise {
    id
    name
  }
}
    `;
export const WorkoutPlanDayFragmentDoc = gql`
    fragment WorkoutPlanDay on WorkoutPlanDay {
  name
  id
}
    `;
export const WorkoutPlanFragmentDoc = gql`
    fragment WorkoutPlan on WorkoutPlan {
  name
  id
}
    `;
export const AuthenticateDocument = gql`
    query authenticate($password: String!, $username: String!) {
  authenticate(password: $password, username: $username) {
    token
  }
}
    `;

/**
 * __useAuthenticateQuery__
 *
 * To run a query within a React component, call `useAuthenticateQuery` and pass it any options that fit your needs.
 * When your component renders, `useAuthenticateQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAuthenticateQuery({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useAuthenticateQuery(baseOptions: Apollo.QueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
      }
export function useAuthenticateLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AuthenticateQuery, AuthenticateQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AuthenticateQuery, AuthenticateQueryVariables>(AuthenticateDocument, options);
        }
export type AuthenticateQueryHookResult = ReturnType<typeof useAuthenticateQuery>;
export type AuthenticateLazyQueryHookResult = ReturnType<typeof useAuthenticateLazyQuery>;
export type AuthenticateQueryResult = Apollo.QueryResult<AuthenticateQuery, AuthenticateQueryVariables>;
export const CreateUserDocument = gql`
    mutation createUser($password: String!, $username: String!) {
  createUser(input: {username: $username, password: $password}) {
    appUser {
      id
    }
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, options);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const CheckTokenDocument = gql`
    query checkToken {
  activeUser {
    id
  }
}
    `;

/**
 * __useCheckTokenQuery__
 *
 * To run a query within a React component, call `useCheckTokenQuery` and pass it any options that fit your needs.
 * When your component renders, `useCheckTokenQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCheckTokenQuery({
 *   variables: {
 *   },
 * });
 */
export function useCheckTokenQuery(baseOptions?: Apollo.QueryHookOptions<CheckTokenQuery, CheckTokenQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CheckTokenQuery, CheckTokenQueryVariables>(CheckTokenDocument, options);
      }
export function useCheckTokenLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CheckTokenQuery, CheckTokenQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CheckTokenQuery, CheckTokenQueryVariables>(CheckTokenDocument, options);
        }
export type CheckTokenQueryHookResult = ReturnType<typeof useCheckTokenQuery>;
export type CheckTokenLazyQueryHookResult = ReturnType<typeof useCheckTokenLazyQuery>;
export type CheckTokenQueryResult = Apollo.QueryResult<CheckTokenQuery, CheckTokenQueryVariables>;
export const DeleteExerciseInPlanDocument = gql`
    mutation deleteExerciseInPlan($id: Int!) {
  deleteWorkoutPlanExercise(input: {id: $id}) {
    clientMutationId
  }
}
    `;
export type DeleteExerciseInPlanMutationFn = Apollo.MutationFunction<DeleteExerciseInPlanMutation, DeleteExerciseInPlanMutationVariables>;

/**
 * __useDeleteExerciseInPlanMutation__
 *
 * To run a mutation, you first call `useDeleteExerciseInPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteExerciseInPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteExerciseInPlanMutation, { data, loading, error }] = useDeleteExerciseInPlanMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteExerciseInPlanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteExerciseInPlanMutation, DeleteExerciseInPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteExerciseInPlanMutation, DeleteExerciseInPlanMutationVariables>(DeleteExerciseInPlanDocument, options);
      }
export type DeleteExerciseInPlanMutationHookResult = ReturnType<typeof useDeleteExerciseInPlanMutation>;
export type DeleteExerciseInPlanMutationResult = Apollo.MutationResult<DeleteExerciseInPlanMutation>;
export type DeleteExerciseInPlanMutationOptions = Apollo.BaseMutationOptions<DeleteExerciseInPlanMutation, DeleteExerciseInPlanMutationVariables>;
export const ExerciseSearchDocument = gql`
    query exerciseSearch($query: String!) {
  exercises(filter: {name: {includesInsensitive: $query}}, first: 10) {
    ...Exercise
  }
}
    ${ExerciseFragmentDoc}`;

/**
 * __useExerciseSearchQuery__
 *
 * To run a query within a React component, call `useExerciseSearchQuery` and pass it any options that fit your needs.
 * When your component renders, `useExerciseSearchQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useExerciseSearchQuery({
 *   variables: {
 *      query: // value for 'query'
 *   },
 * });
 */
export function useExerciseSearchQuery(baseOptions: Apollo.QueryHookOptions<ExerciseSearchQuery, ExerciseSearchQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ExerciseSearchQuery, ExerciseSearchQueryVariables>(ExerciseSearchDocument, options);
      }
export function useExerciseSearchLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ExerciseSearchQuery, ExerciseSearchQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ExerciseSearchQuery, ExerciseSearchQueryVariables>(ExerciseSearchDocument, options);
        }
export type ExerciseSearchQueryHookResult = ReturnType<typeof useExerciseSearchQuery>;
export type ExerciseSearchLazyQueryHookResult = ReturnType<typeof useExerciseSearchLazyQuery>;
export type ExerciseSearchQueryResult = Apollo.QueryResult<ExerciseSearchQuery, ExerciseSearchQueryVariables>;
export const InsertExerciseInPlanDocument = gql`
    mutation insertExerciseInPlan($sets: Int!, $reps: Int!, $ordering: Int!, $exerciseId: Int!, $workoutPlanDayId: Int!) {
  createWorkoutPlanExercise(
    input: {workoutPlanExercise: {sets: $sets, reps: $reps, ordering: $ordering, exerciseId: $exerciseId, workoutPlanDayId: $workoutPlanDayId}}
  ) {
    workoutPlanExercise {
      ...WorkoutPlanExercise
    }
  }
}
    ${WorkoutPlanExerciseFragmentDoc}`;
export type InsertExerciseInPlanMutationFn = Apollo.MutationFunction<InsertExerciseInPlanMutation, InsertExerciseInPlanMutationVariables>;

/**
 * __useInsertExerciseInPlanMutation__
 *
 * To run a mutation, you first call `useInsertExerciseInPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertExerciseInPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertExerciseInPlanMutation, { data, loading, error }] = useInsertExerciseInPlanMutation({
 *   variables: {
 *      sets: // value for 'sets'
 *      reps: // value for 'reps'
 *      ordering: // value for 'ordering'
 *      exerciseId: // value for 'exerciseId'
 *      workoutPlanDayId: // value for 'workoutPlanDayId'
 *   },
 * });
 */
export function useInsertExerciseInPlanMutation(baseOptions?: Apollo.MutationHookOptions<InsertExerciseInPlanMutation, InsertExerciseInPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<InsertExerciseInPlanMutation, InsertExerciseInPlanMutationVariables>(InsertExerciseInPlanDocument, options);
      }
export type InsertExerciseInPlanMutationHookResult = ReturnType<typeof useInsertExerciseInPlanMutation>;
export type InsertExerciseInPlanMutationResult = Apollo.MutationResult<InsertExerciseInPlanMutation>;
export type InsertExerciseInPlanMutationOptions = Apollo.BaseMutationOptions<InsertExerciseInPlanMutation, InsertExerciseInPlanMutationVariables>;
export const SaveWorkoutDocument = gql`
    mutation saveWorkout($exerciseIdsAndSets: [SetsAndExerciseIdInput]!) {
  saveWorkout(input: {exerciseIdsAndSets: $exerciseIdsAndSets}) {
    completedWorkout {
      ...CompletedWorkout
      completedWorkoutExercises {
        ...CompletedWorkoutExercise
      }
    }
  }
}
    ${CompletedWorkoutFragmentDoc}
${CompletedWorkoutExerciseFragmentDoc}`;
export type SaveWorkoutMutationFn = Apollo.MutationFunction<SaveWorkoutMutation, SaveWorkoutMutationVariables>;

/**
 * __useSaveWorkoutMutation__
 *
 * To run a mutation, you first call `useSaveWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSaveWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [saveWorkoutMutation, { data, loading, error }] = useSaveWorkoutMutation({
 *   variables: {
 *      exerciseIdsAndSets: // value for 'exerciseIdsAndSets'
 *   },
 * });
 */
export function useSaveWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<SaveWorkoutMutation, SaveWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SaveWorkoutMutation, SaveWorkoutMutationVariables>(SaveWorkoutDocument, options);
      }
export type SaveWorkoutMutationHookResult = ReturnType<typeof useSaveWorkoutMutation>;
export type SaveWorkoutMutationResult = Apollo.MutationResult<SaveWorkoutMutation>;
export type SaveWorkoutMutationOptions = Apollo.BaseMutationOptions<SaveWorkoutMutation, SaveWorkoutMutationVariables>;
export const UpdateWorkoutPlanExerciseSetsDocument = gql`
    mutation updateWorkoutPlanExerciseSets($id: Int!, $sets: Int!, $reps: Int!) {
  updateWorkoutPlanExercise(input: {id: $id, patch: {sets: $sets, reps: $reps}}) {
    workoutPlanExercise {
      ...WorkoutPlanExercise
    }
  }
}
    ${WorkoutPlanExerciseFragmentDoc}`;
export type UpdateWorkoutPlanExerciseSetsMutationFn = Apollo.MutationFunction<UpdateWorkoutPlanExerciseSetsMutation, UpdateWorkoutPlanExerciseSetsMutationVariables>;

/**
 * __useUpdateWorkoutPlanExerciseSetsMutation__
 *
 * To run a mutation, you first call `useUpdateWorkoutPlanExerciseSetsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateWorkoutPlanExerciseSetsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateWorkoutPlanExerciseSetsMutation, { data, loading, error }] = useUpdateWorkoutPlanExerciseSetsMutation({
 *   variables: {
 *      id: // value for 'id'
 *      sets: // value for 'sets'
 *      reps: // value for 'reps'
 *   },
 * });
 */
export function useUpdateWorkoutPlanExerciseSetsMutation(baseOptions?: Apollo.MutationHookOptions<UpdateWorkoutPlanExerciseSetsMutation, UpdateWorkoutPlanExerciseSetsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateWorkoutPlanExerciseSetsMutation, UpdateWorkoutPlanExerciseSetsMutationVariables>(UpdateWorkoutPlanExerciseSetsDocument, options);
      }
export type UpdateWorkoutPlanExerciseSetsMutationHookResult = ReturnType<typeof useUpdateWorkoutPlanExerciseSetsMutation>;
export type UpdateWorkoutPlanExerciseSetsMutationResult = Apollo.MutationResult<UpdateWorkoutPlanExerciseSetsMutation>;
export type UpdateWorkoutPlanExerciseSetsMutationOptions = Apollo.BaseMutationOptions<UpdateWorkoutPlanExerciseSetsMutation, UpdateWorkoutPlanExerciseSetsMutationVariables>;
export const WorkoutPlanDayByIdDocument = gql`
    query WorkoutPlanDayById($id: Int!) {
  activeUser {
    id
    isMale
    bodymass
  }
  workoutPlanDay(id: $id) {
    ...WorkoutPlanDay
    workoutPlanExercises {
      ...WorkoutPlanExercise
    }
  }
}
    ${WorkoutPlanDayFragmentDoc}
${WorkoutPlanExerciseFragmentDoc}`;

/**
 * __useWorkoutPlanDayByIdQuery__
 *
 * To run a query within a React component, call `useWorkoutPlanDayByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutPlanDayByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutPlanDayByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkoutPlanDayByIdQuery(baseOptions: Apollo.QueryHookOptions<WorkoutPlanDayByIdQuery, WorkoutPlanDayByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutPlanDayByIdQuery, WorkoutPlanDayByIdQueryVariables>(WorkoutPlanDayByIdDocument, options);
      }
export function useWorkoutPlanDayByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutPlanDayByIdQuery, WorkoutPlanDayByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutPlanDayByIdQuery, WorkoutPlanDayByIdQueryVariables>(WorkoutPlanDayByIdDocument, options);
        }
export type WorkoutPlanDayByIdQueryHookResult = ReturnType<typeof useWorkoutPlanDayByIdQuery>;
export type WorkoutPlanDayByIdLazyQueryHookResult = ReturnType<typeof useWorkoutPlanDayByIdLazyQuery>;
export type WorkoutPlanDayByIdQueryResult = Apollo.QueryResult<WorkoutPlanDayByIdQuery, WorkoutPlanDayByIdQueryVariables>;
export const CreateWorkoutPlanDayDocument = gql`
    mutation createWorkoutPlanDay($name: String!, $workoutPlanId: Int!) {
  createWorkoutPlanDay(
    input: {workoutPlanDay: {name: $name, workoutPlanId: $workoutPlanId}}
  ) {
    workoutPlanDay {
      ...WorkoutPlanDay
    }
  }
}
    ${WorkoutPlanDayFragmentDoc}`;
export type CreateWorkoutPlanDayMutationFn = Apollo.MutationFunction<CreateWorkoutPlanDayMutation, CreateWorkoutPlanDayMutationVariables>;

/**
 * __useCreateWorkoutPlanDayMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutPlanDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutPlanDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutPlanDayMutation, { data, loading, error }] = useCreateWorkoutPlanDayMutation({
 *   variables: {
 *      name: // value for 'name'
 *      workoutPlanId: // value for 'workoutPlanId'
 *   },
 * });
 */
export function useCreateWorkoutPlanDayMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutPlanDayMutation, CreateWorkoutPlanDayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutPlanDayMutation, CreateWorkoutPlanDayMutationVariables>(CreateWorkoutPlanDayDocument, options);
      }
export type CreateWorkoutPlanDayMutationHookResult = ReturnType<typeof useCreateWorkoutPlanDayMutation>;
export type CreateWorkoutPlanDayMutationResult = Apollo.MutationResult<CreateWorkoutPlanDayMutation>;
export type CreateWorkoutPlanDayMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutPlanDayMutation, CreateWorkoutPlanDayMutationVariables>;
export const DeleteDayDocument = gql`
    mutation deleteDay($dayId: Int!) {
  deleteWorkoutPlanDay(input: {id: $dayId}) {
    workoutPlanDay {
      ...WorkoutPlanDay
    }
  }
}
    ${WorkoutPlanDayFragmentDoc}`;
export type DeleteDayMutationFn = Apollo.MutationFunction<DeleteDayMutation, DeleteDayMutationVariables>;

/**
 * __useDeleteDayMutation__
 *
 * To run a mutation, you first call `useDeleteDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteDayMutation, { data, loading, error }] = useDeleteDayMutation({
 *   variables: {
 *      dayId: // value for 'dayId'
 *   },
 * });
 */
export function useDeleteDayMutation(baseOptions?: Apollo.MutationHookOptions<DeleteDayMutation, DeleteDayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteDayMutation, DeleteDayMutationVariables>(DeleteDayDocument, options);
      }
export type DeleteDayMutationHookResult = ReturnType<typeof useDeleteDayMutation>;
export type DeleteDayMutationResult = Apollo.MutationResult<DeleteDayMutation>;
export type DeleteDayMutationOptions = Apollo.BaseMutationOptions<DeleteDayMutation, DeleteDayMutationVariables>;
export const RenameDayDocument = gql`
    mutation renameDay($dayId: Int!, $name: String!) {
  updateWorkoutPlanDay(input: {id: $dayId, patch: {name: $name}}) {
    workoutPlanDay {
      ...WorkoutPlanDay
    }
  }
}
    ${WorkoutPlanDayFragmentDoc}`;
export type RenameDayMutationFn = Apollo.MutationFunction<RenameDayMutation, RenameDayMutationVariables>;

/**
 * __useRenameDayMutation__
 *
 * To run a mutation, you first call `useRenameDayMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameDayMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameDayMutation, { data, loading, error }] = useRenameDayMutation({
 *   variables: {
 *      dayId: // value for 'dayId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameDayMutation(baseOptions?: Apollo.MutationHookOptions<RenameDayMutation, RenameDayMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameDayMutation, RenameDayMutationVariables>(RenameDayDocument, options);
      }
export type RenameDayMutationHookResult = ReturnType<typeof useRenameDayMutation>;
export type RenameDayMutationResult = Apollo.MutationResult<RenameDayMutation>;
export type RenameDayMutationOptions = Apollo.BaseMutationOptions<RenameDayMutation, RenameDayMutationVariables>;
export const WorkoutPlanByIdDocument = gql`
    query WorkoutPlanById($id: Int!) {
  workoutPlan(id: $id) {
    ...WorkoutPlan
    workoutPlanDays {
      ...WorkoutPlanDay
    }
  }
}
    ${WorkoutPlanFragmentDoc}
${WorkoutPlanDayFragmentDoc}`;

/**
 * __useWorkoutPlanByIdQuery__
 *
 * To run a query within a React component, call `useWorkoutPlanByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutPlanByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutPlanByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useWorkoutPlanByIdQuery(baseOptions: Apollo.QueryHookOptions<WorkoutPlanByIdQuery, WorkoutPlanByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutPlanByIdQuery, WorkoutPlanByIdQueryVariables>(WorkoutPlanByIdDocument, options);
      }
export function useWorkoutPlanByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutPlanByIdQuery, WorkoutPlanByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutPlanByIdQuery, WorkoutPlanByIdQueryVariables>(WorkoutPlanByIdDocument, options);
        }
export type WorkoutPlanByIdQueryHookResult = ReturnType<typeof useWorkoutPlanByIdQuery>;
export type WorkoutPlanByIdLazyQueryHookResult = ReturnType<typeof useWorkoutPlanByIdLazyQuery>;
export type WorkoutPlanByIdQueryResult = Apollo.QueryResult<WorkoutPlanByIdQuery, WorkoutPlanByIdQueryVariables>;
export const CreateWorkoutPlanDocument = gql`
    mutation createWorkoutPlan($name: String!) {
  createWorkoutPlan(input: {workoutPlan: {name: $name}}) {
    workoutPlan {
      ...WorkoutPlan
    }
  }
}
    ${WorkoutPlanFragmentDoc}`;
export type CreateWorkoutPlanMutationFn = Apollo.MutationFunction<CreateWorkoutPlanMutation, CreateWorkoutPlanMutationVariables>;

/**
 * __useCreateWorkoutPlanMutation__
 *
 * To run a mutation, you first call `useCreateWorkoutPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateWorkoutPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createWorkoutPlanMutation, { data, loading, error }] = useCreateWorkoutPlanMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useCreateWorkoutPlanMutation(baseOptions?: Apollo.MutationHookOptions<CreateWorkoutPlanMutation, CreateWorkoutPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateWorkoutPlanMutation, CreateWorkoutPlanMutationVariables>(CreateWorkoutPlanDocument, options);
      }
export type CreateWorkoutPlanMutationHookResult = ReturnType<typeof useCreateWorkoutPlanMutation>;
export type CreateWorkoutPlanMutationResult = Apollo.MutationResult<CreateWorkoutPlanMutation>;
export type CreateWorkoutPlanMutationOptions = Apollo.BaseMutationOptions<CreateWorkoutPlanMutation, CreateWorkoutPlanMutationVariables>;
export const DeleteWorkoutPlanDocument = gql`
    mutation deleteWorkoutPlan($workoutPlanId: Int!) {
  deleteWorkoutPlan(input: {id: $workoutPlanId}) {
    workoutPlan {
      id
    }
  }
}
    `;
export type DeleteWorkoutPlanMutationFn = Apollo.MutationFunction<DeleteWorkoutPlanMutation, DeleteWorkoutPlanMutationVariables>;

/**
 * __useDeleteWorkoutPlanMutation__
 *
 * To run a mutation, you first call `useDeleteWorkoutPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteWorkoutPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteWorkoutPlanMutation, { data, loading, error }] = useDeleteWorkoutPlanMutation({
 *   variables: {
 *      workoutPlanId: // value for 'workoutPlanId'
 *   },
 * });
 */
export function useDeleteWorkoutPlanMutation(baseOptions?: Apollo.MutationHookOptions<DeleteWorkoutPlanMutation, DeleteWorkoutPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteWorkoutPlanMutation, DeleteWorkoutPlanMutationVariables>(DeleteWorkoutPlanDocument, options);
      }
export type DeleteWorkoutPlanMutationHookResult = ReturnType<typeof useDeleteWorkoutPlanMutation>;
export type DeleteWorkoutPlanMutationResult = Apollo.MutationResult<DeleteWorkoutPlanMutation>;
export type DeleteWorkoutPlanMutationOptions = Apollo.BaseMutationOptions<DeleteWorkoutPlanMutation, DeleteWorkoutPlanMutationVariables>;
export const RenameWorkoutPlanDocument = gql`
    mutation renameWorkoutPlan($workoutPlanId: Int!, $name: String!) {
  updateWorkoutPlan(input: {id: $workoutPlanId, patch: {name: $name}}) {
    workoutPlan {
      ...WorkoutPlan
    }
  }
}
    ${WorkoutPlanFragmentDoc}`;
export type RenameWorkoutPlanMutationFn = Apollo.MutationFunction<RenameWorkoutPlanMutation, RenameWorkoutPlanMutationVariables>;

/**
 * __useRenameWorkoutPlanMutation__
 *
 * To run a mutation, you first call `useRenameWorkoutPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRenameWorkoutPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [renameWorkoutPlanMutation, { data, loading, error }] = useRenameWorkoutPlanMutation({
 *   variables: {
 *      workoutPlanId: // value for 'workoutPlanId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useRenameWorkoutPlanMutation(baseOptions?: Apollo.MutationHookOptions<RenameWorkoutPlanMutation, RenameWorkoutPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RenameWorkoutPlanMutation, RenameWorkoutPlanMutationVariables>(RenameWorkoutPlanDocument, options);
      }
export type RenameWorkoutPlanMutationHookResult = ReturnType<typeof useRenameWorkoutPlanMutation>;
export type RenameWorkoutPlanMutationResult = Apollo.MutationResult<RenameWorkoutPlanMutation>;
export type RenameWorkoutPlanMutationOptions = Apollo.BaseMutationOptions<RenameWorkoutPlanMutation, RenameWorkoutPlanMutationVariables>;
export const UpdateUserCurrentWorkoutPlanDocument = gql`
    mutation updateUserCurrentWorkoutPlan($userId: Int!, $currentWorkoutPlanId: Int) {
  updateAppUser(
    input: {id: $userId, patch: {currentWorkoutPlanId: $currentWorkoutPlanId}}
  ) {
    appUser {
      id
      currentWorkoutPlanId
    }
  }
}
    `;
export type UpdateUserCurrentWorkoutPlanMutationFn = Apollo.MutationFunction<UpdateUserCurrentWorkoutPlanMutation, UpdateUserCurrentWorkoutPlanMutationVariables>;

/**
 * __useUpdateUserCurrentWorkoutPlanMutation__
 *
 * To run a mutation, you first call `useUpdateUserCurrentWorkoutPlanMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserCurrentWorkoutPlanMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserCurrentWorkoutPlanMutation, { data, loading, error }] = useUpdateUserCurrentWorkoutPlanMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      currentWorkoutPlanId: // value for 'currentWorkoutPlanId'
 *   },
 * });
 */
export function useUpdateUserCurrentWorkoutPlanMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserCurrentWorkoutPlanMutation, UpdateUserCurrentWorkoutPlanMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserCurrentWorkoutPlanMutation, UpdateUserCurrentWorkoutPlanMutationVariables>(UpdateUserCurrentWorkoutPlanDocument, options);
      }
export type UpdateUserCurrentWorkoutPlanMutationHookResult = ReturnType<typeof useUpdateUserCurrentWorkoutPlanMutation>;
export type UpdateUserCurrentWorkoutPlanMutationResult = Apollo.MutationResult<UpdateUserCurrentWorkoutPlanMutation>;
export type UpdateUserCurrentWorkoutPlanMutationOptions = Apollo.BaseMutationOptions<UpdateUserCurrentWorkoutPlanMutation, UpdateUserCurrentWorkoutPlanMutationVariables>;
export const WorkoutDocument = gql`
    query Workout {
  activeUser {
    id
    currentWorkoutPlanId
    workoutPlans {
      ...WorkoutPlan
    }
  }
}
    ${WorkoutPlanFragmentDoc}`;

/**
 * __useWorkoutQuery__
 *
 * To run a query within a React component, call `useWorkoutQuery` and pass it any options that fit your needs.
 * When your component renders, `useWorkoutQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWorkoutQuery({
 *   variables: {
 *   },
 * });
 */
export function useWorkoutQuery(baseOptions?: Apollo.QueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, options);
      }
export function useWorkoutLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WorkoutQuery, WorkoutQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WorkoutQuery, WorkoutQueryVariables>(WorkoutDocument, options);
        }
export type WorkoutQueryHookResult = ReturnType<typeof useWorkoutQuery>;
export type WorkoutLazyQueryHookResult = ReturnType<typeof useWorkoutLazyQuery>;
export type WorkoutQueryResult = Apollo.QueryResult<WorkoutQuery, WorkoutQueryVariables>;