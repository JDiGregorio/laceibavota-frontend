import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Date: { input: any; output: any; }
  DateTime: { input: any; output: any; }
};

export type Center = {
  __typename?: 'Center';
  address: Scalars['String']['output'];
  category: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

export type CreateVoterInput = {
  address: Scalars['String']['input'];
  center: Scalars['String']['input'];
  dni: Scalars['String']['input'];
  name: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createVoter?: Maybe<Voter>;
};


export type MutationCreateVoterArgs = {
  input: CreateVoterInput;
};

/** Allows ordering a list of records. */
export type OrderByClause = {
  /** The column that is used for ordering. */
  column: Scalars['String']['input'];
  /** The direction that is used for ordering. */
  order: SortOrder;
};

/** Aggregate functions when ordering by a relation without specifying a column. */
export enum OrderByRelationAggregateFunction {
  /** Amount of items. */
  Count = 'COUNT'
}

/** Aggregate functions when ordering by a relation that may specify a column. */
export enum OrderByRelationWithColumnAggregateFunction {
  /** Average. */
  Avg = 'AVG',
  /** Amount of items. */
  Count = 'COUNT',
  /** Maximum. */
  Max = 'MAX',
  /** Minimum. */
  Min = 'MIN',
  /** Sum. */
  Sum = 'SUM'
}

/** Information about pagination using a fully featured paginator. */
export type PaginatorInfo = {
  __typename?: 'PaginatorInfo';
  /** Number of items in the current page. */
  count: Scalars['Int']['output'];
  /** Index of the current page. */
  currentPage: Scalars['Int']['output'];
  /** Index of the first item in the current page. */
  firstItem?: Maybe<Scalars['Int']['output']>;
  /** Are there more pages after this one? */
  hasMorePages: Scalars['Boolean']['output'];
  /** Index of the last item in the current page. */
  lastItem?: Maybe<Scalars['Int']['output']>;
  /** Index of the last available page. */
  lastPage: Scalars['Int']['output'];
  /** Number of items per page. */
  perPage: Scalars['Int']['output'];
  /** Number of total available items. */
  total: Scalars['Int']['output'];
};

export type Query = {
  __typename?: 'Query';
  user?: Maybe<User>;
  voters: VoterPaginator;
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
};


export type QueryVotersArgs = {
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};

/** Directions for ordering a list of records. */
export enum SortOrder {
  /** Sort records in ascending order. */
  Asc = 'ASC',
  /** Sort records in descending order. */
  Desc = 'DESC'
}

/** Specify if you want to include or exclude trashed results from a query. */
export enum Trashed {
  /** Only return trashed results. */
  Only = 'ONLY',
  /** Return both trashed and non-trashed results. */
  With = 'WITH',
  /** Only return non-trashed results. */
  Without = 'WITHOUT'
}

export type User = {
  __typename?: 'User';
  code: Scalars['String']['output'];
  dni: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
  status: Scalars['Boolean']['output'];
};

export type Voter = {
  __typename?: 'Voter';
  address: Scalars['String']['output'];
  center?: Maybe<Scalars['String']['output']>;
  dni: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  phone?: Maybe<Scalars['String']['output']>;
};

/** A paginated list of Voter items. */
export type VoterPaginator = {
  __typename?: 'VoterPaginator';
  /** A list of Voter items. */
  data: Array<Voter>;
  /** Pagination information about the list of items. */
  paginatorInfo: PaginatorInfo;
};

export type ListVotersQueryVariables = Exact<{
  first: Scalars['Int']['input'];
  page?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type ListVotersQuery = { __typename?: 'Query', voters: { __typename?: 'VoterPaginator', data: Array<{ __typename?: 'Voter', id: string, name: string, dni: string, address: string, phone?: string | null }>, paginatorInfo: { __typename?: 'PaginatorInfo', currentPage: number, lastPage: number, total: number } } };

export type CreateVoterMutationVariables = Exact<{
  input: CreateVoterInput;
}>;


export type CreateVoterMutation = { __typename?: 'Mutation', createVoter?: { __typename?: 'Voter', id: string, name: string, dni: string, address: string, phone?: string | null, center?: string | null } | null };


export const ListVotersDocument = gql`
    query ListVoters($first: Int!, $page: Int, $search: String) {
  voters(first: $first, page: $page, search: $search) {
    data {
      id
      name
      dni
      address
      phone
    }
    paginatorInfo {
      currentPage
      lastPage
      total
    }
  }
}
    `;

/**
 * __useListVotersQuery__
 *
 * To run a query within a React component, call `useListVotersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListVotersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListVotersQuery({
 *   variables: {
 *      first: // value for 'first'
 *      page: // value for 'page'
 *      search: // value for 'search'
 *   },
 * });
 */
export function useListVotersQuery(baseOptions: Apollo.QueryHookOptions<ListVotersQuery, ListVotersQueryVariables> & ({ variables: ListVotersQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ListVotersQuery, ListVotersQueryVariables>(ListVotersDocument, options);
      }
export function useListVotersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ListVotersQuery, ListVotersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ListVotersQuery, ListVotersQueryVariables>(ListVotersDocument, options);
        }
export function useListVotersSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<ListVotersQuery, ListVotersQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ListVotersQuery, ListVotersQueryVariables>(ListVotersDocument, options);
        }
export type ListVotersQueryHookResult = ReturnType<typeof useListVotersQuery>;
export type ListVotersLazyQueryHookResult = ReturnType<typeof useListVotersLazyQuery>;
export type ListVotersSuspenseQueryHookResult = ReturnType<typeof useListVotersSuspenseQuery>;
export type ListVotersQueryResult = Apollo.QueryResult<ListVotersQuery, ListVotersQueryVariables>;
export const CreateVoterDocument = gql`
    mutation CreateVoter($input: CreateVoterInput!) {
  createVoter(input: $input) {
    id
    name
    dni
    address
    phone
    center
  }
}
    `;
export type CreateVoterMutationFn = Apollo.MutationFunction<CreateVoterMutation, CreateVoterMutationVariables>;

/**
 * __useCreateVoterMutation__
 *
 * To run a mutation, you first call `useCreateVoterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateVoterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createVoterMutation, { data, loading, error }] = useCreateVoterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateVoterMutation(baseOptions?: Apollo.MutationHookOptions<CreateVoterMutation, CreateVoterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateVoterMutation, CreateVoterMutationVariables>(CreateVoterDocument, options);
      }
export type CreateVoterMutationHookResult = ReturnType<typeof useCreateVoterMutation>;
export type CreateVoterMutationResult = Apollo.MutationResult<CreateVoterMutation>;
export type CreateVoterMutationOptions = Apollo.BaseMutationOptions<CreateVoterMutation, CreateVoterMutationVariables>;