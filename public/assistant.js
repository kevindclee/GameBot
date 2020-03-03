const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');

let api_key = 'mQm5M8FKoDrr6kHa2egihXw9Y7p1XvyoEEjPdRKoyd1f'; //Bowen's
let url = 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/8332649b-5341-4b1d-acd7-d09c5dca8c97'; //Bowen's
let assistant_id = '62dfbaa1-b17c-4bfa-8693-5c3be0e12d19'; //Bowen's

/*
let api_key = 'PMDpVBUyLC7XpKV-N9hUSmvaY6cWUkEKlXtd3apcOCxh';
let url = 'https://api.us-south.assistant.watson.cloud.ibm.com/instances/b730816f-f905-4b51-94bc-e0b83114e73d';
let assistant_id = 'ffa3c0ac-2506-402f-a3c5-a3ee89c9eb10';
*/

let session_id = "";
let bot_msg = "";
let next_question = "";

const assistant = new AssistantV2({
    version: '2019-02-28',
    authenticator: new IamAuthenticator({
        apikey: api_key,
    }),
    url: url,
});

async function createWatsonAssistantSession(){
    try{
        const session = await assistant.createSession({
            assistantId: assistant_id
        });
        console.log(JSON.stringify(session.result, null, 2)); // for checking JSON response from Watson
        session_id = session.result.session_id.toString();
        //console.log("Session created!, session id: " + session_id);
            
        let input_message = "hello";
        console.log("Input message: " + input_message);
    
        const messege = await sendWatsonAssistantMessage(input_message);
        bot_msg = messege;  
        console.log("Initial message: " + bot_msg);
        
    }
    catch (e) {
        console.log('error', e);
        return null;
    }
}

async function sendWatsonAssistantMessage(input_message){
    try{
        const message = await assistant.message({
            assistantId: assistant_id,
            sessionId: session_id,
            input: {
                'message_type': 'text',
                'text': input_message
            }
        });
        console.log(JSON.stringify(message.result, null, 2)); // for checking JSON response from Watson
        let generic = message.result.output.generic // array of responses
        var i;
        let response = '';
        for(i = 0; i<generic.length; i++){
            response = response.concat(generic[i].text.toString() + '\n');
        } 
        next_question = response;
        console.log("Watson Assistant response: " + next_question);
        return response;
    }
    catch (e) {
        console.log('error', e);
        return null;
    }
}

async function deleteWatsonAssistnatSession(){
    try{
        await assistant.deleteSession({
            assistantId: assistant_id,
            sessionId: session_id,
        })
        console.log("Session deleted!");
        window.location.href = 'web.html';
    }
    catch (e) {
      console.log('error', e);
      return null;
    }
}

async function addGreeting(){
    try{
        await createWatsonAssistantSession();
        greeting = bot_msg;
        console.log("GREETING: " + greeting);
        var p = document.createElement('p');
        var msg = document.createTextNode(greeting);
        p.appendChild(msg);
        var scroll = document.getElementsByClassName('container');
        scroll[0].appendChild(p);
    }
    catch (e) {
        console.log('error', e);
        return null;
    }
}

async function addChat(){
    try{
        var client_div = document.createElement('div');
        client_div.setAttribute('class','container darker');
        var client_img = document.createElement('img');
        // set attribute to client image
        client_img.setAttribute('src','human.png');
        client_img.setAttribute('alt','Avatar');
        client_img.setAttribute('class','right');
        client_div.appendChild(client_img);
        
        // set up the client_msg
        var p = document.createElement('p');
        var b = document.createElement('b');
        var input = document.getElementById('input-box').value
        var client_msg = document.createTextNode(input);
        b.appendChild(client_msg);
        p.appendChild(b);
        client_div.appendChild(p);
        var sp = document.createElement('span');
        var today = new Date();
        var timeToday = today.getHours() + ":" + today.getMinutes();
        var time = document.createTextNode(timeToday);
        sp.appendChild(time);
        sp.setAttribute('class','time-left');
        client_div.appendChild(sp);
        var current = document.getElementsByClassName('chat-scroll');
        current[0].appendChild(client_div);
        document.getElementById('input-box').value=''; // clear the input area
        
        // above deals with the chatbox for the user input
        var assistant_div = document.createElement('div');
        assistant_div.setAttribute('class','container');
        // attribute of robot image
        var assistant_img = document.createElement('img');
        assistant_img.setAttribute('src','robot.png');
        assistant_img.setAttribute('alt','Avatar');
        assistant_div.appendChild(assistant_img);

        var p = document.createElement('p');
        console.log("USER INPUT: " + input);
        next_question = await sendWatsonAssistantMessage(input);
        next_question = next_question;
        console.log("NEXT QUESTION: " + next_question); 

        var objDiv = document.getElementById("autoScroll");
        objDiv.scrollTop = objDiv.scrollHeight;

        var text = document.createTextNode(next_question);
        p.appendChild(text);
        assistant_div.appendChild(p);
        var sp = document.createElement('span');
        var today = new Date();
        var timeToday = today.getHours() + ":" + today.getMinutes();
        var time = document.createTextNode(timeToday);
        sp.appendChild(time);
        sp.setAttribute('class','time-right');
        assistant_div.appendChild(sp);
        
        var current = document.getElementsByClassName('chat-scroll');
        current[0].appendChild(assistant_div); 

        var objDiv = document.getElementById("autoScroll");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    catch (e) {
        console.log('error', e);
        return null;
    }
}

module.exports = {addChat: addChat, addGreeting: addGreeting, startSession: createWatsonAssistantSession, sendMessage: sendWatsonAssistantMessage, endSession: deleteWatsonAssistnatSession};
