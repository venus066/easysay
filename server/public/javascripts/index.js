const sendMessageButton = document.querySelector('#send-message')
const chatContainer = document.querySelector('#chat-container')
const promptText = document.querySelector('#prompt')

let loadInterval

function loader(element) {
  element.textContent = ''

  loadInterval = setInterval(() => {
    // Update the text content of the loading indicator
    element.textContent += '.';

    // If the loading indicator has reached three dots, reset it
    if (element.textContent === '....') {
      element.textContent = '';
    }
  }, 300);
}

function typeText(element, text) {
  let index = 0

  let interval = setInterval(() => {
    if (index < text.length) {
      element.innerHTML += text.charAt(index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 20)
}

function generateUniqueId() {
  const timestamp = Date.now();
  const randomNumber = Math.random();
  const hexadecimalString = randomNumber.toString(16);

  return `id-${timestamp}-${hexadecimalString}`;
}

function chatStripe(isAi, value, uniqueId) {
    return (
        `
        <div class="message${isAi === true? '-ai':''}">
            <div class="d-inline-block bg-white rounded-lg py-1 px-2 shadow">
            <span id=${uniqueId}>${value}</span>              
              <small class="p-1 text-gray text-small "></small>
            </div>
          </div>
        `
    )
}

const addPoint = (str) => {
  if (/^[A-Za-z0-9]*$/.test(str.charAt(str.length - 1))) {
    return str + '.'
  }
  return str
}

const sendMessage = async (e) => {
  e.preventDefault()
  const data = (promptText.value).trim()
  // user's chatstripe
  chatContainer.innerHTML += chatStripe(false, data)
  // to clear the textarea input
  document.querySelector('#prompt').value = '';

  // bot's chatstripe
  const uniqueId = generateUniqueId()
  chatContainer.innerHTML += chatStripe(true, " ", uniqueId)

  // to focus scroll to the bottom
  chatContainer.scrollTop = chatContainer.scrollHeight;

  // specific message div 
  const messageDiv = document.getElementById(uniqueId)

  messageDiv.innerHTML = "..."
  loader(messageDiv)

  const response = await fetch('http://localhost:5000/api/completion', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      prompt: addPoint(data)
    })
  })

  clearInterval(loadInterval)
  messageDiv.innerHTML = " "

  if (response.ok) {
    const data = await response.json();
    const parsedData = data.bot.trim() // trims any trailing spaces/'\n' 

    typeText(messageDiv, parsedData)
  } else {
    const err = await response.text()

    messageDiv.innerHTML = "Something went wrong"
    alert(err)
  }

  return false;
}

sendMessageButton.addEventListener('click', sendMessage.bind(this))
promptText.addEventListener('keyup', (e) => {
  if (e.keyCode === 13) {
    sendMessage(e)
  }
})
