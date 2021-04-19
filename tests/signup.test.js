const axios = require('axios');

const signup = async (username, password) => {
    return axios
        .post(`https://dvtbccva71.execute-api.us-east-1.amazonaws.com/dev/create-user/${username}`, {
            username,
            password
        }).then((user) => {
            return Promise.resolve(user.status)
        })
        .catch((error) => {
            return Promise.resolve(error.response.status)
        })
}

describe('Testing Sing Up Lambda', () => {
    test('Create New Student', async () => {
        // Send New user name and password to try this one
        const student = await signup('DannnnnXD', '123')
        expect(student).toBe(200)
    })
    test('Send user of undefined', async () => {
        const student = await signup(undefined, '123')
        expect(student).toBe(400)
    })
    test('Send password of undefined', async () => {
        const student = await signup('AllanXD', undefined)
        expect(student).toBe(400)
    })
    test('Send password and user of undefined', async () => {
        const student = await signup('AllanXD', undefined)
        expect(student).toBe(400)
    })
})