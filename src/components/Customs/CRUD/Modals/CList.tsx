import { Box, Button, useTheme } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'src/hooks';
import { AppDispatch } from 'src/store/store';
import DataTable from 'src/components/UI/Datatable/DataTable';
import ButtonActionBuilder from '../Classes/ButtonActionBuilder';
import {
  VisibilityIconComponent,
  EditIconComponent,
  DeleteIconComponent,
  handleActionClick,
} from '../Functions/callbacks';
import { getComponementsAsync } from 'src/store/componements/componementsAsync';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';
import {
  ActionsColumnsProps,
  Payload,
  dataAttrOptions,
} from '../Functions/base';
import CAddEdit from './CAddEdit';
import {
  DELETE_PERMISSION,
  EDIT_PERMISSION,
  MSG_CONFIRM_DELETE,
  MSG_DANGER_DELETE,
  VIEW_PERMISSION,
} from '../Configs/consts';
import AlertDialog from 'src/components/Customs/AlertDialog';
import CView from './CView';
import { CRUDPageStyles } from '../style';

interface Props {
  model: string;
  MConfig: any;
  customUrl?: string;
  state: {
    vObject: any;
    setter: React.Dispatch<any>;
  };
  initialState: {
    initObject: any;
    setter: React.Dispatch<any>;
  };
}

const CList: React.FC<Props> = ({ model, MConfig, state, initialState }) => {
  const theme = useTheme();

  const [rowData, setRowData] = useState<any[]>([]);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [isAddActin, setIsAddAction] = useState(false);
  const [openConfirmDialogForDelete, setOpenConfirmDialogForDelete] =
    useState(false);

  // here we get the main object state
  const { vObject } = state;
  const { setter } = state;

  const dispatch = useDispatch<AppDispatch>();
  // eslint-disable-next-line @typescript-eslint/no-shadow
  const user = useAppSelector((state: any) => state.auth.login.user); // get current User Details
  const payload: Payload = useAppSelector(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    (state: any) => state.componements.getSlice,
  );

  const dataProps = {
    state: state,
    MConfig: MConfig,
    listeUnite: [] as dataAttrOptions[],
    user_id: user?.user_id,
    action: isAddActin,
  };

  // Handling roles and permissions
  const userRole = ['admin']; // user?.role;
  const [defautlRole] = userRole as string[];
  // Based on the logged user role we set a list of permissions
  const buttonActionBuilder = new ButtonActionBuilder(
    defautlRole,
    model,
  ).build();

  const actionsColumns = {
    field: 'actions',
    headerName: 'Actions',
    type: 'string',
    renderCell: (params: { row: any }) => {
      const ruleToComponent: Record<string, FC<ActionsColumnsProps> | null> = {
        Edit: EditIconComponent,
        View: VisibilityIconComponent,
        Delete: DeleteIconComponent,
      };

      return (
        <Box sx={CRUDPageStyles(theme).actionsColumns}>
          {buttonActionBuilder.map((rule: string) => {
            const Component = ruleToComponent[rule];

            return Component ? (
              <Component
                key={rule}
                row={params.row}
                callback={handleEventClick}
              />
            ) : (
              Component
            ); // condition to check
          })}
        </Box>
      );
    },
    flex: 1,
  };

  const handleEventClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any,
    action: any,
  ) => {
    // Your edit event handling logic here
    setter(row);
    setIsAddAction(false);

    switch (action) {
      case EDIT_PERMISSION:
        setIsAddEditModalOpen(true);
        break;
      case DELETE_PERMISSION:
        setOpenConfirmDialogForDelete(true);
        break;
      case VIEW_PERMISSION:
        setIsViewModalOpen(true);
        break;
    }
  };

  const handleConfirmDialogForDelete = () => {
    // work in progress
    setRowData((currentRows: any[]) =>
      currentRows.filter((item: any) => item.id !== vObject.id),
    );
    console.log('Handling Confirm Delete...', vObject);
    setOpenConfirmDialogForDelete(false);
  };

  const handleCloseConfirmDialogForDelete = () => {
    setOpenConfirmDialogForDelete(false);
  };

  const columns = [...MConfig.fields, actionsColumns];

  useEffect(() => {
    dispatch(
      getComponementsAsync({
        flag: MConfig.flag,
        url: MConfig.url.list,
        params: { userID: user?.user_id },
      }),
    );
    dispatch(getComponementsAsync({ flag: 'unite', url: 'auth/unite/' })); // to refactor
  }, []);

  const customToolBar: React.ReactNode = (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={() => {
          setIsAddAction(true);
          handleActionClick(setIsAddEditModalOpen, true, state, initialState);
        }}
      >
        {MConfig.buttons.add}
      </Button>
    </>
  );

  if (
    payload.data.flag == model &&
    payload.status == ReduxStatus.Succeeded &&
    rowData.length == 0
  ) {
    setRowData(payload.data.data);
  }

  return (
    <>
      <AlertDialog
        open={openConfirmDialogForDelete}
        confirmText={MSG_CONFIRM_DELETE}
        helpText={MSG_DANGER_DELETE}
        handleConfirm={handleConfirmDialogForDelete}
        handleClose={handleCloseConfirmDialogForDelete}
      />
      <DataTable
        rows={rowData}
        columns={columns}
        toolbarButtons={customToolBar}
      />
      <CAddEdit
        dataProps={dataProps}
        isOpen={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
      />
      <CView
        dataProps={dataProps}
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
      />
    </>
  );
};

export default CList;
