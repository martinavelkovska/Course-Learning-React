import { useCallback, useEffect, useMemo, useState } from "react";
import { memo } from "react";

import IconButton from "../UI/IconButton.jsx";
import MinusIcon from "../UI/Icons/MinusIcon.jsx";
import PlusIcon from "../UI/Icons/PlusIcon.jsx";
import CounterOutput from "./CounterOutput.jsx";
import { log } from "../../log.js";
import CounterHistory from "./CounterHistory.jsx";

function isPrime(number) {
  log("Calculating if is prime number", 2, "other");
  if (number <= 1) {
    return false;
  }

  const limit = Math.sqrt(number);

  for (let i = 2; i <= limit; i++) {
    if (number % i === 0) {
      return false;
    }
  }

  return true;
}

const Counter = memo(function Counter({ initialCount }) {
  log("<Counter /> rendered", 1);

  const initialCountIsPrime = useMemo(
    () => isPrime(initialCount),
    [initialCount]
  );

  // const [counter, setCounter] = useState(initialCount);

  const [counterChanges, setCounterChanges] = useState([
    {
      value: initialCount,
      id: Math.random() * 1000,
    },
  ]); // to track a list of changes for the history

  // useEffect(() => {
  //   // za koga sum ja vnela vrednosta za initialCount da se zacuva vo poleto u span na counterOutput(Da se prikaze na ekran)
  //   setCounterChanges([{ value: initialCount, id: Math.random() * 1000 }]);
  // }, [initialCount]); //runs after the component function execution and if u change the state in there u trigger another component function execution

  const currentCounter = counterChanges.reduce(
    (prevCounter, counterChange) => prevCounter + counterChange.value,
    0
  ); // counter value is calculated by in the end adding up alll those changes

  // those button components and the values they output of course technically don't change.
  //It's always exactly this and this button that gets output when I press a button. So re-rendering these components, re-executing these component functions doesn't make a lot of sense.
  // thats why we you useCallBack hook
  const handleDecrement = useCallback(function handleDecrement() {
    setCounterChanges((prevCounterChanges) => [
      { value: -1, id: Math.random() * 1000 },
      ...prevCounterChanges,
    ]); // value by which it should be changes and id prop
  }, []); // koga stisnam na  + se renderira i - (minusIcon)

  const handleIncrement = useCallback(function handleIncrement() {
    setCounterChanges((prevCounterChanges) => [
      { value: 1, id: Math.random() * 1000 }, // we will have an ID that does belong to a concrete change object here
      ...prevCounterChanges,
    ]);
  }, []); // koga stisnam na  - se renderira i +(plusIcon)

  return (
    <section className="counter">
      <p className="counter-info">
        The initial counter value was <strong>{initialCount}</strong>. It{" "}
        <strong>is {initialCountIsPrime ? "a" : "not a"}</strong> prime number.
      </p>
      <p>
        <IconButton icon={MinusIcon} onClick={handleDecrement}>
          Decrement
        </IconButton>
        <CounterOutput value={currentCounter} />
        <IconButton icon={PlusIcon} onClick={handleIncrement}>
          Increment
        </IconButton>
      </p>

      <CounterHistory history={counterChanges} />
    </section>
  );
});

export default Counter;
