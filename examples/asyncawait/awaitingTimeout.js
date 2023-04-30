const div = document.querySelector('div')

const colorTheDiv = async () => {
  await new Promise((resolve, reject) => { setTimeout(resolve, 5000) })
  div.style.backgroundColor = 'blue'
  div.style.border = '10px solid green'
}
colorTheDiv()
