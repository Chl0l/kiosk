import { AddAnswerMutation, AddAnswerMutationVariables } from "@/gql/graphql";
import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";

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

interface AccordionProps {
  question: Question;
  refetch: () => void;
}

const ADD_ANSWER = gql`
  mutation AddAnswer($answer: String!, $addAnswerId: String!) {
    addAnswer(answer: $answer, id: $addAnswerId) {
      answer
      id
      level
      questionLabel
      subtopic
      topic
    }
  }
`;

const Accordion: React.FC<AccordionProps> = ({ question, refetch }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(question.answer || "");
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);

  const [addAnswer] = useMutation<
    AddAnswerMutation,
    AddAnswerMutationVariables
  >(ADD_ANSWER, {
    onError: (error) => {
      console.error("Error adding answer:", error);
    },
    onCompleted: () => {
      console.log("Answer added successfully");
      refetch();
    },
  });

  useEffect(() => {
    if (!isEditing) {
      setCurrentAnswer(question.answer || "");
    }
  }, [question.answer, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentAnswer(e.target.value);
    setIsTextAreaFocused(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await addAnswer({
        variables: { answer: currentAnswer, addAnswerId: question.id },
      });
      if (data) {
        console.log("Answer added successfully");
        setIsEditing(false);
        setIsTextAreaFocused(false);
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error saving answer:", error.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleTextAreaFocus = () => {
    setIsTextAreaFocused(true);
  };

  const handleTextAreaBlur = () => {
    setIsTextAreaFocused(false);
  };

  return (
    <div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer", padding: "8px 0" }}
      >
        <span className="text-gray-900 text-sm">
          <span className="font-medium">{question.level}. </span>
          <span>{question.questionLabel}</span>
        </span>
      </div>
      {isOpen && (
        <div style={{ paddingLeft: "20px" }}>
          {isEditing ? (
            <>
              <textarea
                className="textarea-custom"
                rows={4}
                placeholder="Please, write your answer here..."
                value={currentAnswer}
                onChange={handleChange}
                onFocus={handleTextAreaFocus}
                onBlur={handleTextAreaBlur}
              />
              <button
                type="button"
                onClick={handleSave}
                className="button-custom me-2 mb-2"
              >
                Save answer
              </button>
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="button-custom me-2 mb-2"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p className="mb-2 text-gray-900 text-sm text-gray-700">
                <span className="text-sm font-medium text-gray-900">
                  Réponse :{" "}
                </span>
                {question.answer || "No answer provided yet"}
              </p>
              <button
                type="button"
                onClick={handleEdit}
                disabled={isEditing}
                className="button-custom me-2 mb-2"
              >
                Edit Answer
              </button>
            </>
          )}
          {question.children &&
            question.children.length > 0 &&
            question.children.map((childQuestion: Question) => (
              <Accordion
                key={childQuestion.id}
                question={childQuestion}
                refetch={refetch}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
