import { gql } from '@apollo/client'
import * as Apollo from '@apollo/client'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never }
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
const defaultOptions = {} as const
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: { input: string, output: string }
  String: { input: string, output: string }
  Boolean: { input: boolean, output: boolean }
  Int: { input: number, output: number }
  Float: { input: number, output: number }
}

export interface Connection {
  __typename?: 'Connection'
  status: Scalars['String']['output']
}

export interface CreateTeamInput {
  /** The number of the team */
  number: Scalars['String']['input']
}

/** The current stage of the event */
export enum EventStage {
  AllianceSelection = 'ALLIANCE_SELECTION',
  Checkin = 'CHECKIN',
  Elims = 'ELIMS',
  Qualifications = 'QUALIFICATIONS',
  Teardown = 'TEARDOWN',
  WaitingForTeams = 'WAITING_FOR_TEAMS'
}

/** The inspection status of a team */
export enum Inspection {
  CheckedIn = 'CHECKED_IN',
  Completed = 'COMPLETED',
  InProgress = 'IN_PROGRESS',
  NotHere = 'NOT_HERE',
  NoShow = 'NO_SHOW'
}

/** The status of the match */
export enum MatchStatus {
  InProgress = 'IN_PROGRESS',
  Scoring = 'SCORING',
  Upcoming = 'UPCOMING'
}

export interface Mutation {
  __typename?: 'Mutation'
  createTeams: Team[]
  setSittings: Sitting[]
  setStage: Stage
  updateInspection: Team
}

export interface MutationCreateTeamsArgs {
  teams: CreateTeamInput[]
}

export interface MutationSetSittingsArgs {
  sittings: SittingInput[]
}

export interface MutationSetStageArgs {
  stage: EventStage
}

export interface MutationUpdateInspectionArgs {
  inspection: Inspection
  team: Scalars['String']['input']
}

export interface Query {
  __typename?: 'Query'
  connection: Connection
  matches: Sitting[]
  stage: Stage
  teams: Team[]
}

/** The round of the match */
export enum Round {
  F = 'F',
  Qf = 'QF',
  Qual = 'QUAL',
  Ro16 = 'Ro16',
  Sf = 'SF'
}

export interface Sitting {
  __typename?: 'Sitting'
  blue: Array<Scalars['String']['output']>
  contest: Scalars['Int']['output']
  field: Scalars['String']['output']
  id: Scalars['Int']['output']
  match: Scalars['Int']['output']
  red: Array<Scalars['String']['output']>
  round: Round
  sitting: Scalars['Int']['output']
  status: MatchStatus
}

export interface SittingInput {
  blue: Array<Scalars['String']['input']>
  contest: Scalars['Int']['input']
  field: Scalars['String']['input']
  id: Scalars['Int']['input']
  match: Scalars['Int']['input']
  red: Array<Scalars['String']['input']>
  round: Round
  sitting: Scalars['Int']['input']
  status: MatchStatus
}

export interface Stage {
  __typename?: 'Stage'
  /** The current stage of the event */
  stage: EventStage
}

export interface Team {
  __typename?: 'Team'
  /** The inspection status of the team */
  inspection: Inspection
  /** The number of the team */
  number: Scalars['String']['output']
  /** The rank of the team */
  rank: Scalars['Int']['output']
}

export type InspectionQueryVariables = Exact<{ [key: string]: never }>

export interface InspectionQuery { __typename?: 'Query', teams: Array<{ __typename?: 'Team', number: string, inspection: Inspection }> }

export type StageQueryVariables = Exact<{ [key: string]: never }>

export interface StageQuery { __typename?: 'Query', stage: { __typename?: 'Stage', stage: EventStage } }

export const InspectionDocument = gql`
    query Inspection {
  teams {
    number
    inspection
  }
}
    `

/**
 * __useInspectionQuery__
 *
 * To run a query within a React component, call `useInspectionQuery` and pass it any options that fit your needs.
 * When your component renders, `useInspectionQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useInspectionQuery({
 *   variables: {
 *   },
 * });
 */
export function useInspectionQuery (baseOptions?: Apollo.QueryHookOptions<InspectionQuery, InspectionQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<InspectionQuery, InspectionQueryVariables>(InspectionDocument, options)
}
export function useInspectionLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<InspectionQuery, InspectionQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<InspectionQuery, InspectionQueryVariables>(InspectionDocument, options)
}
export function useInspectionSuspenseQuery (baseOptions?: Apollo.SuspenseQueryHookOptions<InspectionQuery, InspectionQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<InspectionQuery, InspectionQueryVariables>(InspectionDocument, options)
}
export type InspectionQueryHookResult = ReturnType<typeof useInspectionQuery>
export type InspectionLazyQueryHookResult = ReturnType<typeof useInspectionLazyQuery>
export type InspectionSuspenseQueryHookResult = ReturnType<typeof useInspectionSuspenseQuery>
export type InspectionQueryResult = Apollo.QueryResult<InspectionQuery, InspectionQueryVariables>
export const StageDocument = gql`
    query Stage {
  stage {
    stage
  }
}
    `

/**
 * __useStageQuery__
 *
 * To run a query within a React component, call `useStageQuery` and pass it any options that fit your needs.
 * When your component renders, `useStageQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useStageQuery({
 *   variables: {
 *   },
 * });
 */
export function useStageQuery (baseOptions?: Apollo.QueryHookOptions<StageQuery, StageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useQuery<StageQuery, StageQueryVariables>(StageDocument, options)
}
export function useStageLazyQuery (baseOptions?: Apollo.LazyQueryHookOptions<StageQuery, StageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useLazyQuery<StageQuery, StageQueryVariables>(StageDocument, options)
}
export function useStageSuspenseQuery (baseOptions?: Apollo.SuspenseQueryHookOptions<StageQuery, StageQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions }
  return Apollo.useSuspenseQuery<StageQuery, StageQueryVariables>(StageDocument, options)
}
export type StageQueryHookResult = ReturnType<typeof useStageQuery>
export type StageLazyQueryHookResult = ReturnType<typeof useStageLazyQuery>
export type StageSuspenseQueryHookResult = ReturnType<typeof useStageSuspenseQuery>
export type StageQueryResult = Apollo.QueryResult<StageQuery, StageQueryVariables>
