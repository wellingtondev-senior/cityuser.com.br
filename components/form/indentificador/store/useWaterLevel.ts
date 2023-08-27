import { create } from 'zustand'

export const useWaterLevel = create((set) => ({
    waterLevel: "",
    setWaterLevel: (waterLevel: string) => {
        set((state: { waterLevel: string }) => ({
            waterLevel: waterLevel,
        })

        )
    },

}));



