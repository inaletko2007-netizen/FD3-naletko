import Product from './Product'

function Shop(props) {
  var rows = []
  for (var i = 0; i < props.products.length; i++) {
    var item = props.products[i]
    rows.push(
      <Product
        key={i}
        name={item.name}
        price={item.price}
        image={item.image}
        stock={item.stock}
      />
    )
  }

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Фото</th>
          <th>Название</th>
          <th>Цена</th>
          <th>Остаток</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default Shop