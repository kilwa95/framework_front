import { Formik, Form, Field, FormikHelpers } from 'formik';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { createAccountAsync } from 'src/store/auth/authAsync';
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Alert,
  useTheme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { RegisterData } from 'src/utils/types/RegisterData';
import { registerValidationSchema } from 'src/utils/ValidationSchemas/registerValidationSchema';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetCreateAccountRequest } from 'src/store/auth/authSlices/createAccountSlice';
import ValidationPasswordSection from 'src/components/UI/ValidationPasswordSection/ValidationPasswordSection';

type RegisterFormProps = {
  // eslint-disable-next-line no-unused-vars
  navigation: (arg: 'register') => void;
};

const initialValues: RegisterData = {
  email: '',
  newPassword: '',
  confirmPassword: '',
};

const RegisterForm = ({ navigation }: RegisterFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const theme = useTheme();

  const createAccountRequest = useAppSelector(
    (state) => state.auth.createAccount,
  );

  const [showConfirm, setShowConfirm] = useState<boolean>(false);
  const [showNew, setShowNew] = useState<boolean>(false);

  const handleShow = (type: 'confirm' | 'new') => {
    if (type === 'confirm') {
      setShowConfirm(!showConfirm);
    } else if (type === 'new') {
      setShowNew(!showNew);
    }
  };

  const onSubmit = async (
    values: RegisterData,
    { setSubmitting }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await dispatch(
        createAccountAsync({
          email: values.email,
          password: values.newPassword,
        }),
      );
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(resetCreateAccountRequest());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={registerValidationSchema}
      isInitialError={false}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        isSubmitting,
        isValid,
        touched,
        errors,
      }) => (
        <Form onSubmit={handleSubmit}>
          <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
            Créer un compte
          </Typography>
          {createAccountRequest.status !== ReduxStatus.Succeeded && (
            <>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="email"
                label="Mail"
                name="email"
                autoComplete="email"
                value={values.email}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
                onChange={handleChange}
              />
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                name="newPassword"
                label="Mot de passe"
                type={showNew ? 'text' : 'password'}
                id="newPassword"
                autoComplete="current-newPassword"
                value={values.newPassword}
                error={touched.newPassword && Boolean(errors.newPassword)}
                helperText={touched.newPassword && errors.newPassword}
                onChange={handleChange}
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
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="confirmPassword"
                label="Confirmer le mot de passe"
                name="confirmPassword"
                autoComplete="confirmPassword"
                type={showConfirm ? 'text' : 'password'}
                value={values.confirmPassword}
                error={
                  touched.confirmPassword && Boolean(errors.confirmPassword)
                }
                helperText={touched.confirmPassword && errors.confirmPassword}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => handleShow('confirm')}
                        edge="end"
                        tabIndex={-1}
                      >
                        {showConfirm ? (
                          <VisibilityOffIcon />
                        ) : (
                          <VisibilityIcon />
                        )}
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
                disabled={!isValid}
                loading={isSubmitting}
              >
                Valider
              </LoadingButton>
            </>
          )}
          {createAccountRequest.status === ReduxStatus.Succeeded && (
            <Alert severity="info" sx={{ marginTop: theme.spacing(3) }}>
              Votre compte a bien été créé, vérifier votre adresse email pour
              valider votre inscription.
            </Alert>
          )}
          <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
            <Link
              onClick={() => {
                navigation('register');
                dispatch(resetCreateAccountRequest());
              }}
            >
              Déjà un compte ?
            </Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
