const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event);


    const studentList = await Dynamo.list(tableName).catch(err => {
        console.log('Error while retrieving all user: ', err)
        return null
    })
    if (!studentList){
        return Responses._400({ message: 'Failed to get student list'})
    }

    return Responses._200({ studentList })
}
