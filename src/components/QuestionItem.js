import React from "react";

function QuestionItem({ question, setQuestions }) {
  function handleDeleteQuestion() {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== question.id)
        );
      })
      .catch((error) => {
        console.error("Error deleting question:", error);
      });
  }

  function handleUpdateCorrectAnswer(event) {
    const updatedCorrectIndex = parseInt(event.target.value);

    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex: updatedCorrectIndex }),
    })
      .then((response) => response.json())
      .then((updatedQuestion) => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((q) =>
            q.id === updatedQuestion.id ? updatedQuestion : q
          )
        );
      })
      .catch((error) => {
        console.error("Error updating question:", error);
      });
  }

  return (
    <li>
      <h4>Question {question.id}</h4>
      <h5>Prompt: {question.prompt}</h5>
      <label htmlFor={`correctAnswer-${question.id}`}>
        Correct Answer:
        <select
          id={`correctAnswer-${question.id}`}
          name={`correctAnswer-${question.id}`}
          value={question.correctIndex}
          onChange={handleUpdateCorrectAnswer}
        >
          {question.answers.map((answer, index) => (
            <option key={index} value={index}>
              {answer}
            </option>
          ))}
        </select>
      </label>
      <button onClick={handleDeleteQuestion}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
