import { Alert, Box, useTheme } from '@mui/material';
import { useNavigate, useParams } from 'react-router';
import { ReactComponent as Freelogo } from 'src/assets/images/Free_logo.svg';
import { confirmAccountPageStyles } from './styles';
import CCircularProgress from 'src/components/UI/CCircularProgress/CCircularProgress';
import { AnimatePresence, motion } from 'framer-motion';
import { AppDispatch } from 'src/store/store';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { confirmAccountAsync } from 'src/store/auth/authAsync';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { resetConfirmAccountRequest } from 'src/store/auth/authSlices/confirmAccountSlice';
import { updateToken } from 'src/store/auth/authSlices/loginSlice';
import { ROUTES } from 'src/utils/const/routes';

const ConfirmAccountPage = () => {
  const { id } = useParams();
  const theme = useTheme();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const TRANSITION_DURATION = 0.8;
  const WAITING_BEFORE_REDIRECT = TRANSITION_DURATION * 1000 + 2000;

  const confirmAccountRequest = useAppSelector(
    (state) => state.auth.confirmAccount,
  );

  const [startAnimation, setStartAnimation] = useState<boolean>(false);

  useEffect(() => {
    dispatch(resetConfirmAccountRequest());
  }, []);

  useEffect(() => {
    if (id) {
      dispatch(confirmAccountAsync(id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (confirmAccountRequest.status === ReduxStatus.Succeeded) {
      setStartAnimation(true);
      dispatch(resetConfirmAccountRequest());

      setTimeout(() => {
        dispatch(updateToken(confirmAccountRequest.data));
        resetConfirmAccountRequest();
        navigate(ROUTES.home.path);
      }, WAITING_BEFORE_REDIRECT);
    }
  }, [confirmAccountRequest]);

  return (
    <Box sx={confirmAccountPageStyles(theme).container}>
      <Freelogo />
      {confirmAccountRequest.status === ReduxStatus.Loading && (
        <CCircularProgress isModal />
      )}
      <AnimatedCheckIcon
        isVisible={startAnimation}
        transitionDuration={TRANSITION_DURATION}
      />
      {confirmAccountRequest.status === ReduxStatus.Failed && (
        <Alert severity="error">
          Une erreur est survenue, veuillez réessayer plus tard.
        </Alert>
      )}
    </Box>
  );
};

function AnimatedCheckIcon({
  initial = false,
  isVisible,
  transitionDuration = 0.8,
}: {
  initial?: boolean;
  isVisible: boolean;
  transitionDuration?: number;
}) {
  const theme = useTheme();

  return (
    <AnimatePresence initial={initial}>
      {isVisible && (
        <motion.div
          style={{
            backgroundColor: theme.palette.primary.main,
            borderRadius: '50%',
            color: 'white',
            width: '20px',
            height: '20px',
            padding: '1px',
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 2 }}
          transition={{
            duration: transitionDuration,
            ease: [0, 0.71, 0.2, 1.01],
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                type: 'tween',
                duration: transitionDuration,
                delay: 0.2,
                ease: isVisible ? 'easeOut' : 'easeIn',
              }}
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ConfirmAccountPage;
