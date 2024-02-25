const romanticLanguages = ['Italian', 'Spanish', 'French']

let ul = document.querySelector('ul')

for (let i = 0; i < romanticLanguages.length; i++) {
  let language = romanticLanguages[i]
  let li = document.createElement('li')
  li.textContent = language
  // FILL IN CODE
  
  ul.appendChild(li)
}