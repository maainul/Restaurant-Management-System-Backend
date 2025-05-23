import IUser from "../interfaces/user/IUser";
import IUserRepository from "../interfaces/user/IUserRepository";
import User from "./../models/user/User.model";

class UserRepository implements IUserRepository {

  async create(user: IUser): Promise<IUser> {
    console.log("UserRepository:create called");
    return await User.create(user);
  }

  async findById(id: string): Promise<IUser | null> {
    console.log("UserRepository:findById called");
    return await User.findById(id);
  }

  async findByEmail(email: string): Promise<IUser | null> {
    console.log("UserRepository:findByEmail called");
    return await User.findOne({ email: email });
  }

  async findByMobileNumber(mobileNumber: string): Promise<IUser | null> {
    console.log("UserRepository:findByMobileNumber called");
    return await User.findOne({ mobileNumber: mobileNumber });
  }

  async findByUserName(username: string): Promise<IUser | null> {
    console.log("UserRepository:findByEmail called");
    return await User.findOne({ username: username });
  }

  async findAll(filter: any = {}, options: { sort?: any, skip: number, limit?: number }): Promise<IUser[]> {
    console.log("UserRepository:findAll called");
    const { sort = { createdAt: -1 }, skip = 0, limit = 10 } = options
    return await User.find(filter).sort(sort).skip(skip).limit(limit);
  }

  async update(id: string, user: Partial<IUser>): Promise<IUser | null> {
    console.log("UserRepository:update called");
    const result = await User.findByIdAndUpdate(id, user, { new: true });
    return result;
  }

  async delete(id: string): Promise<boolean> {
    console.log("UserRepository:delete called");
    const result = await User.findByIdAndDelete(id);
    return !!result;
  }
  async countDocuments(filter: any = {}): Promise<number> {
    return await User.countDocuments(filter);
  }
}

export default UserRepository;
