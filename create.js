import uuid from "uuid";
import call from "./libs/dynamodb-lib";
import { success, failure } from "./libs/response-lib";


export async function main(event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body);
  delete data["attachment"]
  const params = {
    TableName: process.env.tableName,
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      productId: uuid.v1(),
      createdAt: Date.now(),
      ...data
    }
  };

  try {
      await call("put", params)
      return success(params.Item)
  } catch (e) {
      console.log(e)
      return failure ({ status: false })
  }
}
