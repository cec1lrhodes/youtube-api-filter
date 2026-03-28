interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const Input = ({ value, onChange, placeholder = "Пошук" }: InputProps) => {
  return (
    <div className="relative flex items-center mb-6">
      <input
        className="w-full bg-[#121212] border border-[#303030] rounded-full py-2.5 pl-5 pr-20 text-white placeholder-[#717171] text-sm focus:outline-none focus:border-[#717171] transition-colors"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
};

export default Input;
