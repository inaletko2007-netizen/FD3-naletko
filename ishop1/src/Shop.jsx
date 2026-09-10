import Product from './Product';

function Shop(props) {
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
        {props.products.map((product, index) => (
          <Product
            key={index}
            name={product.name}
            price={product.price}
            image={product.image}
            stock={product.stock}
          />
        ))}
      </tbody>
    </table>
  );
}

export default Shop;