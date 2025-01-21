import './Toggle.css';

export interface ToggleProps {
  checked: boolean;
  // eslint-disable-next-line no-unused-vars
  onChange: (checked: boolean) => void;
  label: string;
}

export const Toggle = ({ checked, onChange, label }: ToggleProps) => (
  <label className="toggle-container">
    <input
      type="checkbox"
      className="toggle-input"
      checked={checked}
      onChange={(e) => onChange(e.target.checked)}
    />
    <div className="toggle-switch" />
    <span className="toggle-label">{label}</span>
  </label>
);
