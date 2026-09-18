import './App.css'
import Filter from './Filter'

var words = ['california', 'everything', 'aboveboard', 'washington', 'basketball', 'weathering', 'characters', 'literature', 'contraband', 'appreciate']

function App() {
  return (
    <div>
      <Filter words={words} />
    </div>
  )
}

export default App