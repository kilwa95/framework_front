import { Box, useTheme } from '@mui/material';

import ValidationItem from './ValidationItem';
import { useEffect, useState } from 'react';
import { validationPasswordPageStyles } from './styles';

type ValidationPasswordSectionProps = {
  value: string;
  confirmValue: string;
};

const ValidationPasswordSection = ({
  value,
  confirmValue,
}: ValidationPasswordSectionProps) => {
  const theme = useTheme();

  const [validation, setValidation] = useState({
    isLong: false,
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSpecialCharacters: false,
    valueConfirmed: false,
  });

  useEffect(() => {
    const isLongEnough = (val: string) => val.length >= 8;

    const hasLowercase = (val: string) => /[a-z]/.test(val);

    const hasUppercase = (val: string) => /[A-Z]/.test(val);

    const hasNumber = (val: string) => /\d/.test(val);

    const hasSpecialCharacters = (val: string) =>
      /[$&+,:;=?@#|'<>.^*()%!-]/.test(val);

    const valueConfimed = (val: string, valConf: string) =>
      val === valConf && (valConf.length > 0 || valConf.length > 0);

    setValidation({
      isLong: isLongEnough(value),
      hasLowercase: hasLowercase(value),
      hasUppercase: hasUppercase(value),
      hasNumber: hasNumber(value),
      hasSpecialCharacters: hasSpecialCharacters(value),
      valueConfirmed: valueConfimed(value, confirmValue),
    });
  }, [value, confirmValue]);

  return (
    <Box sx={validationPasswordPageStyles(theme).validationPasswordWrapper}>
      <ValidationItem
        validated={validation.isLong}
        conditionMessage="Minimum 8 caractères."
      />
      <ValidationItem
        validated={validation.hasLowercase}
        conditionMessage="Minimum une minuscule."
      />
      <ValidationItem
        validated={validation.hasUppercase}
        conditionMessage="Minimum une majuscule."
      />
      <ValidationItem
        validated={validation.hasNumber}
        conditionMessage="Minimum un chiffre."
      />
      <ValidationItem
        validated={validation.hasSpecialCharacters}
        conditionMessage="Minimum un caractère spécial."
      />
      <ValidationItem
        validated={validation.valueConfirmed}
        conditionMessage="Confirmez la saisie."
      />
    </Box>
  );
};

export default ValidationPasswordSection;
