import {
  RETURN_HIT_REQUEST,
  RETURN_HIT_FAILURE,
  RETURN_HIT_SUCCESS
} from '../constants';

export interface ReturnHitFailure {
  readonly type: RETURN_HIT_FAILURE;
}

export interface ReturnHitSuccess {
  readonly type: RETURN_HIT_SUCCESS;
  readonly hitId: string;
}

export interface ReturnHitRequest {
  readonly type: RETURN_HIT_REQUEST;
  readonly hitId: string;
}

export type ReturnAction =
  | ReturnHitFailure
  | ReturnHitSuccess
  | ReturnHitRequest;

export const returnHitRequest = (hitId: string): ReturnHitRequest => ({
  type: RETURN_HIT_REQUEST,
  hitId
});

export const returnHitFailure = (): ReturnHitFailure => ({
  type: RETURN_HIT_FAILURE
});

export const returnHitSuccess = (hitId: string): ReturnHitSuccess => ({
  type: RETURN_HIT_SUCCESS,
  hitId
});
