const BCV_URL = 'https://api.exchangedyn.com/markets/quotes/usdves/bcv';

type GetBcvUsdReturn = {
  bcvUsd: Ref<number>;
  error: Ref<any>;
  pending: Ref<boolean>;
};

export default async function useGetBcvUsd(): Promise<GetBcvUsdReturn> {
  const { $notify } = useNuxtApp();
  const { data, error, pending } = await useFetch<BcvUsdResponse>(BCV_URL);
  const bcvUsd = useState('mountBcvUsd', () =>
    parseFloat(data.value!.sources!.BCV.quote.substring(0, 5))
  );

  if (error.value) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un error al intentar obtener el valor del BCV, reinicie la página',
    });
  }

  return {
    bcvUsd,
    error,
    pending,
  };
}
