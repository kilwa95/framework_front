import axios, { AxiosError, AxiosResponse } from 'axios';
import { BACK_URL } from 'src/config';
import { AuthData, AuthToken } from 'src/utils/types/authData';
import { UserInfos } from 'src/utils/types/UserInfos';
import { store } from '../store';
import {
  CreateAccountPayload,
  ForgetPasswordData,
  ResetPasswordPayload,
} from './types';

export const login = async (body: AuthData) => {
  try {
    const response = await axios.post<AuthToken>(
      `${BACK_URL}/auth/api/token/`,
      body,
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 401) {
        throw new Error("L'email ou le mot de passe est incorrect.");
      } else if (axiosError.response && axiosError.response.status === 403) {
        throw new Error("Vous n'êtes pas autorisé.e à vous connecter.");
      } else {
        throw new Error(
          'Une erreur est survenue veuillez réessayer dans quelques minutes.',
        );
      }
    }
  }
};

export const getUserInfos = async (): Promise<UserInfos> => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<UserInfos>(
    `${BACK_URL}/auth/current-user/`,
    {
      headers: {
        Authorization: `Bearer ${token.access}`,
      },
    },
  );

  return response.data;
};

export const getUserListe = async (): Promise<UserInfos[]> => {
  const { token } = store.getState().auth.login;
  const response = await axios.get<UserInfos[]>(`${BACK_URL}/api/user/`, {
    headers: {
      Authorization: `Bearer ${token.access}`,
    },
  });

  return response.data;
};

export const forgetPassword = async (body: ForgetPasswordData) => {
  try {
    const response = await axios.post<ForgetPasswordData>(
      `${BACK_URL}/auth/api/forgotten-password/`,
      body,
    );

    return response.data;
  } catch (error: any) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.response && axiosError.response.status === 406) {
        throw new Error("Aucun compte n'est associé à ce nom ou cet email.");
      } else {
        throw new Error(
          'Une erreur est survenue veuillez réessayer dans quelques minutes.',
        );
      }
    }
  }
};

export const resetPassword = async (body: ResetPasswordPayload) => {
  const response = await axios.post<AxiosResponse>(
    `${BACK_URL}/auth/api/reset-password/`,
    body,
  );

  return response.data;
};

export async function createAccount(payload: CreateAccountPayload) {
  const response = await axios.post<AxiosResponse>(
    `${BACK_URL}/auth/user/create-user/`,
    payload,
  );

  return response;
}

export const confirmAccount = async (id: string) => {
  const response = await axios.get<AuthToken>(
    `${BACK_URL}/auth/user/confirmation-activation-user/${id}`,
    {},
  );

  return response;
};
