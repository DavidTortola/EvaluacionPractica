const AWS = require('aws-sdk');
var crypto = require('crypto');
let dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {

    let params;
    let response;
    let data;

    switch (event.type) {
        case 'Login':

            var name = event.name;
            var password = event.password;
            var hash = crypto.createHash('md5').update(password).digest('hex');

            params = {
                TableName: 'EvaluacionPracticaDatabase',
                Key: {
                    'ID': name
                }
            };

            data = await dynamodb.get(params).promise();
            if (data.Item.hash == hash) {
                response = {
                    statusCode: 200,
                    body: true
                };
            } else {
                response = {
                    statusCode: 200,
                    body: false
                };
            }

            return response;
            break;

        case 'RegisterUser':

            var name = event.name;
            var password = event.password;
            var hash = crypto.createHash('md5').update(password).digest('hex');

            params = {
                TableName: 'EvaluacionPracticaDatabase',
                Item: {
                    'ID': name,
                    'hash': hash,
                    'type': 'usuario'
                }
            };

            await dynamodb.put(params).promise();
            response = {
                statusCode: 200,
                body: name
            };

            return response;
            break;

        case 'RegisterArea':

            var name = event.name;
            var state = event.state;

            params = {
                TableName: 'EvaluacionPracticaDatabase',
                Item: {
                    'ID': name,
                    'state': state,
                    'type': 'area'
                }
            };

            await dynamodb.put(params).promise();
            response = {
                statusCode: 200,
                body: name
            };

            return response;

            break;
        case 'GetAreas':

            params = {
                TableName: 'EvaluacionPracticaDatabase',
                IndexName: 'type-index',
                KeyConditionExpression: '#name = :value',
                ExpressionAttributeValues: { ':value': 'area' },
                ExpressionAttributeNames: { '#name': 'type' }
            };

            data = await dynamodb.query(params).promise();
            response = {
                statusCode: 200,
                body: data
            };

            return response;
            break;
        default:
            response = {
                statusCode: 200,
                body: "default"
            };
            return response;
    }

};