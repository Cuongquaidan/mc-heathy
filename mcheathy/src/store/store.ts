import { create } from "zustand";

type unregisteredUserState = {
    name: string;
    email: string;
    password: string;
    avatar: string;
    dob: Date;
    phone: string;
    gender: boolean;
};
type unregisteredUserAction = {
    updateName: (name: unregisteredUserState["name"]) => void;
    updateEmail: (name: unregisteredUserState["email"]) => void;
    updatePassword: (name: unregisteredUserState["password"]) => void;
    updateAvatar: (name: unregisteredUserState["avatar"]) => void;
    updateDob: (name: unregisteredUserState["dob"]) => void;
    updatePhone: (name: unregisteredUserState["phone"]) => void;
    updateGender: (name: unregisteredUserState["gender"]) => void;
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
    updateName: (name) => set(() => ({ name: name })),
    updateEmail: (email) => set(() => ({ email: email })),
    updatePassword: (password) => set(() => ({ password: password })),
    updateAvatar: (avatar) => set(() => ({ avatar: avatar })),
    updateDob: (dob) => set(() => ({ dob: dob })),
    updatePhone: (phone) => set(() => ({ phone: phone })),
    updateGender: (gender) => set(() => ({ gender: gender })),
}));
