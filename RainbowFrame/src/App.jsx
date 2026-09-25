import RainbowFrame from './RainbowFrame'

var colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple']

function App() {
  return (
    <RainbowFrame colors={colors}>
      Hello!
    </RainbowFrame>
  )
}

export default App