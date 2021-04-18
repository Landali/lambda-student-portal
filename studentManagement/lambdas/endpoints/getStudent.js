const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = process.env.tableName

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        // failed without an ID
        return Responses._400({ message: 'missing the ID from path.' })
    }
    /*  if(!event.pathParameters || !event.pathParameters.firstname ) {
          // failed without an firstname
      } */

    let ID = event.pathParameters.ID;

    const user = await Dynamo.get(ID, tableName).catch(err => {
        console.log('Error while retrieving user: ', err)
        return null
    })
    if (!user){
        return Responses._400({ message: 'Failed to get user by ID'})
    }

    return Responses._200({ user })
}
