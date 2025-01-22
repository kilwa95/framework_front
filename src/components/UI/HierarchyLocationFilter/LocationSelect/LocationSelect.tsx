import './LocationSelect.css';

export interface LocationItem {
  id: string;
  name: string;
}

export interface LocationSelectProps {
  id: string;
  label: string;
  placeholder: string;
  options: LocationItem[];
  value: string | undefined;
  // eslint-disable-next-line no-unused-vars
  onChange: (value: string) => void;
  isDisabled: boolean;
  isLoading: boolean;
}

export const LocationSelect = ({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  isDisabled,
  isLoading,
}: LocationSelectProps) => (
  <div className="location-select-container">
    <label htmlFor={id} className="location-select-label">
      {label}
    </label>
    <div className="select-wrapper">
      <select
        id={id}
        className="location-select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
        disabled={isDisabled}
      >
        <option value="">{isLoading ? 'Loading...' : placeholder}</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
      <div className="select-icon">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </div>
    </div>
  </div>
);
