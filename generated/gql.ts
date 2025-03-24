/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "query fetchCurrentUser {\n  users {\n    email\n    id\n    full_name\n    phone_number\n    user_organizations {\n      organization {\n        name\n      }\n    }\n    phone_number\n  }\n}": typeof types.FetchCurrentUserDocument,
    "mutation updateUser($id: uuid = \"\", $_set: users_set_input = {}) {\n  update_users_by_pk(pk_columns: {id: $id}, _set: $_set) {\n    id\n  }\n}": typeof types.UpdateUserDocument,
    "mutation createWallet($object: wallets_insert_input = {}) {\n  insert_wallets_one(object: $object) {\n    balance\n    created_at\n    id\n  }\n}": typeof types.CreateWalletDocument,
    "query fetchUserWallet {\n  wallets {\n    balance\n    id\n    security_deposit\n    transactions {\n      ride_id\n      amount\n      ride {\n        end_time\n        start_time\n        total_cost\n        hub {\n          id\n          name\n        }\n      }\n    }\n  }\n}": typeof types.FetchUserWalletDocument,
};
const documents: Documents = {
    "query fetchCurrentUser {\n  users {\n    email\n    id\n    full_name\n    phone_number\n    user_organizations {\n      organization {\n        name\n      }\n    }\n    phone_number\n  }\n}": types.FetchCurrentUserDocument,
    "mutation updateUser($id: uuid = \"\", $_set: users_set_input = {}) {\n  update_users_by_pk(pk_columns: {id: $id}, _set: $_set) {\n    id\n  }\n}": types.UpdateUserDocument,
    "mutation createWallet($object: wallets_insert_input = {}) {\n  insert_wallets_one(object: $object) {\n    balance\n    created_at\n    id\n  }\n}": types.CreateWalletDocument,
    "query fetchUserWallet {\n  wallets {\n    balance\n    id\n    security_deposit\n    transactions {\n      ride_id\n      amount\n      ride {\n        end_time\n        start_time\n        total_cost\n        hub {\n          id\n          name\n        }\n      }\n    }\n  }\n}": types.FetchUserWalletDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = graphql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function graphql(source: string): unknown;

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query fetchCurrentUser {\n  users {\n    email\n    id\n    full_name\n    phone_number\n    user_organizations {\n      organization {\n        name\n      }\n    }\n    phone_number\n  }\n}"): (typeof documents)["query fetchCurrentUser {\n  users {\n    email\n    id\n    full_name\n    phone_number\n    user_organizations {\n      organization {\n        name\n      }\n    }\n    phone_number\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation updateUser($id: uuid = \"\", $_set: users_set_input = {}) {\n  update_users_by_pk(pk_columns: {id: $id}, _set: $_set) {\n    id\n  }\n}"): (typeof documents)["mutation updateUser($id: uuid = \"\", $_set: users_set_input = {}) {\n  update_users_by_pk(pk_columns: {id: $id}, _set: $_set) {\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation createWallet($object: wallets_insert_input = {}) {\n  insert_wallets_one(object: $object) {\n    balance\n    created_at\n    id\n  }\n}"): (typeof documents)["mutation createWallet($object: wallets_insert_input = {}) {\n  insert_wallets_one(object: $object) {\n    balance\n    created_at\n    id\n  }\n}"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query fetchUserWallet {\n  wallets {\n    balance\n    id\n    security_deposit\n    transactions {\n      ride_id\n      amount\n      ride {\n        end_time\n        start_time\n        total_cost\n        hub {\n          id\n          name\n        }\n      }\n    }\n  }\n}"): (typeof documents)["query fetchUserWallet {\n  wallets {\n    balance\n    id\n    security_deposit\n    transactions {\n      ride_id\n      amount\n      ride {\n        end_time\n        start_time\n        total_cost\n        hub {\n          id\n          name\n        }\n      }\n    }\n  }\n}"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;