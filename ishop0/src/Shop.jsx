function Shop(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Адрес: {props.address}</p>
    </div>
  );
}

export default Shop;