const Responses = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const tableName = 'instructors'

exports.handler = async event => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.username) {
        // failed without an ID
        return Responses._400({ message: 'missing the username from path.' })
    }

    let username = event.pathParameters.username;
    const user = JSON.parse(event.body);
    user.username = username

    const newUser = await Dynamo.writeUser(user, tableName).catch(err =>{
        console.log('Error while creating new user for instructor', err);
        return null
    })

    if (!newUser){
        return Responses._400({ message: 'Failed to create the user for instructor'})
    }

    return Responses._200({ newUser })
}
