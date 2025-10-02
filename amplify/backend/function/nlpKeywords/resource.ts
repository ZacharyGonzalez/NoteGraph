import { defineFunction } from "@aws-amplify/backend";

export const myFirstFunction = defineFunction({
  name: "handler.py",
  entry: "./handler.ts"
});