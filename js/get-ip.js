let input = document.getElementById('input');
let getIpUser = document.getElementById('getIpUser');
let result = document.getElementById('result');
let ipUserContainer = document.querySelector('.ipuser-container')

getIpUser.addEventListener('click', async () => {
  let userIP = input.value
  let response = await fetch(`https://ipinfo.io/${userIP}?token=1116d78bd51532`)
  let data = await response.json()
  result.innerHTML = template(data)

  animation()
})


function rulesInput () {
  input.value = input.value.replace(/[^0-9.]/g, "")
}

function template(data) {
  return `
    <div class="p-3 h-auto">
      <code>
        ip: ${data.ip},           <br>
        city: ${data.city},       <br>
        region: ${data.region},   <br>
        country: ${data.country}, <br>
        loc: ${data.loc},         <br>
        org: ${data.org},         <br>
        postal: ${data.postal},   <br>
        timezone: ${data.timezone}
      </code>
    </div>
  `
}

function animation () {
  result.style.height = '0'
  setTimeout(() => result.style.height = '220px', 600)
}

// Get ip user

let ipUser

fetch('https://api.ipify.org?format=json')
.then(response => response.json())
.then(data => {
  ipUser = data.ip
  showIpUser()
})

const showIpUser = () => {
  let content = document.querySelector('.ipuser-container span')
  content.innerHTML = contentIpUserContainer(ipUser)
  ipUserContainer.style.height = '40px'
} 

const contentIpUserContainer = (ipUser) => { 
  return `
  <span id="text-ip" class="me-1">Your ip:</span>${ipUser}
  `
}

// Button Copy

document.querySelector('.copy-ip').addEventListener('click', () => {
  const textToCopy = ipUser

  const input = document.createElement('input')
  input.setAttribute('value', textToCopy)
  document.body.appendChild(input)

  input.select();
  input.setSelectionRange(0, 99999)

  document.execCommand('copy')

  document.body.removeChild(input)
})
