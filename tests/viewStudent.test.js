const axios = require('axios');

const getStudentList = async (url) => {
    return axios.get(url)
        .then((students) => {
            return Promise.resolve(students.data.studentList || [])
        })
        .catch((error) => {
            const errorRes = undefined
            return Promise.resolve(errorRes)
        })
}

describe('Testing Get Student List Lambda', () => {
    test('Retrieve List of Students from Lambda', async () => {
        const url = 'https://dvtbccva71.execute-api.us-east-1.amazonaws.com/dev/list-student'
        const student = await getStudentList(url)
        expect(student).not.toBe(undefined)
    })
    test('Request url undefined', async () => {
        const student = await getStudentList()
        expect(student).toBe(undefined)
    })
})