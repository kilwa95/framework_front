import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Alert, Typography, useTheme } from '@mui/material';

interface ModalDeleteProps {
  open: any;
  handleClose: any;
  handleConfirm: any;
  confirmText: string;
  helpText?: string;
}

const AlertDialog: React.FC<ModalDeleteProps> = ({
  open,
  handleClose,
  handleConfirm,
  confirmText,
  helpText,
}) => {
  const theme = useTheme();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        <Alert severity="warning">{confirmText}</Alert>
      </DialogTitle>
      <DialogContent>
        {helpText && (
          <DialogContentText id="alert-dialog-description">
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.error.main,
                marginLeft: theme.spacing(1),
              }}
            >
              {helpText}
            </Typography>
          </DialogContentText>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Annuler
        </Button>
        <Button variant="contained" onClick={handleConfirm} autoFocus>
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertDialog;
