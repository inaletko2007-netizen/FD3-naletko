import Shop from './Shop'

function App() {
  var shopName = "Продукты"
  var shopAddress = "Малиновка 4"

  return (
    <div>
      <Shop name={shopName} address={shopAddress} />
    </div>
  )
}

export default App