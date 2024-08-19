import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  useTheme,
} from '@mui/material';
import React, { useState } from 'react';
import CInfosTitleWrapper from 'src/components/UI/CInfosTitleWrapper/CInfosTitleWrapper';
import { componentsPagesStyles } from '../styles';
import CampaignIcon from '@mui/icons-material/Campaign';
import DoneIcon from '@mui/icons-material/Done';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { createSnackbar } from 'src/Providers/CSnackbarProvider';
import CTextField from 'src/components/UI/CTextField/CTextField';
import { SnackbarKey, useSnackbar } from 'notistack';

const SnackAlertCard: React.FC = () => {
  const theme = useTheme();
  const [durationTime, setDurationTime] = useState<number>(4);
  const [duplicatePrevented, setDuplicatePrevented] = React.useState(true);

  const handlePreventDuplicate = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setDuplicatePrevented(event.target.checked);
  };

  function handleDurationTime(event: React.ChangeEvent<HTMLInputElement>) {
    setDurationTime(parseInt(event.target.value));
  }

  const customActionButtons = (snackbarId: SnackbarKey) => {
    const { closeSnackbar } = useSnackbar();

    return (
      <>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            alert(`I belong to snackbar with id ${snackbarId}`);
          }}
        >
          Alert
        </Button>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            closeSnackbar(snackbarId);
          }}
        >
          Close
        </Button>
      </>
    );
  };

  return (
    <CInfosTitleWrapper
      title={'SnackAlert'}
      documentation="https://notistack.com/getting-started"
      isBigWrapper
    >
      <Box sx={componentsPagesStyles(theme).componentsListWrapperColumn}>
        <Box sx={componentsPagesStyles(theme).componentsListWrapper}>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<CampaignIcon />}
              onClick={() =>
                createSnackbar({ message: 'This is a default alert.' })
              }
            >
              Default alert
            </Button>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<DoneIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'This is a success alert.',
                  variant: 'success',
                })
              }
            >
              Success alert
            </Button>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<InfoIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'This is an info alert.',
                  variant: 'info',
                })
              }
            >
              Info alert
            </Button>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<WarningIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'This is a warning alert.',
                  variant: 'warning',
                })
              }
            >
              Warning alert
            </Button>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<ErrorIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'This is an error alert.',
                  variant: 'error',
                })
              }
            >
              Error alert
            </Button>
          </Box>
        </Box>
        <Box sx={componentsPagesStyles(theme).componentsListWrapper}>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<CopyAllIcon />}
              onClick={() =>
                createSnackbar({
                  message: duplicatePrevented
                    ? 'Try spaming I stand once.'
                    : 'I love spaming.',
                  preventDuplicate: duplicatePrevented,
                })
              }
            >
              Prevent duplicate alert
            </Button>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={duplicatePrevented}
                    onChange={handlePreventDuplicate}
                  />
                }
                label="Prevent duplicate"
              />
            </FormGroup>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<AccessTimeIcon />}
              onClick={() =>
                createSnackbar({
                  message: `This alert stands ${durationTime} seconds.`,
                  autoHideDuration: durationTime * 1000,
                })
              }
            >
              Controlled timer alert
            </Button>
            <CTextField
              type="number"
              label="Duration time"
              value={durationTime}
              onChange={handleDurationTime}
            />
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<AllInclusiveIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'This alert persists',
                  persist: true,
                })
              }
            >
              Persist alert
            </Button>
          </Box>
          <Box sx={componentsPagesStyles(theme).componentWrapper}>
            <Button
              variant="outlined"
              endIcon={<DashboardCustomizeIcon />}
              onClick={() =>
                createSnackbar({
                  message: 'I am an alert with custom buttons.',
                  actionButtons: customActionButtons,
                })
              }
            >
              Custom button
            </Button>
          </Box>
        </Box>
      </Box>
    </CInfosTitleWrapper>
  );
};

export default SnackAlertCard;
