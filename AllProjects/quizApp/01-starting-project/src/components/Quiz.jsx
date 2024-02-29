//switching between questions and registering user answers

import { useCallback, useRef, useState } from "react";

import QUESTIONS from "../questions.js";

import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
  // const [activeQuestionIndex, setActiveQuestionIndex] = useState(0); //curently active question, with index i i access which question should be displayed to the user

  // const [answerState, setAnswerState] = useState(""); //controls our current Answers state
  const [userAnswers, setUserAnswers] = useState([]); //i wanna register the selecte user answers and it could be an array where we just add answer by answert to this array, all the selected user

  const activeQuestionIndex = userAnswers.length;
  // const activeQuestionIndex =
  //   answerState === "" ? userAnswers.length : userAnswers.length - 1; //beter way of managing instead using useState

  const quizIsComplete = activeQuestionIndex === QUESTIONS.length; //da znaeme dali sme zavrsile so site prasanja

  const handleSelectAnswer = useCallback(function handleSelectAnswer(
    selectedAnswer
  ) {
    // // first i wanna change the color of the selected answer
    // setAnswerState("answered"); // once the user select the answer

    setUserAnswers((prevUserAnswers) => {
      return [...prevUserAnswers, selectedAnswer]; // to make sure we won't use any older state
    });

    //sakam da postavam tajmer, posle 1 sec koga odgovorot e kliknat da ja smene answer state to correct or incorrect
    //   setTimeout(() => {
    //     //posle edna sekunda da kaze dali e tocno ilii ne odg
    //     if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
    //       setAnswerState("correct");
    //     } else {
    //       setAnswerState("wrong");
    //     }

    //     setTimeout(() => {
    //       setAnswerState("");
    //     }, 2000); // answer is reset, ne e belezan kako tocno ili netocno
    //   }, 1000);
    // },
  },
  []); // we don't have to add any state or props, because we are not using any values that depends on props or state.. UPDATE:we have to add dependecy because this f-tion should be recreated whenever the question index value is changed

  const handleSkipAnswer = useCallback(
    // hooks that function is not recreated
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  if (quizIsComplete) {
    return <Summary userAnswers={userAnswers} />;
  }

  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        index={activeQuestionIndex}
        onSelectAnswer={handleSelectAnswer}
        onSkipAnswer={handleSkipAnswer}
      />
    </div>
  );
}
