import brandApi from 'api/promotion/brand';
import { useQuery } from 'react-query';

const useBrands = (params = {}) => {
  return useQuery(
    ['brand', params],
    () => brandApi.getAll({ params }).then((res) => res.data.data),
    {
      refetchOnWindowFocus: false
    }
  );
};

export default useBrands;
