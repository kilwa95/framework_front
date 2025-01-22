import { useState, useEffect } from 'react';
import { Toggle } from './Toggle/Toggle';
import './FilterToggleGroup.css';

export interface ToggleOption {
  id: string;
  label: string;
  value: boolean;
}

export interface FilterToggleGroupProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (selections: Record<string, boolean>) => void;
  options: ToggleOption[];
  initialValues?: Record<string, boolean>;
  className?: string;
}

export const FilterToggleGroup = ({
  onChange,
  options: defaultOptions,
  initialValues = {},
  className = '',
}: FilterToggleGroupProps) => {
  const [options, setOptions] = useState<ToggleOption[]>(
    defaultOptions.map((option) => ({
      ...option,
      value: initialValues[option.id] ?? option.value,
    })),
  );

  useEffect(() => {
    const selections = options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.value,
      }),
      {},
    );

    onChange(selections);
  }, [options, onChange]);

  const handleOptionChange = (id: string, newValue: boolean) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option,
      ),
    );
  };

  const handleReset = () => {
    setOptions(defaultOptions);
  };

  return (
    <div className={`filter-toggle-group ${className}`}>
      <div className="options-grid">
        {options.map((option) => (
          <div key={option.id} className="option-item">
            <Toggle
              checked={option.value}
              onChange={(checked) => handleOptionChange(option.id, checked)}
              label={option.label}
            />
          </div>
        ))}
      </div>

      <button onClick={handleReset} className="reset-button">
        Reset Filters
      </button>
    </div>
  );
};
