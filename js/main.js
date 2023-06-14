import '../css/style.css'

let searchBar = document.getElementById('input-legacy')
let btn = document.getElementById('clickBtn')
let alertMsg = document.getElementById('msg')
let titles = document.getElementById('titles')
let output = document.getElementById('output')

alertMsg.style.visibility = 'hidden'
titles.style.visibility = 'hidden'

searchBar.addEventListener('keyup', async (e) => {
  if (e.key === 'Enter') {
    const text = e.target.value
    if (text !== '') {
      const call = await axiosCall(text)
      if (call.alumno) {
        titles.innerHTML = ''
        alertMsg.style.visibility = 'visible'
        alertMsg.innerHTML = 'El alumno ' + call.alumno + ' se ha desempeñado:'
        for (let index = 1; index < 6; index++) {
          titles.appendChild(createControler(Object.keys(call)[index], Object.values(call)[index]))
        }
        titles.style.visibility = 'visible'
      } else {
        titles.innerHTML = ''
        titles.style.visibility = 'hidden'
        alertMsg.innerHTML = call
        alertMsg.style.visibility = 'visible'
      }
    }
  }
})

btn.addEventListener('click', async (e) => {
  const text = searchBar.value
  if (text !== '') {
    const call = await axiosCall(text)
    if (call.alumno) {
      alertMsg.style.visibility = 'visible'
        titles.innerHTML = ''
        alertMsg.innerHTML = 'El alumno ' + call.alumno + ' se ha desempeñado:'
        for (let index = 1; index < 6; index++) {
          titles.appendChild(createControler(Object.keys(call)[index], Object.values(call)[index]))
        }
        titles.style.visibility = 'visible'
      } else {
        titles.innerHTML = ''
        titles.style.visibility = 'hidden'
        alertMsg.innerHTML = call
        alertMsg.style.visibility = 'visible'
    }
  }
})

const axiosCall = async (text) => {
  try {
    const result = await axios.get(
      'http://localhost:5000/api/alumno/metricas/' + text
    )
    return result.data
  } catch (error) {
    return 'El numero ingresado no corresponde a un alumno!'
  }
}

const createControler = (name, number) => {
  let aside = document.createElement('DIV')
  aside.setAttribute('class', 'title')

  let a = document.createElement('a')
  switch (name) {
    case 'form':
      a.innerHTML = 'Formales'
      break;

    case 'soft':
      a.innerHTML = 'Software'
      break;

    case 'info':
      a.innerHTML = 'Informaticas'
      break;

    case 'gest':
      a.innerHTML = 'Gestion'
      break;

    case 'otro':
      a.innerHTML = 'Otros'
      break;

    default:
      break;
  }

  let knob = pureknob.createKnob(100, 100)

  // Set properties.
  knob.setProperty('angleStart', -0.75 * Math.PI)
  knob.setProperty('angleEnd', 0.75 * Math.PI)
  knob.setProperty('colorFG', '#e34a39')
  knob.setProperty('trackWidth', 0.4)
  knob.setProperty('valMin', 0)
  knob.setProperty('valMax', 100)

  // Set initial value.
  knob.setValue(number*100)

  const node = knob.node();

  aside.appendChild(a)
  aside.appendChild(node)

  return aside
}
