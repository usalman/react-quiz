import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, QuestionState } from "./API";

interface IAnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 3;
const App = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<IAnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const startTrivia = async (): Promise<void> => {
    setLoading(true);
    setGameOver(false);
    const newQuestions: QuestionState[] = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      "easy"
    );
    setQuestions(newQuestions);
    setLoading(false);
    setUserAnswers([]);
    setScore(0);
    setNumber(0);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const answer: string = e.currentTarget.value;
    const isAnswerCorrect: boolean =
      answer === questions[number].correct_answer;
    if (isAnswerCorrect) setScore((prev) => prev + 1);
    const answerObject: IAnswerObject = {
      question: questions[number].question,
      answer,
      correct: isAnswerCorrect,
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers((prev) => [...prev, answerObject]);
  };

  const nextQuestion = () => {
    const nextQuestionNumber: number = number + 1;
    if (nextQuestionNumber === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestionNumber);
    }
  };

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startTrivia}>Start Quiz</button>
      ) : null}
      {userAnswers.length === TOTAL_QUESTIONS ? <p>Score: {score}</p> : null}
      {loading && <p>Loading Questions...</p>}

      {!gameOver && !loading ? (
        <div>
          <QuestionCard
            questionNr={number + 1}
            totalQuestions={TOTAL_QUESTIONS}
            question={questions[number].question}
            answers={questions[number].answer}
            userAnswer={userAnswers ? userAnswers[number] : undefined}
            callback={checkAnswer}
          />
          {!gameOver &&
          !loading &&
          userAnswers.length === number + 1 &&
          number !== TOTAL_QUESTIONS - 1 ? (
            <button onClick={nextQuestion}>Next Question</button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default App;
