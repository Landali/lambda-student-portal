const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.firstname) {
        // failed without an ID
        return Responses._400({ message: 'missing the student firstname from path.' })
    }
    /*  if(!event.pathParameters || !event.pathParameters.firstname ) {
          // failed without an firstname
      } */

    let firstname = event.pathParameters.firstname;
    const student = JSON.parse(event.body);
    student.firstname = firstname

    const newStudent = await Dynamo.write(student, tableName).catch(err =>{
        console.log('Error while creating new student', err);
        return null
    })

    if (!newStudent){
        return Responses._400({ message: 'Failed to create the student by Firstname'})
    }

    return Responses._200({ newStudent })
}
