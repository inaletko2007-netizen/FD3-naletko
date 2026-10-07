import { memo, useRef } from 'react'

function MobileClient(props) {
  console.log('MobileClient рендерится, id =', props.client.id)

  var famRef = useRef(null)
  var imRef = useRef(null)
  var otchRef = useRef(null)
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
      fam: famRef.current.value,
      im: imRef.current.value,
      otch: otchRef.current.value,
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
        <td><input type="text" ref={famRef} defaultValue={props.client.fam} /></td>
        <td><input type="text" ref={imRef} defaultValue={props.client.im} /></td>
        <td><input type="text" ref={otchRef} defaultValue={props.client.otch} /></td>
        <td><input type="text" ref={balanceRef} defaultValue={props.client.balance} /></td>
        <td style={statusStyle}>{status}</td>
        <td><button onClick={handleSaveClick}>Сохранить</button></td>
        <td><button onClick={handleCancelClick}>Отмена</button></td>
      </tr>
    )
  }

  return (
    <tr>
      <td>{props.client.fam}</td>
      <td>{props.client.im}</td>
      <td>{props.client.otch}</td>
      <td>{props.client.balance}</td>
      <td style={statusStyle}>{status}</td>
      <td><button onClick={handleEditClick}>Редактировать</button></td>
      <td><button onClick={handleDeleteClick}>Удалить</button></td>
    </tr>
  )
}

export default memo(MobileClient)