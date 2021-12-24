import QuestionCard from "./components/QuestionCard";

const App = () => {
  const startTrivia = async () => {
    
  }

  const checkAnswer = () => {

  }

  const nextQuestion = () => {

  }

  return <div className="App">
    <h1>React Quiz</h1>
    <button onClick={startTrivia}>Start Quiz</button>
    <p>Score:</p>
    <p>Loading Questions...</p>
    <QuestionCard />
    <button onClick={nextQuestion}>Next Question</button>
  </div>;
}

export default App;
