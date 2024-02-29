// za da ni pomogne vo key problemot
import { useState } from "react";
import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";
import QUESTIONS from "../questions.js";

export default function Question({ index, onSelectAnswer, onSkipAnswer }) {
  const [answer, setAnswer] = useState({
    selectedAnswer: "",
    isCorrect: null,
  });

  //za kt ke ode na dr prasanje tajmero da se obnove oti onaka pr kt ke stisne na odgovoro poslednata sekunda ne ga prikazuva dali e tocno ili ne tuku samo go selektira odgovoro i otide na dr prasanje
  let timer = 10000; // to update the timer

  if (answer.selectedAnswer) {
    //ako imame selektiran odgovor
    timer = 10000; // obnovi go za da go prikaze tocniot ili netocniot odgovor
  }

  if (answer.isCorrect !== null) {
    timer = 2000; //vreme so e potrebno duri da se otide na drugoto prasanje
  }

  function handleSelectAnswer(answer) {
    //istata kao u quiz ne gledam razlika valjda radi pomalce props
    setAnswer({
      selectedAnswer: answer,
      isCorrect: null, //it should be derived after one second that we spend in thq Quiz component so we don't know yet  whether it's correct or wrong
    });

    setTimeout(() => {
      setAnswer({
        selectedAnswer: answer,
        isCorrect: QUESTIONS[index].answers[0] === answer,
      });

      // i wanna set another timer again so that we don't instantly move away, where after 2 sec we call onSelectAnswer and pass onSelectAnswer to this function , za 2 sec pokazi mu dali odg e tocen ili ne
      setTimeout(() => {
        onSelectAnswer(answer);
      }, 2000);
    }, 1000); // I wanna set a timer where after 1 sec we do set isCorrect to true or false
  }

  let answerState = "";

  if (answer.selectedAnswer && answer.isCorrect !== null) {
    // ako go imame selektiraniot odgovor
    answerState = answer.isCorrect ? "correct" : "wrong";
  } else if (answer.selectedAnswer) {
    answerState = "answered";
  }

  return (
    <div id="question">
      <QuestionTimer
        timeout={timer}
        onTimeOut={answer.selectedAnswer === "" ? onSkipAnswer : null}
        mode={answerState}
        key={timer}
      />
      <h2>{QUESTIONS[index].text}</h2>
      <Answers
        answers={QUESTIONS[index].answers}
        selectedAnswer={answer.selectedAnswer}
        answerState={answerState}
        onSelect={handleSelectAnswer}
      />
    </div>
  );
}
