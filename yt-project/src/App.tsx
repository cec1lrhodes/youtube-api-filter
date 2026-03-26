import { useState } from "react";
import "./App.css";

const someApi = ["bob", "tom"];

function App() {
  const [inputValue, setInputValue] = useState("");

  const filteredInputSearch = someApi.filter((item) =>
    item.toLowerCase().includes(inputValue.toLowerCase()),
  );
  return (
    <div>
      <input
        placeholder="search..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      {filteredInputSearch.map((card) => (
        <p>{card}</p>
      ))}
    </div>
  );
}

export default App;
