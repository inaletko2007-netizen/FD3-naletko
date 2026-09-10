function Product(props) {
  return (
    <tr>
      <td><img src={props.image} alt={props.name} width="80" /></td>
      <td>{props.name}</td>
      <td>{props.price} руб.</td>
      <td>{props.stock}</td>
    </tr>
  );
}

export default Product;