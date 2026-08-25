import { useState } from "react";

function Button({ onClick, text }) {
  return <button onClick={onClick}>{text}</button>;
}

function StatisticLine({ stat, text }) {
  return (
    <>
      <tr>
        <td>{text}</td>
        <td>{stat}</td>
      </tr>
    </>
  );
}

function Statistics({ good, neutral, bad, all, average, positivePercent }) {
  return all === 0 ? (
    <>
      <h2>statistics</h2>
      <div>No feedback given</div>
    </>
  ) : (
    <table>
      <h2>statistics</h2>
      <tbody>
        <StatisticLine stat={good} text="good" />
        <StatisticLine stat={neutral} text="neutral" />
        <StatisticLine stat={all} text="all" />
        <StatisticLine stat={average} text="average" />
        <StatisticLine stat={`${positivePercent} %`} text="positivePercent" />
      </tbody>
    </table>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);

  const average = Math.round((good + neutral + bad) / 3);
  const positivePercent = Math.round((good / all) * 100) || 0;
  const increaseGood = () => {
    setGood(good + 1);
    setAll(all + 1);
  };
  const increaseNeutral = () => {
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const increaseBad = () => {
    setBad(bad + 1);
    setAll(all + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={increaseGood} text="good" />
      <Button onClick={increaseNeutral} text="neutral" />
      <Button onClick={increaseBad} text={"bad"} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={all}
        average={average}
        positivePercent={positivePercent}
      />
    </div>
  );
};

export default App;
