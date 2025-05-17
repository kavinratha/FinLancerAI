import { create } from "zustand"
import { persist } from "zustand/middleware"

interface UserSettings {
  skills: string[]
  experience: number
  region: string
}

interface RateStore {
  settings: UserSettings
  setSettings: (settings: Partial<UserSettings>) => void
  resetSettings: () => void
}

const defaultSettings: UserSettings = {
  skills: [],
  experience: 0,
  region: "",
}

export const useRateStore = create<RateStore>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      setSettings: (newSettings) =>
        set((state) => ({
          settings: { ...state.settings, ...newSettings },
        })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    {
      name: "rate-store",
    },
  ),
)
