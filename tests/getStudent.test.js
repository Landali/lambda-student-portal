const axios = require('axios');

const getStudent = async (id) => {
    return axios.get(`https://dvtbccva71.execute-api.us-east-1.amazonaws.com/dev/get-student/${id}`)
        .then((student) => {
            return Promise.resolve(student.data.student.ID || {})
        })
        .catch((error) => {
            const errorRes = {}
            return Promise.resolve(errorRes)
        })
}

describe('Testing Get Student by Id Lambda', () => {
    test('Retrieve Valid user from Lambda', async () => {
        const id = 'ac3219c0-a0c8-11eb-b048-4d87427341b4'
        const student = await getStudent(id)
        expect(student).toBe(id)
    })
    test('User not found by ID', async () => {
        const id = 'ac3219c0-a0c8-11eb-b048-4d87427341b3'
        const student = await getStudent(id)
        expect(student).toEqual({})
    })
    test('Send Invalid ID', async () => {
        const id = 123
        const student = await getStudent(id)
        expect(student).toEqual({})
    })
    test('Send Invalid ID', async () => {
        const id = 123
        const student = await getStudent(id)
        expect(student).toEqual({})
    })
    test('Send ID undefined', async () => {
        const student = await getStudent()
        expect(student).toEqual({})
    })
})