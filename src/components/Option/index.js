import React from "react";

const Option = ({ data, questionIndex, handleSelectedOption }) => {
  const { questionId, question, options } = data;

  return (
    <div>
      <div className="title">{question}</div>
      <form>
        {options.map((option, index) => {
          return (
            <form
              key={index}
              className="sectionquestion"
              onClick={(e) =>
                handleSelectedOption({
                  questionId,
                  value: e.target.value,
                })
              }
            >
              <input
                type="radio"
                id={`q${questionIndex}-o${index}`}
                name={`radio-name-${questionIndex}`}
                value={option.value}
                checked={option.checked}
              />
              <label for={`q${questionIndex}-o${index}`}>{option.title}</label>
            </form>
          );
        })}
      </form>
    </div>
  );
};

export default Option;
