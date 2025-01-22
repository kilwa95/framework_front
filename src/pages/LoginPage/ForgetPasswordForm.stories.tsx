import type { Meta, StoryObj } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box, TextField, Typography, Link, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useState } from 'react';
import { fn } from '@storybook/test';
import { within, userEvent } from '@storybook/testing-library';

// Mock version of ForgetPasswordForm without Redux dependencies
const MockForgetPasswordForm = ({
  navigation,
}: {
  // eslint-disable-next-line no-unused-vars
  navigation: (arg: 'resetPassword') => void;
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [values, setValues] = useState({
    username: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSuccess(true);
    setIsSubmitting(false);
  };

  return (
    <>
      {!isSuccess && (
        <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Mot de passe oublié
          </Typography>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Nom utilisateur ou email"
            name="username"
            autoComplete="username"
            value={values.username}
            onChange={(e) => setValues({ ...values, username: e.target.value })}
          />
          <LoadingButton
            fullWidth
            sx={{ mt: 3, mb: 2 }}
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            Envoyer
          </LoadingButton>
        </Box>
      )}
      {isSuccess && (
        <Alert severity="success">
          Vous devriez recevoir un mail au compte associé dans quelques instants
          pour modifier votre mot de passe.
        </Alert>
      )}
      <Typography sx={{ mt: 2, cursor: 'pointer' }}>
        <Link onClick={() => navigation('resetPassword')}>
          {'Retour à la connexion'}
        </Link>
      </Typography>
    </>
  );
};

const theme = createTheme();

const meta = {
  title: 'Pages/LoginPage/ForgetPasswordForm',
  component: MockForgetPasswordForm,
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
} satisfies Meta<typeof MockForgetPasswordForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default state of the form
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
    const usernameInput = canvas.getByLabelText(
      'Nom utilisateur ou email',
    ) as HTMLInputElement;

    await userEvent.type(usernameInput, 'test@example.com');
  },
};

// Story showing success state
export const SuccessState: Story = {
  args: {
    navigation: fn(),
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const usernameInput = canvas.getByLabelText(
      'Nom utilisateur ou email',
    ) as HTMLInputElement;
    const submitButton = canvas.getByText('Envoyer');

    await userEvent.type(usernameInput, 'test@example.com');
    await userEvent.click(submitButton);
  },
};
