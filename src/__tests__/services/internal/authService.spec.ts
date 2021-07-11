import "dotenv/config";
import "../../../database/connect";

import IUser from "../../../interfaces/IUser";
import UserRepository from "../../../repositories/User/UserRepository";
import AuthService from "../../../services/internal/AuthService";

describe("Auth Service tests suite", (): void => {
  const userRepository: UserRepository = new UserRepository();
  const authService: any = new (class extends AuthService {
    public async auth(email: string, password: string): Promise<string> {
      return super.login(email, password);
    }
  })();

  const user: IUser = {
    username: "test",
    email: "test@email.com",
    password: "123",
  };

  let token: string;

  beforeAll(async (): Promise<void> => {
    const createdUser: IUser = await userRepository.create(user);

    Object.assign(user, { uuid: createdUser.uuid });
  });

  afterAll(async (): Promise<void> => {
    await userRepository.remove(user.uuid!);
  });

  it("Login user", async (): Promise<void> => {
    const generatedToken: string = await authService.auth(
      user.email!,
      user.password!,
    );

    token = generatedToken;

    expect(generatedToken).toStrictEqual(token);
  });

  test("Get current user", (): void => {
    const currentUser: IUser = AuthService.getMe(token);

    expect(currentUser.username).toStrictEqual(user.username);
  });
});
