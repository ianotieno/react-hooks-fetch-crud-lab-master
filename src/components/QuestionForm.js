import React, { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    const newQuestionData = {
      prompt: formData.prompt,
      answers: [
        formData.answer1,
        formData.answer2,
        formData.answer3,
        formData.answer4,
      ],
      correctIndex: parseInt(formData.correctIndex),
    };

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newQuestionData),
    })
      .then((response) => response.json())
      .then((newQuestion) => {
        props.onAddQuestion(newQuestion);
        setFormData({
          prompt: "",
          answer1: "",
          answer2: "",
          answer3: "",
          answer4: "",
          correctIndex: 0,
        });
      })
      .catch((error) => {
        console.error("Error adding question:", error);
      });
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="prompt">
          Prompt:
          <input
            type="text"
            id="prompt"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="answer1">
          Answer 1:
          <input
            type="text"
            id="answer1"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="answer2">
          Answer 2:
          <input
            type="text"
            id="answer2"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="answer3">
          Answer 3:
          <input
            type="text"
            id="answer3"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="answer4">
          Answer 4:
          <input
            type="text"
            id="answer4"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="correctIndex">
          Correct Answer:
          <select
            id="correctIndex"
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleChange}
          >
            <option value="0">Answer 1</option>
            <option value="1">Answer 2</option>
            <option value="2">Answer 3</option>
            <option value="3">Answer 4</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
