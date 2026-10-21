import Storage from 'expo-sqlite/kv-store';
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

import { type PaymentMethod } from '@/types/payment';

export type Settings = {
  orderUpdates: boolean;
  offers: boolean;
  defaultPaymentMethod: PaymentMethod;
};

const STORAGE_KEY = 'settings';

const DEFAULT_SETTINGS: Settings = {
  orderUpdates: true,
  offers: false,
  defaultPaymentMethod: 'wallet',
};

// Reads the saved settings from the phone. Mixing them into the defaults gives
// settings added in a later version a value too.
function loadSettings(): Settings {
  try {
    const saved = Storage.getItemSync(STORAGE_KEY);
    return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

type SettingsContextValue = {
  settings: Settings;
  updateSettings: (changes: Partial<Settings>) => void;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

// App settings, saved on the phone so they survive restarts.
export function SettingsProvider({ children }: { children: ReactNode }) {
  // Passing the function (not calling it) makes React load the settings only once.
  const [settings, setSettings] = useState(loadSettings);

  // Save every change.
  useEffect(() => {
    Storage.setItem(STORAGE_KEY, JSON.stringify(settings));
  }, [settings]);

  function updateSettings(changes: Partial<Settings>) {
    setSettings((current) => ({ ...current, ...changes }));
  }

  return <SettingsContext value={{ settings, updateSettings }}>{children}</SettingsContext>;
}

export function useSettings() {
  const settings = useContext(SettingsContext);
  if (!settings) {
    throw new Error('useSettings must be used inside <SettingsProvider>.');
  }
  return settings;
}
