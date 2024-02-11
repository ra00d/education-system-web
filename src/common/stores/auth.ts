import { User } from "@/types/models";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
type UseAuthType = Partial<User> & {
	authenticated: boolean;
	setUser: (user: User) => void;
	getUser: () => Partial<User> | null;
};
export const useAuth = create<UseAuthType>()(
	devtools(
		persist(
			(set, get) => ({
				name: "guest",
				authenticated: false,
				setUser: (user) => {
					set({ name: user.name, id: user.id, email: user.email });
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
