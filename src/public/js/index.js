console.log('probando cliente');
const socketClient=io()
const table = document.getElementById("table");
const form= document.getElementById('formMessage')
const fromUser= document.getElementById('fromUser')
const contentMessage=document.getElementById('contentMessage')
const  toUser= document.getElementById('toUser');

form.onsubmit= (e)=>{
    e.preventDefault()
    const message = {
        fromUser: fromUser.value,
        contentMessage: contentMessage.value,
        toUser: toUser.value,
    };
    socketClient.emit('bodyMessage', message)
}

socketClient.on("messageCreated", (message)=>{
    const {
        fromUser,
        contentMessage,
        toUser
    } = message;
    const row = `
    <tr>
    <td>${fromUser}</td>
            <td>${toUser}</td>
            <td>${contentMessage}</td>
        </tr>`;
    table.innerHTML += row;
 
})
