import { useState } from "react";
import "./App.css";
import { useDebounce } from "./hooks/useDebounce";
import Input from "./components/Input";
import { VideoGrid } from "./components/VideoGrid";

function App() {
  const [inputValue, setInputValue] = useState("");
  const debouncedQuery = useDebounce(inputValue, 500);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <Input value={inputValue} onChange={handleInputChange} />

      <VideoGrid query={debouncedQuery} />
    </div>
  );
}

export default App;
