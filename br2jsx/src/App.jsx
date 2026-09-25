import BR2JSX from './BR2JSX'

var text = "первый<br>второй<br/>третий<br />последний"

function App() {
  return <BR2JSX text={text} />
}

export default App