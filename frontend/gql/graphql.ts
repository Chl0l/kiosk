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
};

export type Query = {
  __typename?: 'Query';
  getAllTopics: Array<TopicTitle>;
  getAllsubTopics: Array<SubTopicTitle>;
  getQuestions: Array<TaxonomyTree>;
  getSubTopicsByTopic: Array<SubTopicTitle>;
};


export type QueryGetQuestionsArgs = {
  subtopic: Scalars['String']['input'];
  topic: Scalars['String']['input'];
};


export type QueryGetSubTopicsByTopicArgs = {
  topic: Scalars['String']['input'];
};

export type SubTopicTitle = {
  __typename?: 'SubTopicTitle';
  subTopic: Scalars['String']['output'];
};

export type TaxonomyTree = {
  __typename?: 'TaxonomyTree';
  children?: Maybe<Array<TaxonomyTree>>;
  id: Scalars['ID']['output'];
  level: Scalars['Float']['output'];
  parent?: Maybe<TaxonomyTree>;
  questionLabel: Scalars['String']['output'];
  subtopic: Scalars['String']['output'];
  topic: Scalars['String']['output'];
};

export type TopicTitle = {
  __typename?: 'TopicTitle';
  topic: Scalars['String']['output'];
};

export type GetAllTopicsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTopicsQuery = { __typename?: 'Query', getAllTopics: Array<{ __typename?: 'TopicTitle', topic: string }> };

export type GetSubTopicsByTopicQueryVariables = Exact<{
  topic: Scalars['String']['input'];
}>;


export type GetSubTopicsByTopicQuery = { __typename?: 'Query', getSubTopicsByTopic: Array<{ __typename?: 'SubTopicTitle', subTopic: string }> };

export type GetQuestionsQueryVariables = Exact<{
  subtopic: Scalars['String']['input'];
  topic: Scalars['String']['input'];
}>;


export type GetQuestionsQuery = { __typename?: 'Query', getQuestions: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string, children?: Array<{ __typename?: 'TaxonomyTree', id: string, level: number, questionLabel: string, subtopic: string, topic: string }> | null }> | null }> | null }> | null }> | null }> | null }> };


export const GetAllTopicsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTopics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"topic"}}]}}]}}]} as unknown as DocumentNode<GetAllTopicsQuery, GetAllTopicsQueryVariables>;
export const GetSubTopicsByTopicDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetSubTopicsByTopic"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getSubTopicsByTopic"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"subTopic"}}]}}]}}]} as unknown as DocumentNode<GetSubTopicsByTopicQuery, GetSubTopicsByTopicQueryVariables>;
export const GetQuestionsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetQuestions"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"subtopic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"topic"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getQuestions"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"subtopic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"subtopic"}}},{"kind":"Argument","name":{"kind":"Name","value":"topic"},"value":{"kind":"Variable","name":{"kind":"Name","value":"topic"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}},{"kind":"Field","name":{"kind":"Name","value":"children"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"level"}},{"kind":"Field","name":{"kind":"Name","value":"questionLabel"}},{"kind":"Field","name":{"kind":"Name","value":"subtopic"}},{"kind":"Field","name":{"kind":"Name","value":"topic"}}]}}]}}]}}]}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetQuestionsQuery, GetQuestionsQueryVariables>;