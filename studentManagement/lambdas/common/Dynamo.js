const AWS = require('aws-sdk');
const { Module } = require('webpack');
const { v1: uuidv1 } = require('uuid');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, TableName) {
        const params = {
            TableName,
            Key: {
                ID
            }
        };

        const data = await documentClient
            .get(params)
            .promise()

        if (!data || !data.Item) {
            throw Error(`There was an error fetching the data for ID ${ID} from ${TableName}`)
        }
        console.log(data)
        return data.Item;
    },
    async write(data, TableName) {
        if (!data.firstname || !data.lastname) {
            throw Error('No student information on data')
        }

        data.ID = uuidv1();

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }

        return data;
    },
    async list(TableName) {
        const params = {
            TableName
        };

        const data = await documentClient
            .scan(params)
            .promise()

        console.log('List of students retrieved: ', data)

        if (!data) {
            throw Error(`There was an error fetching the data from ${TableName}`)
        }
        return data.Items;
    },
    async writeUser(data, TableName) {
        if (!data.username || !data.password) {
            throw Error('No user information on data')
        }
        const username = data.username
        data.ID = uuidv1();
        const paramsCheck = {
            TableName,
            Key: {
                username
            }
        }
        const userExist = await documentClient
            .get(paramsCheck)
            .promise()
        if (userExist.username) {
            console.warn(`A user with username: ${data.username}`, userExist)
            return {}
        }

        const params = {
            TableName,
            Item: data
        };



        const res = await documentClient.put(params).promise();

        if (!res) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }
        return data;
    },
    async signInstructor(data, TableName) {
        if (!data.username || !data.password) {
            throw Error('No user information on data')
        }
        const username = data.username
        const password = data.password
        const params = {
            TableName,
            Key: {
                username,
            }
        }
        const res = await documentClient
            .get(params)
            .promise()
        console.log('User detected: ', res)

        if (!res.Item) {
            throw Error(`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }
        if (!res.Item.username) {
            console.warn(`A user with username: ${data.username} does not exist`, res)
            return {}
        }

        if (res.Item.password !== password) {
            console.warn(`Invalid Credentials`)
            return {}
        }
        return res;
    },
};

module.exports = Dynamo;