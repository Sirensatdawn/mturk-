import { call, put } from 'redux-saga/effects';
import {
  FetchStatusDetailFailure,
  FetchStatusDetailRequest,
  FetchStatusDetailSuccess,
  statusDetailRequest,
  statusDetailFailure,
  statusDetailSuccess
} from '../actions/statusDetail';
import {
  fetchStatusDetailPage,
  StatusDetailPageInfo
} from '../api/statusDetail';
import { statusDetailToast, statusDetailErrorToast } from '../utils/toaster';

export function* handleStatusDetailRequest(action: FetchStatusDetailRequest) {
  try {
    const pageInfo: StatusDetailPageInfo = yield call(
      fetchStatusDetailPage,
      action.dateString,
      action.page
    );
    const { data, morePages } = pageInfo;

    if (data.isEmpty()) {
      yield put<FetchStatusDetailFailure>(statusDetailFailure());
    } else {
      yield put<FetchStatusDetailSuccess>(statusDetailSuccess(data));
    }

    conditionallyDisplayToast(action, data.isEmpty());

    /**
     * Recursively call this function with page+1.
     */
    if (morePages) {
      yield put<FetchStatusDetailRequest>(
        statusDetailRequest(action.dateString, action.page + 1)
      );
    }
  } catch (e) {
    statusDetailErrorToast(action.dateString);
    console.warn(e);
    yield put<FetchStatusDetailFailure>(statusDetailFailure());
  }
}

const conditionallyDisplayToast = (
  action: FetchStatusDetailRequest,
  noDataFound: boolean
) => {
  if (action.withToast) {
    statusDetailToast(action.dateString, noDataFound);
  }
};
