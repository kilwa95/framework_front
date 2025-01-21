import { useState, useEffect } from 'react';
import { Toggle } from './Toggle/Toggle';
import './EligibilityFilter.css';

export const defaultEligibilityOptions = [
  { id: 'can_subscribe', label: 'Eligible', value: false },
  { id: 'is_ztd', label: 'ZTD', value: false },
  { id: 'found_coverage', label: 'Found Coverage', value: false },
  { id: 'sector_capacity', label: 'Sector Capacity', value: false },
  { id: 'active_4g', label: 'Active 4G', value: false },
  { id: 'active_5g', label: 'Active 5G', value: false },
];

export interface EligibilityOption {
  id: string;
  label: string;
  value: boolean;
}

export interface EligibilityFilterProps {
  // eslint-disable-next-line no-unused-vars
  onChange: (selections: Record<string, boolean>) => void;
  initialValues?: Record<string, boolean>;
  className?: string;
}

export const EligibilityFilter = ({
  onChange,
  initialValues = {},
  className = '',
}: EligibilityFilterProps) => {
  const [options, setOptions] = useState<EligibilityOption[]>(
    defaultEligibilityOptions.map((option) => ({
      ...option,
      value: initialValues[option.id] ?? option.value,
    }))
  );

  useEffect(() => {
    const selections = options.reduce(
      (acc, option) => ({
        ...acc,
        [option.id]: option.value,
      }),
      {}
    );

    onChange(selections);
  }, [options, onChange]);

  const handleOptionChange = (id: string, newValue: boolean) => {
    setOptions((prevOptions) =>
      prevOptions.map((option) =>
        option.id === id ? { ...option, value: newValue } : option
      )
    );
  };

  const handleReset = () => {
    setOptions(defaultEligibilityOptions);
  };

  return (
    <div className={`eligibility-filter ${className}`}>
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
