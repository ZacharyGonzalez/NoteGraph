import type { APIGatewayProxyHandler } from "aws-lambda";

export const handler: APIGatewayProxyHandler = async (event) => {
  console.log("event", event);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*", //should replace with my domain name
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST,GET", 
    },
    body: JSON.stringify("Hello from handler.ts myFunction!"),
  };
};