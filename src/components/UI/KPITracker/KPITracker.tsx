import { useState, useEffect } from 'react';
import './KPITracker.css';

interface KPITrackerProps {
  title: string;
  value: number | string;
  loading?: boolean;
  // eslint-disable-next-line no-unused-vars
  formatter?: (value: number | string) => string;
  className?: string;
  refreshInterval?: number;
  onRefresh?: () => Promise<number | string>;
}

export const KPITracker = ({
  title,
  value: initialValue,
  loading = false,
  formatter = (val) => val.toString(),
  className = '',
  refreshInterval,
  onRefresh,
}: KPITrackerProps) => {
  const [value, setValue] = useState(initialValue);
  const [isLoading, setIsLoading] = useState(loading);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    if (!refreshInterval || !onRefresh) return;

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const newValue = await onRefresh();

        setValue(newValue);
      } catch (error) {
        console.error('Failed to refresh KPI value:', error);
      } finally {
        setIsLoading(false);
      }
    };

    const interval = setInterval(fetchData, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, onRefresh]);

  return (
    <div className={`kpi-tracker ${className}`}>
      <h3 className="kpi-tracker__title">{title}</h3>
      <div className="kpi-tracker__value-container">
        <div
          className={`kpi-tracker__value ${isLoading ? 'kpi-tracker__value--loading' : ''}`}
        >
          {formatter(value)}
        </div>
        {isLoading && (
          <div className="kpi-tracker__loader">
            <div className="kpi-tracker__spinner" />
          </div>
        )}
      </div>
    </div>
  );
};
