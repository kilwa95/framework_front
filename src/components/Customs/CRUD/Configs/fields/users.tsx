import { GridCellParams } from '@mui/x-data-grid';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import {
  IFieldConf,
  Payload,
  formatContentListSelect,
} from '../../Functions/base';
import { useAppSelector } from 'src/hooks';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import { UNITE_FLAG } from '../consts';
import { Box, useTheme } from '@mui/material';

export const userFields: IFieldConf[] = [
  {
    field: 'id',
    headerName: 'ID',
    type: 'string',
    typefield: 'string',
    flex: 1,
    editable: false,
  },
  {
    field: 'username',
    headerName: 'Nom d’utilisateur',
    type: 'string',
    typefield: 'string',
    required: true,
    flex: 1,
    editable: true,
  },
  {
    field: 'first_name',
    headerName: 'Prénom',
    type: 'string',
    typefield: 'string',
    required: true,
    flex: 1,
    editable: true,
  },
  {
    field: 'last_name',
    headerName: 'Nom de famille',
    type: 'string',
    typefield: 'string',
    required: true,
    flex: 1,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Adresse e-mail',
    type: 'string',
    typefield: 'string',
    required: true,
    flex: 1,
    editable: true,
  },
  {
    field: 'birth_date',
    headerName: 'Date de naissance',
    type: 'date',
    typefield: 'date',
    flex: 1,
    editable: true,
  },
  {
    field: 'about',
    headerName: 'About',
    type: 'string',
    typefield: 'text',
    flex: 1,
    editable: true,
  },
  {
    field: 'is_manager',
    headerName: 'Is Manager',
    type: 'string',
    typefield: 'checkbox',
    required: false,
    renderCell: (params: GridCellParams) => {
      const theme = useTheme();

      return (
        <Box style={{ margin: '0 auto' }}>
          {params.row.is_rgpd ? (
            <CheckCircleIcon sx={{ color: theme.palette.success.main }} />
          ) : (
            <CancelIcon sx={{ color: theme.palette.error.main }} />
          )}
        </Box>
      );
    },
    flex: 1,
    editable: true,
  },
  {
    field: 'unite',
    headerName: 'Unité',
    type: 'select',
    typefield: 'select',
    required: true,
    flex: 1,
    editable: true,
    renderCell: (params: GridCellParams) => (
      <Box>{params.row?.unite?.label}</Box>
    ),
    data: () => {
      const payload: Payload = useAppSelector(
        (state: any) => state.componements.getSlice,
      );
      const unite =
        payload.data.flag == UNITE_FLAG &&
        payload.status == ReduxStatus.Succeeded
          ? payload.data.data
          : [];

      return formatContentListSelect(unite, { idKey: 'id', nameKey: 'name' });
    },
  },
  {
    field: 'service',
    headerName: 'Service',
    type: 'string',
    typefield: 'string',
    required: false,
    flex: 1,
    editable: false,
    renderCell: (params: GridCellParams) => <>{params.row?.service?.label}</>,
  },
  {
    field: 'departement',
    headerName: 'Département',
    type: 'string',
    typefield: 'string',
    required: false,
    flex: 1,
    editable: false,
    renderCell: (params: GridCellParams) => (
      <>{params.row?.departement?.label}</>
    ),
  },

  // Ajoutez ici d'autres champs si nécessaire.
];
