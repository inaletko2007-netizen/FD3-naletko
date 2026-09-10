import Shop from './Shop'

function App() {
  var products = [
    { name: "Ноутбук", price: 45000, image: "https://via.placeholder.com/80", stock: 5 },
    { name: "Мышь", price: 800, image: "https://via.placeholder.com/80", stock: 20 },
    { name: "Клавиатура", price: 1500, image: "https://via.placeholder.com/80", stock: 12 }
  ]

  return (
    <div>
      <Shop products={products} />
    </div>
  )
}

export default App