import useSWR from 'swr';
import { fetcher } from '../utils/utilities';

const useFetchAllBusinesses = () => useSWR(`api/businesses/category`, fetcher, {
	revalidateIfStale: false,
	revalidateOnFocus: false,
})

export default useFetchAllBusinesses;