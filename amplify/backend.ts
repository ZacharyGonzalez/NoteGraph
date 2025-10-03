import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { myApiFunction  } from './backend/function/nlpKeywords/resource';
defineBackend({
  auth,
  data,
  myApiFunction,
});
