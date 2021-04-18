const AWS = require('aws-sdk');
const { Module } = require('webpack');
const { v1: uuidv1 } = require('uuid');
const documentClient = new AWS.DynamoDB.DocumentClient();

const Dynamo = {
    async get (ID, TableName) {
        const params = {
            TableName,
            Key:{
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
    async write (data, TableName) {
        if (!data.firstname || !data.lastname) {
            throw Error('No student information on data')
        }

        data.ID = uuidv1();

        const params = {
            TableName,
            Item: data
        };

        const res = await documentClient.put(params).promise();

        if(!res) {
            throw Error (`There was an error inserting ID of ${data.ID} in table ${TableName}`);
        }
        
        return data;
    }
};

module.exports = Dynamo;