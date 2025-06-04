import { create } from "zustand";

const useAuthStore = create((set) => ({
  user: null,
  driver: null,
  role: null,

  loginAsUser: (userData) =>
    set(() => ({
      user: userData,
      driver: null,
      role: "user",
    })),

  loginAsDriver: (driverData) =>
    set(() => ({
      user: null,
      driver: driverData,
      role: "driver",
    })),
  logout: () =>
    set(() => ({
      user: null,
      driver: null,
      role: null,
    })),
}));

export default useAuthStore;
