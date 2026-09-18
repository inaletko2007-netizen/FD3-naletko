function Product(props) {
  var style = {}
  if (props.isSelected) {
    style = { backgroundColor: "orange" }
  }

  function handleRowClick() {
    props.onSelect(props.id)
  }

  function handleDeleteClick(e) {
    e.stopPropagation()
    props.onDelete(props.id)
  }

  return (
    <tr style={style} onClick={handleRowClick}>
      <td><img src={props.url} width="80" /></td>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td>{props.quantity}</td>
      <td><button onClick={handleDeleteClick}>Delete</button></td>
    </tr>
  )
}

export default Product