interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder = "search..." }: InputProps) => {
  return (
    <input
      className="w-full border rounded p-2 mb-4 bg-white text-black font-semibold"
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Input;
