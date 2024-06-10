import "./SearchBar.css";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
    return (
        <input placeholder="Search" type="text" name="text" className="input" value={value} onChange={(e) => onChange(e.target.value)} />
    )
}

export default SearchBar;