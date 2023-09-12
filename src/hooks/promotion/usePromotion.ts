import { useQuery, UseQueryOptions } from 'react-query';
import { getPromoById } from 'redux/promotionSystem/promotion';

const usePromotion = (promotionId: number, config: UseQueryOptions = {}) => {
  return useQuery(
    ['promotions', +promotionId],
    () => getPromoById(promotionId).then((res) => res.data),
    {
      enabled: Boolean(promotionId),
      ...(config as any)
    }
  );
};

export default usePromotion;
