// import '@types/jest'
import logger from '../../../../../common/logger';
import { httpHandler } from '../../../../../communication/in/http/http-handler';
import { httpPathEnums } from '../../../../../infrastructure/express/app';
import { signupHandler } from '../../../../../packages/sign-up';

jest.mock('../../../../../packages/sign-up');

const signUpSuccessResponse = {
    id: '001',
    jwt: 'token'
};

describe('httpHandler()', () => {
    let error;
    let response: any;
    beforeAll(() => {
    });
    beforeEach(() => {
        error = undefined;
        response = undefined;
        jest.clearAllMocks();
        jest.resetAllMocks();
    });
    test('should call the appropriate handler', async () => {
        (signupHandler as jest.Mock).mockImplementationOnce(() => Promise.resolve(signUpSuccessResponse));
        try {
            response = await httpHandler({
                path: httpPathEnums.SIGN_UP,
                method: 'post',
                standardRequestObject: {
                    body: {
                        email: 'user1@lysto.io',
                        password: 'pwd'
                    }
                }
            })
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(response).toStrictEqual(
            { httpCode: 201, body: { id: '001' }, session: { jwt: 'token' } }
        );
        expect(signupHandler).toBeCalledTimes(1);
        expect(signupHandler).toBeCalledWith(
            'user1@lysto.io',
            'pwd'
        )
    });
    test('should return 400 unhandled path error for undefined path and method combination', async () => {
        (signupHandler as jest.Mock).mockImplementationOnce(() => Promise.resolve(signUpSuccessResponse));
        try {
            response = await httpHandler({
                path: httpPathEnums.SIGN_UP,
                method: 'get', // get is undefined for sign up route
                standardRequestObject: {
                    body: {
                        email: 'user1@lysto.io',
                        password: 'pwd'
                    }
                }
            })
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(response).toStrictEqual({
            httpCode: 400,
            body: {
              error: 'UnhandledPathError',
              description: 'This api path and method combination is not supported',
              code: 'FB4001'
            }
          });
        expect(signupHandler).toBeCalledTimes(0);
    });
    
    test('should return 500 generic internal error for undefined path and method combination', async () => {
        (signupHandler as jest.Mock).mockImplementationOnce(() => Promise.reject(new Error('stack overflow')));
        try {
            response = await httpHandler({
                path: httpPathEnums.SIGN_UP,
                method: 'post',
                standardRequestObject: {
                    body: {
                        email: 'user1@lysto.io',
                        password: 'pwd'
                    }
                }
            })
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(response).toStrictEqual({
            httpCode: 500,
            body: {
              error: 'GenericInternalError',
              description: 'stack overflow',
              code: 'FB5000'
            }
          });
        expect(signupHandler).toBeCalledTimes(1);
    });
})

