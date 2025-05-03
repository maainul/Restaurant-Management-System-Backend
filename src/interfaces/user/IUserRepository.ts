import IUser from "./IUser";

interface IUserRepository {
    create(user: Partial<IUser>): Promise<IUser>;
    findById(id: string): Promise<IUser | null>;
    findByEmail(email: string): Promise<IUser | null>;
    findByMobileNumber(email: string): Promise<IUser | null>;

    findByUserName(username: string): Promise<IUser | null>;
    findAll(filter: any, options: { sort?: any, skip: number, limit?: number }): Promise<IUser[]>;
    update(id: string, user: Partial<IUser>): Promise<IUser | null>;
    delete(id: string): Promise<boolean>;
    countDocuments(filter: any): Promise<number>;
}

export default IUserRepository
