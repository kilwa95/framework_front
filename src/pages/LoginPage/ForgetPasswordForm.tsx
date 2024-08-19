import { Formik, Form, Field, FormikHelpers } from 'formik';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { TextField, Typography, Link, Alert } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { useEffect } from 'react';
import { forgetPasswordAsync } from 'src/store/auth/authAsync';
import { ForgetPasswordData } from 'src/store/auth/types';
import { resetForgetPasswordRequest } from 'src/store/auth/authSlices/forgetPasswordSlice';
import { forgetValidationSchema } from 'src/utils/ValidationSchemas/forgetValidationSchema';

type ForgetPasswordFormProps = {
  // eslint-disable-next-line no-unused-vars
  navigation: (arg: 'resetPassword') => void;
};

const initialValues: ForgetPasswordData = {
  username: '',
};

const ForgetPasswordForm = ({ navigation }: ForgetPasswordFormProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const forgetPasswordRequest = useAppSelector(
    (state) => state.auth.forgetPassword,
  );

  const onSubmit = async (
    values: ForgetPasswordData,
    { setSubmitting }: FormikHelpers<typeof initialValues>,
  ) => {
    try {
      await dispatch(forgetPasswordAsync(values));
      setSubmitting(false);
    } catch (error) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    dispatch(resetForgetPasswordRequest());
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={forgetValidationSchema}
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
        <>
          {forgetPasswordRequest.status !== ReduxStatus.Succeeded && (
            <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <Typography
                component="h1"
                variant="h5"
                sx={{ textAlign: 'center' }}
              >
                Mot de passe oublié
              </Typography>
              <Field
                as={TextField}
                margin="normal"
                required
                fullWidth
                id="username"
                label="Nom utilisateur ou email"
                name="username"
                autoComplete="username"
                value={values.username}
                error={touched.username && Boolean(errors.username)}
                helperText={touched.username && errors.username}
                onChange={handleChange}
              />
              <LoadingButton
                fullWidth
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                variant="contained"
                disabled={!isValid}
                loading={isSubmitting}
              >
                Envoyer
              </LoadingButton>
              {forgetPasswordRequest.status === ReduxStatus.Failed && (
                <Alert severity="error">{forgetPasswordRequest.error}</Alert>
              )}
            </Form>
          )}
          {forgetPasswordRequest.status === ReduxStatus.Succeeded && (
            <Alert severity="success">
              Vous devriez recevoir un mail au compte associé dans quelques
              instants pour modifier votre mot de passe.
            </Alert>
          )}
          <Typography sx={{ mt: 2, cursor: 'pointer' }}>
            <Link onClick={() => navigation('resetPassword')}>
              {'Retour à la connexion'}
            </Link>
          </Typography>
        </>
      )}
    </Formik>
  );
};

export default ForgetPasswordForm;
