import React from 'react';
import {
  Grid,
  Card,
  Typography,
  CardContent,
  Box,
  List,
  ListItem,
  ListItemText,
  useTheme,
} from '@mui/material';
import CModal from 'src/components/UI/CModal/CModal';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { LabeledItem, dataAttrOptions } from '../Functions/base';
import { v4 as uuidv4 } from 'uuid';

interface ModalShowProps {
  dataProps: any;
  isOpen: boolean;
  onClose: () => void;
  error?: string;
  errorMessage?: string;
}

const CView: React.FC<ModalShowProps> = ({ dataProps, isOpen, onClose }) => {
  const theme = useTheme();

  // here we get the main object state
  const { vObject } = dataProps.state;
  // const {setter} = dataProps.state

  return (
    <CModal
      isOpen={isOpen}
      onClose={onClose}
      modalTitle={`${dataProps.MConfig.buttons.details}`}
      error={false}
      errorMessage={''}
    >
      <Grid container spacing={2}>
        {dataProps.MConfig.fields.map((fieldSet: any) => {
          if (
            ['id', 'created_at', 'updated_at'].includes(fieldSet?.field) ||
            !fieldSet?.editable
          ) {
            return null;
          }

          const renderTextField = (xs: any) => {
            const key = `${uuidv4}`;

            return (
              <Grid item key={key} xs={xs}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {fieldSet.headerName}
                    </Typography>
                    <Typography variant="h5" sx={{ overflow: 'auto' }}>
                      {vObject[fieldSet.field]}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          };

          const renderCheckbox = () => {
            const key = `${uuidv4}`;

            return (
              <Grid item key={key} xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Box
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                      }}
                    >
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        gutterBottom
                      >
                        {`${fieldSet.headerName} : `}
                      </Typography>
                      <Box style={{ marginLeft: theme.spacing(1) }}>
                        {vObject[fieldSet.field] ? (
                          <CheckCircleIcon
                            sx={{ color: theme.palette.success.main }}
                          />
                        ) : (
                          <CancelIcon
                            sx={{ color: theme.palette.error.main }}
                          />
                        )}
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          };

          const renderSelectField = () => {
            const params: any[] = []; // add custom extra params
            const liste: dataAttrOptions[] = fieldSet.data(params) || [];
            const key = `${uuidv4}`;
            const defautlValue = vObject[fieldSet.field]?.value
              ? vObject[fieldSet.field]?.value
              : vObject[fieldSet.field];

            return (
              <Grid item key={key} xs={6}>
                <Card sx={{ minWidth: 275, fontVariant: 14 }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {fieldSet.headerName}
                    </Typography>
                    <Typography variant="h5" sx={{ overflow: 'auto' }}>
                      {liste.map((state: any) =>
                        defautlValue === state.value ? state.label : '',
                      )}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          };

          const renderMultiSelectField = () => {
            const key = `${uuidv4}`;

            return (
              <Grid item key={key} xs={6}>
                <Card sx={{ minWidth: 275 }}>
                  <CardContent>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      gutterBottom
                    >
                      {fieldSet.headerName}
                    </Typography>
                    <Typography variant="h6">
                      <List>
                        {Array.isArray(vObject[fieldSet.field])
                          ? vObject[fieldSet.field].map((item: LabeledItem) => (
                              <ListItem key={item.label}>
                                <ListItemText primary={item.label} />
                              </ListItem>
                            ))
                          : typeof vObject[fieldSet.field] == 'object'
                          ? vObject[fieldSet.field].label
                          : 'Aucun enregitrement trouvé'}
                      </List>
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            );
          };

          return (
            <>
              {fieldSet.typefield === 'string' && renderTextField(6)}
              {fieldSet.typefield === 'date' && renderTextField(6)}
              {fieldSet.typefield === 'text' && renderTextField(12)}
              {fieldSet.typefield === 'checkbox' && renderCheckbox()}
              {fieldSet.typefield === 'select' && renderSelectField()}
              {fieldSet.typefield === 'multiSelect' && renderMultiSelectField()}
            </>
          );
        })}
      </Grid>
    </CModal>
  );
};

export default CView;
