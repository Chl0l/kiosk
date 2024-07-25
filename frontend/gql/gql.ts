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
 */
const documents = {
    "\n  mutation AddAnswer($answer: String!, $addAnswerId: String!) {\n    addAnswer(answer: $answer, id: $addAnswerId) {\n      answer\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n    }\n  }\n": types.AddAnswerDocument,
    "\n  query GetAllTopics {\n    getAllTopics {\n      topic\n    }\n  }\n": types.GetAllTopicsDocument,
    "\n  query GetSubTopicsByTopic($topic: String!) {\n    getSubTopicsByTopic(topic: $topic) {\n      subTopic\n    }\n  }\n": types.GetSubTopicsByTopicDocument,
    "\n  query GetQuestions($subtopic: String!, $topic: String!) {\n    getQuestions(subtopic: $subtopic, topic: $topic) {\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n      answer\n      children {\n        id\n        level\n        questionLabel\n        subtopic\n        topic\n        answer\n        children {\n          id\n          level\n          questionLabel\n          subtopic\n          topic\n          answer\n          children {\n            id\n            level\n            questionLabel\n            subtopic\n            topic\n            answer\n            children {\n              id\n              level\n              questionLabel\n              subtopic\n              topic\n              answer\n              children {\n                id\n                level\n                questionLabel\n                subtopic\n                topic\n                answer\n                children {\n                  id\n                  level\n                  questionLabel\n                  subtopic\n                  topic\n                  answer\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.GetQuestionsDocument,
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
export function graphql(source: "\n  mutation AddAnswer($answer: String!, $addAnswerId: String!) {\n    addAnswer(answer: $answer, id: $addAnswerId) {\n      answer\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n    }\n  }\n"): (typeof documents)["\n  mutation AddAnswer($answer: String!, $addAnswerId: String!) {\n    addAnswer(answer: $answer, id: $addAnswerId) {\n      answer\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetAllTopics {\n    getAllTopics {\n      topic\n    }\n  }\n"): (typeof documents)["\n  query GetAllTopics {\n    getAllTopics {\n      topic\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetSubTopicsByTopic($topic: String!) {\n    getSubTopicsByTopic(topic: $topic) {\n      subTopic\n    }\n  }\n"): (typeof documents)["\n  query GetSubTopicsByTopic($topic: String!) {\n    getSubTopicsByTopic(topic: $topic) {\n      subTopic\n    }\n  }\n"];
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query GetQuestions($subtopic: String!, $topic: String!) {\n    getQuestions(subtopic: $subtopic, topic: $topic) {\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n      answer\n      children {\n        id\n        level\n        questionLabel\n        subtopic\n        topic\n        answer\n        children {\n          id\n          level\n          questionLabel\n          subtopic\n          topic\n          answer\n          children {\n            id\n            level\n            questionLabel\n            subtopic\n            topic\n            answer\n            children {\n              id\n              level\n              questionLabel\n              subtopic\n              topic\n              answer\n              children {\n                id\n                level\n                questionLabel\n                subtopic\n                topic\n                answer\n                children {\n                  id\n                  level\n                  questionLabel\n                  subtopic\n                  topic\n                  answer\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetQuestions($subtopic: String!, $topic: String!) {\n    getQuestions(subtopic: $subtopic, topic: $topic) {\n      id\n      level\n      questionLabel\n      subtopic\n      topic\n      answer\n      children {\n        id\n        level\n        questionLabel\n        subtopic\n        topic\n        answer\n        children {\n          id\n          level\n          questionLabel\n          subtopic\n          topic\n          answer\n          children {\n            id\n            level\n            questionLabel\n            subtopic\n            topic\n            answer\n            children {\n              id\n              level\n              questionLabel\n              subtopic\n              topic\n              answer\n              children {\n                id\n                level\n                questionLabel\n                subtopic\n                topic\n                answer\n                children {\n                  id\n                  level\n                  questionLabel\n                  subtopic\n                  topic\n                  answer\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"];

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;