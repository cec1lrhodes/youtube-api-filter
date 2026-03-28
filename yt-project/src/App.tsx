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
    <div className="min-h-screen bg-[#0f0f0f] px-4 py-6 max-w-4xl mx-auto">
      <Input value={inputValue} onChange={handleInputChange} />

      <VideoGrid query={debouncedQuery} />
    </div>
  );
}

export default App;
