import axios from 'axios';
import { TOpticonResponse } from '../types';
import { turkopticonApiMulti } from '../constants/urls';
import { topticonMapFromTO } from '../utils/turkopticon';

export const batchFetchTOpticon = async (requesterIds: string[]) => {
  try {
    const t0 = performance.now();
    const response = await axios.get<TOpticonResponse>(turkopticonApiMulti, {
      params: {
        ids: requesterIds.toString()
      },
      responseType: 'json'
    });
    // tslint:disable-next-line:no-console
    console.log('Time to fetch TO: ' + (performance.now() - t0));
    return topticonMapFromTO(response.data);
  } catch (e) {
    throw Error('Problem fetching data from TO');
  }
};
