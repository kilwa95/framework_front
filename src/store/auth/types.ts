import { DecodedToken } from 'src/utils/types/decodedToken';
import { UserInfos } from 'src/utils/types/UserInfos';
import { AlertState, Error } from 'src/utils/types/redux';
import { ReduxStatus } from 'src/utils/types/reduxStatusValues';

export interface AuthState {
  alert: AlertState;
  user: DecodedToken | null;
  error: Error;
  status: ReduxStatus;
  token: { access: string | null; refresh: string | null };
}

export interface getUserInfosRequest {
  status: ReduxStatus;
  error: Error;
  alert: AlertState;
  data: UserInfos;
}

export interface ForgetPasswordData {
  username: string;
}

export interface ResetPasswordPayload {
  token_value: string;
  password: string;
}

export interface ResetPasswordData {
  newPassword: string;
  confirmPassword: string;
}

export interface CreateAccountPayload {
  email: string;
  password: string;
}
