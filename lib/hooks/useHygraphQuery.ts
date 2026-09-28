import { useEffect, useState } from 'react';
import { fetchHygraph } from '../hygraph/config';
import { mapProducts } from '../hygraph/queries/products';

type UseHygraphQueryResult<T> = {
    data: T | null
    loading: boolean
    error: string | null
}

export function mapProduct(raw: {products: Parameters<typeof mapProducts>[0][]}) {
    return raw.products.map(mapProducts);
}

export function useHygraphQueryResult<TRaw, TMapped>( query: string, mapper: (raw: TRaw) => TMapped ): UseHygraphQueryResult<TMapped> {
    const [data, setData] = useState<TMapped | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        async function load() {
            setLoading(true);
            setError(null);

            try {
                const raw = await fetchHygraph(query);
                if (isMounted) {
                    setData(mapper(raw));
                }
            } catch (error) {
                if(isMounted) {
                    setError( error instanceof Error ? error.message : "Something went wrong")
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        }

        load();

        return () => { isMounted = false };

    }, [query]);

    return { data, loading, error }
}
