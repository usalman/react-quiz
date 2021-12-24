export const fetchQuizQuestions = async (
  amount: number,
  difficulty: "easy" | "medium" | "hard"
) => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  const data = await (await fetch(endpoint)).json();
  console.log(data);
  
};
