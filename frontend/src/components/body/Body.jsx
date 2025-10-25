import "./Body.css";
import { useState } from "react";
import fetchApi from "../../utils/fetchApi";

const Body = () => {
  const [query, setQuery] = useState("");
  const [predictions, setPredictions] = useState(["Your predictions go here"]);

  function handleSubmit(e) {
    e.preventDefault();
  }

  async function onChange(e) {
    setQuery(e.target.value);
    const data = await fetchApi(e.target.value);
    setPredictions([data]);
  }

  return (
    <div className="body">
      <form className="body-form" onSubmit={handleSubmit}>
        <input
          type="text"
          className="body-input"
          placeholder="Type your message..."
          value={query}
          onChange={onChange}
        />
      </form>
      <div className="predictions">
        {predictions.map((prediction, index) => (
          <h4 key={index} className="prediction-item">
            {prediction}
          </h4>
        ))}
      </div>
    </div>
  );
};

export default Body;
