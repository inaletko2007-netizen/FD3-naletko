function Controls(props) {
  return (
    <div>
      <input type="checkbox" checked={props.sorted} onChange={props.onSortChange} />
      <input type="text" value={props.text} onChange={props.onTextChange} />
      <button onClick={props.onReset}>сброс</button>
    </div>
  )
}

export default Controls