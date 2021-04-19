const axios = require('axios');

const signInUser = async (username, password) => {
    return axios.get(`https://dvtbccva71.execute-api.us-east-1.amazonaws.com/dev/signin-user/${username}`, {
        params: {
            username,
            password,
        }
    }).then((user) => {
        console.debug('User log in successfully', user)
        return Promise.resolve(user.status)
    })
        .catch((error) => {
            console.error(`An error occured while retrieving user:${username}`, error.response.status)
            return Promise.resolve(error.response.status)
        })
}

describe('Testing signin user Lambda', () => {
    test('Signin User', async () => {
        const student = await signInUser('AllanXD', '123')
        expect(student).toBe(200)
    })
    test('Signin Invalid User', async () => {
        const student = await signInUser('AllanxXD', '123')
        expect(student).toBe(400)
    })
    test('Signin User with invalid password', async () => {
        const student = await signInUser('AllanXD', '2123')
        expect(student).toBe(400)
    })
    test('No credentials sended', async () => {
        const student = await signInUser(undefined, undefined)
        expect(student).toBe(400)
    })
})