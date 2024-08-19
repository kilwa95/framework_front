import { Formik, Form, Field, FormikHelpers } from 'formik';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { resetPasswordAsync } from 'src/store/auth/authAsync';
import {
  TextField,
  Typography,
  Link,
  Alert,
  IconButton,
  InputAdornment,
  Box,
  useTheme,
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { useEffect, useState } from 'react';
import { resetPasswordValidationSchema } from '../../utils/ValidationSchemas/resetPasswordValidationSchema';
import { useNavigate, useParams } from 'react-router';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ValidationPasswordSection from '../../components/UI/ValidationPasswordSection/ValidationPasswordSection';
import { resetPasswordPageStyles } from './styles';
import { ReactComponent as Freelogo } from 'src/assets/images/Free_logo.svg';
import { resetResetPasswordRequest } from 'src/store/auth/authSlices/resetPasswordSlice';
import { ResetPasswordData } from 'src/store/auth/types';
import { ROUTES_AUTH } from 'src/utils/const/routes';

const initialValues: ResetPasswordData = {
  newPassword: '',
  confirmPassword: '',
};

const ResetPasswordPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const theme = useTheme();

  const { token } = useParams();

  const resetPasswordRequest = useAppSelector(
    (state) => state.auth.resetPassword,
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
    values: ResetPasswordData,
    { setSubmitting, resetForm }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      if (token) {
        await dispatch(
          resetPasswordAsync({
            password: values.newPassword,
            token_value: token,
          }),
        );
      }
      setSubmitting(false);
      resetForm();
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(resetResetPasswordRequest());
  }, []);

  return (
    <Box sx={resetPasswordPageStyles(theme).wrapper}>
      <Freelogo />
      {resetPasswordRequest.status !== ReduxStatus.Succeeded && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={resetPasswordValidationSchema}
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
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: 'center' }}
                color="primary"
              >
                Mettre à jour le mot de passe
              </Typography>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="newPassword"
                label="Nouveau mot de passe"
                name="newPassword"
                autoComplete="newPassword"
                type={showNew ? 'text' : 'password'}
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
                Mettre à jour
              </LoadingButton>
              {resetPasswordRequest.status === ReduxStatus.Failed && (
                <Alert severity="error">
                  Une erreur est survenue lors de la mise à jour du mot de
                  passe.
                  <br />
                  Veuillez réessayer dans quelques instants.
                </Alert>
              )}
            </Form>
          )}
        </Formik>
      )}
      {resetPasswordRequest.status === ReduxStatus.Succeeded && (
        <Alert severity="success">
          Votre mot de passe a bien été mis à jour.
        </Alert>
      )}
      <Typography sx={{ mt: 2, cursor: 'pointer' }}>
        <Link onClick={() => navigate(ROUTES_AUTH.login.path)}>
          {'Retour à la connexion'}
        </Link>
      </Typography>
    </Box>
  );
};

export default ResetPasswordPage;
