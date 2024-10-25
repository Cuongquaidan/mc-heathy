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
    updateEmail: (email: unregisteredUserState["email"]) => void;
    updatePassword: (password: unregisteredUserState["password"]) => void;
    updateAvatar: (avatar: unregisteredUserState["avatar"]) => void;
    updateDob: (dob: unregisteredUserState["dob"]) => void;
    updatePhone: (phone: unregisteredUserState["phone"]) => void;
    updateGender: (gender: unregisteredUserState["gender"]) => void;
    updateRole: (role: unregisteredUserState["role"]) => void;
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

type currentUserState = {
    id: string;
    name: string;
    email: string;
    avatar: string;
    dob: Date;
    phone: string;
    gender: boolean;
    role: string;
};
type currentUserAction = {
    updateId: (name: currentUserState["id"]) => void;
    updateName: (name: currentUserState["name"]) => void;
    updateEmail: (email: currentUserState["email"]) => void;
    updateAvatar: (avatar: currentUserState["avatar"]) => void;
    updateDob: (dob: currentUserState["dob"]) => void;
    updatePhone: (phone: currentUserState["phone"]) => void;
    updateGender: (gender: currentUserState["gender"]) => void;
    updateRole: (role: currentUserState["role"]) => void;
};
export const useCurrentUserStore = create<currentUserAction & currentUserState>(
    (set) => ({
        id: "",
        name: "",
        email: "",
        avatar: "",
        dob: new Date(),
        phone: "",
        gender: false,
        role: "",
        updateId: (id) => set(() => ({ id: id })),
        updateName: (name) => set(() => ({ name: name })),
        updateEmail: (email) => set(() => ({ email: email })),
        updateAvatar: (avatar) => set(() => ({ avatar: avatar })),
        updateDob: (dob) => set(() => ({ dob: dob })),
        updatePhone: (phone) => set(() => ({ phone: phone })),
        updateGender: (gender) => set(() => ({ gender: gender })),
        updateRole: (role) => set(() => ({ role: role })),
    })
);

type TokenState = {
    accessToken: string | null;
    refreshToken: string | null;
};
type TokenAction = {
    login: (accessToken: string, refreshToken: string) => void;
    logout: () => void;
    renewAccessToken: () => Promise<boolean>;
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
                if (!refreshToken) return false;
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/auth/token`,
                        {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ refreshToken }),
                        }
                    );
                    if (!response.ok) {
                        throw new Error("Failed to renew token");
                    }

                    const data = await response.json();
                    set({ accessToken: data.accessToken });
                    return true;
                } catch (error) {
                    console.log("Gia hạn token thất bại", error);
                    get().logout();
                    return false;
                }
            },
        }),
        {
            name: "auth-storage", // Tên cho trạng thái lưu trữ trong localStorage
            storage: createJSONStorage(() => localStorage), // Sử dụng localStorage
        }
    )
);
