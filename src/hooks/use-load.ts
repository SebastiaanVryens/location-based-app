import { useEffect, useEffectEvent, useState } from 'react';

export type LoadState<T> =
  { status: 'loading' } | { status: 'failed' } | { status: 'done'; data: T };

type Result<K, T> = { key: K; attempt: number; state: LoadState<T> };

export function useLoad<K, T>(load: (key: K) => Promise<T>, key: K | null) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result<K, T> | null>(null);
  // Always calls the latest `load`, without loading again on every render.
  const runLoad = useEffectEvent(load);

  useEffect(() => {
    if (key === null) {
      return;
    }
    let isMounted = true;

    runLoad(key)
      .then((data): LoadState<T> => ({ status: 'done', data }))
      .catch((error: unknown): LoadState<T> => {
        console.warn('Loading failed:', error);
        return { status: 'failed' };
      })
      .then((state) => {
        if (isMounted) {
          setResult({ key, attempt, state });
        }
      });

    return () => {
      isMounted = false;
    };
  }, [key, attempt]);

const isCurrent = result !== null && result.key === key && result.attempt === attempt;
  const state: LoadState<T> = isCurrent ? result.state : { status: 'loading' };

  return { ...state, retry: () => setAttempt((count) => count + 1) };
}
