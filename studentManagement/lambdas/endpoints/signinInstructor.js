const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = 'instructors'

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from path.' })
    }
    /*  if(!event.pathParameters || !event.pathParameters.firstname ) {
          // failed without an firstname
      } */
    const userdata = event.queryStringParameters

    const user = await Dynamo.signInstructor(userdata, tableName).catch(err => {
        console.log('Error while signin user: ', err)
        return null
    })
    if (!user) {
        return Responses._400({ message: 'Failed sign in user' })
    }

    return Responses._200({ user })
}