import { useEffect } from 'react';
import { AppState } from 'react-native';

// Runs `callback` every time the app comes back to the screen, for example after the user
// changed a permission in the Settings app.
export function useOnForeground(callback: () => void) {
  useEffect(() => {
    const subscription = AppState.addEventListener('change', (state) => {
      if (state === 'active') {
        callback();
      }
    });

    return () => subscription.remove();
  }, [callback]);
}
