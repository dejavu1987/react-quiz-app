import classNames from 'classnames';
import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [suspenseState, setSuspenseState] = useState('NOT_READY');

  const selectAnswer = (answer) => {
    setSelectedAnswer(answer);

    setTimeout(() => {
      if (answer === questions[currentQuestion].answerIndex) {
        setSuspenseState('CORRECT');
        setTimeout(() => {
          setCurrentQuestion(currentQuestion + 1);
          setSuspenseState('NOT_READY');
          setSelectedAnswer(null);
        }, 3000);
      } else {
        setSuspenseState('INCORRECT');
        setTimeout(() => {
          setSuspenseState('NOT_READY');
          setSelectedAnswer(null);
        }, 3000);
      }
    }, 3000);
  };
  return (
    <div className={classNames('quiz', suspenseState)}>
      <h1>JavaScript Array Quiz</h1>
      <h2>{questions[currentQuestion].question}</h2>
      <div className="answers">
        {questions[currentQuestion].options.map((option, i) => (
          <button
            className={classNames(
              'answer-btn',
              selectedAnswer === i ? 'selected' : ''
            )}
            onClick={() => {
              selectAnswer(i);
            }}
            disabled={selectedAnswer !== null}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};
export { Quiz };
