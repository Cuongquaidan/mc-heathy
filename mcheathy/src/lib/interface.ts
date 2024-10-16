import { Types } from "mongoose";

export interface Doctor {
    _id: Types.ObjectId;
    dob: string;
    address: string;
    avatar: string;
    email: string;
    fees: number;
    name: string;
    password: string;
    phone: string;
    speciality: string;
}

export interface Speciality {
    _id: string;
    name: string;
    slug: string;
}
export interface User {
    _id: string;
    name: string;
    email: string;
    avatar: string;
    dob: Date;
    phone: string;
    gender: boolean;
    role: string;
}

export interface Appointment {
    userId: Types.ObjectId;
    dateTime: Date;
    doctorId: Types.ObjectId;
    doctorName: string;
    userName: string;
    doctorPhone: string;
    userPhone: string;
    doctorAvatar: string;
    userAvatar: string; // Thêm trường userAvatar
    fees: string;
    _id: string;
}
