export const calculateScore = (answers: { [key: string]: string[] }[], playerAnswer: string, category: string): number => {
  // Count how many other players have the same answer
  const duplicateCount = answers.filter(answer => 
    answer[category]?.includes(playerAnswer.toLowerCase())
  ).length;

  // If no one else has this answer, score 10 points
  // If others have the same answer, score 5 points
  return duplicateCount === 0 ? 10 : 5;
};

export const validateAnswer = (answer: string, letter: string): boolean => {
  if (!answer || !letter) return false;
  return answer.toLowerCase().startsWith(letter.toLowerCase());
};