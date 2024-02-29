//nejkea da se menjavat odgovorite a prasanjata se menjavaa

import { useRef } from "react";

export default function Answers({
  answers,
  selectedAnswer,
  answerState,
  onSelect,
}) {
  //lista od odg, selectedAnswer- koj odgovor e selektiran, dali odg e selektiran i dali e tocnen ili ne
  // to output listata od  shuffled answers

  const shuffledAnswers = useRef(); //to store the shuffled answers in this ref instead of the constant down there so this is positive side of refs

  if (!shuffledAnswers.current) {
    // ako ne e definirano izvrsi go ovoj kod samo ednas, ako e defined nema sho da go izvrsuva, DO NOT SHUFFLE THEM AGAIN, even if the component function executes again
    //so this code only executes if there is still a question to display
    shuffledAnswers.current = [...answers]; // to shuffle answers, kreirame nova array i kade kje gi spreadneme answers za selektiraniot question vo taa niza
    shuffledAnswers.current.sort(() => Math.random() - 0.5); //nema da vrati nova niza tuku kje ja editira nizata i zatoa pogore kreiram nova array za da ne ja editiram originalnata, positive number will stay the order they are , negative will be swaped, receive 2 elements from the array
  }

  return (
    <ul id="answers">
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        let cssClasses = "";
        if (answerState === "answered" && isSelected) {
          cssClasses = "selected";
        }

        if (
          (answerState === "correct" || answerState === "wrong") &&
          isSelected
        ) {
          cssClasses = answerState;
        }

        return (
          <li key={answer} className="answer">
            <button
              onClick={() => onSelect(answer)}
              className={cssClasses}
              disabled={answerState !== ""}
            >
              {answer}
            </button>
          </li>
        );
      })}
    </ul>
  );
}
