import { UserAlreadyExistsError } from "../../common";
import { User } from "../../packages/db/models/user";
import { signupHandler } from "../../packages/sign-up";


jest.mock("../../packages/db/models/user");

describe('sign up flow', () => {
    let error;
    let response;
    beforeEach(() => {
        error = undefined;
        response = undefined;
        jest.clearAllMocks();
        jest.resetAllMocks();
    })
    test('should successfully register a user', async () => {
        User.findOne = jest.fn().mockImplementationOnce(() => Promise.resolve());
        User.build = jest.fn().mockImplementationOnce(() => Promise.resolve({
            save: () => Promise.resolve(),
            id: '001',
            email: 'user1@lysto.io',
            password: 'azd3g$w'
          })
        );
        process.env.JWT_KEY = 'asdf';
        try {
            response = await signupHandler(
                'user1@lysto.io',
                'azd3g$w'
            );
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(response).toMatchObject({
            id : '001',
            jwt: expect.any(String),
        });
    });
    test('should throw a User already exists error as the email id is already registered', async () => {
        User.findOne = jest.fn().mockImplementationOnce(() => Promise.resolve({
            id: '001',
            email: 'user1@lysto.io',
            password: 'azd3g$w'
          })
        );
        process.env.JWT_KEY = 'asdf';
        try {
            response = await signupHandler(
                'user1@lysto.io',
                'azd3g$w'
            );
        } catch (e) {
            error = e;
        }
        expect(error).toBeDefined();
        expect(error instanceof UserAlreadyExistsError).toBe(true);
    });
})