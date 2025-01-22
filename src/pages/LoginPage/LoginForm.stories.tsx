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
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { fn } from '@storybook/test';
import { within, userEvent } from '@storybook/testing-library';

// Mock version of LoginForm without Redux dependencies
const LoginForm = ({
  navigation,
}: {
  // eslint-disable-next-line no-unused-vars
  navigation: (arg: 'register' | 'resetPassword') => void;
}) => {
  const [show, setShow] = useState(false);
  const [values, setValues] = useState({ username: '', password: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography
        component="h1"
        variant="h5"
        sx={{ textAlign: 'center', mb: 3 }}
      >
        Connexion
      </Typography>

      <TextField
        margin="normal"
        required
        fullWidth
        id="username"
        label="Mail"
        name="username"
        autoComplete="username"
        value={values.username}
        onChange={(e) => setValues({ ...values, username: e.target.value })}
      />

      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Mot de passe"
        type={show ? 'text' : 'password'}
        id="password"
        autoComplete="current-password"
        value={values.password}
        onChange={(e) => setValues({ ...values, password: e.target.value })}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                onClick={() => setShow(!show)}
                edge="end"
                tabIndex={-1}
              >
                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <LoadingButton
        fullWidth
        sx={{ mt: 3, mb: 2 }}
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        Connexion
      </LoadingButton>

      <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
        <Link onClick={() => navigation('resetPassword')}>
          Mot de passe oublié ?
        </Link>
      </Typography>

      <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
        <Link onClick={() => navigation('register')}>S'inscrire</Link>
      </Typography>
    </Box>
  );
};

const theme = createTheme();

const meta = {
  title: 'Pages/LoginPage/LoginForm',
  component: LoginForm,
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
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state of the login form
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
    const usernameInput = canvas.getByLabelText('Mail') as HTMLInputElement;
    const passwordInput = canvas.getByLabelText(
      'Mot de passe',
    ) as HTMLInputElement;

    await userEvent.type(usernameInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
  },
};

// Story showing loading state
export const LoadingState: Story = {
  args: {
    navigation: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usernameInput = canvas.getByLabelText('Mail') as HTMLInputElement;
    const passwordInput = canvas.getByLabelText(
      'Mot de passe',
    ) as HTMLInputElement;
    const submitButton = canvas.getByText('Connexion');

    await userEvent.type(usernameInput, 'test@example.com');
    await userEvent.type(passwordInput, 'Password123!');
    await userEvent.click(submitButton);
  },
};
