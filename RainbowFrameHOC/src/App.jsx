import DoubleButton from './components/DoubleButton'
import RainbowFrame from './components/withRainbowFrame'

var colors = ['red', 'orange', 'yellow', 'green', '#00BFFF', 'blue', 'purple']
var FramedDoubleButton = RainbowFrame(colors)(DoubleButton)

function App() {
  function handlePress(num) {
    alert(num)
  }

  return (
    <div>
      <DoubleButton caption1="однажды" caption2="пору" cbPressed={handlePress}>в студёную зимнюю</DoubleButton>
      <br /><br />
      <FramedDoubleButton caption1="я из лесу" caption2="мороз" cbPressed={handlePress}>вышел, был сильный</FramedDoubleButton>
    </div>
  )
}

export default App