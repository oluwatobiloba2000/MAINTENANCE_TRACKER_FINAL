const checkToken = ()=>{
    const token = window.localStorage.getItem('user-token')
    if(token){
      return token;
    }
    window.location.href = '../HTML/signin.html';
};

let path = `https://tracky-maintenance-app.herokuapp.com`;

async function getAllPendingRequest(){
    const response = await fetch(`${path}/api/v1/users/requests`, {
      method : "GET",
      headers:{
        "content-type" : "application/json",
        Authorization: `Bearer ${checkToken()}`
      }
    }).then(res => res.json())
      .then(response => response)
      .catch(e => e)
      let cardBody = document.querySelector("#card");
      let pendingRequest = response.request.filter((e)=>{
        return e.status == "pending"
      })
      if(response.length == 0){
          console.log("empty")
        document.querySelector('.grey-text').classList.add('grey-text-show');
      }else if(response["message"] === 'jwt expired'){
        errorInputModalGreen.classList.add("error-modal-open");
        setTimeout(()=>{
            window.location.href = '../HTML/signin.html'
        }, 3000)
      }else if(response.length !== 0){
        //   filter approved request
    pendingRequest.forEach(requests => {
       cardBody.innerHTML +=`<div class="requests"><p contenteditable style="margin :0 ; padding : 1%; background: rgba(5, 102, 141, 0.342);">${requests.title}</p>
      <p style="float : right; background-color: #A5BE00; padding: 0.4%;">${requests.time}</p>
      <br>
      <p>&nbsp;<i class="fas fa-tools"></i> ${requests.category}</p>
      <p style="padding : 3px;border : 1px solid green">${requests.description}</p>
      <p style="margin-right: 3px;
      text-align: right;">${requests.status}</p></div>`
    });
    document.getElementById('number-of-request').innerText = `${pendingRequest.length}`;
}}

getAllPendingRequest();