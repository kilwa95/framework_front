import { Box, Button, Typography, useTheme } from '@mui/material';
import { errorPageStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'src/utils/const/routes';

const ErrorPage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box sx={errorPageStyles(theme).container}>
      <Typography sx={errorPageStyles(theme).oups}>Oups !</Typography>
      <Box>
        <Typography sx={errorPageStyles(theme).text}>
          {'La page que vous cherchez est introuvable.'}
        </Typography>
        <Typography sx={errorPageStyles(theme).error}>
          {"Code d'erreur: 404"}
        </Typography>
      </Box>
      <Button variant="contained" onClick={() => navigate(ROUTES.home.path)}>
        Accueil
      </Button>
    </Box>
  );
};

export default ErrorPage;
