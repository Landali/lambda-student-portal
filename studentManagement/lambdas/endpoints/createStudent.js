const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.firstname || event.pathParameters.firstname === 'undefined') {
        // failed without an ID
        return Responses._400({ message: 'missing the student firstname from path.' })
    }



    let firstname = event.pathParameters.firstname;
    const student = JSON.parse(event.body);
    student.firstname = firstname
    if (!student.lastname || student.lastname === 'undefined') {
        // failed without an ID
        return Responses._400({ message: 'missing the student lastname.' })
    }
    const newStudent = await Dynamo.write(student, tableName).catch(err =>{
        console.log('Error while creating new student', err);
        return null
    })

    if (!newStudent){
        return Responses._400({ message: 'Failed to create the student by Firstname'})
    }

    return Responses._200({ newStudent })
}
