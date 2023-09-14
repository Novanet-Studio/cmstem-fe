const BCV_URL = 'https://api.exchangedyn.com/markets/quotes/usdves/bcv';

type GetBcvUsdReturn = {
  bcvUsd: Ref<number>;
  error: Ref<any>;
  pending: Ref<boolean>;
};

export default async function useGetBcvUsd(): Promise<GetBcvUsdReturn> {
  const { data, error, pending } = await useFetch<BcvUsdResponse>(BCV_URL);
  const bcvUsd = useState('mountBcvUsd', () =>
    parseFloat(data.value!.sources!.BCV.quote.substring(0, 5))
  );

  return {
    bcvUsd,
    error,
    pending,
  };
}
