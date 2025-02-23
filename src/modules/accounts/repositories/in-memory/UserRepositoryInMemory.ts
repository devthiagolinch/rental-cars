import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUserRepository } from "../IUserRepository";


class UserRepositoryInMemory implements IUserRepository {
    users: User[] = [];

    async create({name, email, password, driver_license}: ICreateUserDTO): Promise<void> {
        const user = new User();

        Object.assign(user, {
            name,
            email,
            password,
            driver_license
        })

        this.users.push(user)
    }

    async findByEmail(email: string): Promise<User> {
        return this.users.find((user) => user.email === email)
    }

    async findById(id: string): Promise<User> {
        return this.users.find((user) => user.id === id)
    }
    
    async listUsers(): Promise<User[]> {
        return this.users
    }

} export { UserRepositoryInMemory }