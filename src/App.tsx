import { useState } from "react";
import QuestionCard from "./components/QuestionCard";
import { fetchQuizQuestions, QuestionState } from "./API";

interface IAnswerObject {
  question: string;
  answer: string;
  correct: boolean;
  correctAnswer: string;
}

const TOTAL_QUESTIONS = 10;
const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<IAnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);
    const newQuestions = await fetchQuizQuestions(TOTAL_QUESTIONS, "easy");
    setQuestions(newQuestions);
    setLoading(false);
    setUserAnswers([]);
    setScore(0);
    setNumber(0);
  };

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (!gameOver) {
      const answer: string = e.currentTarget.value;
      console.log(answer);
      
    }
  };

  const nextQuestion = () => {};

  return (
    <div className="App">
      <h1>React Quiz</h1>
      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <button onClick={startTrivia}>Start Quiz</button>
      ) : null}
      {userAnswers.length === TOTAL_QUESTIONS ? <p>Score:</p> : null}
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
          <button onClick={nextQuestion}>Next Question</button>
        </div>
      ) : null}
    </div>
  );
};

export default App;
