

export function getUserList() {
  return fetch('http://localhost:3100/ws/users').then(res => console.log(res))
}

export function getMessageList() {
  return fetch('http://localhost:3100/ws/users').then(res => console.log(res))
}