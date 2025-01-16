import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Box,
  TextField,
  Typography,
  Link,
  IconButton,
  InputAdornment,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fn } from '@storybook/test';
import { within, userEvent } from '@storybook/testing-library';
import ValidationPasswordSection from 'src/components/UI/ValidationPasswordSection/ValidationPasswordSection';

// Mock version of RegisterForm without Redux dependencies
const MockRegisterForm = ({
  navigation,
}: {
  navigation: (arg: 'register') => void;
}) => {
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [values, setValues] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleShow = (type: 'confirm' | 'new') => {
    if (type === 'confirm') {
      setShowConfirm(!showConfirm);
    } else if (type === 'new') {
      setShowNew(!showNew);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Créer un compte
      </Typography>

      {!isSuccess && (
        <>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Mail"
            name="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => setValues({ ...values, email: e.target.value })}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Mot de passe"
            type={showNew ? 'text' : 'password'}
            id="newPassword"
            autoComplete="new-password"
            value={values.newPassword}
            onChange={(e) =>
              setValues({ ...values, newPassword: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleShow('new')}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showNew ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmer le mot de passe"
            type={showConfirm ? 'text' : 'password'}
            id="confirmPassword"
            autoComplete="new-password"
            value={values.confirmPassword}
            onChange={(e) =>
              setValues({ ...values, confirmPassword: e.target.value })
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handleShow('confirm')}
                    edge="end"
                    tabIndex={-1}
                  >
                    {showConfirm ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <ValidationPasswordSection
            value={values.newPassword}
            confirmValue={values.confirmPassword}
          />

          <LoadingButton
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Valider
          </LoadingButton>
        </>
      )}

      {isSuccess && (
        <Alert severity="info" sx={{ mt: 3 }}>
          Votre compte a bien été créé, vérifier votre adresse email pour
          valider votre inscription.
        </Alert>
      )}

      <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
        <Link onClick={() => navigation('register')}>Déjà un compte ?</Link>
      </Typography>
    </Box>
  );
};

const theme = createTheme();

const meta = {
  title: 'Pages/LoginPage/RegisterForm',
  component: MockRegisterForm,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Box sx={{ width: '400px', p: 4 }}>
            <Story />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MockRegisterForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state of the register form
export const Default: Story = {
  args: {
    navigation: fn(),
  },
};

// Story showing form with pre-filled values
export const PrefilledForm: Story = {
  args: {
    navigation: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('Mail') as HTMLInputElement;
    const passwordInput = canvas.getByLabelText(
      'Mot de passe',
    ) as HTMLInputElement;
    const confirmPasswordInput = canvas.getByLabelText(
      'Confirmer le mot de passe',
    ) as HTMLInputElement;

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Password123!');
  },
};

// Story showing success state
export const SuccessState: Story = {
  args: {
    navigation: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const emailInput = canvas.getByLabelText('Mail') as HTMLInputElement;
    const passwordInput = canvas.getByLabelText(
      'Mot de passe',
    ) as HTMLInputElement;
    const confirmPasswordInput = canvas.getByLabelText(
      'Confirmer le mot de passe',
    ) as HTMLInputElement;
    const submitButton = canvas.getByText('Valider');

    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.type(confirmPasswordInput, 'Password123!');
    await userEvent.click(submitButton);
  },
};
