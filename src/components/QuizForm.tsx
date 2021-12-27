import React from "react";
import { QuestionState, fetchQuizQuestions } from "../API";

interface IQuizForm {
  startTrivia: (
    e: React.FormEvent<HTMLFormElement>,
    amount: number,
    difficulty: "easy" | "medium" | "hard"
  ) => Promise<void>;
}

const QuizForm: React.FC<IQuizForm> = ({ startTrivia }) => {
  return (
    <div>
      <form
        onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
          startTrivia(
            e,
            parseInt(e.currentTarget.totalQuestions.value),
            e.currentTarget.difficulty.value
          );
        }}
      >
        <input
          type="text"
          placeholder="total questions:"
          name="totalQuestions"
        />
        <select name="difficulty">
          <option value="easy">easy</option>
          <option value="medium">medium</option>
          <option value="hard">hard</option>
        </select>
        <button type="submit">Start Quiz</button>
      </form>
    </div>
  );
};

export default QuizForm;
