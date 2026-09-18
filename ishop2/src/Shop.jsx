import { useState } from 'react'
import Product from './Product'
import initialProducts from './products.json'

function Shop() {
  var [products, setProducts] = useState(initialProducts)
  var [selectedId, setSelectedId] = useState(null)

  function handleSelect(id) {
    setSelectedId(id)
  }

  function handleDelete(id) {
    var confirmed = confirm("Удалить товар?")
    if (confirmed) {
      var newProducts = []
      for (var i = 0; i < products.length; i++) {
        if (products[i].id !== id) {
          newProducts.push(products[i])
        }
      }
      setProducts(newProducts)
    }
  }

  var rows = []
  for (var i = 0; i < products.length; i++) {
    var item = products[i]
    rows.push(
      <Product
        key={item.id}
        id={item.id}
        name={item.name}
        price={item.price}
        url={item.url}
        quantity={item.quantity}
        isSelected={item.id === selectedId}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    )
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price</th>
          <th>URL</th>
          <th>Quantity</th>
          <th>Control</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default Shop