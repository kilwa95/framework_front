/* eslint-disable no-unused-vars */
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { FC } from 'react';
import { IconButton } from '@mui/material';

export interface ActionsColumnsProps {
  row: any; // Adjust the type of 'row' based on your data structure
  callback: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any,
    action: string,
  ) => void;
}

export const EditIconComponent: FC<ActionsColumnsProps> = ({
  row,
  callback,
}) => (
  <IconButton
    onClick={(e) => callback(e, row, 'Edit')}
    color="primary"
    aria-label="edit"
  >
    <EditIcon />
  </IconButton>
);

export const VisibilityIconComponent: FC<ActionsColumnsProps> = ({
  row,
  callback,
}) => (
  <IconButton
    onClick={(e) => callback(e, row, 'View')}
    color="primary"
    aria-label="view"
  >
    <VisibilityIcon />
  </IconButton>
);

export const DeleteIconComponent: FC<ActionsColumnsProps> = ({
  row,
  callback,
}) => (
  <IconButton
    onClick={(e) => callback(e, row, 'Delete')}
    color="primary"
    aria-label="delete"
  >
    <DeleteIcon />
  </IconButton>
);

export const handleActionClick = (
  setDataFunction: (data: any) => void,
  status: boolean,
  state?: {
    vObject: any;
    setter: React.Dispatch<any>;
  },
  initialState?: {
    initObject: any;
    setter: React.Dispatch<any>;
  },
) => {
  setDataFunction(status);
  state?.setter(initialState?.initObject); // Initial state for vObject for Add Modal
};
