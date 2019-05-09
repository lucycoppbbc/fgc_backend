import uuid from "uuid";
import * as dynamoDbLib from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);

  const params = {
    TableName: "notes",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      createdAt: Date.now(),
      ...data.content
    }
  };

  try {
      await dynamoDbLib.call("put", params)
      return success(params.Item)
  } catch (e) {
      console.log(e)
      return failure ({ status: false })
  }
}
