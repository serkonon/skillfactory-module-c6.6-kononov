const wsUri = "wss://echo.websocket.org/";

const btnSend = document.querySelector('.j-btn-send');
const btnGeo = document.querySelector('.j-btn-geo');
const input = document.querySelector('.j-input-text');
const output = document.getElementById("output");

let websocket;

function writeToScreen(message, out_mess = true) {
	let messCont = document.createElement("div");
	if (out_mess)
		messCont.classList.add("mess-cln");
	else
		messCont.classList.add("mess-srv");

  let mess = document.createElement("p");
  mess.style.wordWrap = "break-word";
  mess.innerHTML = message;

  messCont.appendChild(mess);
  output.appendChild(messCont);
}

function openWebSocket() {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    // writeToScreen("CONNECTED");
  };
  websocket.onclose = function(evt) {
    // writeToScreen("DISCONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreen(evt.data, false);
    output.scrollTop = output.scrollHeight;
  };
  websocket.onerror = function(evt) {
    // writeToScreen("ERROR: " + evt.data);
  };
}

// btnClose.addEventListener('click', () => {
//   websocket.close();
//   websocket = null;
// });

function sendMessage() {
	if (input.value) {
		writeToScreen(input.value);
		websocket.send(input.value);
		output.scrollTop = output.scrollHeight;
	}
}

const successGeo = (position) => {
  console.log('position', position);
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;

  const href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  const mess = `<a href=${href} target=_blank>Геолокация</a>`

	writeToScreen(mess);
	output.scrollTop = output.scrollHeight;
}

btnSend.addEventListener('click', sendMessage);

btnGeo.addEventListener('click', () => {
  if (!navigator.geolocation) {
    alert("Geolocation не поддерживается вашим браузером");
  } else {
    // status.textContent = 'Определение местоположения…';
    navigator.geolocation.getCurrentPosition(successGeo, () => alert("Невозможно получить ваше местоположение"));
  }	
});

input.addEventListener('keydown', function(e) {
	if (e.keyCode === 13) {
		sendMessage();
    // console.log(this.value);
  }
});


openWebSocket();
