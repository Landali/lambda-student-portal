const axios = require('axios');

const createStudent = async (firstname, lastname) => {
    return axios
        .post(`https://dvtbccva71.execute-api.us-east-1.amazonaws.com/dev/create-student/${firstname}`, {
            firstname,
            lastname
        }).then((student) => {
            return Promise.resolve(student.status)
        })
        .catch((error) => {
            return Promise.resolve(error.response.status)
        })
}

describe('Testing Create Student Lambda', () => {
    test('Create New Student', async () => {
        const student = await createStudent('Daniel', 'Diaz')
        expect(student).toBe(200)
    })
    test('Send firstname undefined', async () => {
        const student = await createStudent(undefined, 'Diaz')
        expect(student).toBe(400)
    })
    test('Send lastname undefined', async () => {
        const student = await createStudent('Luis', undefined)
        expect(student).toBe(400)
    })
    test('Send lastname and firstname as undefined', async () => {
        const student = await createStudent(undefined, undefined)
        expect(student).toBe(400)
    })
})