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
  /** A floating point number that requires more precision than IEEE 754 binary 64 */
  BigFloat: any;
  /** A location in a connection that can be used for resuming pagination. */
  Cursor: any;
  /**
   * A point in time as described by the [ISO
   * 8601](https://en.wikipedia.org/wiki/ISO_8601) standard. May or may not include a timezone.
   */
  Datetime: any;
};

export type Battle = Node & {
  __typename?: 'Battle';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  enemyLevel: Scalars['Int'];
  groupname: Scalars['String'];
  battleNumber: Scalars['Int'];
  currentHealth: Scalars['Float'];
  maxHealth: Scalars['Float'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  /** Reads a single `Enemy` that is related to this `Battle`. */
  enemyByEnemyLevel: Enemy;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname: Group;
  /** Reads and enables pagination through a set of `Group`. */
  groupsByNameAndBattleNumber: GroupsConnection;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercisesByGroupnameAndBattleNumber: UserExercisesConnection;
};


export type BattleGroupsByNameAndBattleNumberArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


export type BattleUserExercisesByGroupnameAndBattleNumberArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
  condition?: Maybe<UserExerciseCondition>;
  filter?: Maybe<UserExerciseFilter>;
};

/** A condition to be used against `Battle` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type BattleCondition = {
  /** Checks for equality with the object’s `enemyLevel` field. */
  enemyLevel?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `groupname` field. */
  groupname?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Battle` object types. All fields are combined with a logical ‘and.’ */
export type BattleFilter = {
  /** Filter by the object’s `enemyLevel` field. */
  enemyLevel?: Maybe<IntFilter>;
  /** Filter by the object’s `groupname` field. */
  groupname?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<BattleFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<BattleFilter>>;
  /** Negates the expression. */
  not?: Maybe<BattleFilter>;
};

/** An input for mutations affecting `Battle` */
export type BattleInput = {
  enemyLevel?: Maybe<Scalars['Int']>;
  groupname: Scalars['String'];
  battleNumber?: Maybe<Scalars['Int']>;
  currentHealth?: Maybe<Scalars['Float']>;
  maxHealth?: Maybe<Scalars['Float']>;
};

/** Represents an update to a `Battle`. Fields that are set will be updated. */
export type BattlePatch = {
  enemyLevel?: Maybe<Scalars['Int']>;
  groupname?: Maybe<Scalars['String']>;
  battleNumber?: Maybe<Scalars['Int']>;
  currentHealth?: Maybe<Scalars['Float']>;
  maxHealth?: Maybe<Scalars['Float']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
};

/** A connection to a list of `Battle` values. */
export type BattlesConnection = {
  __typename?: 'BattlesConnection';
  /** A list of `Battle` objects. */
  nodes: Array<Battle>;
  /** A list of edges which contains the `Battle` and cursor to aid in pagination. */
  edges: Array<BattlesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Battle` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Battle` edge in the connection. */
export type BattlesEdge = {
  __typename?: 'BattlesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Battle` at the end of the edge. */
  node: Battle;
};

/** Methods to use when ordering `Battle`. */
export enum BattlesOrderBy {
  Natural = 'NATURAL',
  EnemyLevelAsc = 'ENEMY_LEVEL_ASC',
  EnemyLevelDesc = 'ENEMY_LEVEL_DESC',
  GroupnameAsc = 'GROUPNAME_ASC',
  GroupnameDesc = 'GROUPNAME_DESC',
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

export type Bodystat = Node & {
  __typename?: 'Bodystat';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  ismale: Scalars['Boolean'];
  bodymass: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  userId: Scalars['Int'];
  /** Reads a single `User` that is related to this `Bodystat`. */
  user: User;
};

/** An input for mutations affecting `Bodystat` */
export type BodystatInput = {
  ismale: Scalars['Boolean'];
  bodymass: Scalars['Int'];
  userId: Scalars['Int'];
};

/** Represents an update to a `Bodystat`. Fields that are set will be updated. */
export type BodystatPatch = {
  ismale?: Maybe<Scalars['Boolean']>;
  bodymass?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  userId?: Maybe<Scalars['Int']>;
};

/** A `Bodystat` edge in the connection. */
export type BodystatsEdge = {
  __typename?: 'BodystatsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Bodystat` at the end of the edge. */
  node: Bodystat;
};

/** Methods to use when ordering `Bodystat`. */
export enum BodystatsOrderBy {
  Natural = 'NATURAL',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type CompletedWorkout = Node & {
  __typename?: 'CompletedWorkout';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  /** Reads and enables pagination through a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises: CompletedWorkoutExercisesConnection;
};


export type CompletedWorkoutCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
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
};

export type CompletedWorkoutExercise = Node & {
  __typename?: 'CompletedWorkoutExercise';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  exerciseId: Scalars['Int'];
  completedWorkoutId: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  volumes: Array<Maybe<Volume>>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
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
  createdAt?: Maybe<Scalars['Datetime']>;
  volumes: Array<Maybe<VolumeInput>>;
};

/** Represents an update to a `CompletedWorkoutExercise`. Fields that are set will be updated. */
export type CompletedWorkoutExercisePatch = {
  id?: Maybe<Scalars['Int']>;
  exerciseId?: Maybe<Scalars['Int']>;
  completedWorkoutId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  volumes?: Maybe<Array<Maybe<VolumeInput>>>;
};

/** A connection to a list of `CompletedWorkoutExercise` values. */
export type CompletedWorkoutExercisesConnection = {
  __typename?: 'CompletedWorkoutExercisesConnection';
  /** A list of `CompletedWorkoutExercise` objects. */
  nodes: Array<CompletedWorkoutExercise>;
  /** A list of edges which contains the `CompletedWorkoutExercise` and cursor to aid in pagination. */
  edges: Array<CompletedWorkoutExercisesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CompletedWorkoutExercise` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CompletedWorkoutExercise` edge in the connection. */
export type CompletedWorkoutExercisesEdge = {
  __typename?: 'CompletedWorkoutExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CompletedWorkoutExercise` at the end of the edge. */
  node: CompletedWorkoutExercise;
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
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<CompletedWorkoutFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<CompletedWorkoutFilter>>;
  /** Negates the expression. */
  not?: Maybe<CompletedWorkoutFilter>;
};

/** An input for mutations affecting `CompletedWorkout` */
export type CompletedWorkoutInput = {
  id?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `CompletedWorkout`. Fields that are set will be updated. */
export type CompletedWorkoutPatch = {
  id?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `CompletedWorkout` values. */
export type CompletedWorkoutsConnection = {
  __typename?: 'CompletedWorkoutsConnection';
  /** A list of `CompletedWorkout` objects. */
  nodes: Array<CompletedWorkout>;
  /** A list of edges which contains the `CompletedWorkout` and cursor to aid in pagination. */
  edges: Array<CompletedWorkoutsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `CompletedWorkout` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `CompletedWorkout` edge in the connection. */
export type CompletedWorkoutsEdge = {
  __typename?: 'CompletedWorkoutsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `CompletedWorkout` at the end of the edge. */
  node: CompletedWorkout;
};

/** Methods to use when ordering `CompletedWorkout`. */
export enum CompletedWorkoutsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create `Bodystat` mutation. */
export type CreateBodystatInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` to be created by this mutation. */
  bodystat: BodystatInput;
};

/** The output of our create `Bodystat` mutation. */
export type CreateBodystatPayload = {
  __typename?: 'CreateBodystatPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` that was created by this mutation. */
  bodystat?: Maybe<Bodystat>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Bodystat`. */
  user: User;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our create `Bodystat` mutation. */
export type CreateBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
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
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our create `CompletedWorkoutExercise` mutation. */
export type CreateCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
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
  /** An edge for our `CompletedWorkout`. May be used by Relay 1. */
  completedWorkoutEdge?: Maybe<CompletedWorkoutsEdge>;
};


/** The output of our create `CompletedWorkout` mutation. */
export type CreateCompletedWorkoutPayloadCompletedWorkoutEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
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
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
};


/** The output of our create `Exercise` mutation. */
export type CreateExercisePayloadExerciseEdgeArgs = {
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
};

/** All input for the create `Group` mutation. */
export type CreateGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` to be created by this mutation. */
  group: GroupInput;
};

/** The output of our create `Group` mutation. */
export type CreateGroupPayload = {
  __typename?: 'CreateGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was created by this mutation. */
  group?: Maybe<Group>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Battle` that is related to this `Group`. */
  battleByNameAndBattleNumber?: Maybe<Battle>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our create `Group` mutation. */
export type CreateGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
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
  /** Reads a single `User` that is related to this `SessionAnalytic`. */
  user: User;
  /** An edge for our `SessionAnalytic`. May be used by Relay 1. */
  sessionAnalyticEdge?: Maybe<SessionAnalyticsEdge>;
};


/** The output of our create `SessionAnalytic` mutation. */
export type CreateSessionAnalyticPayloadSessionAnalyticEdgeArgs = {
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
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
  /** Reads a single `Battle` that is related to this `UserExercise`. */
  battleByGroupnameAndBattleNumber?: Maybe<Battle>;
  /** Reads a single `User` that is related to this `UserExercise`. */
  user: User;
  /** An edge for our `UserExercise`. May be used by Relay 1. */
  userExerciseEdge?: Maybe<UserExercisesEdge>;
};


/** The output of our create `UserExercise` mutation. */
export type CreateUserExercisePayloadUserExerciseEdgeArgs = {
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
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
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the create `Volume` mutation. */
export type CreateVolumeInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Volume` to be created by this mutation. */
  volume: VolumeInput;
};

/** The output of our create `Volume` mutation. */
export type CreateVolumePayload = {
  __typename?: 'CreateVolumePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Volume` that was created by this mutation. */
  volume?: Maybe<Volume>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Volume`. May be used by Relay 1. */
  volumeEdge?: Maybe<VolumesEdge>;
};


/** The output of our create `Volume` mutation. */
export type CreateVolumePayloadVolumeEdgeArgs = {
  orderBy?: Maybe<Array<VolumesOrderBy>>;
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
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our create `WorkoutPlanDay` mutation. */
export type CreateWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
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
  /** An edge for our `WorkoutPlanExercise`. May be used by Relay 1. */
  workoutPlanExerciseEdge?: Maybe<WorkoutPlanExercisesEdge>;
};


/** The output of our create `WorkoutPlanExercise` mutation. */
export type CreateWorkoutPlanExercisePayloadWorkoutPlanExerciseEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
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
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** An edge for our `WorkoutPlan`. May be used by Relay 1. */
  workoutPlanEdge?: Maybe<WorkoutPlansEdge>;
};


/** The output of our create `WorkoutPlan` mutation. */
export type CreateWorkoutPlanPayloadWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
};



/** All input for the `deleteBattleByNodeId` mutation. */
export type DeleteBattleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Battle` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteBattle` mutation. */
export type DeleteBattleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  groupname: Scalars['String'];
  battleNumber: Scalars['Int'];
};

/** The output of our delete `Battle` mutation. */
export type DeleteBattlePayload = {
  __typename?: 'DeleteBattlePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Battle` that was deleted by this mutation. */
  battle?: Maybe<Battle>;
  deletedBattleNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Enemy` that is related to this `Battle`. */
  enemyByEnemyLevel: Enemy;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname: Group;
  /** An edge for our `Battle`. May be used by Relay 1. */
  battleEdge?: Maybe<BattlesEdge>;
};


/** The output of our delete `Battle` mutation. */
export type DeleteBattlePayloadBattleEdgeArgs = {
  orderBy?: Maybe<Array<BattlesOrderBy>>;
};

/** All input for the `deleteBodystatByNodeId` mutation. */
export type DeleteBodystatByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Bodystat` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteBodystat` mutation. */
export type DeleteBodystatInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};

/** The output of our delete `Bodystat` mutation. */
export type DeleteBodystatPayload = {
  __typename?: 'DeleteBodystatPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` that was deleted by this mutation. */
  bodystat?: Maybe<Bodystat>;
  deletedBodystatNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Bodystat`. */
  user: User;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our delete `Bodystat` mutation. */
export type DeleteBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the `deleteCompletedWorkoutByNodeId` mutation. */
export type DeleteCompletedWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CompletedWorkout` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteCompletedWorkoutExerciseByNodeId` mutation. */
export type DeleteCompletedWorkoutExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CompletedWorkoutExercise` to be deleted. */
  nodeId: Scalars['ID'];
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
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our delete `CompletedWorkoutExercise` mutation. */
export type DeleteCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
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
  /** An edge for our `CompletedWorkout`. May be used by Relay 1. */
  completedWorkoutEdge?: Maybe<CompletedWorkoutsEdge>;
};


/** The output of our delete `CompletedWorkout` mutation. */
export type DeleteCompletedWorkoutPayloadCompletedWorkoutEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
};

/** All input for the `deleteExerciseByNodeId` mutation. */
export type DeleteExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Exercise` to be deleted. */
  nodeId: Scalars['ID'];
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
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
};


/** The output of our delete `Exercise` mutation. */
export type DeleteExercisePayloadExerciseEdgeArgs = {
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
};

/** All input for the `deleteGroupByNodeId` mutation. */
export type DeleteGroupByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Group` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteGroup` mutation. */
export type DeleteGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
};

/** The output of our delete `Group` mutation. */
export type DeleteGroupPayload = {
  __typename?: 'DeleteGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was deleted by this mutation. */
  group?: Maybe<Group>;
  deletedGroupNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Battle` that is related to this `Group`. */
  battleByNameAndBattleNumber?: Maybe<Battle>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our delete `Group` mutation. */
export type DeleteGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the `deleteSessionAnalyticByNodeId` mutation. */
export type DeleteSessionAnalyticByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SessionAnalytic` to be deleted. */
  nodeId: Scalars['ID'];
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
  /** Reads a single `User` that is related to this `SessionAnalytic`. */
  user: User;
  /** An edge for our `SessionAnalytic`. May be used by Relay 1. */
  sessionAnalyticEdge?: Maybe<SessionAnalyticsEdge>;
};


/** The output of our delete `SessionAnalytic` mutation. */
export type DeleteSessionAnalyticPayloadSessionAnalyticEdgeArgs = {
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
};

/** All input for the `deleteUserByNodeId` mutation. */
export type DeleteUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserByUsername` mutation. */
export type DeleteUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  username: Scalars['String'];
};

/** All input for the `deleteUserExerciseByNodeId` mutation. */
export type DeleteUserExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserExercise` to be deleted. */
  nodeId: Scalars['ID'];
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
  /** Reads a single `Battle` that is related to this `UserExercise`. */
  battleByGroupnameAndBattleNumber?: Maybe<Battle>;
  /** Reads a single `User` that is related to this `UserExercise`. */
  user: User;
  /** An edge for our `UserExercise`. May be used by Relay 1. */
  userExerciseEdge?: Maybe<UserExercisesEdge>;
};


/** The output of our delete `UserExercise` mutation. */
export type DeleteUserExercisePayloadUserExerciseEdgeArgs = {
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
};

/** All input for the `deleteUser` mutation. */
export type DeleteUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `User` mutation. */
export type DeleteUserPayload = {
  __typename?: 'DeleteUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was deleted by this mutation. */
  user?: Maybe<User>;
  deletedUserNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `User`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `WorkoutPlan` that is related to this `User`. */
  currentWorkoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our delete `User` mutation. */
export type DeleteUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `deleteWorkoutPlanByNodeId` mutation. */
export type DeleteWorkoutPlanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlan` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteWorkoutPlanByUserIdAndName` mutation. */
export type DeleteWorkoutPlanByUserIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
  name: Scalars['String'];
};

/** All input for the `deleteWorkoutPlanDayByNodeId` mutation. */
export type DeleteWorkoutPlanDayByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlanDay` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteWorkoutPlanDayByWorkoutPlanIdAndName` mutation. */
export type DeleteWorkoutPlanDayByWorkoutPlanIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
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
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our delete `WorkoutPlanDay` mutation. */
export type DeleteWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
};

/** All input for the `deleteWorkoutPlanExerciseByNodeId` mutation. */
export type DeleteWorkoutPlanExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlanExercise` to be deleted. */
  nodeId: Scalars['ID'];
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
  /** An edge for our `WorkoutPlanExercise`. May be used by Relay 1. */
  workoutPlanExerciseEdge?: Maybe<WorkoutPlanExercisesEdge>;
};


/** The output of our delete `WorkoutPlanExercise` mutation. */
export type DeleteWorkoutPlanExercisePayloadWorkoutPlanExerciseEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
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
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** An edge for our `WorkoutPlan`. May be used by Relay 1. */
  workoutPlanEdge?: Maybe<WorkoutPlansEdge>;
};


/** The output of our delete `WorkoutPlan` mutation. */
export type DeleteWorkoutPlanPayloadWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
};

/** A connection to a list of `Enemy` values. */
export type EnemiesConnection = {
  __typename?: 'EnemiesConnection';
  /** A list of `Enemy` objects. */
  nodes: Array<Enemy>;
  /** A list of edges which contains the `Enemy` and cursor to aid in pagination. */
  edges: Array<EnemiesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Enemy` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Enemy` edge in the connection. */
export type EnemiesEdge = {
  __typename?: 'EnemiesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Enemy` at the end of the edge. */
  node: Enemy;
};

/** Methods to use when ordering `Enemy`. */
export enum EnemiesOrderBy {
  Natural = 'NATURAL',
  LevelAsc = 'LEVEL_ASC',
  LevelDesc = 'LEVEL_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Enemy = Node & {
  __typename?: 'Enemy';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  level: Scalars['Int'];
  maxHealth?: Maybe<Scalars['Float']>;
  name?: Maybe<Scalars['String']>;
  /** Reads and enables pagination through a set of `Battle`. */
  battlesByEnemyLevel: BattlesConnection;
};


export type EnemyBattlesByEnemyLevelArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BattlesOrderBy>>;
  condition?: Maybe<BattleCondition>;
  filter?: Maybe<BattleFilter>;
};

/** A condition to be used against `Enemy` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type EnemyCondition = {
  /** Checks for equality with the object’s `level` field. */
  level?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Enemy` object types. All fields are combined with a logical ‘and.’ */
export type EnemyFilter = {
  /** Filter by the object’s `level` field. */
  level?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<EnemyFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<EnemyFilter>>;
  /** Negates the expression. */
  not?: Maybe<EnemyFilter>;
};

export type Exercise = Node & {
  __typename?: 'Exercise';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  bodyPart: BodyPartEnum;
  exerciseType: ExerciseTypeEnum;
  name: Scalars['String'];
  count: Scalars['Int'];
  eliteStrengthBaseline: Scalars['Int'];
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises: WorkoutPlanExercisesConnection;
  /** Reads and enables pagination through a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises: CompletedWorkoutExercisesConnection;
};


export type ExerciseWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
  condition?: Maybe<WorkoutPlanExerciseCondition>;
  filter?: Maybe<WorkoutPlanExerciseFilter>;
};


export type ExerciseCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
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

/** A connection to a list of `ExerciseAlias` values. */
export type ExerciseAliasesConnection = {
  __typename?: 'ExerciseAliasesConnection';
  /** A list of `ExerciseAlias` objects. */
  nodes: Array<ExerciseAlias>;
  /** A list of edges which contains the `ExerciseAlias` and cursor to aid in pagination. */
  edges: Array<ExerciseAliasesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ExerciseAlias` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ExerciseAlias` edge in the connection. */
export type ExerciseAliasesEdge = {
  __typename?: 'ExerciseAliasesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ExerciseAlias` at the end of the edge. */
  node: ExerciseAlias;
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

/** A connection to a list of `Exercise` values. */
export type ExercisesConnection = {
  __typename?: 'ExercisesConnection';
  /** A list of `Exercise` objects. */
  nodes: Array<Exercise>;
  /** A list of edges which contains the `Exercise` and cursor to aid in pagination. */
  edges: Array<ExercisesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Exercise` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Exercise` edge in the connection. */
export type ExercisesEdge = {
  __typename?: 'ExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Exercise` at the end of the edge. */
  node: Exercise;
};

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

/** All input for the `getBattleAndCheckExpiry` mutation. */
export type GetBattleAndCheckExpiryInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our `getBattleAndCheckExpiry` mutation. */
export type GetBattleAndCheckExpiryPayload = {
  __typename?: 'GetBattleAndCheckExpiryPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  battle?: Maybe<Battle>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Enemy` that is related to this `Battle`. */
  enemyByEnemyLevel: Enemy;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname: Group;
  /** An edge for our `Battle`. May be used by Relay 1. */
  battleEdge?: Maybe<BattlesEdge>;
};


/** The output of our `getBattleAndCheckExpiry` mutation. */
export type GetBattleAndCheckExpiryPayloadBattleEdgeArgs = {
  orderBy?: Maybe<Array<BattlesOrderBy>>;
};

export type Group = Node & {
  __typename?: 'Group';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  name: Scalars['String'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  password?: Maybe<Scalars['String']>;
  isPasswordProtected?: Maybe<Scalars['Boolean']>;
  battleNumber?: Maybe<Scalars['Int']>;
  /** Reads a single `Battle` that is related to this `Group`. */
  battleByNameAndBattleNumber?: Maybe<Battle>;
  /** Reads and enables pagination through a set of `User`. */
  usersByGroupname: UsersConnection;
  /** Reads and enables pagination through a set of `Battle`. */
  battlesByGroupname: BattlesConnection;
};


export type GroupUsersByGroupnameArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type GroupBattlesByGroupnameArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BattlesOrderBy>>;
  condition?: Maybe<BattleCondition>;
  filter?: Maybe<BattleFilter>;
};

/** A condition to be used against `Group` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type GroupCondition = {
  /** Checks for equality with the object’s `name` field. */
  name?: Maybe<Scalars['String']>;
};

/** A filter to be used against `Group` object types. All fields are combined with a logical ‘and.’ */
export type GroupFilter = {
  /** Filter by the object’s `name` field. */
  name?: Maybe<StringFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<GroupFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<GroupFilter>>;
  /** Negates the expression. */
  not?: Maybe<GroupFilter>;
};

/** An input for mutations affecting `Group` */
export type GroupInput = {
  name: Scalars['String'];
  password?: Maybe<Scalars['String']>;
  isPasswordProtected?: Maybe<Scalars['Boolean']>;
  battleNumber?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Group` values. */
export type GroupsConnection = {
  __typename?: 'GroupsConnection';
  /** A list of `Group` objects. */
  nodes: Array<Group>;
  /** A list of edges which contains the `Group` and cursor to aid in pagination. */
  edges: Array<GroupsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Group` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Group` edge in the connection. */
export type GroupsEdge = {
  __typename?: 'GroupsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Group` at the end of the edge. */
  node: Group;
};

/** Methods to use when ordering `Group`. */
export enum GroupsOrderBy {
  Natural = 'NATURAL',
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

/** All input for the `joinGroup` mutation. */
export type JoinGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  inputGroupname?: Maybe<Scalars['String']>;
  inputPassword?: Maybe<Scalars['String']>;
};

/** The output of our `joinGroup` mutation. */
export type JoinGroupPayload = {
  __typename?: 'JoinGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  boolean?: Maybe<Scalars['Boolean']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** All input for the `joinRandomPublicGroup` mutation. */
export type JoinRandomPublicGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our `joinRandomPublicGroup` mutation. */
export type JoinRandomPublicGroupPayload = {
  __typename?: 'JoinRandomPublicGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  boolean?: Maybe<Scalars['Boolean']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

export type ListenPayload = {
  __typename?: 'ListenPayload';
  /** Our root query field type. Allows us to run any query from our subscription payload. */
  query?: Maybe<Query>;
  relatedNode?: Maybe<Node>;
  relatedNodeId?: Maybe<Scalars['ID']>;
};

/** The root mutation type which contains root level fields which mutate data. */
export type Mutation = {
  __typename?: 'Mutation';
  /** Creates a single `Bodystat`. */
  createBodystat?: Maybe<CreateBodystatPayload>;
  /** Creates a single `CompletedWorkout`. */
  createCompletedWorkout?: Maybe<CreateCompletedWorkoutPayload>;
  /** Creates a single `CompletedWorkoutExercise`. */
  createCompletedWorkoutExercise?: Maybe<CreateCompletedWorkoutExercisePayload>;
  /** Creates a single `Exercise`. */
  createExercise?: Maybe<CreateExercisePayload>;
  /** Creates a single `Group`. */
  createGroup?: Maybe<CreateGroupPayload>;
  /** Creates a single `SessionAnalytic`. */
  createSessionAnalytic?: Maybe<CreateSessionAnalyticPayload>;
  /** Creates a single `UserExercise`. */
  createUserExercise?: Maybe<CreateUserExercisePayload>;
  /** Creates a single `Volume`. */
  createVolume?: Maybe<CreateVolumePayload>;
  /** Creates a single `WorkoutPlan`. */
  createWorkoutPlan?: Maybe<CreateWorkoutPlanPayload>;
  /** Creates a single `WorkoutPlanDay`. */
  createWorkoutPlanDay?: Maybe<CreateWorkoutPlanDayPayload>;
  /** Creates a single `WorkoutPlanExercise`. */
  createWorkoutPlanExercise?: Maybe<CreateWorkoutPlanExercisePayload>;
  /** Updates a single `Battle` using its globally unique id and a patch. */
  updateBattleByNodeId?: Maybe<UpdateBattlePayload>;
  /** Updates a single `Battle` using a unique key and a patch. */
  updateBattle?: Maybe<UpdateBattlePayload>;
  /** Updates a single `Bodystat` using its globally unique id and a patch. */
  updateBodystatByNodeId?: Maybe<UpdateBodystatPayload>;
  /** Updates a single `Bodystat` using a unique key and a patch. */
  updateBodystat?: Maybe<UpdateBodystatPayload>;
  /** Updates a single `CompletedWorkout` using its globally unique id and a patch. */
  updateCompletedWorkoutByNodeId?: Maybe<UpdateCompletedWorkoutPayload>;
  /** Updates a single `CompletedWorkout` using a unique key and a patch. */
  updateCompletedWorkout?: Maybe<UpdateCompletedWorkoutPayload>;
  /** Updates a single `CompletedWorkoutExercise` using its globally unique id and a patch. */
  updateCompletedWorkoutExerciseByNodeId?: Maybe<UpdateCompletedWorkoutExercisePayload>;
  /** Updates a single `CompletedWorkoutExercise` using a unique key and a patch. */
  updateCompletedWorkoutExercise?: Maybe<UpdateCompletedWorkoutExercisePayload>;
  /** Updates a single `Exercise` using its globally unique id and a patch. */
  updateExerciseByNodeId?: Maybe<UpdateExercisePayload>;
  /** Updates a single `Exercise` using a unique key and a patch. */
  updateExercise?: Maybe<UpdateExercisePayload>;
  /** Updates a single `SessionAnalytic` using its globally unique id and a patch. */
  updateSessionAnalyticByNodeId?: Maybe<UpdateSessionAnalyticPayload>;
  /** Updates a single `SessionAnalytic` using a unique key and a patch. */
  updateSessionAnalytic?: Maybe<UpdateSessionAnalyticPayload>;
  /** Updates a single `User` using its globally unique id and a patch. */
  updateUserByNodeId?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUserByUsername?: Maybe<UpdateUserPayload>;
  /** Updates a single `User` using a unique key and a patch. */
  updateUser?: Maybe<UpdateUserPayload>;
  /** Updates a single `UserExercise` using its globally unique id and a patch. */
  updateUserExerciseByNodeId?: Maybe<UpdateUserExercisePayload>;
  /** Updates a single `UserExercise` using a unique key and a patch. */
  updateUserExercise?: Maybe<UpdateUserExercisePayload>;
  /** Updates a single `WorkoutPlan` using its globally unique id and a patch. */
  updateWorkoutPlanByNodeId?: Maybe<UpdateWorkoutPlanPayload>;
  /** Updates a single `WorkoutPlan` using a unique key and a patch. */
  updateWorkoutPlan?: Maybe<UpdateWorkoutPlanPayload>;
  /** Updates a single `WorkoutPlan` using a unique key and a patch. */
  updateWorkoutPlanByUserIdAndName?: Maybe<UpdateWorkoutPlanPayload>;
  /** Updates a single `WorkoutPlanDay` using its globally unique id and a patch. */
  updateWorkoutPlanDayByNodeId?: Maybe<UpdateWorkoutPlanDayPayload>;
  /** Updates a single `WorkoutPlanDay` using a unique key and a patch. */
  updateWorkoutPlanDay?: Maybe<UpdateWorkoutPlanDayPayload>;
  /** Updates a single `WorkoutPlanDay` using a unique key and a patch. */
  updateWorkoutPlanDayByWorkoutPlanIdAndName?: Maybe<UpdateWorkoutPlanDayPayload>;
  /** Updates a single `WorkoutPlanExercise` using its globally unique id and a patch. */
  updateWorkoutPlanExerciseByNodeId?: Maybe<UpdateWorkoutPlanExercisePayload>;
  /** Updates a single `WorkoutPlanExercise` using a unique key and a patch. */
  updateWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<UpdateWorkoutPlanExercisePayload>;
  /** Updates a single `WorkoutPlanExercise` using a unique key and a patch. */
  updateWorkoutPlanExercise?: Maybe<UpdateWorkoutPlanExercisePayload>;
  /** Deletes a single `Battle` using its globally unique id. */
  deleteBattleByNodeId?: Maybe<DeleteBattlePayload>;
  /** Deletes a single `Battle` using a unique key. */
  deleteBattle?: Maybe<DeleteBattlePayload>;
  /** Deletes a single `Bodystat` using its globally unique id. */
  deleteBodystatByNodeId?: Maybe<DeleteBodystatPayload>;
  /** Deletes a single `Bodystat` using a unique key. */
  deleteBodystat?: Maybe<DeleteBodystatPayload>;
  /** Deletes a single `CompletedWorkout` using its globally unique id. */
  deleteCompletedWorkoutByNodeId?: Maybe<DeleteCompletedWorkoutPayload>;
  /** Deletes a single `CompletedWorkout` using a unique key. */
  deleteCompletedWorkout?: Maybe<DeleteCompletedWorkoutPayload>;
  /** Deletes a single `CompletedWorkoutExercise` using its globally unique id. */
  deleteCompletedWorkoutExerciseByNodeId?: Maybe<DeleteCompletedWorkoutExercisePayload>;
  /** Deletes a single `CompletedWorkoutExercise` using a unique key. */
  deleteCompletedWorkoutExercise?: Maybe<DeleteCompletedWorkoutExercisePayload>;
  /** Deletes a single `Exercise` using its globally unique id. */
  deleteExerciseByNodeId?: Maybe<DeleteExercisePayload>;
  /** Deletes a single `Exercise` using a unique key. */
  deleteExercise?: Maybe<DeleteExercisePayload>;
  /** Deletes a single `Group` using its globally unique id. */
  deleteGroupByNodeId?: Maybe<DeleteGroupPayload>;
  /** Deletes a single `Group` using a unique key. */
  deleteGroup?: Maybe<DeleteGroupPayload>;
  /** Deletes a single `SessionAnalytic` using its globally unique id. */
  deleteSessionAnalyticByNodeId?: Maybe<DeleteSessionAnalyticPayload>;
  /** Deletes a single `SessionAnalytic` using a unique key. */
  deleteSessionAnalytic?: Maybe<DeleteSessionAnalyticPayload>;
  /** Deletes a single `User` using its globally unique id. */
  deleteUserByNodeId?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUserByUsername?: Maybe<DeleteUserPayload>;
  /** Deletes a single `User` using a unique key. */
  deleteUser?: Maybe<DeleteUserPayload>;
  /** Deletes a single `UserExercise` using its globally unique id. */
  deleteUserExerciseByNodeId?: Maybe<DeleteUserExercisePayload>;
  /** Deletes a single `UserExercise` using a unique key. */
  deleteUserExercise?: Maybe<DeleteUserExercisePayload>;
  /** Deletes a single `WorkoutPlan` using its globally unique id. */
  deleteWorkoutPlanByNodeId?: Maybe<DeleteWorkoutPlanPayload>;
  /** Deletes a single `WorkoutPlan` using a unique key. */
  deleteWorkoutPlan?: Maybe<DeleteWorkoutPlanPayload>;
  /** Deletes a single `WorkoutPlan` using a unique key. */
  deleteWorkoutPlanByUserIdAndName?: Maybe<DeleteWorkoutPlanPayload>;
  /** Deletes a single `WorkoutPlanDay` using its globally unique id. */
  deleteWorkoutPlanDayByNodeId?: Maybe<DeleteWorkoutPlanDayPayload>;
  /** Deletes a single `WorkoutPlanDay` using a unique key. */
  deleteWorkoutPlanDay?: Maybe<DeleteWorkoutPlanDayPayload>;
  /** Deletes a single `WorkoutPlanDay` using a unique key. */
  deleteWorkoutPlanDayByWorkoutPlanIdAndName?: Maybe<DeleteWorkoutPlanDayPayload>;
  /** Deletes a single `WorkoutPlanExercise` using its globally unique id. */
  deleteWorkoutPlanExerciseByNodeId?: Maybe<DeleteWorkoutPlanExercisePayload>;
  /** Deletes a single `WorkoutPlanExercise` using a unique key. */
  deleteWorkoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<DeleteWorkoutPlanExercisePayload>;
  /** Deletes a single `WorkoutPlanExercise` using a unique key. */
  deleteWorkoutPlanExercise?: Maybe<DeleteWorkoutPlanExercisePayload>;
  createUser?: Maybe<CreateUserPayload>;
  getBattleAndCheckExpiry?: Maybe<GetBattleAndCheckExpiryPayload>;
  joinGroup?: Maybe<JoinGroupPayload>;
  joinRandomPublicGroup?: Maybe<JoinRandomPublicGroupPayload>;
  nullifyGroup?: Maybe<NullifyGroupPayload>;
  /** Upserts a single `Battle`. */
  upsertBattle?: Maybe<UpsertBattlePayload>;
  /** Upserts a single `Bodystat`. */
  upsertBodystat?: Maybe<UpsertBodystatPayload>;
  /** Upserts a single `CompletedWorkout`. */
  upsertCompletedWorkout?: Maybe<UpsertCompletedWorkoutPayload>;
  /** Upserts a single `CompletedWorkoutExercise`. */
  upsertCompletedWorkoutExercise?: Maybe<UpsertCompletedWorkoutExercisePayload>;
  /** Upserts a single `Exercise`. */
  upsertExercise?: Maybe<UpsertExercisePayload>;
  /** Upserts a single `Group`. */
  upsertGroup?: Maybe<UpsertGroupPayload>;
  /** Upserts a single `SessionAnalytic`. */
  upsertSessionAnalytic?: Maybe<UpsertSessionAnalyticPayload>;
  /** Upserts a single `User`. */
  upsertUser?: Maybe<UpsertUserPayload>;
  /** Upserts a single `UserExercise`. */
  upsertUserExercise?: Maybe<UpsertUserExercisePayload>;
  /** Upserts a single `Volume`. */
  upsertVolume?: Maybe<UpsertVolumePayload>;
  /** Upserts a single `WorkoutPlan`. */
  upsertWorkoutPlan?: Maybe<UpsertWorkoutPlanPayload>;
  /** Upserts a single `WorkoutPlanDay`. */
  upsertWorkoutPlanDay?: Maybe<UpsertWorkoutPlanDayPayload>;
  /** Upserts a single `WorkoutPlanExercise`. */
  upsertWorkoutPlanExercise?: Maybe<UpsertWorkoutPlanExercisePayload>;
  /** Creates one or many `CompletedWorkoutExercise`. */
  mnCreateCompletedWorkoutExercise?: Maybe<MnCreateCompletedWorkoutExercisePayload>;
  /** Updates one or many `CompletedWorkoutExercise` using a unique key and a patch. */
  mnUpdateCompletedWorkoutExercise?: Maybe<MnUpdateCompletedWorkoutExercisePayload>;
  /** Deletes one or many `CompletedWorkoutExercise` a unique key via a patch. */
  mnDeleteCompletedWorkoutExercise?: Maybe<MnDeleteCompletedWorkoutExercisePayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBodystatArgs = {
  input: CreateBodystatInput;
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
export type MutationCreateGroupArgs = {
  input: CreateGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateSessionAnalyticArgs = {
  input: CreateSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateUserExerciseArgs = {
  input: CreateUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateVolumeArgs = {
  input: CreateVolumeInput;
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
export type MutationUpdateBattleByNodeIdArgs = {
  input: UpdateBattleByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBattleArgs = {
  input: UpdateBattleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBodystatByNodeIdArgs = {
  input: UpdateBodystatByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateBodystatArgs = {
  input: UpdateBodystatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutByNodeIdArgs = {
  input: UpdateCompletedWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutArgs = {
  input: UpdateCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutExerciseByNodeIdArgs = {
  input: UpdateCompletedWorkoutExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateCompletedWorkoutExerciseArgs = {
  input: UpdateCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateExerciseByNodeIdArgs = {
  input: UpdateExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateExerciseArgs = {
  input: UpdateExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionAnalyticByNodeIdArgs = {
  input: UpdateSessionAnalyticByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateSessionAnalyticArgs = {
  input: UpdateSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByNodeIdArgs = {
  input: UpdateUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserByUsernameArgs = {
  input: UpdateUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserArgs = {
  input: UpdateUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserExerciseByNodeIdArgs = {
  input: UpdateUserExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserExerciseArgs = {
  input: UpdateUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanByNodeIdArgs = {
  input: UpdateWorkoutPlanByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanArgs = {
  input: UpdateWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanByUserIdAndNameArgs = {
  input: UpdateWorkoutPlanByUserIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanDayByNodeIdArgs = {
  input: UpdateWorkoutPlanDayByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanDayArgs = {
  input: UpdateWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanDayByWorkoutPlanIdAndNameArgs = {
  input: UpdateWorkoutPlanDayByWorkoutPlanIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateWorkoutPlanExerciseByNodeIdArgs = {
  input: UpdateWorkoutPlanExerciseByNodeIdInput;
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
export type MutationDeleteBattleByNodeIdArgs = {
  input: DeleteBattleByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBattleArgs = {
  input: DeleteBattleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBodystatByNodeIdArgs = {
  input: DeleteBodystatByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteBodystatArgs = {
  input: DeleteBodystatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutByNodeIdArgs = {
  input: DeleteCompletedWorkoutByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutArgs = {
  input: DeleteCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutExerciseByNodeIdArgs = {
  input: DeleteCompletedWorkoutExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteCompletedWorkoutExerciseArgs = {
  input: DeleteCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteExerciseByNodeIdArgs = {
  input: DeleteExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteExerciseArgs = {
  input: DeleteExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupByNodeIdArgs = {
  input: DeleteGroupByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteGroupArgs = {
  input: DeleteGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionAnalyticByNodeIdArgs = {
  input: DeleteSessionAnalyticByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteSessionAnalyticArgs = {
  input: DeleteSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByNodeIdArgs = {
  input: DeleteUserByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserByUsernameArgs = {
  input: DeleteUserByUsernameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserArgs = {
  input: DeleteUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserExerciseByNodeIdArgs = {
  input: DeleteUserExerciseByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserExerciseArgs = {
  input: DeleteUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanByNodeIdArgs = {
  input: DeleteWorkoutPlanByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanArgs = {
  input: DeleteWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanByUserIdAndNameArgs = {
  input: DeleteWorkoutPlanByUserIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanDayByNodeIdArgs = {
  input: DeleteWorkoutPlanDayByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanDayArgs = {
  input: DeleteWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanDayByWorkoutPlanIdAndNameArgs = {
  input: DeleteWorkoutPlanDayByWorkoutPlanIdAndNameInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteWorkoutPlanExerciseByNodeIdArgs = {
  input: DeleteWorkoutPlanExerciseByNodeIdInput;
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
export type MutationGetBattleAndCheckExpiryArgs = {
  input: GetBattleAndCheckExpiryInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationJoinGroupArgs = {
  input: JoinGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationJoinRandomPublicGroupArgs = {
  input: JoinRandomPublicGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationNullifyGroupArgs = {
  input: NullifyGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertBattleArgs = {
  input: UpsertBattleInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertBodystatArgs = {
  input: UpsertBodystatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertCompletedWorkoutArgs = {
  input: UpsertCompletedWorkoutInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertCompletedWorkoutExerciseArgs = {
  input: UpsertCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertExerciseArgs = {
  input: UpsertExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertGroupArgs = {
  input: UpsertGroupInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertSessionAnalyticArgs = {
  input: UpsertSessionAnalyticInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserArgs = {
  input: UpsertUserInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertUserExerciseArgs = {
  input: UpsertUserExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertVolumeArgs = {
  input: UpsertVolumeInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertWorkoutPlanArgs = {
  input: UpsertWorkoutPlanInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertWorkoutPlanDayArgs = {
  input: UpsertWorkoutPlanDayInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpsertWorkoutPlanExerciseArgs = {
  input: UpsertWorkoutPlanExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMnCreateCompletedWorkoutExerciseArgs = {
  input: MnCreateCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMnUpdateCompletedWorkoutExerciseArgs = {
  input: MnUpdateCompletedWorkoutExerciseInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationMnDeleteCompletedWorkoutExerciseArgs = {
  input: MnDeleteCompletedWorkoutExerciseInput;
};

/** An object with a globally unique `ID`. */
export type Node = {
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
};

/** All input for the `nullifyGroup` mutation. */
export type NullifyGroupInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
};

/** The output of our `nullifyGroup` mutation. */
export type NullifyGroupPayload = {
  __typename?: 'NullifyGroupPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['Cursor']>;
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['Cursor']>;
};

/** The root query type which gives access points into the data universe. */
export type Query = Node & {
  __typename?: 'Query';
  /**
   * Exposes the root query type nested one level down. This is helpful for Relay 1
   * which can only query top level fields if they are in a particular form.
   */
  query: Query;
  /** The root query type must be a `Node` to work well with Relay 1 mutations. This just resolves to `query`. */
  nodeId: Scalars['ID'];
  /** Fetches an object given its globally unique `ID`. */
  node?: Maybe<Node>;
  /** Reads and enables pagination through a set of `Battle`. */
  battles?: Maybe<BattlesConnection>;
  /** Reads and enables pagination through a set of `CompletedWorkout`. */
  completedWorkouts?: Maybe<CompletedWorkoutsConnection>;
  /** Reads and enables pagination through a set of `CompletedWorkoutExercise`. */
  completedWorkoutExercises?: Maybe<CompletedWorkoutExercisesConnection>;
  /** Reads and enables pagination through a set of `Enemy`. */
  enemies?: Maybe<EnemiesConnection>;
  /** Reads and enables pagination through a set of `Exercise`. */
  exercises?: Maybe<ExercisesConnection>;
  /** Reads and enables pagination through a set of `ExerciseAlias`. */
  exerciseAliases?: Maybe<ExerciseAliasesConnection>;
  /** Reads and enables pagination through a set of `Group`. */
  groups?: Maybe<GroupsConnection>;
  /** Reads and enables pagination through a set of `SessionAnalytic`. */
  sessionAnalytics?: Maybe<SessionAnalyticsConnection>;
  /** Reads and enables pagination through a set of `User`. */
  users?: Maybe<UsersConnection>;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercises?: Maybe<UserExercisesConnection>;
  /** Reads and enables pagination through a set of `Volume`. */
  volumes?: Maybe<VolumesConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlan`. */
  workoutPlans?: Maybe<WorkoutPlansConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlanDay`. */
  workoutPlanDays?: Maybe<WorkoutPlanDaysConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises?: Maybe<WorkoutPlanExercisesConnection>;
  battle?: Maybe<Battle>;
  bodystat?: Maybe<Bodystat>;
  completedWorkout?: Maybe<CompletedWorkout>;
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  enemy?: Maybe<Enemy>;
  exercise?: Maybe<Exercise>;
  group?: Maybe<Group>;
  sessionAnalytic?: Maybe<SessionAnalytic>;
  userByUsername?: Maybe<User>;
  user?: Maybe<User>;
  userExercise?: Maybe<UserExercise>;
  workoutPlan?: Maybe<WorkoutPlan>;
  workoutPlanByUserIdAndName?: Maybe<WorkoutPlan>;
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  workoutPlanDayByWorkoutPlanIdAndName?: Maybe<WorkoutPlanDay>;
  workoutPlanExerciseByOrderingAndWorkoutPlanDayId?: Maybe<WorkoutPlanExercise>;
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  activeUser?: Maybe<User>;
  calculateStrengthStats?: Maybe<Strengthstat>;
  /** Reads a single `Battle` using its globally unique `ID`. */
  battleByNodeId?: Maybe<Battle>;
  /** Reads a single `Bodystat` using its globally unique `ID`. */
  bodystatByNodeId?: Maybe<Bodystat>;
  /** Reads a single `CompletedWorkout` using its globally unique `ID`. */
  completedWorkoutByNodeId?: Maybe<CompletedWorkout>;
  /** Reads a single `CompletedWorkoutExercise` using its globally unique `ID`. */
  completedWorkoutExerciseByNodeId?: Maybe<CompletedWorkoutExercise>;
  /** Reads a single `Enemy` using its globally unique `ID`. */
  enemyByNodeId?: Maybe<Enemy>;
  /** Reads a single `Exercise` using its globally unique `ID`. */
  exerciseByNodeId?: Maybe<Exercise>;
  /** Reads a single `Group` using its globally unique `ID`. */
  groupByNodeId?: Maybe<Group>;
  /** Reads a single `SessionAnalytic` using its globally unique `ID`. */
  sessionAnalyticByNodeId?: Maybe<SessionAnalytic>;
  /** Reads a single `User` using its globally unique `ID`. */
  userByNodeId?: Maybe<User>;
  /** Reads a single `UserExercise` using its globally unique `ID`. */
  userExerciseByNodeId?: Maybe<UserExercise>;
  /** Reads a single `WorkoutPlan` using its globally unique `ID`. */
  workoutPlanByNodeId?: Maybe<WorkoutPlan>;
  /** Reads a single `WorkoutPlanDay` using its globally unique `ID`. */
  workoutPlanDayByNodeId?: Maybe<WorkoutPlanDay>;
  /** Reads a single `WorkoutPlanExercise` using its globally unique `ID`. */
  workoutPlanExerciseByNodeId?: Maybe<WorkoutPlanExercise>;
  calculateStrength?: Maybe<Scalars['Int']>;
};


/** The root query type which gives access points into the data universe. */
export type QueryNodeArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBattlesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BattlesOrderBy>>;
  condition?: Maybe<BattleCondition>;
  filter?: Maybe<BattleFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
  condition?: Maybe<CompletedWorkoutCondition>;
  filter?: Maybe<CompletedWorkoutFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
  condition?: Maybe<CompletedWorkoutExerciseCondition>;
  filter?: Maybe<CompletedWorkoutExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryEnemiesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<EnemiesOrderBy>>;
  condition?: Maybe<EnemyCondition>;
  filter?: Maybe<EnemyFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
  condition?: Maybe<ExerciseCondition>;
  filter?: Maybe<ExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseAliasesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ExerciseAliasesOrderBy>>;
  condition?: Maybe<ExerciseAliasCondition>;
  filter?: Maybe<ExerciseAliasFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<GroupsOrderBy>>;
  condition?: Maybe<GroupCondition>;
  filter?: Maybe<GroupFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionAnalyticsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
  condition?: Maybe<SessionAnalyticCondition>;
  filter?: Maybe<SessionAnalyticFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUsersArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryUserExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
  condition?: Maybe<UserExerciseCondition>;
  filter?: Maybe<UserExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryVolumesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<VolumesOrderBy>>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
  condition?: Maybe<WorkoutPlanCondition>;
  filter?: Maybe<WorkoutPlanFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDaysArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
  condition?: Maybe<WorkoutPlanDayCondition>;
  filter?: Maybe<WorkoutPlanDayFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
  condition?: Maybe<WorkoutPlanExerciseCondition>;
  filter?: Maybe<WorkoutPlanExerciseFilter>;
};


/** The root query type which gives access points into the data universe. */
export type QueryBattleArgs = {
  groupname: Scalars['String'];
  battleNumber: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBodystatArgs = {
  userId: Scalars['Int'];
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
export type QueryEnemyArgs = {
  level: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupArgs = {
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionAnalyticArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByUsernameArgs = {
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserArgs = {
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
export type QueryWorkoutPlanByUserIdAndNameArgs = {
  userId: Scalars['Int'];
  name: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDayArgs = {
  id: Scalars['Int'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDayByWorkoutPlanIdAndNameArgs = {
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
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
export type QueryBattleByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBodystatByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCompletedWorkoutExerciseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryEnemyByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryExerciseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryGroupByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QuerySessionAnalyticByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryUserExerciseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanDayByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryWorkoutPlanExerciseByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryCalculateStrengthArgs = {
  exercise: Scalars['String'];
  liftmass: Scalars['Float'];
  repetitions: Scalars['Int'];
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

export type SessionAnalytic = Node & {
  __typename?: 'SessionAnalytic';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  username: Scalars['String'];
  analytics: Array<Maybe<SectionAndTimeSpent>>;
  createdAt: Scalars['Datetime'];
  userId: Scalars['Int'];
  /** Reads a single `User` that is related to this `SessionAnalytic`. */
  user: User;
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
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `SessionAnalytic` object types. All fields are combined with a logical ‘and.’ */
export type SessionAnalyticFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
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
  userId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `SessionAnalytic`. Fields that are set will be updated. */
export type SessionAnalyticPatch = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  analytics?: Maybe<Array<Maybe<SectionAndTimeSpentInput>>>;
  createdAt?: Maybe<Scalars['Datetime']>;
  userId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `SessionAnalytic` values. */
export type SessionAnalyticsConnection = {
  __typename?: 'SessionAnalyticsConnection';
  /** A list of `SessionAnalytic` objects. */
  nodes: Array<SessionAnalytic>;
  /** A list of edges which contains the `SessionAnalytic` and cursor to aid in pagination. */
  edges: Array<SessionAnalyticsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `SessionAnalytic` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `SessionAnalytic` edge in the connection. */
export type SessionAnalyticsEdge = {
  __typename?: 'SessionAnalyticsEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `SessionAnalytic` at the end of the edge. */
  node: SessionAnalytic;
};

/** Methods to use when ordering `SessionAnalytic`. */
export enum SessionAnalyticsOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Strengthstat = {
  __typename?: 'Strengthstat';
  averageStrength?: Maybe<Scalars['BigFloat']>;
  numExercises?: Maybe<Scalars['BigFloat']>;
  dph?: Maybe<Scalars['BigFloat']>;
};

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

/** All input for the `updateBattleByNodeId` mutation. */
export type UpdateBattleByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Battle` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Battle` being updated. */
  patch: BattlePatch;
};

/** All input for the `updateBattle` mutation. */
export type UpdateBattleInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Battle` being updated. */
  patch: BattlePatch;
  groupname: Scalars['String'];
  battleNumber: Scalars['Int'];
};

/** The output of our update `Battle` mutation. */
export type UpdateBattlePayload = {
  __typename?: 'UpdateBattlePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Battle` that was updated by this mutation. */
  battle?: Maybe<Battle>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Enemy` that is related to this `Battle`. */
  enemyByEnemyLevel: Enemy;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname: Group;
  /** An edge for our `Battle`. May be used by Relay 1. */
  battleEdge?: Maybe<BattlesEdge>;
};


/** The output of our update `Battle` mutation. */
export type UpdateBattlePayloadBattleEdgeArgs = {
  orderBy?: Maybe<Array<BattlesOrderBy>>;
};

/** All input for the `updateBodystatByNodeId` mutation. */
export type UpdateBodystatByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Bodystat` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Bodystat` being updated. */
  patch: BodystatPatch;
};

/** All input for the `updateBodystat` mutation. */
export type UpdateBodystatInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `Bodystat` being updated. */
  patch: BodystatPatch;
  userId: Scalars['Int'];
};

/** The output of our update `Bodystat` mutation. */
export type UpdateBodystatPayload = {
  __typename?: 'UpdateBodystatPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` that was updated by this mutation. */
  bodystat?: Maybe<Bodystat>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Bodystat`. */
  user: User;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our update `Bodystat` mutation. */
export type UpdateBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the `updateCompletedWorkoutByNodeId` mutation. */
export type UpdateCompletedWorkoutByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CompletedWorkout` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CompletedWorkout` being updated. */
  patch: CompletedWorkoutPatch;
};

/** All input for the `updateCompletedWorkoutExerciseByNodeId` mutation. */
export type UpdateCompletedWorkoutExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `CompletedWorkoutExercise` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `CompletedWorkoutExercise` being updated. */
  patch: CompletedWorkoutExercisePatch;
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
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our update `CompletedWorkoutExercise` mutation. */
export type UpdateCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
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
  /** An edge for our `CompletedWorkout`. May be used by Relay 1. */
  completedWorkoutEdge?: Maybe<CompletedWorkoutsEdge>;
};


/** The output of our update `CompletedWorkout` mutation. */
export type UpdateCompletedWorkoutPayloadCompletedWorkoutEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
};

/** All input for the `updateExerciseByNodeId` mutation. */
export type UpdateExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `Exercise` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `Exercise` being updated. */
  patch: ExercisePatch;
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
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
};


/** The output of our update `Exercise` mutation. */
export type UpdateExercisePayloadExerciseEdgeArgs = {
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
};

/** All input for the `updateSessionAnalyticByNodeId` mutation. */
export type UpdateSessionAnalyticByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `SessionAnalytic` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `SessionAnalytic` being updated. */
  patch: SessionAnalyticPatch;
};

/** All input for the `updateSessionAnalytic` mutation. */
export type UpdateSessionAnalyticInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `SessionAnalytic` being updated. */
  patch: SessionAnalyticPatch;
  id: Scalars['Int'];
};

/** The output of our update `SessionAnalytic` mutation. */
export type UpdateSessionAnalyticPayload = {
  __typename?: 'UpdateSessionAnalyticPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` that was updated by this mutation. */
  sessionAnalytic?: Maybe<SessionAnalytic>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `SessionAnalytic`. */
  user: User;
  /** An edge for our `SessionAnalytic`. May be used by Relay 1. */
  sessionAnalyticEdge?: Maybe<SessionAnalyticsEdge>;
};


/** The output of our update `SessionAnalytic` mutation. */
export type UpdateSessionAnalyticPayloadSessionAnalyticEdgeArgs = {
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
};

/** All input for the `updateUserByNodeId` mutation. */
export type UpdateUserByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `User` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
};

/** All input for the `updateUserByUsername` mutation. */
export type UpdateUserByUsernameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  username: Scalars['String'];
};

/** All input for the `updateUserExerciseByNodeId` mutation. */
export type UpdateUserExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserExercise` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserExercise` being updated. */
  patch: UserExercisePatch;
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
  /** Reads a single `Battle` that is related to this `UserExercise`. */
  battleByGroupnameAndBattleNumber?: Maybe<Battle>;
  /** Reads a single `User` that is related to this `UserExercise`. */
  user: User;
  /** An edge for our `UserExercise`. May be used by Relay 1. */
  userExerciseEdge?: Maybe<UserExercisesEdge>;
};


/** The output of our update `UserExercise` mutation. */
export type UpdateUserExercisePayloadUserExerciseEdgeArgs = {
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
};

/** All input for the `updateUser` mutation. */
export type UpdateUserInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `User` being updated. */
  patch: UserPatch;
  id: Scalars['Int'];
};

/** The output of our update `User` mutation. */
export type UpdateUserPayload = {
  __typename?: 'UpdateUserPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was updated by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `User`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `WorkoutPlan` that is related to this `User`. */
  currentWorkoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our update `User` mutation. */
export type UpdateUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the `updateWorkoutPlanByNodeId` mutation. */
export type UpdateWorkoutPlanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlan` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `WorkoutPlan` being updated. */
  patch: WorkoutPlanPatch;
};

/** All input for the `updateWorkoutPlanByUserIdAndName` mutation. */
export type UpdateWorkoutPlanByUserIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlan` being updated. */
  patch: WorkoutPlanPatch;
  userId: Scalars['Int'];
  name: Scalars['String'];
};

/** All input for the `updateWorkoutPlanDayByNodeId` mutation. */
export type UpdateWorkoutPlanDayByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlanDay` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `WorkoutPlanDay` being updated. */
  patch: WorkoutPlanDayPatch;
};

/** All input for the `updateWorkoutPlanDayByWorkoutPlanIdAndName` mutation. */
export type UpdateWorkoutPlanDayByWorkoutPlanIdAndNameInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `WorkoutPlanDay` being updated. */
  patch: WorkoutPlanDayPatch;
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
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
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our update `WorkoutPlanDay` mutation. */
export type UpdateWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
};

/** All input for the `updateWorkoutPlanExerciseByNodeId` mutation. */
export type UpdateWorkoutPlanExerciseByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `WorkoutPlanExercise` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `WorkoutPlanExercise` being updated. */
  patch: WorkoutPlanExercisePatch;
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
  /** An edge for our `WorkoutPlanExercise`. May be used by Relay 1. */
  workoutPlanExerciseEdge?: Maybe<WorkoutPlanExercisesEdge>;
};


/** The output of our update `WorkoutPlanExercise` mutation. */
export type UpdateWorkoutPlanExercisePayloadWorkoutPlanExerciseEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
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
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** An edge for our `WorkoutPlan`. May be used by Relay 1. */
  workoutPlanEdge?: Maybe<WorkoutPlansEdge>;
};


/** The output of our update `WorkoutPlan` mutation. */
export type UpdateWorkoutPlanPayloadWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
};

/** All input for the upsert `Battle` mutation. */
export type UpsertBattleInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Battle` to be upserted by this mutation. */
  battle: BattleInput;
};

/** The output of our upsert `Battle` mutation. */
export type UpsertBattlePayload = {
  __typename?: 'UpsertBattlePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Battle` that was upserted by this mutation. */
  battle?: Maybe<Battle>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Enemy` that is related to this `Battle`. */
  enemyByEnemyLevel: Enemy;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname: Group;
  /** An edge for our `Battle`. May be used by Relay 1. */
  battleEdge?: Maybe<BattlesEdge>;
};


/** The output of our upsert `Battle` mutation. */
export type UpsertBattlePayloadBattleEdgeArgs = {
  orderBy?: Maybe<Array<BattlesOrderBy>>;
};

/** All input for the upsert `Bodystat` mutation. */
export type UpsertBodystatInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` to be upserted by this mutation. */
  bodystat: BodystatInput;
};

/** The output of our upsert `Bodystat` mutation. */
export type UpsertBodystatPayload = {
  __typename?: 'UpsertBodystatPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Bodystat` that was upserted by this mutation. */
  bodystat?: Maybe<Bodystat>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `Bodystat`. */
  user: User;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our upsert `Bodystat` mutation. */
export type UpsertBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the upsert `CompletedWorkoutExercise` mutation. */
export type UpsertCompletedWorkoutExerciseInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` to be upserted by this mutation. */
  completedWorkoutExercise: CompletedWorkoutExerciseInput;
};

/** The output of our upsert `CompletedWorkoutExercise` mutation. */
export type UpsertCompletedWorkoutExercisePayload = {
  __typename?: 'UpsertCompletedWorkoutExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was upserted by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our upsert `CompletedWorkoutExercise` mutation. */
export type UpsertCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
};

/** All input for the upsert `CompletedWorkout` mutation. */
export type UpsertCompletedWorkoutInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` to be upserted by this mutation. */
  completedWorkout: CompletedWorkoutInput;
};

/** The output of our upsert `CompletedWorkout` mutation. */
export type UpsertCompletedWorkoutPayload = {
  __typename?: 'UpsertCompletedWorkoutPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkout` that was upserted by this mutation. */
  completedWorkout?: Maybe<CompletedWorkout>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `CompletedWorkout`. May be used by Relay 1. */
  completedWorkoutEdge?: Maybe<CompletedWorkoutsEdge>;
};


/** The output of our upsert `CompletedWorkout` mutation. */
export type UpsertCompletedWorkoutPayloadCompletedWorkoutEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutsOrderBy>>;
};

/** All input for the upsert `Exercise` mutation. */
export type UpsertExerciseInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` to be upserted by this mutation. */
  exercise: ExerciseInput;
};

/** The output of our upsert `Exercise` mutation. */
export type UpsertExercisePayload = {
  __typename?: 'UpsertExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Exercise` that was upserted by this mutation. */
  exercise?: Maybe<Exercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Exercise`. May be used by Relay 1. */
  exerciseEdge?: Maybe<ExercisesEdge>;
};


/** The output of our upsert `Exercise` mutation. */
export type UpsertExercisePayloadExerciseEdgeArgs = {
  orderBy?: Maybe<Array<ExercisesOrderBy>>;
};

/** All input for the upsert `Group` mutation. */
export type UpsertGroupInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` to be upserted by this mutation. */
  group: GroupInput;
};

/** The output of our upsert `Group` mutation. */
export type UpsertGroupPayload = {
  __typename?: 'UpsertGroupPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Group` that was upserted by this mutation. */
  group?: Maybe<Group>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Battle` that is related to this `Group`. */
  battleByNameAndBattleNumber?: Maybe<Battle>;
  /** An edge for our `Group`. May be used by Relay 1. */
  groupEdge?: Maybe<GroupsEdge>;
};


/** The output of our upsert `Group` mutation. */
export type UpsertGroupPayloadGroupEdgeArgs = {
  orderBy?: Maybe<Array<GroupsOrderBy>>;
};

/** All input for the upsert `SessionAnalytic` mutation. */
export type UpsertSessionAnalyticInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` to be upserted by this mutation. */
  sessionAnalytic: SessionAnalyticInput;
};

/** The output of our upsert `SessionAnalytic` mutation. */
export type UpsertSessionAnalyticPayload = {
  __typename?: 'UpsertSessionAnalyticPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `SessionAnalytic` that was upserted by this mutation. */
  sessionAnalytic?: Maybe<SessionAnalytic>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `SessionAnalytic`. */
  user: User;
  /** An edge for our `SessionAnalytic`. May be used by Relay 1. */
  sessionAnalyticEdge?: Maybe<SessionAnalyticsEdge>;
};


/** The output of our upsert `SessionAnalytic` mutation. */
export type UpsertSessionAnalyticPayloadSessionAnalyticEdgeArgs = {
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
};

/** All input for the upsert `UserExercise` mutation. */
export type UpsertUserExerciseInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` to be upserted by this mutation. */
  userExercise: UserExerciseInput;
};

/** The output of our upsert `UserExercise` mutation. */
export type UpsertUserExercisePayload = {
  __typename?: 'UpsertUserExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserExercise` that was upserted by this mutation. */
  userExercise?: Maybe<UserExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Battle` that is related to this `UserExercise`. */
  battleByGroupnameAndBattleNumber?: Maybe<Battle>;
  /** Reads a single `User` that is related to this `UserExercise`. */
  user: User;
  /** An edge for our `UserExercise`. May be used by Relay 1. */
  userExerciseEdge?: Maybe<UserExercisesEdge>;
};


/** The output of our upsert `UserExercise` mutation. */
export type UpsertUserExercisePayloadUserExerciseEdgeArgs = {
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
};

/** All input for the upsert `User` mutation. */
export type UpsertUserInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` to be upserted by this mutation. */
  user: UserInput;
};

/** The output of our upsert `User` mutation. */
export type UpsertUserPayload = {
  __typename?: 'UpsertUserPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `User` that was upserted by this mutation. */
  user?: Maybe<User>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `User`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `WorkoutPlan` that is related to this `User`. */
  currentWorkoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `User`. May be used by Relay 1. */
  userEdge?: Maybe<UsersEdge>;
};


/** The output of our upsert `User` mutation. */
export type UpsertUserPayloadUserEdgeArgs = {
  orderBy?: Maybe<Array<UsersOrderBy>>;
};

/** All input for the upsert `Volume` mutation. */
export type UpsertVolumeInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Volume` to be upserted by this mutation. */
  volume: VolumeInput;
};

/** The output of our upsert `Volume` mutation. */
export type UpsertVolumePayload = {
  __typename?: 'UpsertVolumePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `Volume` that was upserted by this mutation. */
  volume?: Maybe<Volume>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** An edge for our `Volume`. May be used by Relay 1. */
  volumeEdge?: Maybe<VolumesEdge>;
};


/** The output of our upsert `Volume` mutation. */
export type UpsertVolumePayloadVolumeEdgeArgs = {
  orderBy?: Maybe<Array<VolumesOrderBy>>;
};

/** All input for the upsert `WorkoutPlanDay` mutation. */
export type UpsertWorkoutPlanDayInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` to be upserted by this mutation. */
  workoutPlanDay: WorkoutPlanDayInput;
};

/** The output of our upsert `WorkoutPlanDay` mutation. */
export type UpsertWorkoutPlanDayPayload = {
  __typename?: 'UpsertWorkoutPlanDayPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanDay` that was upserted by this mutation. */
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our upsert `WorkoutPlanDay` mutation. */
export type UpsertWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
};

/** All input for the upsert `WorkoutPlanExercise` mutation. */
export type UpsertWorkoutPlanExerciseInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` to be upserted by this mutation. */
  workoutPlanExercise: WorkoutPlanExerciseInput;
};

/** The output of our upsert `WorkoutPlanExercise` mutation. */
export type UpsertWorkoutPlanExercisePayload = {
  __typename?: 'UpsertWorkoutPlanExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlanExercise` that was upserted by this mutation. */
  workoutPlanExercise?: Maybe<WorkoutPlanExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise: Exercise;
  /** Reads a single `WorkoutPlanDay` that is related to this `WorkoutPlanExercise`. */
  workoutPlanDay: WorkoutPlanDay;
  /** An edge for our `WorkoutPlanExercise`. May be used by Relay 1. */
  workoutPlanExerciseEdge?: Maybe<WorkoutPlanExercisesEdge>;
};


/** The output of our upsert `WorkoutPlanExercise` mutation. */
export type UpsertWorkoutPlanExercisePayloadWorkoutPlanExerciseEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanExercisesOrderBy>>;
};

/** All input for the upsert `WorkoutPlan` mutation. */
export type UpsertWorkoutPlanInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` to be upserted by this mutation. */
  workoutPlan: WorkoutPlanInput;
};

/** The output of our upsert `WorkoutPlan` mutation. */
export type UpsertWorkoutPlanPayload = {
  __typename?: 'UpsertWorkoutPlanPayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `WorkoutPlan` that was upserted by this mutation. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** An edge for our `WorkoutPlan`. May be used by Relay 1. */
  workoutPlanEdge?: Maybe<WorkoutPlansEdge>;
};


/** The output of our upsert `WorkoutPlan` mutation. */
export type UpsertWorkoutPlanPayloadWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
};

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  username: Scalars['String'];
  groupname?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  id: Scalars['Int'];
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
  /** Reads a single `Group` that is related to this `User`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `WorkoutPlan` that is related to this `User`. */
  currentWorkoutPlan?: Maybe<WorkoutPlan>;
  /** Reads a single `Bodystat` that is related to this `User`. */
  bodystat?: Maybe<Bodystat>;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercises: UserExercisesConnection;
  /** Reads and enables pagination through a set of `SessionAnalytic`. */
  sessionAnalytics: SessionAnalyticsConnection;
  /** Reads and enables pagination through a set of `WorkoutPlan`. */
  workoutPlans: WorkoutPlansConnection;
};


export type UserUserExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserExercisesOrderBy>>;
  condition?: Maybe<UserExerciseCondition>;
  filter?: Maybe<UserExerciseFilter>;
};


export type UserSessionAnalyticsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
  condition?: Maybe<SessionAnalyticCondition>;
  filter?: Maybe<SessionAnalyticFilter>;
};


export type UserWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<WorkoutPlansOrderBy>>;
  condition?: Maybe<WorkoutPlanCondition>;
  filter?: Maybe<WorkoutPlanFilter>;
};

/** A condition to be used against `User` object types. All fields are tested for equality and combined with a logical ‘and.’ */
export type UserCondition = {
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `groupname` field. */
  groupname?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `currentWorkoutPlanId` field. */
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
};

export type UserExercise = Node & {
  __typename?: 'UserExercise';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  username: Scalars['String'];
  repetitions: Scalars['Int'];
  liftmass: Scalars['Float'];
  strongerpercentage: Scalars['Int'];
  groupname?: Maybe<Scalars['String']>;
  battleNumber?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  userId: Scalars['Int'];
  /** Reads a single `Battle` that is related to this `UserExercise`. */
  battleByGroupnameAndBattleNumber?: Maybe<Battle>;
  /** Reads a single `User` that is related to this `UserExercise`. */
  user: User;
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
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `UserExercise` object types. All fields are combined with a logical ‘and.’ */
export type UserExerciseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `groupname` field. */
  groupname?: Maybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
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
  userId?: Maybe<Scalars['Int']>;
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
  userId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `UserExercise` values. */
export type UserExercisesConnection = {
  __typename?: 'UserExercisesConnection';
  /** A list of `UserExercise` objects. */
  nodes: Array<UserExercise>;
  /** A list of edges which contains the `UserExercise` and cursor to aid in pagination. */
  edges: Array<UserExercisesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserExercise` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserExercise` edge in the connection. */
export type UserExercisesEdge = {
  __typename?: 'UserExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserExercise` at the end of the edge. */
  node: UserExercise;
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
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** A filter to be used against `User` object types. All fields are combined with a logical ‘and.’ */
export type UserFilter = {
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `groupname` field. */
  groupname?: Maybe<StringFilter>;
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `currentWorkoutPlanId` field. */
  currentWorkoutPlanId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** An input for mutations affecting `User` */
export type UserInput = {
  username: Scalars['String'];
  groupname?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['Int']>;
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  id?: Maybe<Scalars['Int']>;
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `User` values. */
export type UsersConnection = {
  __typename?: 'UsersConnection';
  /** A list of `User` objects. */
  nodes: Array<User>;
  /** A list of edges which contains the `User` and cursor to aid in pagination. */
  edges: Array<UsersEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `User` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `User` edge in the connection. */
export type UsersEdge = {
  __typename?: 'UsersEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `User` at the end of the edge. */
  node: User;
};

/** Methods to use when ordering `User`. */
export enum UsersOrderBy {
  Natural = 'NATURAL',
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  GroupnameAsc = 'GROUPNAME_ASC',
  GroupnameDesc = 'GROUPNAME_DESC',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  CurrentWorkoutPlanIdAsc = 'CURRENT_WORKOUT_PLAN_ID_ASC',
  CurrentWorkoutPlanIdDesc = 'CURRENT_WORKOUT_PLAN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Volume = {
  __typename?: 'Volume';
  weight: Scalars['Float'];
  reps: Scalars['Int'];
};

/** An input for mutations affecting `Volume` */
export type VolumeInput = {
  weight: Scalars['Float'];
  reps: Scalars['Int'];
};

/** A connection to a list of `Volume` values. */
export type VolumesConnection = {
  __typename?: 'VolumesConnection';
  /** A list of `Volume` objects. */
  nodes: Array<Volume>;
  /** A list of edges which contains the `Volume` and cursor to aid in pagination. */
  edges: Array<VolumesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Volume` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `Volume` edge in the connection. */
export type VolumesEdge = {
  __typename?: 'VolumesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `Volume` at the end of the edge. */
  node: Volume;
};

/** Methods to use when ordering `Volume`. */
export enum VolumesOrderBy {
  Natural = 'NATURAL'
}

export type WorkoutPlan = Node & {
  __typename?: 'WorkoutPlan';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  userId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `User`. */
  usersByCurrentWorkoutPlanId: UsersConnection;
  /** Reads and enables pagination through a set of `WorkoutPlanDay`. */
  workoutPlanDays: WorkoutPlanDaysConnection;
};


export type WorkoutPlanUsersByCurrentWorkoutPlanIdArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UsersOrderBy>>;
  condition?: Maybe<UserCondition>;
  filter?: Maybe<UserFilter>;
};


export type WorkoutPlanWorkoutPlanDaysArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
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
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

export type WorkoutPlanDay = Node & {
  __typename?: 'WorkoutPlanDay';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan: WorkoutPlan;
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises: WorkoutPlanExercisesConnection;
};


export type WorkoutPlanDayWorkoutPlanExercisesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
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
  workoutPlanId: Scalars['Int'];
  name: Scalars['String'];
};

/** Represents an update to a `WorkoutPlanDay`. Fields that are set will be updated. */
export type WorkoutPlanDayPatch = {
  id?: Maybe<Scalars['Int']>;
  workoutPlanId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `WorkoutPlanDay` values. */
export type WorkoutPlanDaysConnection = {
  __typename?: 'WorkoutPlanDaysConnection';
  /** A list of `WorkoutPlanDay` objects. */
  nodes: Array<WorkoutPlanDay>;
  /** A list of edges which contains the `WorkoutPlanDay` and cursor to aid in pagination. */
  edges: Array<WorkoutPlanDaysEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutPlanDay` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `WorkoutPlanDay` edge in the connection. */
export type WorkoutPlanDaysEdge = {
  __typename?: 'WorkoutPlanDaysEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `WorkoutPlanDay` at the end of the edge. */
  node: WorkoutPlanDay;
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

export type WorkoutPlanExercise = Node & {
  __typename?: 'WorkoutPlanExercise';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
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

/** A connection to a list of `WorkoutPlanExercise` values. */
export type WorkoutPlanExercisesConnection = {
  __typename?: 'WorkoutPlanExercisesConnection';
  /** A list of `WorkoutPlanExercise` objects. */
  nodes: Array<WorkoutPlanExercise>;
  /** A list of edges which contains the `WorkoutPlanExercise` and cursor to aid in pagination. */
  edges: Array<WorkoutPlanExercisesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutPlanExercise` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `WorkoutPlanExercise` edge in the connection. */
export type WorkoutPlanExercisesEdge = {
  __typename?: 'WorkoutPlanExercisesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `WorkoutPlanExercise` at the end of the edge. */
  node: WorkoutPlanExercise;
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
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<WorkoutPlanFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<WorkoutPlanFilter>>;
  /** Negates the expression. */
  not?: Maybe<WorkoutPlanFilter>;
};

/** An input for mutations affecting `WorkoutPlan` */
export type WorkoutPlanInput = {
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  userId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** Represents an update to a `WorkoutPlan`. Fields that are set will be updated. */
export type WorkoutPlanPatch = {
  id?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  userId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
};

/** A connection to a list of `WorkoutPlan` values. */
export type WorkoutPlansConnection = {
  __typename?: 'WorkoutPlansConnection';
  /** A list of `WorkoutPlan` objects. */
  nodes: Array<WorkoutPlan>;
  /** A list of edges which contains the `WorkoutPlan` and cursor to aid in pagination. */
  edges: Array<WorkoutPlansEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `WorkoutPlan` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `WorkoutPlan` edge in the connection. */
export type WorkoutPlansEdge = {
  __typename?: 'WorkoutPlansEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `WorkoutPlan` at the end of the edge. */
  node: WorkoutPlan;
};

/** Methods to use when ordering `WorkoutPlan`. */
export enum WorkoutPlansOrderBy {
  Natural = 'NATURAL',
  IdAsc = 'ID_ASC',
  IdDesc = 'ID_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

/** All input for the create mn`CompletedWorkoutExercise` mutation. */
export type MnCreateCompletedWorkoutExerciseInput = {
  /** An arbitrary string value with no semantic meaning. Will be included in the payload verbatim. May be used to track mutations by the client. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The one or many `CompletedWorkoutExercise` to be created by this mutation. */
  mnCompletedWorkoutExercise?: Maybe<Array<CompletedWorkoutExerciseInput>>;
};

/** The output of our many create `CompletedWorkoutExercise` mutation. */
export type MnCreateCompletedWorkoutExercisePayload = {
  __typename?: 'mnCreateCompletedWorkoutExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was created by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our many create `CompletedWorkoutExercise` mutation. */
export type MnCreateCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
};

/** All input for the delete `mnDeleteCompletedWorkoutExercise` mutation. */
export type MnDeleteCompletedWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The one or many `CompletedWorkoutExercise` to be deleted. You must provide the PK values! */
  mnPatch?: Maybe<Array<CompletedWorkoutExercisePatch>>;
};

/** The output of our delete mn `CompletedWorkoutExercise` mutation. */
export type MnDeleteCompletedWorkoutExercisePayload = {
  __typename?: 'mnDeleteCompletedWorkoutExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input, unchanged and unused. May be used by a client to track mutations. */
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
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our delete mn `CompletedWorkoutExercise` mutation. */
export type MnDeleteCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
};

/** All input for the update `mnUpdateCompletedWorkoutExercise` mutation. */
export type MnUpdateCompletedWorkoutExerciseInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The one or many `CompletedWorkoutExercise` to be updated. */
  mnPatch?: Maybe<Array<CompletedWorkoutExercisePatch>>;
};

/** The output of our update mn `CompletedWorkoutExercise` mutation. */
export type MnUpdateCompletedWorkoutExercisePayload = {
  __typename?: 'mnUpdateCompletedWorkoutExercisePayload';
  /** The exact same `clientMutationId` that was provided in the mutation input,                 unchanged and unused. May be used by a client to track mutations. */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `CompletedWorkoutExercise` that was updated by this mutation. */
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise: Exercise;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout: CompletedWorkout;
  /** An edge for our `CompletedWorkoutExercise`. May be used by Relay 1. */
  completedWorkoutExerciseEdge?: Maybe<CompletedWorkoutExercisesEdge>;
};


/** The output of our update mn `CompletedWorkoutExercise` mutation. */
export type MnUpdateCompletedWorkoutExercisePayloadCompletedWorkoutExerciseEdgeArgs = {
  orderBy?: Maybe<Array<CompletedWorkoutExercisesOrderBy>>;
};

export type ActiveUserCurrentWorkoutPlanIdQueryVariables = Exact<{ [key: string]: never; }>;


export type ActiveUserCurrentWorkoutPlanIdQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'currentWorkoutPlanId'>
  )> }
);

export type CreateWorkoutPlanMutationVariables = Exact<{
  name: Scalars['String'];
  userId: Scalars['Int'];
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

export type CreateCompletedWorkoutMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateCompletedWorkoutMutation = (
  { __typename?: 'Mutation' }
  & { createCompletedWorkout?: Maybe<(
    { __typename?: 'CreateCompletedWorkoutPayload' }
    & { completedWorkout?: Maybe<(
      { __typename?: 'CompletedWorkout' }
      & Pick<CompletedWorkout, 'id'>
    )> }
  )> }
);

export type CreateCompletedWorkoutExercisesMutationVariables = Exact<{
  completedExercises?: Maybe<Array<CompletedWorkoutExerciseInput> | CompletedWorkoutExerciseInput>;
}>;


export type CreateCompletedWorkoutExercisesMutation = (
  { __typename?: 'Mutation' }
  & { mnCreateCompletedWorkoutExercise?: Maybe<(
    { __typename?: 'mnCreateCompletedWorkoutExercisePayload' }
    & { completedWorkoutExercise?: Maybe<(
      { __typename?: 'CompletedWorkoutExercise' }
      & { volumes: Array<Maybe<(
        { __typename?: 'Volume' }
        & Pick<Volume, 'reps' | 'weight'>
      )>> }
    )>, exercise: (
      { __typename?: 'Exercise' }
      & Pick<Exercise, 'bodyPart'>
    ) }
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

export type UpdateWorkoutPlanExerciseSetsMutationVariables = Exact<{
  id: Scalars['Int'];
  sets: Scalars['Int'];
}>;


export type UpdateWorkoutPlanExerciseSetsMutation = (
  { __typename?: 'Mutation' }
  & { updateWorkoutPlanExercise?: Maybe<(
    { __typename?: 'UpdateWorkoutPlanExercisePayload' }
    & { workoutPlanExercise?: Maybe<(
      { __typename?: 'WorkoutPlanExercise' }
      & Pick<WorkoutPlanExercise, 'id' | 'sets'>
    )> }
  )> }
);

export type WorkoutPlanDayByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkoutPlanDayByIdQuery = (
  { __typename?: 'Query' }
  & { workoutPlanDay?: Maybe<(
    { __typename?: 'WorkoutPlanDay' }
    & Pick<WorkoutPlanDay, 'id'>
    & { workoutPlanExercises: (
      { __typename?: 'WorkoutPlanExercisesConnection' }
      & { nodes: Array<(
        { __typename?: 'WorkoutPlanExercise' }
        & WorkoutPlanExerciseFragment
      )> }
    ) }
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

export type WorkoutPlanByIdQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type WorkoutPlanByIdQuery = (
  { __typename?: 'Query' }
  & { workoutPlan?: Maybe<(
    { __typename?: 'WorkoutPlan' }
    & { workoutPlanDays: (
      { __typename?: 'WorkoutPlanDaysConnection' }
      & { nodes: Array<(
        { __typename?: 'WorkoutPlanDay' }
        & Pick<WorkoutPlanDay, 'name' | 'id'>
        & { workoutPlanExercises: (
          { __typename?: 'WorkoutPlanExercisesConnection' }
          & Pick<WorkoutPlanExercisesConnection, 'totalCount'>
        ) }
      )> }
    ) }
  )> }
);

export type UpdateUserCurrentWorkoutPlanMutationVariables = Exact<{
  userId: Scalars['Int'];
  currentWorkoutPlanId?: Maybe<Scalars['Int']>;
}>;


export type UpdateUserCurrentWorkoutPlanMutation = (
  { __typename?: 'Mutation' }
  & { updateUser?: Maybe<(
    { __typename?: 'UpdateUserPayload' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'currentWorkoutPlanId'>
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
    { __typename?: 'User' }
    & Pick<User, 'id' | 'currentWorkoutPlanId'>
    & { workoutPlans: (
      { __typename?: 'WorkoutPlansConnection' }
      & { nodes: Array<(
        { __typename?: 'WorkoutPlan' }
        & WorkoutPlanFragment
      )> }
    ) }
  )> }
);

export type BodystatFragment = (
  { __typename?: 'Bodystat' }
  & Pick<Bodystat, 'ismale' | 'bodymass'>
);

export type BodyStatQueryVariables = Exact<{ [key: string]: never; }>;


export type BodyStatQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id'>
    & { bodystat?: Maybe<(
      { __typename?: 'Bodystat' }
      & BodystatFragment
    )> }
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
  & { exercises?: Maybe<(
    { __typename?: 'ExercisesConnection' }
    & { nodes: Array<(
      { __typename?: 'Exercise' }
      & ExerciseFragment
    )> }
  )> }
);

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
export const WorkoutPlanFragmentDoc = gql`
    fragment WorkoutPlan on WorkoutPlan {
  name
  id
}
    `;
export const BodystatFragmentDoc = gql`
    fragment Bodystat on Bodystat {
  ismale
  bodymass
}
    `;
export const ExerciseFragmentDoc = gql`
    fragment Exercise on Exercise {
  id
  bodyPart
  exerciseType
  name
  eliteStrengthBaseline
}
    `;
export const ActiveUserCurrentWorkoutPlanIdDocument = gql`
    query activeUserCurrentWorkoutPlanId {
  activeUser {
    id
    currentWorkoutPlanId
  }
}
    `;

/**
 * __useActiveUserCurrentWorkoutPlanIdQuery__
 *
 * To run a query within a React component, call `useActiveUserCurrentWorkoutPlanIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useActiveUserCurrentWorkoutPlanIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActiveUserCurrentWorkoutPlanIdQuery({
 *   variables: {
 *   },
 * });
 */
export function useActiveUserCurrentWorkoutPlanIdQuery(baseOptions?: Apollo.QueryHookOptions<ActiveUserCurrentWorkoutPlanIdQuery, ActiveUserCurrentWorkoutPlanIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActiveUserCurrentWorkoutPlanIdQuery, ActiveUserCurrentWorkoutPlanIdQueryVariables>(ActiveUserCurrentWorkoutPlanIdDocument, options);
      }
export function useActiveUserCurrentWorkoutPlanIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActiveUserCurrentWorkoutPlanIdQuery, ActiveUserCurrentWorkoutPlanIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActiveUserCurrentWorkoutPlanIdQuery, ActiveUserCurrentWorkoutPlanIdQueryVariables>(ActiveUserCurrentWorkoutPlanIdDocument, options);
        }
export type ActiveUserCurrentWorkoutPlanIdQueryHookResult = ReturnType<typeof useActiveUserCurrentWorkoutPlanIdQuery>;
export type ActiveUserCurrentWorkoutPlanIdLazyQueryHookResult = ReturnType<typeof useActiveUserCurrentWorkoutPlanIdLazyQuery>;
export type ActiveUserCurrentWorkoutPlanIdQueryResult = Apollo.QueryResult<ActiveUserCurrentWorkoutPlanIdQuery, ActiveUserCurrentWorkoutPlanIdQueryVariables>;
export const CreateWorkoutPlanDocument = gql`
    mutation createWorkoutPlan($name: String!, $userId: Int!) {
  createWorkoutPlan(input: {workoutPlan: {name: $name, userId: $userId}}) {
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
 *      userId: // value for 'userId'
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
export const CreateCompletedWorkoutDocument = gql`
    mutation createCompletedWorkout {
  createCompletedWorkout(input: {completedWorkout: {}}) {
    completedWorkout {
      id
    }
  }
}
    `;
export type CreateCompletedWorkoutMutationFn = Apollo.MutationFunction<CreateCompletedWorkoutMutation, CreateCompletedWorkoutMutationVariables>;

/**
 * __useCreateCompletedWorkoutMutation__
 *
 * To run a mutation, you first call `useCreateCompletedWorkoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompletedWorkoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompletedWorkoutMutation, { data, loading, error }] = useCreateCompletedWorkoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateCompletedWorkoutMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompletedWorkoutMutation, CreateCompletedWorkoutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompletedWorkoutMutation, CreateCompletedWorkoutMutationVariables>(CreateCompletedWorkoutDocument, options);
      }
export type CreateCompletedWorkoutMutationHookResult = ReturnType<typeof useCreateCompletedWorkoutMutation>;
export type CreateCompletedWorkoutMutationResult = Apollo.MutationResult<CreateCompletedWorkoutMutation>;
export type CreateCompletedWorkoutMutationOptions = Apollo.BaseMutationOptions<CreateCompletedWorkoutMutation, CreateCompletedWorkoutMutationVariables>;
export const CreateCompletedWorkoutExercisesDocument = gql`
    mutation createCompletedWorkoutExercises($completedExercises: [CompletedWorkoutExerciseInput!]) {
  mnCreateCompletedWorkoutExercise(
    input: {mnCompletedWorkoutExercise: $completedExercises}
  ) {
    completedWorkoutExercise {
      volumes {
        reps
        weight
      }
    }
    exercise {
      bodyPart
    }
  }
}
    `;
export type CreateCompletedWorkoutExercisesMutationFn = Apollo.MutationFunction<CreateCompletedWorkoutExercisesMutation, CreateCompletedWorkoutExercisesMutationVariables>;

/**
 * __useCreateCompletedWorkoutExercisesMutation__
 *
 * To run a mutation, you first call `useCreateCompletedWorkoutExercisesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCompletedWorkoutExercisesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCompletedWorkoutExercisesMutation, { data, loading, error }] = useCreateCompletedWorkoutExercisesMutation({
 *   variables: {
 *      completedExercises: // value for 'completedExercises'
 *   },
 * });
 */
export function useCreateCompletedWorkoutExercisesMutation(baseOptions?: Apollo.MutationHookOptions<CreateCompletedWorkoutExercisesMutation, CreateCompletedWorkoutExercisesMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCompletedWorkoutExercisesMutation, CreateCompletedWorkoutExercisesMutationVariables>(CreateCompletedWorkoutExercisesDocument, options);
      }
export type CreateCompletedWorkoutExercisesMutationHookResult = ReturnType<typeof useCreateCompletedWorkoutExercisesMutation>;
export type CreateCompletedWorkoutExercisesMutationResult = Apollo.MutationResult<CreateCompletedWorkoutExercisesMutation>;
export type CreateCompletedWorkoutExercisesMutationOptions = Apollo.BaseMutationOptions<CreateCompletedWorkoutExercisesMutation, CreateCompletedWorkoutExercisesMutationVariables>;
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
export const UpdateWorkoutPlanExerciseSetsDocument = gql`
    mutation updateWorkoutPlanExerciseSets($id: Int!, $sets: Int!) {
  updateWorkoutPlanExercise(input: {id: $id, patch: {sets: $sets}}) {
    workoutPlanExercise {
      id
      sets
    }
  }
}
    `;
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
  workoutPlanDay(id: $id) {
    id
    workoutPlanExercises {
      nodes {
        ...WorkoutPlanExercise
      }
    }
  }
}
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
export const WorkoutPlanByIdDocument = gql`
    query WorkoutPlanById($id: Int!) {
  workoutPlan(id: $id) {
    workoutPlanDays {
      nodes {
        name
        id
        workoutPlanExercises {
          totalCount
        }
      }
    }
  }
}
    `;

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
export const UpdateUserCurrentWorkoutPlanDocument = gql`
    mutation updateUserCurrentWorkoutPlan($userId: Int!, $currentWorkoutPlanId: Int) {
  updateUser(
    input: {id: $userId, patch: {currentWorkoutPlanId: $currentWorkoutPlanId}}
  ) {
    user {
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
      nodes {
        ...WorkoutPlan
      }
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
export const BodyStatDocument = gql`
    query BodyStat {
  activeUser {
    id
    bodystat {
      ...Bodystat
    }
  }
}
    ${BodystatFragmentDoc}`;

/**
 * __useBodyStatQuery__
 *
 * To run a query within a React component, call `useBodyStatQuery` and pass it any options that fit your needs.
 * When your component renders, `useBodyStatQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useBodyStatQuery({
 *   variables: {
 *   },
 * });
 */
export function useBodyStatQuery(baseOptions?: Apollo.QueryHookOptions<BodyStatQuery, BodyStatQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<BodyStatQuery, BodyStatQueryVariables>(BodyStatDocument, options);
      }
export function useBodyStatLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<BodyStatQuery, BodyStatQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<BodyStatQuery, BodyStatQueryVariables>(BodyStatDocument, options);
        }
export type BodyStatQueryHookResult = ReturnType<typeof useBodyStatQuery>;
export type BodyStatLazyQueryHookResult = ReturnType<typeof useBodyStatLazyQuery>;
export type BodyStatQueryResult = Apollo.QueryResult<BodyStatQuery, BodyStatQueryVariables>;
export const ExerciseSearchDocument = gql`
    query exerciseSearch($query: String!) {
  exercises(filter: {name: {includesInsensitive: $query}}, first: 10) {
    nodes {
      ...Exercise
    }
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