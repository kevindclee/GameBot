# :video_game:GameBot
A full stack web-based chatbot application that makes simultaneous game recommendations after each Q&A queries.  
Adopted `IBM Watson Assistant` platform. Game data is provided from [Giant Bomb database](https://www.giantbomb.com/games/).  
This project was Ohio State University Capstone Project for CSE 5914 (Knowledge-Based Systems) class.

## Overview
With this Game recommendation application, you can: 
- Get game recommendation based on user's preference such as gaming platform (PC, Playstation, Nintendo Switch, etc.), review ratings, etc.
- Use preferred language with the GameBot. It supports language translation (`Google Translate API`) where the client can choose to preferred language.

![chatbot1](/public/readme/chatbot1.png)
![chatbot2](/public/readme/chatbot2.png)

## Requirements and Installation
1. make changes to assistant.js (API key, etc.)
2. Use `Browserify` to make a distribution js file
```Shell
browserify public/assistant.js -s myBundle > public/bundle.js
```
3. Run the server to run http server  
    a. To run the server once,  
        ```
        node index.js
        ```  
    b. To keep running the server after changes  
        ```
        npm run dev
        ```  
