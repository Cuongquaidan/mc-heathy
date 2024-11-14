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
export interface Topic {
    _id: string;
    thumb: string;
    title: string;
    content: string;
    createdAt: Date;
    updatedAt: Date;
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
    userId: string;
    dateTime: Date;
    doctorId: string;
    doctorName: string;
    userName: string;
    doctorPhone: string;
    userPhone: string;
    doctorAvatar: string;
    userAvatar: string;
    fees: string;
    _id: string;
}

export interface Chat {
    _id: string;
    members: Array<string>;
}

export interface Message {
    _id: string;
    chatId: string;
    senderId: string;
    text: string;
    createdAt: Date;
    updatedAt: Date;
}
