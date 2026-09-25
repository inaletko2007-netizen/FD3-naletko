function Product(props) {
  var style = {}
  if (props.isSelected) {
    style = { backgroundColor: "orange" }
  }

  function handleRowClick() {
    props.onRowClick(props.id)
  }

  function handleEditClick(e) {
    e.stopPropagation()
    props.onEditClick(props.id)
  }

  function handleDeleteClick(e) {
    e.stopPropagation()
    props.onDelete(props.id)
  }

  return (
    <tr style={style} onClick={handleRowClick}>
      <td>{props.name}</td>
      <td>{props.price}</td>
      <td><img src={props.url} width="80" /></td>
      <td>{props.quantity}</td>
      <td>
        <button onClick={handleEditClick} disabled={props.buttonsDisabled}>Редактировать</button>
        <button onClick={handleDeleteClick} disabled={props.buttonsDisabled}>Удалить</button>
      </td>
    </tr>
  )
}

export default Product