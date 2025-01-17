import * as React from 'react';
import { Theme, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts';

interface ArcGaugeProps {
  value?: number; // The value to be displayed on the gauge
  width?: number; // Optional width
  height?: number; // Optional height
  color?: string; // Optional color for the gauge arc
  referenceColor?: string;
  text?: string; // Optional color for the reference arc
}

const CArcGauge: React.FC<ArcGaugeProps> = ({
  value,
  width = 200, // Default width
  height = 200, // Default height
  color,
  text, // Default gauge color
  referenceColor, // Reference color can be specified
}) => {
  const settings = {
    width,
    height,
    value,
    text,
  };

  return (
    <>
      <Typography variant="h2">Taux de satisfaction </Typography>
      <Gauge
        {...settings}
        cornerRadius="50%"
        sx={(theme: Theme) => ({
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
          },
          [`& .${gaugeClasses.valueArc}`]: {
            fill: color,
          },
          [`& .${gaugeClasses.referenceArc}`]: {
            fill: referenceColor || theme.palette.text.disabled, // Use provided color or default
          },
        })}
        text={text}
      />
    </>
  );
};

export default CArcGauge;
