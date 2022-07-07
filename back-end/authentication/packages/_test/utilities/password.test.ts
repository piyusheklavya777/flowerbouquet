import { Password } from '../../utilities/password'
describe('The password hashing library should behave as expected', () => {
    let error: Error;
    beforeEach(() => {
        error = undefined;
    })
    test('toHash(): the password passed should be returned in hashedPassword.salt format', async () => {
        let response;
        try {
            response = await Password.toHash('agoodpassword');
        } catch (e) {
            error = e;
        }
        expect(error).toBeUndefined();
        expect(/[a-z]+.[a-z]+/.test(response)).toBe(true);
    });

    describe('compare(): ', () => {
        test('same passwords should match', async () => {
            const rawPassword = 'astrongpassword';
            let hashedPasswordToStoreInDB;
            let matchResult : boolean;
            try {
                hashedPasswordToStoreInDB = await Password.toHash(rawPassword); // create a password
                matchResult = await Password.compare(hashedPasswordToStoreInDB, rawPassword);
            } catch (e) {
                error = e;
            }
            expect(error).toBeUndefined();
            expect(matchResult).toBe(true);
            expect(hashedPasswordToStoreInDB);
        });
        test('different passwords should not match', async () => {
            const rawPassword = 'astrongpassword';
            let hashedPasswordToStoreInDB;
            let matchResult : boolean;
            try {
                hashedPasswordToStoreInDB = await Password.toHash(rawPassword); // create a password
                matchResult = await Password.compare(hashedPasswordToStoreInDB, 'differentPassword');
            } catch (e) {
                error = e;
            }
            expect(error).toBeUndefined();
            expect(matchResult).toBe(false);
            expect(hashedPasswordToStoreInDB);
        });
    });
});