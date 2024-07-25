import React, { useState } from "react";

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
  onAnswerChange: (questionId: string, value: string) => void;
}

const Accordion: React.FC<AccordionProps> = ({ question, onAnswerChange }) => {
  const [isOpen, setIsOpen] = useState(false);

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
          <textarea
            className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            rows={4}
            placeholder="Please, write your answer here..."
            value={question.answer || ""}
            onChange={(e) => onAnswerChange(question.id, e.target.value)}
          />
          {question.children &&
            question.children.length > 0 &&
            question.children.map((childQuestion: Question) => (
              <Accordion
                key={childQuestion.id}
                question={childQuestion}
                onAnswerChange={onAnswerChange}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default Accordion;
