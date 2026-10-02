import { memo, useRef } from 'react'

function Client(props) {
  console.log('Client рендерится, id =', props.client.id)

  var lastNameRef = useRef(null)
  var firstNameRef = useRef(null)
  var patronymicRef = useRef(null)
  var balanceRef = useRef(null)

  function handleEditClick() {
    props.onEdit(props.client.id)
  }

  function handleDeleteClick() {
    props.onDelete(props.client.id)
  }

  function handleSaveClick() {
    var updatedClient = {
      id: props.client.id,
      lastName: lastNameRef.current.value,
      firstName: firstNameRef.current.value,
      patronymic: patronymicRef.current.value,
      balance: Number(balanceRef.current.value)
    }
    props.onSave(updatedClient)
  }

  function handleCancelClick() {
    props.onCancel()
  }

  var status = props.client.balance < 0 ? 'blocked' : 'active'
  var statusStyle = { backgroundColor: status === 'active' ? 'green' : 'red', color: 'white' }

  if (props.isEditing) {
    return (
      <tr>
        <td><input type="text" ref={lastNameRef} defaultValue={props.client.lastName} /></td>
        <td><input type="text" ref={firstNameRef} defaultValue={props.client.firstName} /></td>
        <td><input type="text" ref={patronymicRef} defaultValue={props.client.patronymic} /></td>
        <td><input type="text" ref={balanceRef} defaultValue={props.client.balance} /></td>
        <td style={statusStyle}>{status}</td>
        <td><button onClick={handleSaveClick}>Сохранить</button></td>
        <td><button onClick={handleCancelClick}>Отмена</button></td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.client.lastName}</td>
      <td>{props.client.firstName}</td>
      <td>{props.client.patronymic}</td>
      <td>{props.client.balance}</td>
      <td style={statusStyle}>{status}</td>
      <td><button onClick={handleEditClick}>Редактировать</button></td>
      <td><button onClick={handleDeleteClick}>Удалить</button></td>
    </tr>
  )
}

export default memo(Client)