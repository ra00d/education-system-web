import { User } from "@/types/models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type UseAuthType = Partial<User> & {
  authenticated: boolean;
  setUser: (user: User | null) => void;
  getUser: () => Partial<User> | null;
};
export const useAuth = create<UseAuthType>()(
  devtools(
    persist(
      (set, get) => ({
        name: "guest",
        authenticated: false,
        setUser: (user) => {
          if (user) set({ name: user.name, id: user.id, email: user.email });
          else set({ name: "guest", authenticated: false });
        },
        getUser: () => {
          const { setUser, getUser, ...user } = get();
          return user.id
            ? {
                ...user,
              }
            : { name: user.name };
        },
      }),
      {
        name: "auth-storage",
      },
    ),
  ),
);
