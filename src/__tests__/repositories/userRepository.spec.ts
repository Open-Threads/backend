import "../../database/connect";

import UserRepository from "../../repositories/User/UserRepository";
import IUser from "../../interfaces/IUser";

describe("User Repository tests suite", (): void => {
  const userRepository: UserRepository = new UserRepository();

  const model: IUser = {
    username: "test",
    email: "test@email.com",
    password: "123",
  };

  it("Create a user", async (): Promise<void> => {
    const user: IUser = await userRepository.create(model);

    if (user) Object.assign(model, { uuid: user.uuid });

    expect(user.username).toStrictEqual(model.username);
  });

  it("Find a user", async (): Promise<void> => {
    const user: IUser = await userRepository.findOne(model.uuid!);

    expect(user.username).toStrictEqual(model.username);
  });

  it("Find many users", async (): Promise<void> => {
    const users: Array<IUser> = await userRepository.findMany();

    expect(users.length).toStrictEqual(1);
  });

  it("Update a user", async (): Promise<void> => {
    const user: IUser = await userRepository.update(model.uuid!, {
      username: "new name",
    });

    expect(user.username).toStrictEqual("new name");
  });

  it("Remove a user", async (): Promise<void> => {
    const removed: void = await userRepository.remove(model.uuid!);

    expect(removed).toStrictEqual(undefined);
  });
});
