const aws = require('aws-sdk');
const ddb = new aws.DynamoDB();

exports.handler = async (event, context) => {
  const date = new Date();
  if (event.request.userAttributes.sub) {
    const params = {
      Item: {
        id: {S: event.request.userAttributes.sub},
        __typename: {S: 'User'},
        username: {S: event.userName},
        email: {S: event.request.userAttributes?.email},
        phone_number: {S: event.request.userAttributes?.phone_number},
        gender: {S: event.request.userAttributes?.gender},
        fullName: {S: event.request.userAttributes?.name},
        active: {BOOL: true},
        createdAt: {S: date.toISOString()},
        updatedAt: {S: date.toISOString()},
      },
      TableName: process.env.USERTABLE,
    };

    try {
      await ddb.putItem(params).promise();
      console.debug('Success');
    } catch (err) {
      console.error('Error', err);
    }

    console.debug('Success: Everything executed correctly');
    context.done(null, event);
  } else {
    console.error('Error: Nothing was written to DynamoDB');
    context.done(null, event);
  }
};
