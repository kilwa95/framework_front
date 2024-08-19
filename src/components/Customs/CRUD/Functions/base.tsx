/* eslint-disable no-unused-vars */

import { GridCellParams } from '@mui/x-data-grid';
import { Dispatch } from 'react';

export interface IDataSelect {
  value: number;
  label: string;
}

export interface LabeledItem {
  label: string;
  [key: string]: any; // Propriétés dynamiques
}

export interface IFieldConf {
  field: string;
  headerName: string;
  type: string;
  typefield: string;
  required?: boolean;
  flex?: number;
  editable: boolean;
  renderCell?: (params: GridCellParams) => JSX.Element;
  data?: () => IDataSelect[];
}

export interface IURL {
  list: string;
  add: string;
  put: string;
  get: string;
  delete: string;
}

export interface IMsg {
  add: string;
  update: string;
}

export interface IButtons {
  list: string;
  update: string;
  add: string;
  details: string;
}

export interface ICtemConfig {
  model: string;
  flag: string;
  title: string;
  url: IURL;
  fields: IFieldConf[];
  msg: IMsg;
  buttons: IButtons;
}

export interface IComponementConfig {
  user: ICtemConfig;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export type ObjType = Record<string, any>;

interface DataArray {
  data: any[]; // Replace 'any' with the actual type of the data array
}
export interface dataAttrOptions {
  label: string;
  value: number;
}

export interface ActionsColumnsProps {
  row: any; // Adjust the type of 'row' based on your data structure
  callback: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    row: any,
    action: string,
  ) => void;
}

export interface Payload {
  status: string;
  error: string;
  data: {
    data: any[];
    flag: string;
  };
}

interface TransformConfig {
  idKey: string;
  nameKey: string;
}

export function formatContentListSelect<T>(
  inputObject: T[],
  config: TransformConfig,
): { value: any; label: any }[] {
  if (!Array.isArray(inputObject)) {
    throw new Error("L'objet d'entrée doit être un tableau.");
  }

  const { idKey, nameKey } = config;

  return inputObject.map((item: any) => {
    if (item && item[idKey] !== undefined && item[nameKey] !== undefined) {
      return {
        value: item[idKey],
        label: item[nameKey],
      };
    } else {
      throw new Error(
        `L'objet d'entrée doit être un tableau "${idKey}" et "${nameKey}".`,
      );
    }
  });
}

export const handleFieldChange = (
  fieldName: string,
  value: any,
  setter: Dispatch<any>,
) => {
  setter((prevVObject: any) => ({
    ...prevVObject,
    [fieldName]: value,
  }));
};

export function isDataArray(obj: DataArray) {
  return Array.isArray(obj?.data);
}
