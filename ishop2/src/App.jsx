import Shop from './Shop'
import products from './products.json'

function App() {
  return (
    <div>
      <Shop products={products} />
    </div>
  )
}

export default App