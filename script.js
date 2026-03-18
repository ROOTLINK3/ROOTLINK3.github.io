let logData=JSON.parse(localStorage.getItem("pdcaLogs")) || [];
let currentPhase="";

window.onload=function(){

const logBox=document.getElementById("logBox");

logData.forEach(function(data,index){

const item=document.createElement("div");

item.innerText=data.phase+" | "+data.agenda+" | "+data.date;

item.addEventListener("click",function(){
loadLog(index);
});

logBox.appendChild(item);

});

};

function createAgenda(){

const agenda=document.getElementById("agendaInput").value;
const context=document.getElementById("contextInput").value;
const canvas=document.getElementById("decisionCanvas");

canvas.innerHTML=
"<h3>"+agenda+"</h3>"+
"<p>"+context+"</p>";

}

function setPhase(p){

currentPhase=p;

}

function commitDecision(){

const logBox=document.getElementById("logBox");

const agenda=document.getElementById("agendaInput").value;

const canvas=document.getElementById("decisionCanvas").innerHTML;

const now=new Date();

const date=
now.getFullYear()+"-"+
("0"+(now.getMonth()+1)).slice(-2)+"-"+
("0"+now.getDate()).slice(-2)+" "+
("0"+now.getHours()).slice(-2)+":"+
("0"+now.getMinutes()).slice(-2);

const item=document.createElement("div");

item.innerText=currentPhase+" | "+agenda+" | "+date;

const index=logData.length;

item.addEventListener("click", function(){
loadLog(index);
});


logData.push({
id:Date.now(),
phase:currentPhase,
agenda:agenda,
canvas:canvas,
date:date
});


localStorage.setItem("pdcaLogs", JSON.stringify(logData));

logBox.appendChild(item);
document.getElementById("decisionCanvas").innerHTML="";
document.getElementById("agendaInput").value="";
document.getElementById("contextInput").value="";
}




function sendPreComment(){

const input=document.getElementById("preCommentInput");
const box=document.getElementById("preCommentBox");

if(input.value==="")return;

const msg=document.createElement("div");
msg.innerText=input.value;

box.appendChild(msg);

input.value="";

}


function clearPreCommentInput(){

document.getElementById("preCommentInput").value="";

}



function sendChat(){

const input=document.getElementById("chatInput");
const box=document.getElementById("chatBox");

if(input.value==="")return;

const msg=document.createElement("div");
msg.innerText=input.value;

box.appendChild(msg);

input.value="";

}


function clearChatInput(){

document.getElementById("chatInput").value="";

}



function summarizeChat(){

const chat =
document.getElementById("chatBox").innerText ||
document.getElementById("chatInput").value;

generateAISummary(chat);

}



function sendAI(){

const input=document.getElementById("aiInput");
const display=document.getElementById("aiDisplay");

if(input.value==="")return;

const msg=document.createElement("div");
msg.innerText=input.value;

display.appendChild(msg);

input.value="";

}


document.getElementById("aiInput").addEventListener("keydown",function(e){

if(e.key==="Enter"){
e.preventDefault();
sendAI();
}

});





function clearAIInput(){

document.getElementById("aiInput").value="";

}

function generateAISummary(chat){

const summary=chat.substring(0,200);

const keypoints="Key discussion points extracted from chat.";

const decision="Possible next action based on discussion.";

displaySummary(summary,keypoints,decision);

applyAISuggestion(summary,decision);

}



function loadLog(index){

const data=logData[index];

document.getElementById("agendaInput").value=data.agenda;

document.getElementById("decisionCanvas").innerHTML=data.canvas;

}

function applyAISuggestion(summary,decision){

const canvas=document.getElementById("decisionCanvas");

canvas.innerHTML += "<p>"+summary+"</p>";
canvas.innerHTML += "<p>"+decision+"</p>";

}




function displaySummary(summary,keypoints,decision){

const display=document.getElementById("aiDisplay");

display.innerHTML="";

const s=document.createElement("div");
s.innerText="Summary: "+summary;

const k=document.createElement("div");
k.innerText="Keypoints: "+keypoints;

const d=document.createElement("div");
d.innerText="Decision: "+decision;

display.appendChild(s);
display.appendChild(k);
display.appendChild(d);

}


