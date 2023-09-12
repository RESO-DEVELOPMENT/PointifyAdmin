import { TLog } from 'types/log';
import { BaseReponse } from 'types/response';
import { axiosInstances } from 'utils/axios';
// import { generateAPIWithPaging } from './utils';

const request = axiosInstances.log;

const getLog = (params?: any) => request.get<BaseReponse<TLog>>('Logs', { params });

const logApi = { getLog };

// const logApi = {
//   ...generateAPIWithPaging<TLog>('Logs')
// };

export default logApi;
