import { Formik, Form, Field, FormikHelpers } from 'formik';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { loginAsync } from 'src/store/auth/authAsync';
import {
  TextField,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Alert,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import { AuthData } from 'src/utils/types/authData';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { loginValidationSchema } from 'src/utils/ValidationSchemas/loginValidationSchema';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import {
  resetLoginRequest,
  resetLoginStatus,
} from 'src/store/auth/authSlices/loginSlice';
import { ROUTES } from 'src/utils/const/routes';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  // eslint-disable-next-line no-unused-vars
  navigation: (arg: 'register' | 'resetPassword') => void;
};

const initialValues: AuthData = {
  username: '',
  password: '',
};

const LoginForm = ({ navigation }: LoginFormProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const loginRequest = useAppSelector((state) => state.auth.login);

  const [show, setShow] = useState(false);

  const handelShow = () => {
    setShow(!show);
  };

  const onSubmit = async (
    values: AuthData,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await dispatch(loginAsync(values));
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(resetLoginRequest());
  }, []);

  useEffect(() => {
    if (loginRequest.status === ReduxStatus.Succeeded) {
      dispatch(resetLoginStatus());
      navigate(ROUTES.home.path);
    }
  }, [loginRequest]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={loginValidationSchema}
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
            Connexion
          </Typography>
          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Mail"
            name="username"
            autoComplete="username"
            value={values.username}
            error={touched.username && Boolean(errors.username)}
            helperText={touched.username && errors.username}
            onChange={handleChange}
          />

          <Field
            as={TextField}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Mot de passe"
            type={show ? 'text' : 'password'}
            id="password"
            autoComplete="current-password"
            value={values.password}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handelShow} edge="end" tabIndex={-1}>
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
            disabled={!isValid}
            loading={isSubmitting}
          >
            Connexion
          </LoadingButton>
          {loginRequest.status === ReduxStatus.Failed && (
            <Alert severity="error">{loginRequest.error}</Alert>
          )}
          <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
            <Link onClick={() => navigation('resetPassword')}>
              {'Mot de passe oublié ?'}
            </Link>
          </Typography>
          <Typography sx={{ mt: 2, cursor: 'pointer', width: 'fit-content' }}>
            <Link onClick={() => navigation('register')}>{"S'inscrire"}</Link>
          </Typography>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
