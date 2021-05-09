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
  enemyByEnemyLevel?: Maybe<Enemy>;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname?: Maybe<Group>;
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
  username: Scalars['String'];
  ismale: Scalars['Boolean'];
  bodymass: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  userId: Scalars['Int'];
  /** Reads a single `User` that is related to this `Bodystat`. */
  user?: Maybe<User>;
};

/**
 * A condition to be used against `Bodystat` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type BodystatCondition = {
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `Bodystat` object types. All fields are combined with a logical ‘and.’ */
export type BodystatFilter = {
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<BodystatFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<BodystatFilter>>;
  /** Negates the expression. */
  not?: Maybe<BodystatFilter>;
};

/** An input for mutations affecting `Bodystat` */
export type BodystatInput = {
  username: Scalars['String'];
  ismale: Scalars['Boolean'];
  bodymass: Scalars['Int'];
  userId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `Bodystat`. Fields that are set will be updated. */
export type BodystatPatch = {
  username?: Maybe<Scalars['String']>;
  ismale?: Maybe<Scalars['Boolean']>;
  bodymass?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  userId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `Bodystat` values. */
export type BodystatsConnection = {
  __typename?: 'BodystatsConnection';
  /** A list of `Bodystat` objects. */
  nodes: Array<Bodystat>;
  /** A list of edges which contains the `Bodystat` and cursor to aid in pagination. */
  edges: Array<BodystatsEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `Bodystat` you could get from the connection. */
  totalCount: Scalars['Int'];
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
  UsernameAsc = 'USERNAME_ASC',
  UsernameDesc = 'USERNAME_DESC',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type ChatMessage = Node & {
  __typename?: 'ChatMessage';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  username: Scalars['String'];
  textContent: Scalars['String'];
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  groupname: Scalars['String'];
  userId: Scalars['Int'];
  /** Reads a single `Group` that is related to this `ChatMessage`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `User` that is related to this `ChatMessage`. */
  user?: Maybe<User>;
};

/**
 * A condition to be used against `ChatMessage` object types. All fields are tested
 * for equality and combined with a logical ‘and.’
 */
export type ChatMessageCondition = {
  /** Checks for equality with the object’s `id` field. */
  id?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `username` field. */
  username?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `groupname` field. */
  groupname?: Maybe<Scalars['String']>;
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `ChatMessage` object types. All fields are combined with a logical ‘and.’ */
export type ChatMessageFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
  /** Filter by the object’s `username` field. */
  username?: Maybe<StringFilter>;
  /** Filter by the object’s `groupname` field. */
  groupname?: Maybe<StringFilter>;
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<ChatMessageFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<ChatMessageFilter>>;
  /** Negates the expression. */
  not?: Maybe<ChatMessageFilter>;
};

/** An input for mutations affecting `ChatMessage` */
export type ChatMessageInput = {
  username: Scalars['String'];
  textContent: Scalars['String'];
  userId?: Maybe<Scalars['Int']>;
};

/** Represents an update to a `ChatMessage`. Fields that are set will be updated. */
export type ChatMessagePatch = {
  id?: Maybe<Scalars['Int']>;
  username?: Maybe<Scalars['String']>;
  textContent?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  groupname?: Maybe<Scalars['String']>;
  userId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `ChatMessage` values. */
export type ChatMessagesConnection = {
  __typename?: 'ChatMessagesConnection';
  /** A list of `ChatMessage` objects. */
  nodes: Array<ChatMessage>;
  /** A list of edges which contains the `ChatMessage` and cursor to aid in pagination. */
  edges: Array<ChatMessagesEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `ChatMessage` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `ChatMessage` edge in the connection. */
export type ChatMessagesEdge = {
  __typename?: 'ChatMessagesEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `ChatMessage` at the end of the edge. */
  node: ChatMessage;
};

/** Methods to use when ordering `ChatMessage`. */
export enum ChatMessagesOrderBy {
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
  volume: Array<Maybe<Volume>>;
  completedWorkoutId?: Maybe<Scalars['Int']>;
  createdAt: Scalars['Datetime'];
  /** Reads a single `Exercise` that is related to this `CompletedWorkoutExercise`. */
  exercise?: Maybe<Exercise>;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout?: Maybe<CompletedWorkout>;
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
  volume: Array<Maybe<VolumeInput>>;
  completedWorkoutId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
};

/** Represents an update to a `CompletedWorkoutExercise`. Fields that are set will be updated. */
export type CompletedWorkoutExercisePatch = {
  id?: Maybe<Scalars['Int']>;
  exerciseId?: Maybe<Scalars['Int']>;
  volume?: Maybe<Array<Maybe<VolumeInput>>>;
  completedWorkoutId?: Maybe<Scalars['Int']>;
  createdAt?: Maybe<Scalars['Datetime']>;
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
  user?: Maybe<User>;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our create `Bodystat` mutation. */
export type CreateBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the create `ChatMessage` mutation. */
export type CreateChatMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChatMessage` to be created by this mutation. */
  chatMessage: ChatMessageInput;
};

/** The output of our create `ChatMessage` mutation. */
export type CreateChatMessagePayload = {
  __typename?: 'CreateChatMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChatMessage` that was created by this mutation. */
  chatMessage?: Maybe<ChatMessage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `ChatMessage`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `User` that is related to this `ChatMessage`. */
  user?: Maybe<User>;
  /** An edge for our `ChatMessage`. May be used by Relay 1. */
  chatMessageEdge?: Maybe<ChatMessagesEdge>;
};


/** The output of our create `ChatMessage` mutation. */
export type CreateChatMessagePayloadChatMessageEdgeArgs = {
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
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
  exercise?: Maybe<Exercise>;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout?: Maybe<CompletedWorkout>;
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
  user?: Maybe<User>;
  /** An edge for our `SessionAnalytic`. May be used by Relay 1. */
  sessionAnalyticEdge?: Maybe<SessionAnalyticsEdge>;
};


/** The output of our create `SessionAnalytic` mutation. */
export type CreateSessionAnalyticPayloadSessionAnalyticEdgeArgs = {
  orderBy?: Maybe<Array<SessionAnalyticsOrderBy>>;
};

/** All input for the create `UserCurrentWorkoutPlan` mutation. */
export type CreateUserCurrentWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserCurrentWorkoutPlan` to be created by this mutation. */
  userCurrentWorkoutPlan: UserCurrentWorkoutPlanInput;
};

/** The output of our create `UserCurrentWorkoutPlan` mutation. */
export type CreateUserCurrentWorkoutPlanPayload = {
  __typename?: 'CreateUserCurrentWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserCurrentWorkoutPlan` that was created by this mutation. */
  userCurrentWorkoutPlan?: Maybe<UserCurrentWorkoutPlan>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCurrentWorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads a single `WorkoutPlan` that is related to this `UserCurrentWorkoutPlan`. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `UserCurrentWorkoutPlan`. May be used by Relay 1. */
  userCurrentWorkoutPlanEdge?: Maybe<UserCurrentWorkoutPlansEdge>;
};


/** The output of our create `UserCurrentWorkoutPlan` mutation. */
export type CreateUserCurrentWorkoutPlanPayloadUserCurrentWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<UserCurrentWorkoutPlansOrderBy>>;
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
  user?: Maybe<User>;
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
  workoutPlan?: Maybe<WorkoutPlan>;
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
  exercise?: Maybe<Exercise>;
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
  enemyByEnemyLevel?: Maybe<Enemy>;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname?: Maybe<Group>;
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
  username: Scalars['String'];
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
  user?: Maybe<User>;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our delete `Bodystat` mutation. */
export type DeleteBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the `deleteChatMessageByNodeId` mutation. */
export type DeleteChatMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChatMessage` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteChatMessage` mutation. */
export type DeleteChatMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
};

/** The output of our delete `ChatMessage` mutation. */
export type DeleteChatMessagePayload = {
  __typename?: 'DeleteChatMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChatMessage` that was deleted by this mutation. */
  chatMessage?: Maybe<ChatMessage>;
  deletedChatMessageNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `ChatMessage`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `User` that is related to this `ChatMessage`. */
  user?: Maybe<User>;
  /** An edge for our `ChatMessage`. May be used by Relay 1. */
  chatMessageEdge?: Maybe<ChatMessagesEdge>;
};


/** The output of our delete `ChatMessage` mutation. */
export type DeleteChatMessagePayloadChatMessageEdgeArgs = {
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
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
  exercise?: Maybe<Exercise>;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout?: Maybe<CompletedWorkout>;
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
  user?: Maybe<User>;
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

/** All input for the `deleteUserCurrentWorkoutPlanByNodeId` mutation. */
export type DeleteUserCurrentWorkoutPlanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserCurrentWorkoutPlan` to be deleted. */
  nodeId: Scalars['ID'];
};

/** All input for the `deleteUserCurrentWorkoutPlan` mutation. */
export type DeleteUserCurrentWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  userId: Scalars['Int'];
};

/** The output of our delete `UserCurrentWorkoutPlan` mutation. */
export type DeleteUserCurrentWorkoutPlanPayload = {
  __typename?: 'DeleteUserCurrentWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserCurrentWorkoutPlan` that was deleted by this mutation. */
  userCurrentWorkoutPlan?: Maybe<UserCurrentWorkoutPlan>;
  deletedUserCurrentWorkoutPlanNodeId?: Maybe<Scalars['ID']>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCurrentWorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads a single `WorkoutPlan` that is related to this `UserCurrentWorkoutPlan`. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `UserCurrentWorkoutPlan`. May be used by Relay 1. */
  userCurrentWorkoutPlanEdge?: Maybe<UserCurrentWorkoutPlansEdge>;
};


/** The output of our delete `UserCurrentWorkoutPlan` mutation. */
export type DeleteUserCurrentWorkoutPlanPayloadUserCurrentWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<UserCurrentWorkoutPlansOrderBy>>;
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
  user?: Maybe<User>;
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
  workoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our delete `WorkoutPlanDay` mutation. */
export type DeleteWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
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
  id?: Maybe<Scalars['Int']>;
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
};

/** A filter to be used against `Exercise` object types. All fields are combined with a logical ‘and.’ */
export type ExerciseFilter = {
  /** Filter by the object’s `id` field. */
  id?: Maybe<IntFilter>;
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
  enemyByEnemyLevel?: Maybe<Enemy>;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname?: Maybe<Group>;
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
  /** Reads and enables pagination through a set of `ChatMessage`. */
  chatMessagesByGroupname: ChatMessagesConnection;
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


export type GroupChatMessagesByGroupnameArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
  condition?: Maybe<ChatMessageCondition>;
  filter?: Maybe<ChatMessageFilter>;
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
  /** Creates a single `ChatMessage`. */
  createChatMessage?: Maybe<CreateChatMessagePayload>;
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
  /** Creates a single `UserCurrentWorkoutPlan`. */
  createUserCurrentWorkoutPlan?: Maybe<CreateUserCurrentWorkoutPlanPayload>;
  /** Creates a single `UserExercise`. */
  createUserExercise?: Maybe<CreateUserExercisePayload>;
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
  /** Updates a single `ChatMessage` using its globally unique id and a patch. */
  updateChatMessageByNodeId?: Maybe<UpdateChatMessagePayload>;
  /** Updates a single `ChatMessage` using a unique key and a patch. */
  updateChatMessage?: Maybe<UpdateChatMessagePayload>;
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
  /** Updates a single `UserCurrentWorkoutPlan` using its globally unique id and a patch. */
  updateUserCurrentWorkoutPlanByNodeId?: Maybe<UpdateUserCurrentWorkoutPlanPayload>;
  /** Updates a single `UserCurrentWorkoutPlan` using a unique key and a patch. */
  updateUserCurrentWorkoutPlan?: Maybe<UpdateUserCurrentWorkoutPlanPayload>;
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
  /** Deletes a single `Battle` using its globally unique id. */
  deleteBattleByNodeId?: Maybe<DeleteBattlePayload>;
  /** Deletes a single `Battle` using a unique key. */
  deleteBattle?: Maybe<DeleteBattlePayload>;
  /** Deletes a single `Bodystat` using its globally unique id. */
  deleteBodystatByNodeId?: Maybe<DeleteBodystatPayload>;
  /** Deletes a single `Bodystat` using a unique key. */
  deleteBodystat?: Maybe<DeleteBodystatPayload>;
  /** Deletes a single `ChatMessage` using its globally unique id. */
  deleteChatMessageByNodeId?: Maybe<DeleteChatMessagePayload>;
  /** Deletes a single `ChatMessage` using a unique key. */
  deleteChatMessage?: Maybe<DeleteChatMessagePayload>;
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
  /** Deletes a single `UserCurrentWorkoutPlan` using its globally unique id. */
  deleteUserCurrentWorkoutPlanByNodeId?: Maybe<DeleteUserCurrentWorkoutPlanPayload>;
  /** Deletes a single `UserCurrentWorkoutPlan` using a unique key. */
  deleteUserCurrentWorkoutPlan?: Maybe<DeleteUserCurrentWorkoutPlanPayload>;
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
  createUser?: Maybe<CreateUserPayload>;
  getBattleAndCheckExpiry?: Maybe<GetBattleAndCheckExpiryPayload>;
  joinGroup?: Maybe<JoinGroupPayload>;
  joinRandomPublicGroup?: Maybe<JoinRandomPublicGroupPayload>;
  nullifyGroup?: Maybe<NullifyGroupPayload>;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateBodystatArgs = {
  input: CreateBodystatInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationCreateChatMessageArgs = {
  input: CreateChatMessageInput;
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
export type MutationCreateUserCurrentWorkoutPlanArgs = {
  input: CreateUserCurrentWorkoutPlanInput;
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
export type MutationUpdateChatMessageByNodeIdArgs = {
  input: UpdateChatMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateChatMessageArgs = {
  input: UpdateChatMessageInput;
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
export type MutationUpdateUserCurrentWorkoutPlanByNodeIdArgs = {
  input: UpdateUserCurrentWorkoutPlanByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationUpdateUserCurrentWorkoutPlanArgs = {
  input: UpdateUserCurrentWorkoutPlanInput;
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
export type MutationDeleteChatMessageByNodeIdArgs = {
  input: DeleteChatMessageByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteChatMessageArgs = {
  input: DeleteChatMessageInput;
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
export type MutationDeleteUserCurrentWorkoutPlanByNodeIdArgs = {
  input: DeleteUserCurrentWorkoutPlanByNodeIdInput;
};


/** The root mutation type which contains root level fields which mutate data. */
export type MutationDeleteUserCurrentWorkoutPlanArgs = {
  input: DeleteUserCurrentWorkoutPlanInput;
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
  /** Reads and enables pagination through a set of `ChatMessage`. */
  chatMessages?: Maybe<ChatMessagesConnection>;
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
  /** Reads and enables pagination through a set of `UserCurrentWorkoutPlan`. */
  userCurrentWorkoutPlans?: Maybe<UserCurrentWorkoutPlansConnection>;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercises?: Maybe<UserExercisesConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlan`. */
  workoutPlans?: Maybe<WorkoutPlansConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlanDay`. */
  workoutPlanDays?: Maybe<WorkoutPlanDaysConnection>;
  /** Reads and enables pagination through a set of `WorkoutPlanExercise`. */
  workoutPlanExercises?: Maybe<WorkoutPlanExercisesConnection>;
  battle?: Maybe<Battle>;
  bodystat?: Maybe<Bodystat>;
  chatMessage?: Maybe<ChatMessage>;
  completedWorkout?: Maybe<CompletedWorkout>;
  completedWorkoutExercise?: Maybe<CompletedWorkoutExercise>;
  enemy?: Maybe<Enemy>;
  exercise?: Maybe<Exercise>;
  group?: Maybe<Group>;
  sessionAnalytic?: Maybe<SessionAnalytic>;
  userByUsername?: Maybe<User>;
  user?: Maybe<User>;
  userCurrentWorkoutPlan?: Maybe<UserCurrentWorkoutPlan>;
  userExercise?: Maybe<UserExercise>;
  workoutPlan?: Maybe<WorkoutPlan>;
  workoutPlanByUserIdAndName?: Maybe<WorkoutPlan>;
  workoutPlanDay?: Maybe<WorkoutPlanDay>;
  workoutPlanDayByWorkoutPlanIdAndName?: Maybe<WorkoutPlanDay>;
  activeUser?: Maybe<User>;
  calculateStrengthStats?: Maybe<Strengthstat>;
  /** Reads a single `Battle` using its globally unique `ID`. */
  battleByNodeId?: Maybe<Battle>;
  /** Reads a single `Bodystat` using its globally unique `ID`. */
  bodystatByNodeId?: Maybe<Bodystat>;
  /** Reads a single `ChatMessage` using its globally unique `ID`. */
  chatMessageByNodeId?: Maybe<ChatMessage>;
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
  /** Reads a single `UserCurrentWorkoutPlan` using its globally unique `ID`. */
  userCurrentWorkoutPlanByNodeId?: Maybe<UserCurrentWorkoutPlan>;
  /** Reads a single `UserExercise` using its globally unique `ID`. */
  userExerciseByNodeId?: Maybe<UserExercise>;
  /** Reads a single `WorkoutPlan` using its globally unique `ID`. */
  workoutPlanByNodeId?: Maybe<WorkoutPlan>;
  /** Reads a single `WorkoutPlanDay` using its globally unique `ID`. */
  workoutPlanDayByNodeId?: Maybe<WorkoutPlanDay>;
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
export type QueryChatMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
  condition?: Maybe<ChatMessageCondition>;
  filter?: Maybe<ChatMessageFilter>;
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
export type QueryUserCurrentWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserCurrentWorkoutPlansOrderBy>>;
  condition?: Maybe<UserCurrentWorkoutPlanCondition>;
  filter?: Maybe<UserCurrentWorkoutPlanFilter>;
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
  username: Scalars['String'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChatMessageArgs = {
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
export type QueryUserCurrentWorkoutPlanArgs = {
  userId: Scalars['Int'];
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
export type QueryBattleByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryBodystatByNodeIdArgs = {
  nodeId: Scalars['ID'];
};


/** The root query type which gives access points into the data universe. */
export type QueryChatMessageByNodeIdArgs = {
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
export type QueryUserCurrentWorkoutPlanByNodeIdArgs = {
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
  user?: Maybe<User>;
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
  enemyByEnemyLevel?: Maybe<Enemy>;
  /** Reads a single `Group` that is related to this `Battle`. */
  groupByGroupname?: Maybe<Group>;
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
  username: Scalars['String'];
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
  user?: Maybe<User>;
  /** An edge for our `Bodystat`. May be used by Relay 1. */
  bodystatEdge?: Maybe<BodystatsEdge>;
};


/** The output of our update `Bodystat` mutation. */
export type UpdateBodystatPayloadBodystatEdgeArgs = {
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
};

/** All input for the `updateChatMessageByNodeId` mutation. */
export type UpdateChatMessageByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `ChatMessage` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `ChatMessage` being updated. */
  patch: ChatMessagePatch;
};

/** All input for the `updateChatMessage` mutation. */
export type UpdateChatMessageInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `ChatMessage` being updated. */
  patch: ChatMessagePatch;
  id: Scalars['Int'];
};

/** The output of our update `ChatMessage` mutation. */
export type UpdateChatMessagePayload = {
  __typename?: 'UpdateChatMessagePayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `ChatMessage` that was updated by this mutation. */
  chatMessage?: Maybe<ChatMessage>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `Group` that is related to this `ChatMessage`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads a single `User` that is related to this `ChatMessage`. */
  user?: Maybe<User>;
  /** An edge for our `ChatMessage`. May be used by Relay 1. */
  chatMessageEdge?: Maybe<ChatMessagesEdge>;
};


/** The output of our update `ChatMessage` mutation. */
export type UpdateChatMessagePayloadChatMessageEdgeArgs = {
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
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
  exercise?: Maybe<Exercise>;
  /** Reads a single `CompletedWorkout` that is related to this `CompletedWorkoutExercise`. */
  completedWorkout?: Maybe<CompletedWorkout>;
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
  user?: Maybe<User>;
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

/** All input for the `updateUserCurrentWorkoutPlanByNodeId` mutation. */
export type UpdateUserCurrentWorkoutPlanByNodeIdInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The globally unique `ID` which will identify a single `UserCurrentWorkoutPlan` to be updated. */
  nodeId: Scalars['ID'];
  /** An object where the defined keys will be set on the `UserCurrentWorkoutPlan` being updated. */
  patch: UserCurrentWorkoutPlanPatch;
};

/** All input for the `updateUserCurrentWorkoutPlan` mutation. */
export type UpdateUserCurrentWorkoutPlanInput = {
  /**
   * An arbitrary string value with no semantic meaning. Will be included in the
   * payload verbatim. May be used to track mutations by the client.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** An object where the defined keys will be set on the `UserCurrentWorkoutPlan` being updated. */
  patch: UserCurrentWorkoutPlanPatch;
  userId: Scalars['Int'];
};

/** The output of our update `UserCurrentWorkoutPlan` mutation. */
export type UpdateUserCurrentWorkoutPlanPayload = {
  __typename?: 'UpdateUserCurrentWorkoutPlanPayload';
  /**
   * The exact same `clientMutationId` that was provided in the mutation input,
   * unchanged and unused. May be used by a client to track mutations.
   */
  clientMutationId?: Maybe<Scalars['String']>;
  /** The `UserCurrentWorkoutPlan` that was updated by this mutation. */
  userCurrentWorkoutPlan?: Maybe<UserCurrentWorkoutPlan>;
  /** Our root query field type. Allows us to run any query from our mutation payload. */
  query?: Maybe<Query>;
  /** Reads a single `User` that is related to this `UserCurrentWorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads a single `WorkoutPlan` that is related to this `UserCurrentWorkoutPlan`. */
  workoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `UserCurrentWorkoutPlan`. May be used by Relay 1. */
  userCurrentWorkoutPlanEdge?: Maybe<UserCurrentWorkoutPlansEdge>;
};


/** The output of our update `UserCurrentWorkoutPlan` mutation. */
export type UpdateUserCurrentWorkoutPlanPayloadUserCurrentWorkoutPlanEdgeArgs = {
  orderBy?: Maybe<Array<UserCurrentWorkoutPlansOrderBy>>;
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
  user?: Maybe<User>;
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
  workoutPlan?: Maybe<WorkoutPlan>;
  /** An edge for our `WorkoutPlanDay`. May be used by Relay 1. */
  workoutPlanDayEdge?: Maybe<WorkoutPlanDaysEdge>;
};


/** The output of our update `WorkoutPlanDay` mutation. */
export type UpdateWorkoutPlanDayPayloadWorkoutPlanDayEdgeArgs = {
  orderBy?: Maybe<Array<WorkoutPlanDaysOrderBy>>;
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

export type User = Node & {
  __typename?: 'User';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  username: Scalars['String'];
  groupname?: Maybe<Scalars['String']>;
  createdAt: Scalars['Datetime'];
  updatedAt: Scalars['Datetime'];
  id: Scalars['Int'];
  /** Reads a single `Group` that is related to this `User`. */
  groupByGroupname?: Maybe<Group>;
  /** Reads and enables pagination through a set of `Bodystat`. */
  bodystats: BodystatsConnection;
  /** Reads and enables pagination through a set of `UserExercise`. */
  userExercises: UserExercisesConnection;
  /** Reads and enables pagination through a set of `ChatMessage`. */
  chatMessages: ChatMessagesConnection;
  /** Reads and enables pagination through a set of `SessionAnalytic`. */
  sessionAnalytics: SessionAnalyticsConnection;
  /** Reads a single `UserCurrentWorkoutPlan` that is related to this `User`. */
  userCurrentWorkoutPlan?: Maybe<UserCurrentWorkoutPlan>;
  /** Reads and enables pagination through a set of `WorkoutPlan`. */
  workoutPlans: WorkoutPlansConnection;
};


export type UserBodystatsArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<BodystatsOrderBy>>;
  condition?: Maybe<BodystatCondition>;
  filter?: Maybe<BodystatFilter>;
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


export type UserChatMessagesArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<ChatMessagesOrderBy>>;
  condition?: Maybe<ChatMessageCondition>;
  filter?: Maybe<ChatMessageFilter>;
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
};

export type UserCurrentWorkoutPlan = Node & {
  __typename?: 'UserCurrentWorkoutPlan';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  userId: Scalars['Int'];
  workoutPlanId: Scalars['Int'];
  /** Reads a single `User` that is related to this `UserCurrentWorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads a single `WorkoutPlan` that is related to this `UserCurrentWorkoutPlan`. */
  workoutPlan?: Maybe<WorkoutPlan>;
};

/**
 * A condition to be used against `UserCurrentWorkoutPlan` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type UserCurrentWorkoutPlanCondition = {
  /** Checks for equality with the object’s `userId` field. */
  userId?: Maybe<Scalars['Int']>;
  /** Checks for equality with the object’s `workoutPlanId` field. */
  workoutPlanId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `UserCurrentWorkoutPlan` object types. All fields are combined with a logical ‘and.’ */
export type UserCurrentWorkoutPlanFilter = {
  /** Filter by the object’s `userId` field. */
  userId?: Maybe<IntFilter>;
  /** Filter by the object’s `workoutPlanId` field. */
  workoutPlanId?: Maybe<IntFilter>;
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserCurrentWorkoutPlanFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserCurrentWorkoutPlanFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserCurrentWorkoutPlanFilter>;
};

/** An input for mutations affecting `UserCurrentWorkoutPlan` */
export type UserCurrentWorkoutPlanInput = {
  userId: Scalars['Int'];
  workoutPlanId: Scalars['Int'];
};

/** Represents an update to a `UserCurrentWorkoutPlan`. Fields that are set will be updated. */
export type UserCurrentWorkoutPlanPatch = {
  userId?: Maybe<Scalars['Int']>;
  workoutPlanId?: Maybe<Scalars['Int']>;
};

/** A connection to a list of `UserCurrentWorkoutPlan` values. */
export type UserCurrentWorkoutPlansConnection = {
  __typename?: 'UserCurrentWorkoutPlansConnection';
  /** A list of `UserCurrentWorkoutPlan` objects. */
  nodes: Array<UserCurrentWorkoutPlan>;
  /** A list of edges which contains the `UserCurrentWorkoutPlan` and cursor to aid in pagination. */
  edges: Array<UserCurrentWorkoutPlansEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
  /** The count of *all* `UserCurrentWorkoutPlan` you could get from the connection. */
  totalCount: Scalars['Int'];
};

/** A `UserCurrentWorkoutPlan` edge in the connection. */
export type UserCurrentWorkoutPlansEdge = {
  __typename?: 'UserCurrentWorkoutPlansEdge';
  /** A cursor for use in pagination. */
  cursor?: Maybe<Scalars['Cursor']>;
  /** The `UserCurrentWorkoutPlan` at the end of the edge. */
  node: UserCurrentWorkoutPlan;
};

/** Methods to use when ordering `UserCurrentWorkoutPlan`. */
export enum UserCurrentWorkoutPlansOrderBy {
  Natural = 'NATURAL',
  UserIdAsc = 'USER_ID_ASC',
  UserIdDesc = 'USER_ID_DESC',
  WorkoutPlanIdAsc = 'WORKOUT_PLAN_ID_ASC',
  WorkoutPlanIdDesc = 'WORKOUT_PLAN_ID_DESC',
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

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
  user?: Maybe<User>;
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
  /** Checks for all expressions in this list. */
  and?: Maybe<Array<UserFilter>>;
  /** Checks for any expressions in this list. */
  or?: Maybe<Array<UserFilter>>;
  /** Negates the expression. */
  not?: Maybe<UserFilter>;
};

/** Represents an update to a `User`. Fields that are set will be updated. */
export type UserPatch = {
  username?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['Datetime']>;
  updatedAt?: Maybe<Scalars['Datetime']>;
  id?: Maybe<Scalars['Int']>;
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
  PrimaryKeyAsc = 'PRIMARY_KEY_ASC',
  PrimaryKeyDesc = 'PRIMARY_KEY_DESC'
}

export type Volume = {
  __typename?: 'Volume';
  sets?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Int']>;
};

/** An input for mutations affecting `Volume` */
export type VolumeInput = {
  sets?: Maybe<Scalars['Int']>;
  reps?: Maybe<Scalars['Int']>;
};

export type WorkoutPlan = Node & {
  __typename?: 'WorkoutPlan';
  /** A globally unique identifier. Can be used in various places throughout the system to identify this single value. */
  nodeId: Scalars['ID'];
  id: Scalars['Int'];
  createdAt: Scalars['Datetime'];
  userId?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['String']>;
  /** Reads a single `User` that is related to this `WorkoutPlan`. */
  user?: Maybe<User>;
  /** Reads and enables pagination through a set of `WorkoutPlanDay`. */
  workoutPlanDays: WorkoutPlanDaysConnection;
  /** Reads and enables pagination through a set of `UserCurrentWorkoutPlan`. */
  userCurrentWorkoutPlans: UserCurrentWorkoutPlansConnection;
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


export type WorkoutPlanUserCurrentWorkoutPlansArgs = {
  first?: Maybe<Scalars['Int']>;
  last?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
  before?: Maybe<Scalars['Cursor']>;
  after?: Maybe<Scalars['Cursor']>;
  orderBy?: Maybe<Array<UserCurrentWorkoutPlansOrderBy>>;
  condition?: Maybe<UserCurrentWorkoutPlanCondition>;
  filter?: Maybe<UserCurrentWorkoutPlanFilter>;
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
  workoutExercises: Array<Maybe<WorkoutPlanExercise>>;
  workoutPlanId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
  /** Reads a single `WorkoutPlan` that is related to this `WorkoutPlanDay`. */
  workoutPlan?: Maybe<WorkoutPlan>;
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
  workoutExercises: Array<Maybe<WorkoutPlanExerciseInput>>;
  workoutPlanId?: Maybe<Scalars['Int']>;
  name: Scalars['String'];
};

/** Represents an update to a `WorkoutPlanDay`. Fields that are set will be updated. */
export type WorkoutPlanDayPatch = {
  id?: Maybe<Scalars['Int']>;
  workoutExercises?: Maybe<Array<Maybe<WorkoutPlanExerciseInput>>>;
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

export type WorkoutPlanExercise = {
  __typename?: 'WorkoutPlanExercise';
  exerciseId: Scalars['Int'];
  sets: Scalars['Int'];
  reps: Scalars['Int'];
  /** Reads a single `Exercise` that is related to this `WorkoutPlanExercise`. */
  exercise?: Maybe<Exercise>;
};

/**
 * A condition to be used against `WorkoutPlanExercise` object types. All fields
 * are tested for equality and combined with a logical ‘and.’
 */
export type WorkoutPlanExerciseCondition = {
  /** Checks for equality with the object’s `exerciseId` field. */
  exerciseId?: Maybe<Scalars['Int']>;
};

/** A filter to be used against `WorkoutPlanExercise` object types. All fields are combined with a logical ‘and.’ */
export type WorkoutPlanExerciseFilter = {
  /** Filter by the object’s `exerciseId` field. */
  exerciseId?: Maybe<IntFilter>;
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
  ExerciseIdDesc = 'EXERCISE_ID_DESC'
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
  name?: Maybe<Scalars['String']>;
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

export type MessagesQueryVariables = Exact<{ [key: string]: never; }>;


export type MessagesQuery = (
  { __typename?: 'Query' }
  & { chatMessages?: Maybe<(
    { __typename?: 'ChatMessagesConnection' }
    & { nodes: Array<(
      { __typename?: 'ChatMessage' }
      & Pick<ChatMessage, 'username' | 'textContent' | 'createdAt' | 'updatedAt' | 'groupname'>
    )> }
  )> }
);

export type WorkoutQueryVariables = Exact<{ [key: string]: never; }>;


export type WorkoutQuery = (
  { __typename?: 'Query' }
  & { activeUser?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'nodeId'>
    & { userCurrentWorkoutPlan?: Maybe<(
      { __typename?: 'UserCurrentWorkoutPlan' }
      & Pick<UserCurrentWorkoutPlan, 'nodeId'>
      & { workoutPlan?: Maybe<(
        { __typename?: 'WorkoutPlan' }
        & Pick<WorkoutPlan, 'nodeId' | 'name'>
        & { workoutPlanDays: (
          { __typename?: 'WorkoutPlanDaysConnection' }
          & { nodes: Array<(
            { __typename?: 'WorkoutPlanDay' }
            & Pick<WorkoutPlanDay, 'nodeId' | 'name'>
            & { workoutExercises: Array<Maybe<(
              { __typename?: 'WorkoutPlanExercise' }
              & Pick<WorkoutPlanExercise, 'sets' | 'reps'>
              & { exercise?: Maybe<(
                { __typename?: 'Exercise' }
                & Pick<Exercise, 'nodeId' | 'name' | 'id'>
              )> }
            )>> }
          )> }
        ) }
      )> }
    )>, workoutPlans: (
      { __typename?: 'WorkoutPlansConnection' }
      & { nodes: Array<(
        { __typename?: 'WorkoutPlan' }
        & Pick<WorkoutPlan, 'nodeId' | 'name'>
        & { workoutPlanDays: (
          { __typename?: 'WorkoutPlanDaysConnection' }
          & { nodes: Array<(
            { __typename?: 'WorkoutPlanDay' }
            & Pick<WorkoutPlanDay, 'nodeId' | 'name'>
            & { workoutExercises: Array<Maybe<(
              { __typename?: 'WorkoutPlanExercise' }
              & Pick<WorkoutPlanExercise, 'sets' | 'reps'>
              & { exercise?: Maybe<(
                { __typename?: 'Exercise' }
                & Pick<Exercise, 'nodeId' | 'name' | 'id'>
              )> }
            )>> }
          )> }
        ) }
      )> }
    ) }
  )> }
);


export const MessagesDocument = gql`
    query Messages {
  chatMessages {
    nodes {
      username
      textContent
      createdAt
      updatedAt
      groupname
    }
  }
}
    `;

/**
 * __useMessagesQuery__
 *
 * To run a query within a React component, call `useMessagesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMessagesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMessagesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMessagesQuery(baseOptions?: Apollo.QueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
      }
export function useMessagesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MessagesQuery, MessagesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MessagesQuery, MessagesQueryVariables>(MessagesDocument, options);
        }
export type MessagesQueryHookResult = ReturnType<typeof useMessagesQuery>;
export type MessagesLazyQueryHookResult = ReturnType<typeof useMessagesLazyQuery>;
export type MessagesQueryResult = Apollo.QueryResult<MessagesQuery, MessagesQueryVariables>;
export const WorkoutDocument = gql`
    query Workout {
  activeUser {
    nodeId
    userCurrentWorkoutPlan {
      nodeId
      workoutPlan {
        nodeId
        name
        workoutPlanDays {
          nodes {
            nodeId
            name
            workoutExercises {
              sets
              reps
              exercise {
                nodeId
                name
                id
              }
            }
          }
        }
      }
    }
    workoutPlans {
      nodes {
        nodeId
        name
        workoutPlanDays {
          nodes {
            nodeId
            name
            workoutExercises {
              sets
              reps
              exercise {
                nodeId
                name
                id
              }
            }
          }
        }
      }
    }
  }
}
    `;

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
