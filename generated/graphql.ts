/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  numeric: { input: any; output: any; }
  timestamp: { input: any; output: any; }
  uuid: { input: any; output: any; }
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['Int']['input']>;
  _gt?: InputMaybe<Scalars['Int']['input']>;
  _gte?: InputMaybe<Scalars['Int']['input']>;
  _in?: InputMaybe<Array<Scalars['Int']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['Int']['input']>;
  _lte?: InputMaybe<Scalars['Int']['input']>;
  _neq?: InputMaybe<Scalars['Int']['input']>;
  _nin?: InputMaybe<Array<Scalars['Int']['input']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['String']['input']>;
  _gt?: InputMaybe<Scalars['String']['input']>;
  _gte?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']['input']>;
  _in?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']['input']>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']['input']>;
  _lt?: InputMaybe<Scalars['String']['input']>;
  _lte?: InputMaybe<Scalars['String']['input']>;
  _neq?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']['input']>;
  _nin?: InputMaybe<Array<Scalars['String']['input']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']['input']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']['input']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']['input']>;
};

/** ordering argument of a cursor */
export enum Cursor_Ordering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** columns and relationships of "hubs" */
export type Hubs = {
  __typename?: 'hubs';
  created_at: Scalars['timestamp']['output'];
  id: Scalars['uuid']['output'];
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  /** An object relationship */
  organization: Organizations;
  organization_id: Scalars['uuid']['output'];
  /** An array relationship */
  rides: Array<Rides>;
  /** An array relationship */
  ridesByStartHubId: Array<Rides>;
  /** An aggregate relationship */
  ridesByStartHubId_aggregate: Rides_Aggregate;
  /** An aggregate relationship */
  rides_aggregate: Rides_Aggregate;
  /** An array relationship */
  scooters: Array<Scooters>;
  /** An aggregate relationship */
  scooters_aggregate: Scooters_Aggregate;
  updated_at: Scalars['timestamp']['output'];
};


/** columns and relationships of "hubs" */
export type HubsRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "hubs" */
export type HubsRidesByStartHubIdArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "hubs" */
export type HubsRidesByStartHubId_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "hubs" */
export type HubsRides_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "hubs" */
export type HubsScootersArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


/** columns and relationships of "hubs" */
export type HubsScooters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};

/** aggregated selection of "hubs" */
export type Hubs_Aggregate = {
  __typename?: 'hubs_aggregate';
  aggregate?: Maybe<Hubs_Aggregate_Fields>;
  nodes: Array<Hubs>;
};

/** aggregate fields of "hubs" */
export type Hubs_Aggregate_Fields = {
  __typename?: 'hubs_aggregate_fields';
  avg?: Maybe<Hubs_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Hubs_Max_Fields>;
  min?: Maybe<Hubs_Min_Fields>;
  stddev?: Maybe<Hubs_Stddev_Fields>;
  stddev_pop?: Maybe<Hubs_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Hubs_Stddev_Samp_Fields>;
  sum?: Maybe<Hubs_Sum_Fields>;
  var_pop?: Maybe<Hubs_Var_Pop_Fields>;
  var_samp?: Maybe<Hubs_Var_Samp_Fields>;
  variance?: Maybe<Hubs_Variance_Fields>;
};


/** aggregate fields of "hubs" */
export type Hubs_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Hubs_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** aggregate avg on columns */
export type Hubs_Avg_Fields = {
  __typename?: 'hubs_avg_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** Boolean expression to filter rows from the table "hubs". All fields are combined with a logical 'AND'. */
export type Hubs_Bool_Exp = {
  _and?: InputMaybe<Array<Hubs_Bool_Exp>>;
  _not?: InputMaybe<Hubs_Bool_Exp>;
  _or?: InputMaybe<Array<Hubs_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  latitude?: InputMaybe<Numeric_Comparison_Exp>;
  longitude?: InputMaybe<Numeric_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  rides?: InputMaybe<Rides_Bool_Exp>;
  ridesByStartHubId?: InputMaybe<Rides_Bool_Exp>;
  ridesByStartHubId_aggregate?: InputMaybe<Rides_Aggregate_Bool_Exp>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Bool_Exp>;
  scooters?: InputMaybe<Scooters_Bool_Exp>;
  scooters_aggregate?: InputMaybe<Scooters_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "hubs" */
export enum Hubs_Constraint {
  /** unique or primary key constraint on columns "organization_id" */
  HubsOrganizationIdKey = 'hubs_organization_id_key',
  /** unique or primary key constraint on columns "id" */
  HubsPkey = 'hubs_pkey'
}

/** input type for incrementing numeric columns in table "hubs" */
export type Hubs_Inc_Input = {
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "hubs" */
export type Hubs_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  rides?: InputMaybe<Rides_Arr_Rel_Insert_Input>;
  ridesByStartHubId?: InputMaybe<Rides_Arr_Rel_Insert_Input>;
  scooters?: InputMaybe<Scooters_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Hubs_Max_Fields = {
  __typename?: 'hubs_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Hubs_Min_Fields = {
  __typename?: 'hubs_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "hubs" */
export type Hubs_Mutation_Response = {
  __typename?: 'hubs_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Hubs>;
};

/** input type for inserting object relation for remote table "hubs" */
export type Hubs_Obj_Rel_Insert_Input = {
  data: Hubs_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Hubs_On_Conflict>;
};

/** on_conflict condition type for table "hubs" */
export type Hubs_On_Conflict = {
  constraint: Hubs_Constraint;
  update_columns?: Array<Hubs_Update_Column>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};

/** Ordering options when selecting data from "hubs". */
export type Hubs_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  latitude?: InputMaybe<Order_By>;
  longitude?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  ridesByStartHubId_aggregate?: InputMaybe<Rides_Aggregate_Order_By>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Order_By>;
  scooters_aggregate?: InputMaybe<Scooters_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: hubs */
export type Hubs_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "hubs" */
export enum Hubs_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "hubs" */
export type Hubs_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Hubs_Stddev_Fields = {
  __typename?: 'hubs_stddev_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_pop on columns */
export type Hubs_Stddev_Pop_Fields = {
  __typename?: 'hubs_stddev_pop_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate stddev_samp on columns */
export type Hubs_Stddev_Samp_Fields = {
  __typename?: 'hubs_stddev_samp_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** Streaming cursor of the table "hubs" */
export type Hubs_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Hubs_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Hubs_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  latitude?: InputMaybe<Scalars['numeric']['input']>;
  longitude?: InputMaybe<Scalars['numeric']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Hubs_Sum_Fields = {
  __typename?: 'hubs_sum_fields';
  latitude?: Maybe<Scalars['numeric']['output']>;
  longitude?: Maybe<Scalars['numeric']['output']>;
};

/** update columns of table "hubs" */
export enum Hubs_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Latitude = 'latitude',
  /** column name */
  Longitude = 'longitude',
  /** column name */
  Name = 'name',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Hubs_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Hubs_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Hubs_Set_Input>;
  /** filter the rows which have to be updated */
  where: Hubs_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Hubs_Var_Pop_Fields = {
  __typename?: 'hubs_var_pop_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate var_samp on columns */
export type Hubs_Var_Samp_Fields = {
  __typename?: 'hubs_var_samp_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** aggregate variance on columns */
export type Hubs_Variance_Fields = {
  __typename?: 'hubs_variance_fields';
  latitude?: Maybe<Scalars['Float']['output']>;
  longitude?: Maybe<Scalars['Float']['output']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "hubs" */
  delete_hubs?: Maybe<Hubs_Mutation_Response>;
  /** delete single row from the table: "hubs" */
  delete_hubs_by_pk?: Maybe<Hubs>;
  /** delete data from the table: "organizations" */
  delete_organizations?: Maybe<Organizations_Mutation_Response>;
  /** delete single row from the table: "organizations" */
  delete_organizations_by_pk?: Maybe<Organizations>;
  /** delete data from the table: "rides" */
  delete_rides?: Maybe<Rides_Mutation_Response>;
  /** delete single row from the table: "rides" */
  delete_rides_by_pk?: Maybe<Rides>;
  /** delete data from the table: "scooters" */
  delete_scooters?: Maybe<Scooters_Mutation_Response>;
  /** delete single row from the table: "scooters" */
  delete_scooters_by_pk?: Maybe<Scooters>;
  /** delete data from the table: "transactions" */
  delete_transactions?: Maybe<Transactions_Mutation_Response>;
  /** delete single row from the table: "transactions" */
  delete_transactions_by_pk?: Maybe<Transactions>;
  /** delete data from the table: "user_organizations" */
  delete_user_organizations?: Maybe<User_Organizations_Mutation_Response>;
  /** delete single row from the table: "user_organizations" */
  delete_user_organizations_by_pk?: Maybe<User_Organizations>;
  /** delete data from the table: "users" */
  delete_users?: Maybe<Users_Mutation_Response>;
  /** delete single row from the table: "users" */
  delete_users_by_pk?: Maybe<Users>;
  /** delete data from the table: "wallets" */
  delete_wallets?: Maybe<Wallets_Mutation_Response>;
  /** delete single row from the table: "wallets" */
  delete_wallets_by_pk?: Maybe<Wallets>;
  /** insert data into the table: "hubs" */
  insert_hubs?: Maybe<Hubs_Mutation_Response>;
  /** insert a single row into the table: "hubs" */
  insert_hubs_one?: Maybe<Hubs>;
  /** insert data into the table: "organizations" */
  insert_organizations?: Maybe<Organizations_Mutation_Response>;
  /** insert a single row into the table: "organizations" */
  insert_organizations_one?: Maybe<Organizations>;
  /** insert data into the table: "rides" */
  insert_rides?: Maybe<Rides_Mutation_Response>;
  /** insert a single row into the table: "rides" */
  insert_rides_one?: Maybe<Rides>;
  /** insert data into the table: "scooters" */
  insert_scooters?: Maybe<Scooters_Mutation_Response>;
  /** insert a single row into the table: "scooters" */
  insert_scooters_one?: Maybe<Scooters>;
  /** insert data into the table: "transactions" */
  insert_transactions?: Maybe<Transactions_Mutation_Response>;
  /** insert a single row into the table: "transactions" */
  insert_transactions_one?: Maybe<Transactions>;
  /** insert data into the table: "user_organizations" */
  insert_user_organizations?: Maybe<User_Organizations_Mutation_Response>;
  /** insert a single row into the table: "user_organizations" */
  insert_user_organizations_one?: Maybe<User_Organizations>;
  /** insert data into the table: "users" */
  insert_users?: Maybe<Users_Mutation_Response>;
  /** insert a single row into the table: "users" */
  insert_users_one?: Maybe<Users>;
  /** insert data into the table: "wallets" */
  insert_wallets?: Maybe<Wallets_Mutation_Response>;
  /** insert a single row into the table: "wallets" */
  insert_wallets_one?: Maybe<Wallets>;
  /** update data of the table: "hubs" */
  update_hubs?: Maybe<Hubs_Mutation_Response>;
  /** update single row of the table: "hubs" */
  update_hubs_by_pk?: Maybe<Hubs>;
  /** update multiples rows of table: "hubs" */
  update_hubs_many?: Maybe<Array<Maybe<Hubs_Mutation_Response>>>;
  /** update data of the table: "organizations" */
  update_organizations?: Maybe<Organizations_Mutation_Response>;
  /** update single row of the table: "organizations" */
  update_organizations_by_pk?: Maybe<Organizations>;
  /** update multiples rows of table: "organizations" */
  update_organizations_many?: Maybe<Array<Maybe<Organizations_Mutation_Response>>>;
  /** update data of the table: "rides" */
  update_rides?: Maybe<Rides_Mutation_Response>;
  /** update single row of the table: "rides" */
  update_rides_by_pk?: Maybe<Rides>;
  /** update multiples rows of table: "rides" */
  update_rides_many?: Maybe<Array<Maybe<Rides_Mutation_Response>>>;
  /** update data of the table: "scooters" */
  update_scooters?: Maybe<Scooters_Mutation_Response>;
  /** update single row of the table: "scooters" */
  update_scooters_by_pk?: Maybe<Scooters>;
  /** update multiples rows of table: "scooters" */
  update_scooters_many?: Maybe<Array<Maybe<Scooters_Mutation_Response>>>;
  /** update data of the table: "transactions" */
  update_transactions?: Maybe<Transactions_Mutation_Response>;
  /** update single row of the table: "transactions" */
  update_transactions_by_pk?: Maybe<Transactions>;
  /** update multiples rows of table: "transactions" */
  update_transactions_many?: Maybe<Array<Maybe<Transactions_Mutation_Response>>>;
  /** update data of the table: "user_organizations" */
  update_user_organizations?: Maybe<User_Organizations_Mutation_Response>;
  /** update single row of the table: "user_organizations" */
  update_user_organizations_by_pk?: Maybe<User_Organizations>;
  /** update multiples rows of table: "user_organizations" */
  update_user_organizations_many?: Maybe<Array<Maybe<User_Organizations_Mutation_Response>>>;
  /** update data of the table: "users" */
  update_users?: Maybe<Users_Mutation_Response>;
  /** update single row of the table: "users" */
  update_users_by_pk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  update_users_many?: Maybe<Array<Maybe<Users_Mutation_Response>>>;
  /** update data of the table: "wallets" */
  update_wallets?: Maybe<Wallets_Mutation_Response>;
  /** update single row of the table: "wallets" */
  update_wallets_by_pk?: Maybe<Wallets>;
  /** update multiples rows of table: "wallets" */
  update_wallets_many?: Maybe<Array<Maybe<Wallets_Mutation_Response>>>;
};


/** mutation root */
export type Mutation_RootDelete_HubsArgs = {
  where: Hubs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Hubs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_OrganizationsArgs = {
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Organizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_RidesArgs = {
  where: Rides_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Rides_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_ScootersArgs = {
  where: Scooters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Scooters_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_TransactionsArgs = {
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Transactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_User_OrganizationsArgs = {
  where: User_Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_User_Organizations_By_PkArgs = {
  organization_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootDelete_WalletsArgs = {
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Wallets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


/** mutation root */
export type Mutation_RootInsert_HubsArgs = {
  objects: Array<Hubs_Insert_Input>;
  on_conflict?: InputMaybe<Hubs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Hubs_OneArgs = {
  object: Hubs_Insert_Input;
  on_conflict?: InputMaybe<Hubs_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_OrganizationsArgs = {
  objects: Array<Organizations_Insert_Input>;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Organizations_OneArgs = {
  object: Organizations_Insert_Input;
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_RidesArgs = {
  objects: Array<Rides_Insert_Input>;
  on_conflict?: InputMaybe<Rides_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Rides_OneArgs = {
  object: Rides_Insert_Input;
  on_conflict?: InputMaybe<Rides_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ScootersArgs = {
  objects: Array<Scooters_Insert_Input>;
  on_conflict?: InputMaybe<Scooters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Scooters_OneArgs = {
  object: Scooters_Insert_Input;
  on_conflict?: InputMaybe<Scooters_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_TransactionsArgs = {
  objects: Array<Transactions_Insert_Input>;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Transactions_OneArgs = {
  object: Transactions_Insert_Input;
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_OrganizationsArgs = {
  objects: Array<User_Organizations_Insert_Input>;
  on_conflict?: InputMaybe<User_Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_User_Organizations_OneArgs = {
  object: User_Organizations_Insert_Input;
  on_conflict?: InputMaybe<User_Organizations_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
  objects: Array<Users_Insert_Input>;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
  object: Users_Insert_Input;
  on_conflict?: InputMaybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_WalletsArgs = {
  objects: Array<Wallets_Insert_Input>;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Wallets_OneArgs = {
  object: Wallets_Insert_Input;
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_HubsArgs = {
  _inc?: InputMaybe<Hubs_Inc_Input>;
  _set?: InputMaybe<Hubs_Set_Input>;
  where: Hubs_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Hubs_By_PkArgs = {
  _inc?: InputMaybe<Hubs_Inc_Input>;
  _set?: InputMaybe<Hubs_Set_Input>;
  pk_columns: Hubs_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Hubs_ManyArgs = {
  updates: Array<Hubs_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_OrganizationsArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  where: Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_By_PkArgs = {
  _set?: InputMaybe<Organizations_Set_Input>;
  pk_columns: Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Organizations_ManyArgs = {
  updates: Array<Organizations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_RidesArgs = {
  _inc?: InputMaybe<Rides_Inc_Input>;
  _set?: InputMaybe<Rides_Set_Input>;
  where: Rides_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Rides_By_PkArgs = {
  _inc?: InputMaybe<Rides_Inc_Input>;
  _set?: InputMaybe<Rides_Set_Input>;
  pk_columns: Rides_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Rides_ManyArgs = {
  updates: Array<Rides_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_ScootersArgs = {
  _set?: InputMaybe<Scooters_Set_Input>;
  where: Scooters_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Scooters_By_PkArgs = {
  _set?: InputMaybe<Scooters_Set_Input>;
  pk_columns: Scooters_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Scooters_ManyArgs = {
  updates: Array<Scooters_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_TransactionsArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  where: Transactions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_By_PkArgs = {
  _inc?: InputMaybe<Transactions_Inc_Input>;
  _set?: InputMaybe<Transactions_Set_Input>;
  pk_columns: Transactions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Transactions_ManyArgs = {
  updates: Array<Transactions_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_User_OrganizationsArgs = {
  _set?: InputMaybe<User_Organizations_Set_Input>;
  where: User_Organizations_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_User_Organizations_By_PkArgs = {
  _set?: InputMaybe<User_Organizations_Set_Input>;
  pk_columns: User_Organizations_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_User_Organizations_ManyArgs = {
  updates: Array<User_Organizations_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
  _set?: InputMaybe<Users_Set_Input>;
  pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Users_ManyArgs = {
  updates: Array<Users_Updates>;
};


/** mutation root */
export type Mutation_RootUpdate_WalletsArgs = {
  _inc?: InputMaybe<Wallets_Inc_Input>;
  _set?: InputMaybe<Wallets_Set_Input>;
  where: Wallets_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Wallets_By_PkArgs = {
  _inc?: InputMaybe<Wallets_Inc_Input>;
  _set?: InputMaybe<Wallets_Set_Input>;
  pk_columns: Wallets_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Wallets_ManyArgs = {
  updates: Array<Wallets_Updates>;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['numeric']['input']>;
  _gt?: InputMaybe<Scalars['numeric']['input']>;
  _gte?: InputMaybe<Scalars['numeric']['input']>;
  _in?: InputMaybe<Array<Scalars['numeric']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['numeric']['input']>;
  _lte?: InputMaybe<Scalars['numeric']['input']>;
  _neq?: InputMaybe<Scalars['numeric']['input']>;
  _nin?: InputMaybe<Array<Scalars['numeric']['input']>>;
};

/** column ordering options */
export enum Order_By {
  /** in ascending order, nulls last */
  Asc = 'asc',
  /** in ascending order, nulls first */
  AscNullsFirst = 'asc_nulls_first',
  /** in ascending order, nulls last */
  AscNullsLast = 'asc_nulls_last',
  /** in descending order, nulls first */
  Desc = 'desc',
  /** in descending order, nulls first */
  DescNullsFirst = 'desc_nulls_first',
  /** in descending order, nulls last */
  DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "organizations" */
export type Organizations = {
  __typename?: 'organizations';
  created_at: Scalars['timestamp']['output'];
  id: Scalars['uuid']['output'];
  name: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
  /** An array relationship */
  user_organizations: Array<User_Organizations>;
  /** An aggregate relationship */
  user_organizations_aggregate: User_Organizations_Aggregate;
  /** An array relationship */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
};


/** columns and relationships of "organizations" */
export type OrganizationsUser_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsUser_Organizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


/** columns and relationships of "organizations" */
export type OrganizationsWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** aggregated selection of "organizations" */
export type Organizations_Aggregate = {
  __typename?: 'organizations_aggregate';
  aggregate?: Maybe<Organizations_Aggregate_Fields>;
  nodes: Array<Organizations>;
};

/** aggregate fields of "organizations" */
export type Organizations_Aggregate_Fields = {
  __typename?: 'organizations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Organizations_Max_Fields>;
  min?: Maybe<Organizations_Min_Fields>;
};


/** aggregate fields of "organizations" */
export type Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "organizations". All fields are combined with a logical 'AND'. */
export type Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<Organizations_Bool_Exp>>;
  _not?: InputMaybe<Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<Organizations_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  name?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_organizations?: InputMaybe<User_Organizations_Bool_Exp>;
  user_organizations_aggregate?: InputMaybe<User_Organizations_Aggregate_Bool_Exp>;
  wallets?: InputMaybe<Wallets_Bool_Exp>;
  wallets_aggregate?: InputMaybe<Wallets_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "organizations" */
export enum Organizations_Constraint {
  /** unique or primary key constraint on columns "id" */
  OrganizationsPkey = 'organizations_pkey'
}

/** input type for inserting data into table "organizations" */
export type Organizations_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_organizations?: InputMaybe<User_Organizations_Arr_Rel_Insert_Input>;
  wallets?: InputMaybe<Wallets_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Organizations_Max_Fields = {
  __typename?: 'organizations_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Organizations_Min_Fields = {
  __typename?: 'organizations_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "organizations" */
export type Organizations_Mutation_Response = {
  __typename?: 'organizations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Organizations>;
};

/** input type for inserting object relation for remote table "organizations" */
export type Organizations_Obj_Rel_Insert_Input = {
  data: Organizations_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Organizations_On_Conflict>;
};

/** on_conflict condition type for table "organizations" */
export type Organizations_On_Conflict = {
  constraint: Organizations_Constraint;
  update_columns?: Array<Organizations_Update_Column>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "organizations". */
export type Organizations_Order_By = {
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  name?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_organizations_aggregate?: InputMaybe<User_Organizations_Aggregate_Order_By>;
  wallets_aggregate?: InputMaybe<Wallets_Aggregate_Order_By>;
};

/** primary key columns input for table: organizations */
export type Organizations_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "organizations" */
export enum Organizations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "organizations" */
export type Organizations_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** Streaming cursor of the table "organizations" */
export type Organizations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Organizations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Organizations_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** update columns of table "organizations" */
export enum Organizations_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Organizations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Organizations_Set_Input>;
  /** filter the rows which have to be updated */
  where: Organizations_Bool_Exp;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "hubs" */
  hubs: Array<Hubs>;
  /** fetch aggregated fields from the table: "hubs" */
  hubs_aggregate: Hubs_Aggregate;
  /** fetch data from the table: "hubs" using primary key columns */
  hubs_by_pk?: Maybe<Hubs>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** An array relationship */
  rides: Array<Rides>;
  /** An aggregate relationship */
  rides_aggregate: Rides_Aggregate;
  /** fetch data from the table: "rides" using primary key columns */
  rides_by_pk?: Maybe<Rides>;
  /** An array relationship */
  scooters: Array<Scooters>;
  /** An aggregate relationship */
  scooters_aggregate: Scooters_Aggregate;
  /** fetch data from the table: "scooters" using primary key columns */
  scooters_by_pk?: Maybe<Scooters>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** An array relationship */
  user_organizations: Array<User_Organizations>;
  /** An aggregate relationship */
  user_organizations_aggregate: User_Organizations_Aggregate;
  /** fetch data from the table: "user_organizations" using primary key columns */
  user_organizations_by_pk?: Maybe<User_Organizations>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** An array relationship */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
};


export type Query_RootHubsArgs = {
  distinct_on?: InputMaybe<Array<Hubs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hubs_Order_By>>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};


export type Query_RootHubs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hubs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hubs_Order_By>>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};


export type Query_RootHubs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Query_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Query_RootRides_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Query_RootRides_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootScootersArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


export type Query_RootScooters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


export type Query_RootScooters_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Query_RootTransactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootUser_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


export type Query_RootUser_Organizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


export type Query_RootUser_Organizations_By_PkArgs = {
  organization_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Query_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Query_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Query_RootWallets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};

/** columns and relationships of "rides" */
export type Rides = {
  __typename?: 'rides';
  cost_type?: Maybe<Scalars['String']['output']>;
  created_at: Scalars['timestamp']['output'];
  end_hub_id?: Maybe<Scalars['uuid']['output']>;
  end_time?: Maybe<Scalars['timestamp']['output']>;
  /** An object relationship */
  hub?: Maybe<Hubs>;
  /** An object relationship */
  hubByStartHubId: Hubs;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  scooter: Scooters;
  scooter_id: Scalars['uuid']['output'];
  start_hub_id: Scalars['uuid']['output'];
  start_time: Scalars['timestamp']['output'];
  total_cost?: Maybe<Scalars['numeric']['output']>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};


/** columns and relationships of "rides" */
export type RidesTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "rides" */
export type RidesTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "rides" */
export type Rides_Aggregate = {
  __typename?: 'rides_aggregate';
  aggregate?: Maybe<Rides_Aggregate_Fields>;
  nodes: Array<Rides>;
};

export type Rides_Aggregate_Bool_Exp = {
  count?: InputMaybe<Rides_Aggregate_Bool_Exp_Count>;
};

export type Rides_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Rides_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Rides_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "rides" */
export type Rides_Aggregate_Fields = {
  __typename?: 'rides_aggregate_fields';
  avg?: Maybe<Rides_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Rides_Max_Fields>;
  min?: Maybe<Rides_Min_Fields>;
  stddev?: Maybe<Rides_Stddev_Fields>;
  stddev_pop?: Maybe<Rides_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Rides_Stddev_Samp_Fields>;
  sum?: Maybe<Rides_Sum_Fields>;
  var_pop?: Maybe<Rides_Var_Pop_Fields>;
  var_samp?: Maybe<Rides_Var_Samp_Fields>;
  variance?: Maybe<Rides_Variance_Fields>;
};


/** aggregate fields of "rides" */
export type Rides_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Rides_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "rides" */
export type Rides_Aggregate_Order_By = {
  avg?: InputMaybe<Rides_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Rides_Max_Order_By>;
  min?: InputMaybe<Rides_Min_Order_By>;
  stddev?: InputMaybe<Rides_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Rides_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Rides_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Rides_Sum_Order_By>;
  var_pop?: InputMaybe<Rides_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Rides_Var_Samp_Order_By>;
  variance?: InputMaybe<Rides_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "rides" */
export type Rides_Arr_Rel_Insert_Input = {
  data: Array<Rides_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Rides_On_Conflict>;
};

/** aggregate avg on columns */
export type Rides_Avg_Fields = {
  __typename?: 'rides_avg_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "rides" */
export type Rides_Avg_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "rides". All fields are combined with a logical 'AND'. */
export type Rides_Bool_Exp = {
  _and?: InputMaybe<Array<Rides_Bool_Exp>>;
  _not?: InputMaybe<Rides_Bool_Exp>;
  _or?: InputMaybe<Array<Rides_Bool_Exp>>;
  cost_type?: InputMaybe<String_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  end_hub_id?: InputMaybe<Uuid_Comparison_Exp>;
  end_time?: InputMaybe<Timestamp_Comparison_Exp>;
  hub?: InputMaybe<Hubs_Bool_Exp>;
  hubByStartHubId?: InputMaybe<Hubs_Bool_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  scooter?: InputMaybe<Scooters_Bool_Exp>;
  scooter_id?: InputMaybe<Uuid_Comparison_Exp>;
  start_hub_id?: InputMaybe<Uuid_Comparison_Exp>;
  start_time?: InputMaybe<Timestamp_Comparison_Exp>;
  total_cost?: InputMaybe<Numeric_Comparison_Exp>;
  transactions?: InputMaybe<Transactions_Bool_Exp>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "rides" */
export enum Rides_Constraint {
  /** unique or primary key constraint on columns "id" */
  RidesPkey = 'rides_pkey'
}

/** input type for incrementing numeric columns in table "rides" */
export type Rides_Inc_Input = {
  total_cost?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "rides" */
export type Rides_Insert_Input = {
  cost_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  end_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  end_time?: InputMaybe<Scalars['timestamp']['input']>;
  hub?: InputMaybe<Hubs_Obj_Rel_Insert_Input>;
  hubByStartHubId?: InputMaybe<Hubs_Obj_Rel_Insert_Input>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  scooter?: InputMaybe<Scooters_Obj_Rel_Insert_Input>;
  scooter_id?: InputMaybe<Scalars['uuid']['input']>;
  start_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  start_time?: InputMaybe<Scalars['timestamp']['input']>;
  total_cost?: InputMaybe<Scalars['numeric']['input']>;
  transactions?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type Rides_Max_Fields = {
  __typename?: 'rides_max_fields';
  cost_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  end_hub_id?: Maybe<Scalars['uuid']['output']>;
  end_time?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  scooter_id?: Maybe<Scalars['uuid']['output']>;
  start_hub_id?: Maybe<Scalars['uuid']['output']>;
  start_time?: Maybe<Scalars['timestamp']['output']>;
  total_cost?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "rides" */
export type Rides_Max_Order_By = {
  cost_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_hub_id?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scooter_id?: InputMaybe<Order_By>;
  start_hub_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_cost?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Rides_Min_Fields = {
  __typename?: 'rides_min_fields';
  cost_type?: Maybe<Scalars['String']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  end_hub_id?: Maybe<Scalars['uuid']['output']>;
  end_time?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  scooter_id?: Maybe<Scalars['uuid']['output']>;
  start_hub_id?: Maybe<Scalars['uuid']['output']>;
  start_time?: Maybe<Scalars['timestamp']['output']>;
  total_cost?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "rides" */
export type Rides_Min_Order_By = {
  cost_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_hub_id?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  scooter_id?: InputMaybe<Order_By>;
  start_hub_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_cost?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "rides" */
export type Rides_Mutation_Response = {
  __typename?: 'rides_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Rides>;
};

/** input type for inserting object relation for remote table "rides" */
export type Rides_Obj_Rel_Insert_Input = {
  data: Rides_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Rides_On_Conflict>;
};

/** on_conflict condition type for table "rides" */
export type Rides_On_Conflict = {
  constraint: Rides_Constraint;
  update_columns?: Array<Rides_Update_Column>;
  where?: InputMaybe<Rides_Bool_Exp>;
};

/** Ordering options when selecting data from "rides". */
export type Rides_Order_By = {
  cost_type?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  end_hub_id?: InputMaybe<Order_By>;
  end_time?: InputMaybe<Order_By>;
  hub?: InputMaybe<Hubs_Order_By>;
  hubByStartHubId?: InputMaybe<Hubs_Order_By>;
  id?: InputMaybe<Order_By>;
  scooter?: InputMaybe<Scooters_Order_By>;
  scooter_id?: InputMaybe<Order_By>;
  start_hub_id?: InputMaybe<Order_By>;
  start_time?: InputMaybe<Order_By>;
  total_cost?: InputMaybe<Order_By>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: rides */
export type Rides_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "rides" */
export enum Rides_Select_Column {
  /** column name */
  CostType = 'cost_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndHubId = 'end_hub_id',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  Id = 'id',
  /** column name */
  ScooterId = 'scooter_id',
  /** column name */
  StartHubId = 'start_hub_id',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalCost = 'total_cost',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "rides" */
export type Rides_Set_Input = {
  cost_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  end_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  end_time?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  scooter_id?: InputMaybe<Scalars['uuid']['input']>;
  start_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  start_time?: InputMaybe<Scalars['timestamp']['input']>;
  total_cost?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate stddev on columns */
export type Rides_Stddev_Fields = {
  __typename?: 'rides_stddev_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "rides" */
export type Rides_Stddev_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Rides_Stddev_Pop_Fields = {
  __typename?: 'rides_stddev_pop_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "rides" */
export type Rides_Stddev_Pop_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Rides_Stddev_Samp_Fields = {
  __typename?: 'rides_stddev_samp_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "rides" */
export type Rides_Stddev_Samp_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "rides" */
export type Rides_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Rides_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Rides_Stream_Cursor_Value_Input = {
  cost_type?: InputMaybe<Scalars['String']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  end_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  end_time?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  scooter_id?: InputMaybe<Scalars['uuid']['input']>;
  start_hub_id?: InputMaybe<Scalars['uuid']['input']>;
  start_time?: InputMaybe<Scalars['timestamp']['input']>;
  total_cost?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate sum on columns */
export type Rides_Sum_Fields = {
  __typename?: 'rides_sum_fields';
  total_cost?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "rides" */
export type Rides_Sum_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** update columns of table "rides" */
export enum Rides_Update_Column {
  /** column name */
  CostType = 'cost_type',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  EndHubId = 'end_hub_id',
  /** column name */
  EndTime = 'end_time',
  /** column name */
  Id = 'id',
  /** column name */
  ScooterId = 'scooter_id',
  /** column name */
  StartHubId = 'start_hub_id',
  /** column name */
  StartTime = 'start_time',
  /** column name */
  TotalCost = 'total_cost',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type Rides_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Rides_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Rides_Set_Input>;
  /** filter the rows which have to be updated */
  where: Rides_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Rides_Var_Pop_Fields = {
  __typename?: 'rides_var_pop_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "rides" */
export type Rides_Var_Pop_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Rides_Var_Samp_Fields = {
  __typename?: 'rides_var_samp_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "rides" */
export type Rides_Var_Samp_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Rides_Variance_Fields = {
  __typename?: 'rides_variance_fields';
  total_cost?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "rides" */
export type Rides_Variance_Order_By = {
  total_cost?: InputMaybe<Order_By>;
};

/** columns and relationships of "scooters" */
export type Scooters = {
  __typename?: 'scooters';
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  hub: Hubs;
  hub_id: Scalars['uuid']['output'];
  id: Scalars['uuid']['output'];
  qr_code: Scalars['String']['output'];
  /** An array relationship */
  rides: Array<Rides>;
  /** An aggregate relationship */
  rides_aggregate: Rides_Aggregate;
  status: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
};


/** columns and relationships of "scooters" */
export type ScootersRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "scooters" */
export type ScootersRides_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};

/** aggregated selection of "scooters" */
export type Scooters_Aggregate = {
  __typename?: 'scooters_aggregate';
  aggregate?: Maybe<Scooters_Aggregate_Fields>;
  nodes: Array<Scooters>;
};

export type Scooters_Aggregate_Bool_Exp = {
  count?: InputMaybe<Scooters_Aggregate_Bool_Exp_Count>;
};

export type Scooters_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Scooters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Scooters_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "scooters" */
export type Scooters_Aggregate_Fields = {
  __typename?: 'scooters_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Scooters_Max_Fields>;
  min?: Maybe<Scooters_Min_Fields>;
};


/** aggregate fields of "scooters" */
export type Scooters_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Scooters_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "scooters" */
export type Scooters_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Scooters_Max_Order_By>;
  min?: InputMaybe<Scooters_Min_Order_By>;
};

/** input type for inserting array relation for remote table "scooters" */
export type Scooters_Arr_Rel_Insert_Input = {
  data: Array<Scooters_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Scooters_On_Conflict>;
};

/** Boolean expression to filter rows from the table "scooters". All fields are combined with a logical 'AND'. */
export type Scooters_Bool_Exp = {
  _and?: InputMaybe<Array<Scooters_Bool_Exp>>;
  _not?: InputMaybe<Scooters_Bool_Exp>;
  _or?: InputMaybe<Array<Scooters_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  hub?: InputMaybe<Hubs_Bool_Exp>;
  hub_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  qr_code?: InputMaybe<String_Comparison_Exp>;
  rides?: InputMaybe<Rides_Bool_Exp>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Bool_Exp>;
  status?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
};

/** unique or primary key constraints on table "scooters" */
export enum Scooters_Constraint {
  /** unique or primary key constraint on columns "id" */
  ScootersPkey = 'scooters_pkey'
}

/** input type for inserting data into table "scooters" */
export type Scooters_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  hub?: InputMaybe<Hubs_Obj_Rel_Insert_Input>;
  hub_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  qr_code?: InputMaybe<Scalars['String']['input']>;
  rides?: InputMaybe<Rides_Arr_Rel_Insert_Input>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate max on columns */
export type Scooters_Max_Fields = {
  __typename?: 'scooters_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  hub_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  qr_code?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "scooters" */
export type Scooters_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  hub_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  qr_code?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Scooters_Min_Fields = {
  __typename?: 'scooters_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  hub_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  qr_code?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "scooters" */
export type Scooters_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  hub_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  qr_code?: InputMaybe<Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "scooters" */
export type Scooters_Mutation_Response = {
  __typename?: 'scooters_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Scooters>;
};

/** input type for inserting object relation for remote table "scooters" */
export type Scooters_Obj_Rel_Insert_Input = {
  data: Scooters_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Scooters_On_Conflict>;
};

/** on_conflict condition type for table "scooters" */
export type Scooters_On_Conflict = {
  constraint: Scooters_Constraint;
  update_columns?: Array<Scooters_Update_Column>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};

/** Ordering options when selecting data from "scooters". */
export type Scooters_Order_By = {
  created_at?: InputMaybe<Order_By>;
  hub?: InputMaybe<Hubs_Order_By>;
  hub_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  qr_code?: InputMaybe<Order_By>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Order_By>;
  status?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** primary key columns input for table: scooters */
export type Scooters_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "scooters" */
export enum Scooters_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HubId = 'hub_id',
  /** column name */
  Id = 'id',
  /** column name */
  QrCode = 'qr_code',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "scooters" */
export type Scooters_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  hub_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  qr_code?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** Streaming cursor of the table "scooters" */
export type Scooters_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Scooters_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Scooters_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  hub_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  qr_code?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** update columns of table "scooters" */
export enum Scooters_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  HubId = 'hub_id',
  /** column name */
  Id = 'id',
  /** column name */
  QrCode = 'qr_code',
  /** column name */
  Status = 'status',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Scooters_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Scooters_Set_Input>;
  /** filter the rows which have to be updated */
  where: Scooters_Bool_Exp;
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "hubs" */
  hubs: Array<Hubs>;
  /** fetch aggregated fields from the table: "hubs" */
  hubs_aggregate: Hubs_Aggregate;
  /** fetch data from the table: "hubs" using primary key columns */
  hubs_by_pk?: Maybe<Hubs>;
  /** fetch data from the table in a streaming manner: "hubs" */
  hubs_stream: Array<Hubs>;
  /** fetch data from the table: "organizations" */
  organizations: Array<Organizations>;
  /** fetch aggregated fields from the table: "organizations" */
  organizations_aggregate: Organizations_Aggregate;
  /** fetch data from the table: "organizations" using primary key columns */
  organizations_by_pk?: Maybe<Organizations>;
  /** fetch data from the table in a streaming manner: "organizations" */
  organizations_stream: Array<Organizations>;
  /** An array relationship */
  rides: Array<Rides>;
  /** An aggregate relationship */
  rides_aggregate: Rides_Aggregate;
  /** fetch data from the table: "rides" using primary key columns */
  rides_by_pk?: Maybe<Rides>;
  /** fetch data from the table in a streaming manner: "rides" */
  rides_stream: Array<Rides>;
  /** An array relationship */
  scooters: Array<Scooters>;
  /** An aggregate relationship */
  scooters_aggregate: Scooters_Aggregate;
  /** fetch data from the table: "scooters" using primary key columns */
  scooters_by_pk?: Maybe<Scooters>;
  /** fetch data from the table in a streaming manner: "scooters" */
  scooters_stream: Array<Scooters>;
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  /** fetch data from the table: "transactions" using primary key columns */
  transactions_by_pk?: Maybe<Transactions>;
  /** fetch data from the table in a streaming manner: "transactions" */
  transactions_stream: Array<Transactions>;
  /** An array relationship */
  user_organizations: Array<User_Organizations>;
  /** An aggregate relationship */
  user_organizations_aggregate: User_Organizations_Aggregate;
  /** fetch data from the table: "user_organizations" using primary key columns */
  user_organizations_by_pk?: Maybe<User_Organizations>;
  /** fetch data from the table in a streaming manner: "user_organizations" */
  user_organizations_stream: Array<User_Organizations>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  users_aggregate: Users_Aggregate;
  /** fetch data from the table: "users" using primary key columns */
  users_by_pk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  users_stream: Array<Users>;
  /** An array relationship */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
  /** fetch data from the table: "wallets" using primary key columns */
  wallets_by_pk?: Maybe<Wallets>;
  /** fetch data from the table in a streaming manner: "wallets" */
  wallets_stream: Array<Wallets>;
};


export type Subscription_RootHubsArgs = {
  distinct_on?: InputMaybe<Array<Hubs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hubs_Order_By>>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};


export type Subscription_RootHubs_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Hubs_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Hubs_Order_By>>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};


export type Subscription_RootHubs_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootHubs_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Hubs_Stream_Cursor_Input>>;
  where?: InputMaybe<Hubs_Bool_Exp>;
};


export type Subscription_RootOrganizationsArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Organizations_Order_By>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootOrganizations_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootOrganizations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Organizations_Stream_Cursor_Input>>;
  where?: InputMaybe<Organizations_Bool_Exp>;
};


export type Subscription_RootRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Subscription_RootRides_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Subscription_RootRides_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootRides_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Rides_Stream_Cursor_Input>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


export type Subscription_RootScootersArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


export type Subscription_RootScooters_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Scooters_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Scooters_Order_By>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


export type Subscription_RootScooters_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootScooters_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Scooters_Stream_Cursor_Input>>;
  where?: InputMaybe<Scooters_Bool_Exp>;
};


export type Subscription_RootTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootTransactions_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootTransactions_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Transactions_Stream_Cursor_Input>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


export type Subscription_RootUser_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


export type Subscription_RootUser_Organizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


export type Subscription_RootUser_Organizations_By_PkArgs = {
  organization_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};


export type Subscription_RootUser_Organizations_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<User_Organizations_Stream_Cursor_Input>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


export type Subscription_RootUsersArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Users_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Users_Order_By>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootUsers_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Users_Stream_Cursor_Input>>;
  where?: InputMaybe<Users_Bool_Exp>;
};


export type Subscription_RootWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


export type Subscription_RootWallets_By_PkArgs = {
  id: Scalars['uuid']['input'];
};


export type Subscription_RootWallets_StreamArgs = {
  batch_size: Scalars['Int']['input'];
  cursor: Array<InputMaybe<Wallets_Stream_Cursor_Input>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Boolean expression to compare columns of type "timestamp". All fields are combined with logical 'AND'. */
export type Timestamp_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['timestamp']['input']>;
  _gt?: InputMaybe<Scalars['timestamp']['input']>;
  _gte?: InputMaybe<Scalars['timestamp']['input']>;
  _in?: InputMaybe<Array<Scalars['timestamp']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['timestamp']['input']>;
  _lte?: InputMaybe<Scalars['timestamp']['input']>;
  _neq?: InputMaybe<Scalars['timestamp']['input']>;
  _nin?: InputMaybe<Array<Scalars['timestamp']['input']>>;
};

/** columns and relationships of "transactions" */
export type Transactions = {
  __typename?: 'transactions';
  amount: Scalars['numeric']['output'];
  created_at: Scalars['timestamp']['output'];
  from_wallet_id?: Maybe<Scalars['uuid']['output']>;
  id: Scalars['uuid']['output'];
  /** An object relationship */
  ride?: Maybe<Rides>;
  ride_id?: Maybe<Scalars['uuid']['output']>;
  to_wallet_id?: Maybe<Scalars['uuid']['output']>;
  transaction_type: Scalars['String']['output'];
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  wallet?: Maybe<Wallets>;
  /** An object relationship */
  walletByToWalletId?: Maybe<Wallets>;
};

/** aggregated selection of "transactions" */
export type Transactions_Aggregate = {
  __typename?: 'transactions_aggregate';
  aggregate?: Maybe<Transactions_Aggregate_Fields>;
  nodes: Array<Transactions>;
};

export type Transactions_Aggregate_Bool_Exp = {
  count?: InputMaybe<Transactions_Aggregate_Bool_Exp_Count>;
};

export type Transactions_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Transactions_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "transactions" */
export type Transactions_Aggregate_Fields = {
  __typename?: 'transactions_aggregate_fields';
  avg?: Maybe<Transactions_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Transactions_Max_Fields>;
  min?: Maybe<Transactions_Min_Fields>;
  stddev?: Maybe<Transactions_Stddev_Fields>;
  stddev_pop?: Maybe<Transactions_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Transactions_Stddev_Samp_Fields>;
  sum?: Maybe<Transactions_Sum_Fields>;
  var_pop?: Maybe<Transactions_Var_Pop_Fields>;
  var_samp?: Maybe<Transactions_Var_Samp_Fields>;
  variance?: Maybe<Transactions_Variance_Fields>;
};


/** aggregate fields of "transactions" */
export type Transactions_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Transactions_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "transactions" */
export type Transactions_Aggregate_Order_By = {
  avg?: InputMaybe<Transactions_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Transactions_Max_Order_By>;
  min?: InputMaybe<Transactions_Min_Order_By>;
  stddev?: InputMaybe<Transactions_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Transactions_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Transactions_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Transactions_Sum_Order_By>;
  var_pop?: InputMaybe<Transactions_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Transactions_Var_Samp_Order_By>;
  variance?: InputMaybe<Transactions_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "transactions" */
export type Transactions_Arr_Rel_Insert_Input = {
  data: Array<Transactions_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Transactions_On_Conflict>;
};

/** aggregate avg on columns */
export type Transactions_Avg_Fields = {
  __typename?: 'transactions_avg_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "transactions" */
export type Transactions_Avg_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "transactions". All fields are combined with a logical 'AND'. */
export type Transactions_Bool_Exp = {
  _and?: InputMaybe<Array<Transactions_Bool_Exp>>;
  _not?: InputMaybe<Transactions_Bool_Exp>;
  _or?: InputMaybe<Array<Transactions_Bool_Exp>>;
  amount?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  from_wallet_id?: InputMaybe<Uuid_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  ride?: InputMaybe<Rides_Bool_Exp>;
  ride_id?: InputMaybe<Uuid_Comparison_Exp>;
  to_wallet_id?: InputMaybe<Uuid_Comparison_Exp>;
  transaction_type?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  wallet?: InputMaybe<Wallets_Bool_Exp>;
  walletByToWalletId?: InputMaybe<Wallets_Bool_Exp>;
};

/** unique or primary key constraints on table "transactions" */
export enum Transactions_Constraint {
  /** unique or primary key constraint on columns "id" */
  TransactionsPkey = 'transactions_pkey'
}

/** input type for incrementing numeric columns in table "transactions" */
export type Transactions_Inc_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "transactions" */
export type Transactions_Insert_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  from_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ride?: InputMaybe<Rides_Obj_Rel_Insert_Input>;
  ride_id?: InputMaybe<Scalars['uuid']['input']>;
  to_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  wallet?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
  walletByToWalletId?: InputMaybe<Wallets_Obj_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Transactions_Max_Fields = {
  __typename?: 'transactions_max_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  from_wallet_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ride_id?: Maybe<Scalars['uuid']['output']>;
  to_wallet_id?: Maybe<Scalars['uuid']['output']>;
  transaction_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by max() on columns of table "transactions" */
export type Transactions_Max_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  from_wallet_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  to_wallet_id?: InputMaybe<Order_By>;
  transaction_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Transactions_Min_Fields = {
  __typename?: 'transactions_min_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  from_wallet_id?: Maybe<Scalars['uuid']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  ride_id?: Maybe<Scalars['uuid']['output']>;
  to_wallet_id?: Maybe<Scalars['uuid']['output']>;
  transaction_type?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** order by min() on columns of table "transactions" */
export type Transactions_Min_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  from_wallet_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ride_id?: InputMaybe<Order_By>;
  to_wallet_id?: InputMaybe<Order_By>;
  transaction_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "transactions" */
export type Transactions_Mutation_Response = {
  __typename?: 'transactions_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Transactions>;
};

/** on_conflict condition type for table "transactions" */
export type Transactions_On_Conflict = {
  constraint: Transactions_Constraint;
  update_columns?: Array<Transactions_Update_Column>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** Ordering options when selecting data from "transactions". */
export type Transactions_Order_By = {
  amount?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  from_wallet_id?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  ride?: InputMaybe<Rides_Order_By>;
  ride_id?: InputMaybe<Order_By>;
  to_wallet_id?: InputMaybe<Order_By>;
  transaction_type?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  wallet?: InputMaybe<Wallets_Order_By>;
  walletByToWalletId?: InputMaybe<Wallets_Order_By>;
};

/** primary key columns input for table: transactions */
export type Transactions_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "transactions" */
export enum Transactions_Select_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromWalletId = 'from_wallet_id',
  /** column name */
  Id = 'id',
  /** column name */
  RideId = 'ride_id',
  /** column name */
  ToWalletId = 'to_wallet_id',
  /** column name */
  TransactionType = 'transaction_type',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "transactions" */
export type Transactions_Set_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  from_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ride_id?: InputMaybe<Scalars['uuid']['input']>;
  to_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate stddev on columns */
export type Transactions_Stddev_Fields = {
  __typename?: 'transactions_stddev_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "transactions" */
export type Transactions_Stddev_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Transactions_Stddev_Pop_Fields = {
  __typename?: 'transactions_stddev_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "transactions" */
export type Transactions_Stddev_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Transactions_Stddev_Samp_Fields = {
  __typename?: 'transactions_stddev_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "transactions" */
export type Transactions_Stddev_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "transactions" */
export type Transactions_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Transactions_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Transactions_Stream_Cursor_Value_Input = {
  amount?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  from_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  ride_id?: InputMaybe<Scalars['uuid']['input']>;
  to_wallet_id?: InputMaybe<Scalars['uuid']['input']>;
  transaction_type?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** aggregate sum on columns */
export type Transactions_Sum_Fields = {
  __typename?: 'transactions_sum_fields';
  amount?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "transactions" */
export type Transactions_Sum_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** update columns of table "transactions" */
export enum Transactions_Update_Column {
  /** column name */
  Amount = 'amount',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  FromWalletId = 'from_wallet_id',
  /** column name */
  Id = 'id',
  /** column name */
  RideId = 'ride_id',
  /** column name */
  ToWalletId = 'to_wallet_id',
  /** column name */
  TransactionType = 'transaction_type',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Transactions_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Transactions_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Transactions_Set_Input>;
  /** filter the rows which have to be updated */
  where: Transactions_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Transactions_Var_Pop_Fields = {
  __typename?: 'transactions_var_pop_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "transactions" */
export type Transactions_Var_Pop_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Transactions_Var_Samp_Fields = {
  __typename?: 'transactions_var_samp_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "transactions" */
export type Transactions_Var_Samp_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Transactions_Variance_Fields = {
  __typename?: 'transactions_variance_fields';
  amount?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "transactions" */
export type Transactions_Variance_Order_By = {
  amount?: InputMaybe<Order_By>;
};

/** columns and relationships of "user_organizations" */
export type User_Organizations = {
  __typename?: 'user_organizations';
  created_at: Scalars['timestamp']['output'];
  /** An object relationship */
  organization: Organizations;
  organization_id: Scalars['uuid']['output'];
  role?: Maybe<Scalars['String']['output']>;
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user: Users;
  user_id: Scalars['uuid']['output'];
};

/** aggregated selection of "user_organizations" */
export type User_Organizations_Aggregate = {
  __typename?: 'user_organizations_aggregate';
  aggregate?: Maybe<User_Organizations_Aggregate_Fields>;
  nodes: Array<User_Organizations>;
};

export type User_Organizations_Aggregate_Bool_Exp = {
  count?: InputMaybe<User_Organizations_Aggregate_Bool_Exp_Count>;
};

export type User_Organizations_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<User_Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<User_Organizations_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "user_organizations" */
export type User_Organizations_Aggregate_Fields = {
  __typename?: 'user_organizations_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<User_Organizations_Max_Fields>;
  min?: Maybe<User_Organizations_Min_Fields>;
};


/** aggregate fields of "user_organizations" */
export type User_Organizations_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<User_Organizations_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "user_organizations" */
export type User_Organizations_Aggregate_Order_By = {
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<User_Organizations_Max_Order_By>;
  min?: InputMaybe<User_Organizations_Min_Order_By>;
};

/** input type for inserting array relation for remote table "user_organizations" */
export type User_Organizations_Arr_Rel_Insert_Input = {
  data: Array<User_Organizations_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<User_Organizations_On_Conflict>;
};

/** Boolean expression to filter rows from the table "user_organizations". All fields are combined with a logical 'AND'. */
export type User_Organizations_Bool_Exp = {
  _and?: InputMaybe<Array<User_Organizations_Bool_Exp>>;
  _not?: InputMaybe<User_Organizations_Bool_Exp>;
  _or?: InputMaybe<Array<User_Organizations_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  organization_id?: InputMaybe<Uuid_Comparison_Exp>;
  role?: InputMaybe<String_Comparison_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
};

/** unique or primary key constraints on table "user_organizations" */
export enum User_Organizations_Constraint {
  /** unique or primary key constraint on columns "user_id", "organization_id" */
  UserOrganizationsPkey = 'user_organizations_pkey'
}

/** input type for inserting data into table "user_organizations" */
export type User_Organizations_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** aggregate max on columns */
export type User_Organizations_Max_Fields = {
  __typename?: 'user_organizations_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by max() on columns of table "user_organizations" */
export type User_Organizations_Max_Order_By = {
  created_at?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type User_Organizations_Min_Fields = {
  __typename?: 'user_organizations_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  organization_id?: Maybe<Scalars['uuid']['output']>;
  role?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
};

/** order by min() on columns of table "user_organizations" */
export type User_Organizations_Min_Order_By = {
  created_at?: InputMaybe<Order_By>;
  organization_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "user_organizations" */
export type User_Organizations_Mutation_Response = {
  __typename?: 'user_organizations_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<User_Organizations>;
};

/** on_conflict condition type for table "user_organizations" */
export type User_Organizations_On_Conflict = {
  constraint: User_Organizations_Constraint;
  update_columns?: Array<User_Organizations_Update_Column>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};

/** Ordering options when selecting data from "user_organizations". */
export type User_Organizations_Order_By = {
  created_at?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  organization_id?: InputMaybe<Order_By>;
  role?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
};

/** primary key columns input for table: user_organizations */
export type User_Organizations_Pk_Columns_Input = {
  organization_id: Scalars['uuid']['input'];
  user_id: Scalars['uuid']['input'];
};

/** select columns of table "user_organizations" */
export enum User_Organizations_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

/** input type for updating data in table "user_organizations" */
export type User_Organizations_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** Streaming cursor of the table "user_organizations" */
export type User_Organizations_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: User_Organizations_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type User_Organizations_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  organization_id?: InputMaybe<Scalars['uuid']['input']>;
  role?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
};

/** update columns of table "user_organizations" */
export enum User_Organizations_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  OrganizationId = 'organization_id',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id'
}

export type User_Organizations_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<User_Organizations_Set_Input>;
  /** filter the rows which have to be updated */
  where: User_Organizations_Bool_Exp;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'users';
  created_at: Scalars['timestamp']['output'];
  email: Scalars['String']['output'];
  firebase_id: Scalars['String']['output'];
  first_name?: Maybe<Scalars['String']['output']>;
  full_name: Scalars['String']['output'];
  id: Scalars['uuid']['output'];
  last_name?: Maybe<Scalars['String']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  phone_number: Scalars['String']['output'];
  /** An array relationship */
  rides: Array<Rides>;
  /** An aggregate relationship */
  rides_aggregate: Rides_Aggregate;
  updated_at: Scalars['timestamp']['output'];
  /** An array relationship */
  user_organizations: Array<User_Organizations>;
  /** An aggregate relationship */
  user_organizations_aggregate: User_Organizations_Aggregate;
  /** An array relationship */
  wallets: Array<Wallets>;
  /** An aggregate relationship */
  wallets_aggregate: Wallets_Aggregate;
};


/** columns and relationships of "users" */
export type UsersRidesArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersRides_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Rides_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Rides_Order_By>>;
  where?: InputMaybe<Rides_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_OrganizationsArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersUser_Organizations_AggregateArgs = {
  distinct_on?: InputMaybe<Array<User_Organizations_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<User_Organizations_Order_By>>;
  where?: InputMaybe<User_Organizations_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWalletsArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersWallets_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Wallets_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Wallets_Order_By>>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
  __typename?: 'users_aggregate';
  aggregate?: Maybe<Users_Aggregate_Fields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
  __typename?: 'users_aggregate_fields';
  count: Scalars['Int']['output'];
  max?: Maybe<Users_Max_Fields>;
  min?: Maybe<Users_Min_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Users_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
  _and?: InputMaybe<Array<Users_Bool_Exp>>;
  _not?: InputMaybe<Users_Bool_Exp>;
  _or?: InputMaybe<Array<Users_Bool_Exp>>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  email?: InputMaybe<String_Comparison_Exp>;
  firebase_id?: InputMaybe<String_Comparison_Exp>;
  first_name?: InputMaybe<String_Comparison_Exp>;
  full_name?: InputMaybe<String_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  last_name?: InputMaybe<String_Comparison_Exp>;
  middle_name?: InputMaybe<String_Comparison_Exp>;
  phone_number?: InputMaybe<String_Comparison_Exp>;
  rides?: InputMaybe<Rides_Bool_Exp>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user_organizations?: InputMaybe<User_Organizations_Bool_Exp>;
  user_organizations_aggregate?: InputMaybe<User_Organizations_Aggregate_Bool_Exp>;
  wallets?: InputMaybe<Wallets_Bool_Exp>;
  wallets_aggregate?: InputMaybe<Wallets_Aggregate_Bool_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "firebase_id" */
  UsersFirebaseIdKey = 'users_firebase_id_key',
  /** unique or primary key constraint on columns "phone_number" */
  UsersPhoneNumberKey = 'users_phone_number_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  rides?: InputMaybe<Rides_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_organizations?: InputMaybe<User_Organizations_Arr_Rel_Insert_Input>;
  wallets?: InputMaybe<Wallets_Arr_Rel_Insert_Input>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
  __typename?: 'users_max_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
  __typename?: 'users_min_fields';
  created_at?: Maybe<Scalars['timestamp']['output']>;
  email?: Maybe<Scalars['String']['output']>;
  firebase_id?: Maybe<Scalars['String']['output']>;
  first_name?: Maybe<Scalars['String']['output']>;
  full_name?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  last_name?: Maybe<Scalars['String']['output']>;
  middle_name?: Maybe<Scalars['String']['output']>;
  phone_number?: Maybe<Scalars['String']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
  __typename?: 'users_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
  data: Users_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Users_On_Conflict>;
};

/** on_conflict condition type for table "users" */
export type Users_On_Conflict = {
  constraint: Users_Constraint;
  update_columns?: Array<Users_Update_Column>;
  where?: InputMaybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
  created_at?: InputMaybe<Order_By>;
  email?: InputMaybe<Order_By>;
  firebase_id?: InputMaybe<Order_By>;
  first_name?: InputMaybe<Order_By>;
  full_name?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  last_name?: InputMaybe<Order_By>;
  middle_name?: InputMaybe<Order_By>;
  phone_number?: InputMaybe<Order_By>;
  rides_aggregate?: InputMaybe<Rides_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_organizations_aggregate?: InputMaybe<User_Organizations_Aggregate_Order_By>;
  wallets_aggregate?: InputMaybe<Wallets_Aggregate_Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirebaseId = 'firebase_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  UpdatedAt = 'updated_at'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** Streaming cursor of the table "users" */
export type Users_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Users_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_Stream_Cursor_Value_Input = {
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  firebase_id?: InputMaybe<Scalars['String']['input']>;
  first_name?: InputMaybe<Scalars['String']['input']>;
  full_name?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  last_name?: InputMaybe<Scalars['String']['input']>;
  middle_name?: InputMaybe<Scalars['String']['input']>;
  phone_number?: InputMaybe<Scalars['String']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Email = 'email',
  /** column name */
  FirebaseId = 'firebase_id',
  /** column name */
  FirstName = 'first_name',
  /** column name */
  FullName = 'full_name',
  /** column name */
  Id = 'id',
  /** column name */
  LastName = 'last_name',
  /** column name */
  MiddleName = 'middle_name',
  /** column name */
  PhoneNumber = 'phone_number',
  /** column name */
  UpdatedAt = 'updated_at'
}

export type Users_Updates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Users_Set_Input>;
  /** filter the rows which have to be updated */
  where: Users_Bool_Exp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
  _eq?: InputMaybe<Scalars['uuid']['input']>;
  _gt?: InputMaybe<Scalars['uuid']['input']>;
  _gte?: InputMaybe<Scalars['uuid']['input']>;
  _in?: InputMaybe<Array<Scalars['uuid']['input']>>;
  _is_null?: InputMaybe<Scalars['Boolean']['input']>;
  _lt?: InputMaybe<Scalars['uuid']['input']>;
  _lte?: InputMaybe<Scalars['uuid']['input']>;
  _neq?: InputMaybe<Scalars['uuid']['input']>;
  _nin?: InputMaybe<Array<Scalars['uuid']['input']>>;
};

/** columns and relationships of "wallets" */
export type Wallets = {
  __typename?: 'wallets';
  balance: Scalars['numeric']['output'];
  created_at: Scalars['timestamp']['output'];
  id: Scalars['uuid']['output'];
  org_id?: Maybe<Scalars['uuid']['output']>;
  /** An object relationship */
  organization?: Maybe<Organizations>;
  security_deposit: Scalars['numeric']['output'];
  /** An array relationship */
  transactions: Array<Transactions>;
  /** An array relationship */
  transactionsByToWalletId: Array<Transactions>;
  /** An aggregate relationship */
  transactionsByToWalletId_aggregate: Transactions_Aggregate;
  /** An aggregate relationship */
  transactions_aggregate: Transactions_Aggregate;
  updated_at: Scalars['timestamp']['output'];
  /** An object relationship */
  user?: Maybe<Users>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  wallet_type: Scalars['String']['output'];
};


/** columns and relationships of "wallets" */
export type WalletsTransactionsArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "wallets" */
export type WalletsTransactionsByToWalletIdArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "wallets" */
export type WalletsTransactionsByToWalletId_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};


/** columns and relationships of "wallets" */
export type WalletsTransactions_AggregateArgs = {
  distinct_on?: InputMaybe<Array<Transactions_Select_Column>>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  order_by?: InputMaybe<Array<Transactions_Order_By>>;
  where?: InputMaybe<Transactions_Bool_Exp>;
};

/** aggregated selection of "wallets" */
export type Wallets_Aggregate = {
  __typename?: 'wallets_aggregate';
  aggregate?: Maybe<Wallets_Aggregate_Fields>;
  nodes: Array<Wallets>;
};

export type Wallets_Aggregate_Bool_Exp = {
  count?: InputMaybe<Wallets_Aggregate_Bool_Exp_Count>;
};

export type Wallets_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
  filter?: InputMaybe<Wallets_Bool_Exp>;
  predicate: Int_Comparison_Exp;
};

/** aggregate fields of "wallets" */
export type Wallets_Aggregate_Fields = {
  __typename?: 'wallets_aggregate_fields';
  avg?: Maybe<Wallets_Avg_Fields>;
  count: Scalars['Int']['output'];
  max?: Maybe<Wallets_Max_Fields>;
  min?: Maybe<Wallets_Min_Fields>;
  stddev?: Maybe<Wallets_Stddev_Fields>;
  stddev_pop?: Maybe<Wallets_Stddev_Pop_Fields>;
  stddev_samp?: Maybe<Wallets_Stddev_Samp_Fields>;
  sum?: Maybe<Wallets_Sum_Fields>;
  var_pop?: Maybe<Wallets_Var_Pop_Fields>;
  var_samp?: Maybe<Wallets_Var_Samp_Fields>;
  variance?: Maybe<Wallets_Variance_Fields>;
};


/** aggregate fields of "wallets" */
export type Wallets_Aggregate_FieldsCountArgs = {
  columns?: InputMaybe<Array<Wallets_Select_Column>>;
  distinct?: InputMaybe<Scalars['Boolean']['input']>;
};

/** order by aggregate values of table "wallets" */
export type Wallets_Aggregate_Order_By = {
  avg?: InputMaybe<Wallets_Avg_Order_By>;
  count?: InputMaybe<Order_By>;
  max?: InputMaybe<Wallets_Max_Order_By>;
  min?: InputMaybe<Wallets_Min_Order_By>;
  stddev?: InputMaybe<Wallets_Stddev_Order_By>;
  stddev_pop?: InputMaybe<Wallets_Stddev_Pop_Order_By>;
  stddev_samp?: InputMaybe<Wallets_Stddev_Samp_Order_By>;
  sum?: InputMaybe<Wallets_Sum_Order_By>;
  var_pop?: InputMaybe<Wallets_Var_Pop_Order_By>;
  var_samp?: InputMaybe<Wallets_Var_Samp_Order_By>;
  variance?: InputMaybe<Wallets_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "wallets" */
export type Wallets_Arr_Rel_Insert_Input = {
  data: Array<Wallets_Insert_Input>;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** aggregate avg on columns */
export type Wallets_Avg_Fields = {
  __typename?: 'wallets_avg_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by avg() on columns of table "wallets" */
export type Wallets_Avg_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** Boolean expression to filter rows from the table "wallets". All fields are combined with a logical 'AND'. */
export type Wallets_Bool_Exp = {
  _and?: InputMaybe<Array<Wallets_Bool_Exp>>;
  _not?: InputMaybe<Wallets_Bool_Exp>;
  _or?: InputMaybe<Array<Wallets_Bool_Exp>>;
  balance?: InputMaybe<Numeric_Comparison_Exp>;
  created_at?: InputMaybe<Timestamp_Comparison_Exp>;
  id?: InputMaybe<Uuid_Comparison_Exp>;
  org_id?: InputMaybe<Uuid_Comparison_Exp>;
  organization?: InputMaybe<Organizations_Bool_Exp>;
  security_deposit?: InputMaybe<Numeric_Comparison_Exp>;
  transactions?: InputMaybe<Transactions_Bool_Exp>;
  transactionsByToWalletId?: InputMaybe<Transactions_Bool_Exp>;
  transactionsByToWalletId_aggregate?: InputMaybe<Transactions_Aggregate_Bool_Exp>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Bool_Exp>;
  updated_at?: InputMaybe<Timestamp_Comparison_Exp>;
  user?: InputMaybe<Users_Bool_Exp>;
  user_id?: InputMaybe<Uuid_Comparison_Exp>;
  wallet_type?: InputMaybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "wallets" */
export enum Wallets_Constraint {
  /** unique or primary key constraint on columns "org_id" */
  WalletsOrgIdKey = 'wallets_org_id_key',
  /** unique or primary key constraint on columns "id" */
  WalletsPkey = 'wallets_pkey',
  /** unique or primary key constraint on columns "user_id" */
  WalletsUserIdKey = 'wallets_user_id_key'
}

/** input type for incrementing numeric columns in table "wallets" */
export type Wallets_Inc_Input = {
  balance?: InputMaybe<Scalars['numeric']['input']>;
  security_deposit?: InputMaybe<Scalars['numeric']['input']>;
};

/** input type for inserting data into table "wallets" */
export type Wallets_Insert_Input = {
  balance?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  org_id?: InputMaybe<Scalars['uuid']['input']>;
  organization?: InputMaybe<Organizations_Obj_Rel_Insert_Input>;
  security_deposit?: InputMaybe<Scalars['numeric']['input']>;
  transactions?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  transactionsByToWalletId?: InputMaybe<Transactions_Arr_Rel_Insert_Input>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user?: InputMaybe<Users_Obj_Rel_Insert_Input>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  wallet_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate max on columns */
export type Wallets_Max_Fields = {
  __typename?: 'wallets_max_fields';
  balance?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  org_id?: Maybe<Scalars['uuid']['output']>;
  security_deposit?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  wallet_type?: Maybe<Scalars['String']['output']>;
};

/** order by max() on columns of table "wallets" */
export type Wallets_Max_Order_By = {
  balance?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  wallet_type?: InputMaybe<Order_By>;
};

/** aggregate min on columns */
export type Wallets_Min_Fields = {
  __typename?: 'wallets_min_fields';
  balance?: Maybe<Scalars['numeric']['output']>;
  created_at?: Maybe<Scalars['timestamp']['output']>;
  id?: Maybe<Scalars['uuid']['output']>;
  org_id?: Maybe<Scalars['uuid']['output']>;
  security_deposit?: Maybe<Scalars['numeric']['output']>;
  updated_at?: Maybe<Scalars['timestamp']['output']>;
  user_id?: Maybe<Scalars['uuid']['output']>;
  wallet_type?: Maybe<Scalars['String']['output']>;
};

/** order by min() on columns of table "wallets" */
export type Wallets_Min_Order_By = {
  balance?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user_id?: InputMaybe<Order_By>;
  wallet_type?: InputMaybe<Order_By>;
};

/** response of any mutation on the table "wallets" */
export type Wallets_Mutation_Response = {
  __typename?: 'wallets_mutation_response';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int']['output'];
  /** data from the rows affected by the mutation */
  returning: Array<Wallets>;
};

/** input type for inserting object relation for remote table "wallets" */
export type Wallets_Obj_Rel_Insert_Input = {
  data: Wallets_Insert_Input;
  /** upsert condition */
  on_conflict?: InputMaybe<Wallets_On_Conflict>;
};

/** on_conflict condition type for table "wallets" */
export type Wallets_On_Conflict = {
  constraint: Wallets_Constraint;
  update_columns?: Array<Wallets_Update_Column>;
  where?: InputMaybe<Wallets_Bool_Exp>;
};

/** Ordering options when selecting data from "wallets". */
export type Wallets_Order_By = {
  balance?: InputMaybe<Order_By>;
  created_at?: InputMaybe<Order_By>;
  id?: InputMaybe<Order_By>;
  org_id?: InputMaybe<Order_By>;
  organization?: InputMaybe<Organizations_Order_By>;
  security_deposit?: InputMaybe<Order_By>;
  transactionsByToWalletId_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  transactions_aggregate?: InputMaybe<Transactions_Aggregate_Order_By>;
  updated_at?: InputMaybe<Order_By>;
  user?: InputMaybe<Users_Order_By>;
  user_id?: InputMaybe<Order_By>;
  wallet_type?: InputMaybe<Order_By>;
};

/** primary key columns input for table: wallets */
export type Wallets_Pk_Columns_Input = {
  id: Scalars['uuid']['input'];
};

/** select columns of table "wallets" */
export enum Wallets_Select_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'org_id',
  /** column name */
  SecurityDeposit = 'security_deposit',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WalletType = 'wallet_type'
}

/** input type for updating data in table "wallets" */
export type Wallets_Set_Input = {
  balance?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  org_id?: InputMaybe<Scalars['uuid']['input']>;
  security_deposit?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  wallet_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate stddev on columns */
export type Wallets_Stddev_Fields = {
  __typename?: 'wallets_stddev_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev() on columns of table "wallets" */
export type Wallets_Stddev_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Wallets_Stddev_Pop_Fields = {
  __typename?: 'wallets_stddev_pop_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_pop() on columns of table "wallets" */
export type Wallets_Stddev_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Wallets_Stddev_Samp_Fields = {
  __typename?: 'wallets_stddev_samp_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by stddev_samp() on columns of table "wallets" */
export type Wallets_Stddev_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** Streaming cursor of the table "wallets" */
export type Wallets_Stream_Cursor_Input = {
  /** Stream column input with initial value */
  initial_value: Wallets_Stream_Cursor_Value_Input;
  /** cursor ordering */
  ordering?: InputMaybe<Cursor_Ordering>;
};

/** Initial value of the column from where the streaming should start */
export type Wallets_Stream_Cursor_Value_Input = {
  balance?: InputMaybe<Scalars['numeric']['input']>;
  created_at?: InputMaybe<Scalars['timestamp']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
  org_id?: InputMaybe<Scalars['uuid']['input']>;
  security_deposit?: InputMaybe<Scalars['numeric']['input']>;
  updated_at?: InputMaybe<Scalars['timestamp']['input']>;
  user_id?: InputMaybe<Scalars['uuid']['input']>;
  wallet_type?: InputMaybe<Scalars['String']['input']>;
};

/** aggregate sum on columns */
export type Wallets_Sum_Fields = {
  __typename?: 'wallets_sum_fields';
  balance?: Maybe<Scalars['numeric']['output']>;
  security_deposit?: Maybe<Scalars['numeric']['output']>;
};

/** order by sum() on columns of table "wallets" */
export type Wallets_Sum_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** update columns of table "wallets" */
export enum Wallets_Update_Column {
  /** column name */
  Balance = 'balance',
  /** column name */
  CreatedAt = 'created_at',
  /** column name */
  Id = 'id',
  /** column name */
  OrgId = 'org_id',
  /** column name */
  SecurityDeposit = 'security_deposit',
  /** column name */
  UpdatedAt = 'updated_at',
  /** column name */
  UserId = 'user_id',
  /** column name */
  WalletType = 'wallet_type'
}

export type Wallets_Updates = {
  /** increments the numeric columns with given value of the filtered values */
  _inc?: InputMaybe<Wallets_Inc_Input>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<Wallets_Set_Input>;
  /** filter the rows which have to be updated */
  where: Wallets_Bool_Exp;
};

/** aggregate var_pop on columns */
export type Wallets_Var_Pop_Fields = {
  __typename?: 'wallets_var_pop_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by var_pop() on columns of table "wallets" */
export type Wallets_Var_Pop_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Wallets_Var_Samp_Fields = {
  __typename?: 'wallets_var_samp_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by var_samp() on columns of table "wallets" */
export type Wallets_Var_Samp_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

/** aggregate variance on columns */
export type Wallets_Variance_Fields = {
  __typename?: 'wallets_variance_fields';
  balance?: Maybe<Scalars['Float']['output']>;
  security_deposit?: Maybe<Scalars['Float']['output']>;
};

/** order by variance() on columns of table "wallets" */
export type Wallets_Variance_Order_By = {
  balance?: InputMaybe<Order_By>;
  security_deposit?: InputMaybe<Order_By>;
};

export type FetchCurrentUserQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchCurrentUserQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'users', email: string, id: any, full_name: string, phone_number: string, user_organizations: Array<{ __typename?: 'user_organizations', organization: { __typename?: 'organizations', name: string } }> }> };

export type UpdateUserMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
  _set?: InputMaybe<Users_Set_Input>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', update_users_by_pk?: { __typename?: 'users', id: any } | null };

export type CreateWalletMutationVariables = Exact<{
  object?: InputMaybe<Wallets_Insert_Input>;
}>;


export type CreateWalletMutation = { __typename?: 'mutation_root', insert_wallets_one?: { __typename?: 'wallets', balance: any, created_at: any, id: any } | null };

export type FetchUserWalletQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchUserWalletQuery = { __typename?: 'query_root', wallets: Array<{ __typename?: 'wallets', balance: any, id: any, security_deposit: any, transactions: Array<{ __typename?: 'transactions', ride_id?: any | null, amount: any, ride?: { __typename?: 'rides', end_time?: any | null, start_time: any, total_cost?: any | null, hub?: { __typename?: 'hubs', id: any, name?: string | null } | null } | null }> }> };

export type UpdateWalletBalanceMutationVariables = Exact<{
  id?: InputMaybe<Scalars['uuid']['input']>;
  balance?: InputMaybe<Scalars['numeric']['input']>;
}>;


export type UpdateWalletBalanceMutation = { __typename?: 'mutation_root', update_wallets_by_pk?: { __typename?: 'wallets', created_at: any, id: any, balance: any, org_id?: any | null } | null };

export type UpdateWalletSecurityDepositMutationVariables = Exact<{
  security_deposit?: InputMaybe<Scalars['numeric']['input']>;
  id?: InputMaybe<Scalars['uuid']['input']>;
}>;


export type UpdateWalletSecurityDepositMutation = { __typename?: 'mutation_root', update_wallets_by_pk?: { __typename?: 'wallets', id: any, security_deposit: any, created_at: any } | null };


export const FetchCurrentUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchCurrentUser"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"full_name"}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}},{"kind":"Field","name":{"kind":"Name","value":"user_organizations"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"organization"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"phone_number"}}]}}]}}]} as unknown as DocumentNode<FetchCurrentUserQuery, FetchCurrentUserQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"_set"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"users_set_input"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_users_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"_set"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const CreateWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"createWallet"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"object"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"wallets_insert_input"}},"defaultValue":{"kind":"ObjectValue","fields":[]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"insert_wallets_one"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"object"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateWalletMutation, CreateWalletMutationVariables>;
export const FetchUserWalletDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"fetchUserWallet"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"wallets"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"security_deposit"}},{"kind":"Field","name":{"kind":"Name","value":"transactions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"ride_id"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"ride"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"end_time"}},{"kind":"Field","name":{"kind":"Name","value":"start_time"}},{"kind":"Field","name":{"kind":"Name","value":"total_cost"}},{"kind":"Field","name":{"kind":"Name","value":"hub"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<FetchUserWalletQuery, FetchUserWalletQueryVariables>;
export const UpdateWalletBalanceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWalletBalance"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"balance"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_wallets_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_inc"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"balance"},"value":{"kind":"Variable","name":{"kind":"Name","value":"balance"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"created_at"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"balance"}},{"kind":"Field","name":{"kind":"Name","value":"org_id"}}]}}]}}]} as unknown as DocumentNode<UpdateWalletBalanceMutation, UpdateWalletBalanceMutationVariables>;
export const UpdateWalletSecurityDepositDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateWalletSecurityDeposit"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"security_deposit"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"numeric"}},"defaultValue":{"kind":"StringValue","value":"","block":false}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}},"defaultValue":{"kind":"StringValue","value":"","block":false}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"update_wallets_by_pk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_inc"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"security_deposit"},"value":{"kind":"Variable","name":{"kind":"Name","value":"security_deposit"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"security_deposit"}},{"kind":"Field","name":{"kind":"Name","value":"created_at"}}]}}]}}]} as unknown as DocumentNode<UpdateWalletSecurityDepositMutation, UpdateWalletSecurityDepositMutationVariables>;