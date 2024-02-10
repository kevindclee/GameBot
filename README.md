# GameBot
A full stack web-based chatbot application that can make simultaneous game recommendations after each user Q&A queries. 
Adopted IBM Watson Assistant platform. Game data is provided from [Giant Bomb database](https://www.giantbomb.com/games/).
This project was Ohio State University Capstone Project for CSE 5914 (Knowledge-Based Systems) class.


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
