interface GameAnswers {
  name: string;
  place: string;
  animal: string;
  thing: string;
}

interface ValidationResults {
  name: boolean;
  place: boolean;
  animal: boolean;
  thing: boolean;
}

interface ScoreDisplayProps {
  answers: GameAnswers;
  score: number;
  validationResults: ValidationResults;
}

const ScoreDisplay = ({ answers, score, validationResults }: ScoreDisplayProps) => {
  const getValidationMessage = (isValid: boolean) => {
    return isValid ? '✓ Valid' : '✗ Invalid';
  };

  return (
    <div className="score-display">
      <h2>Game Results</h2>
      
      <div className="answers-review">
        <div className="answer-item">
          <span className="category">Name:</span>
          <span className="answer">{answers.name}</span>
          <span className={`validation ${validationResults.name ? 'valid' : 'invalid'}`}>
            {getValidationMessage(validationResults.name)}
          </span>
        </div>

        <div className="answer-item">
          <span className="category">Place:</span>
          <span className="answer">{answers.place}</span>
          <span className={`validation ${validationResults.place ? 'valid' : 'invalid'}`}>
            {getValidationMessage(validationResults.place)}
          </span>
        </div>

        <div className="answer-item">
          <span className="category">Animal:</span>
          <span className="answer">{answers.animal}</span>
          <span className={`validation ${validationResults.animal ? 'valid' : 'invalid'}`}>
            {getValidationMessage(validationResults.animal)}
          </span>
        </div>

        <div className="answer-item">
          <span className="category">Thing:</span>
          <span className="answer">{answers.thing}</span>
          <span className={`validation ${validationResults.thing ? 'valid' : 'invalid'}`}>
            {getValidationMessage(validationResults.thing)}
          </span>
        </div>
      </div>

      <div className="final-score">
        <h3>Final Score: {score}</h3>
        <p className="score-breakdown">
          • 10 points per valid answer<br />
          • 1 point per letter in valid answers<br />
          • 10 bonus points for all correct<br />
          • Time bonus: 1 point per second remaining
        </p>
      </div>
    </div>
  );
};

export default ScoreDisplay;