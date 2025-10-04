# NoteGraph
  Incomplete project
  
## Disclaimer
I focused on learning AWS, TypeScript, and React too much and didn't even implement anything for my actual project idea. 
This also used an amplify template to get the ball rolling for me to learn typecript and react. The commit history is only taken seriously after the 1st of October. 

## Project idea
The project idea was to have a user submit a note, extract the keywords and use them as keys to a dictionary with the value being the note.id. If a keyword reaches four uses or more, then access the value for that keyword stored in the dict,
then automatically create a new note based on the sentences found in those notes that used the keyword ( A simple way to remind the user why they mentioned that keyword before having them type their own material ).

By using force-graph-2d we could create visual nodes for the notes similar to obsidian graph's and have them auto connect by using the keywords as unique node ids (acquired from the dict).
Once the graph and notes are connected, the last idea was to actually customize the notes and provide a pseudo template for a user to ask more meaningful questions, rather than just regurigating textbooks, Ex:
  - " How does this {insert_note_topic} work? "
  - " Why did someone make it? "
  - " How does this affect you? "
  - " What could you do with this right now? "
    (If a user submits a note and has few keywords extracted, prompt and ask them if they could be more specific)
    
## Project Goal
I did not want to teach or educate anyone, I wanted to make a user think for themselves, providing reminders to also not just google everything. Visually a user would see how their ideas continue chaining together and hopefully they find confidence in what they know, or realizes they don't actually know enough.

# What Went Wrong
A severe lack of priority and experience was the main issue. I started strong and had a good foundation, ignoring my absent week, i came back and having each component of the project being foreign to me started compromising my ability to make decisions. The lack of progress had me doubting my ideas and implementations, but the pivot i made to an "easier idea" sealed my fate as I was now again in unknown waters.

### Features

- **Authentication**: Setup with Amazon Cognito for secure user authentication.
- **API**: Ready-to-use GraphQL endpoint with AWS AppSync.
- **Database**: Real-time database powered by Amazon DynamoDB.

### License

This library is licensed under the MIT-0 License. See the LICENSE file.
