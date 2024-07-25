import { Inter } from "next/font/google";
import { gql, useQuery } from "@apollo/client";
import {
  GetAllTopicsQuery,
  GetAllTopicsQueryVariables,
  GetQuestionsQuery,
  GetQuestionsQueryVariables,
  GetSubTopicsByTopicQuery,
  GetSubTopicsByTopicQueryVariables,
} from "@/gql/graphql";
import { useState } from "react";
import Accordion from "../components/Accordion";

const inter = Inter({ subsets: ["latin"] });

const GET_ALL_TOPICS = gql`
  query GetAllTopics {
    getAllTopics {
      topic
    }
  }
`;

const GET_SUBTOPICS_BY_TOPIC = gql`
  query GetSubTopicsByTopic($topic: String!) {
    getSubTopicsByTopic(topic: $topic) {
      subTopic
    }
  }
`;

const GET_QUESTIONS = gql`
  query GetQuestions($subtopic: String!, $topic: String!) {
    getQuestions(subtopic: $subtopic, topic: $topic) {
      id
      level
      questionLabel
      subtopic
      topic
      answer
      children {
        id
        level
        questionLabel
        subtopic
        topic
        answer
        children {
          id
          level
          questionLabel
          subtopic
          topic
          answer
          children {
            id
            level
            questionLabel
            subtopic
            topic
            answer
            children {
              id
              level
              questionLabel
              subtopic
              topic
              answer
              children {
                id
                level
                questionLabel
                subtopic
                topic
                answer
                children {
                  id
                  level
                  questionLabel
                  subtopic
                  topic
                  answer
                }
              }
            }
          }
        }
      }
    }
  }
`;

type Question = {
  id: string;
  topic: string;
  subtopic: string;
  level: number;
  questionLabel: string;
  parent?: Question | null;
  children?: Question[] | null;
  answer?: string | null;
};

export default function Home() {
  const { data: topicsData } = useQuery<
    GetAllTopicsQuery,
    GetAllTopicsQueryVariables
  >(GET_ALL_TOPICS);

  const [selectedTopic, setSelectedTopic] = useState<string>("");

  const { data: subTopicsData } = useQuery<
    GetSubTopicsByTopicQuery,
    GetSubTopicsByTopicQueryVariables
  >(GET_SUBTOPICS_BY_TOPIC, {
    variables: { topic: selectedTopic || "" },
    skip: !selectedTopic,
  });

  const [selectedSubTopic, setSelectedSubTopic] = useState<string>("");

  const { data: questionsData, refetch } = useQuery<
    GetQuestionsQuery,
    GetQuestionsQueryVariables
  >(GET_QUESTIONS, {
    variables: { topic: selectedTopic || "", subtopic: selectedSubTopic || "" },
  });

  const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const topic = event.target.value;
    setSelectedTopic(topic);
    setSelectedSubTopic("");
  };

  const handleSubTopicChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const subtopic = event.target.value;
    setSelectedSubTopic(subtopic);
  };

  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 ${inter.className}`}
    >
      <form className="mb-4">
        <label className="form-label">Select a topic</label>
        <select
          id="topics"
          className="form-select"
          value={selectedTopic}
          onChange={handleTopicChange}
        >
          <option value="">Choose a topic</option>
          {topicsData?.getAllTopics.map((topic, index) => (
            <option key={index} value={topic.topic}>
              {topic.topic}
            </option>
          ))}
        </select>

        <label className="form-label mt-4">Select a subtopic</label>
        <select
          id="subtopics"
          className="form-select"
          disabled={!selectedTopic}
          value={selectedSubTopic}
          onChange={handleSubTopicChange}
        >
          <option value="">Choose a subtopic</option>
          {subTopicsData?.getSubTopicsByTopic.map((subtopic, index) => (
            <option key={index} value={subtopic.subTopic}>
              {subtopic.subTopic}
            </option>
          ))}
        </select>
      </form>

      {selectedSubTopic && (
        <div>
          <h2 className="text-sm font-medium text-gray-900">Questions :</h2>
          {questionsData &&
            questionsData.getQuestions.map((question: Question) => (
              <Accordion
                key={question.id}
                question={question}
                refetch={refetch}
              />
            ))}
        </div>
      )}
    </main>
  );
}
