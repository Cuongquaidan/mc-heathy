import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
type unregisteredUserState = {
    name: string;
    email: string;
    password: string;
    avatar: string;
    dob: Date;
    phone: string;
    gender: boolean;
    role: string;
};
type unregisteredUserAction = {
    updateName: (name: unregisteredUserState["name"]) => void;
    updateEmail: (name: unregisteredUserState["email"]) => void;
    updatePassword: (name: unregisteredUserState["password"]) => void;
    updateAvatar: (name: unregisteredUserState["avatar"]) => void;
    updateDob: (name: unregisteredUserState["dob"]) => void;
    updatePhone: (name: unregisteredUserState["phone"]) => void;
    updateGender: (name: unregisteredUserState["gender"]) => void;
    updateRole: (name: unregisteredUserState["role"]) => void;
};

export const useUnresgisterStore = create<
    unregisteredUserState & unregisteredUserAction
>((set) => ({
    name: "",
    email: "",
    password: "",
    avatar: "",
    dob: new Date(),
    phone: "",
    gender: false,
    role: "",
    updateName: (name) => set(() => ({ name: name })),
    updateEmail: (email) => set(() => ({ email: email })),
    updatePassword: (password) => set(() => ({ password: password })),
    updateAvatar: (avatar) => set(() => ({ avatar: avatar })),
    updateDob: (dob) => set(() => ({ dob: dob })),
    updatePhone: (phone) => set(() => ({ phone: phone })),
    updateGender: (gender) => set(() => ({ gender: gender })),
    updateRole: (role) => set(() => ({ role: role })),
}));
type TokenState = {
    accessToken: string | null;
    refreshToken: string | null;
};
type TokenAction = {
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    renewAccessToken: () => Promise<void>;
};
export const useTokenStorage = create<TokenState & TokenAction>()(
    persist(
        (set, get) => ({
            accessToken: null,
            refreshToken: null,

            login: (accessToken: string, refreshToken: string) => {
                set({ accessToken, refreshToken });
            },
            logout: () => {
                set({ accessToken: null, refreshToken: null });
            },
            renewAccessToken: async () => {
                const refreshToken = get().refreshToken;
                if (!refreshToken) return;
                try {
                    const response = await fetch("/token", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ refreshToken }),
                    });

                    const data = await response.json();
                    set({ accessToken: data.accessToken });
                } catch (error) {
                    console.log("Gia hạn token thất bại", error);
                    get().logout();
                }
            },
        }),
        {
            name: "auth-storage", // Tên cho trạng thái lưu trữ trong localStorage
            storage: createJSONStorage(() => localStorage), // Sử dụng localStorage
        }
    )
);
