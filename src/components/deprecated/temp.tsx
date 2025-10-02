    
import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
import type { Schema } from "../../../amplify/data/resource";
type Todo = Schema["Todo"]["type"];

const client = generateClient<Schema>();

  function deleteTodo( id:string ){
    client.models.Todo.delete({id})
  }

  function createNote() {
    const title = window.prompt("Todo title");
    const content = window.prompt("Todo content");
    if (title !== null && content !== null) {
      client.models.Todo.create({ title, content });
    }
  }