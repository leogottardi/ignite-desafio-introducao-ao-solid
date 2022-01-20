import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User(name, email);

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    if (!user) {
      return undefined;
    }
    return user;
  }

  findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (!user) {
      return undefined;
    }
    return user;
  }

  turnAdmin(received_user: User): User {
    const user_index = this.users.findIndex(
      (user) => user.id === received_user.id
    );

    Object.assign(received_user, {
      admin: true,
    });

    this.users[user_index] = received_user;

    return received_user;
  }

  list(): User[] {
    // Complete aqui
  }
}

export { UsersRepository };
