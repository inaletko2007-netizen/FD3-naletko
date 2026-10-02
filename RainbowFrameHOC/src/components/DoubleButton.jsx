function DoubleButton(props) {
  function handleFirstClick() {
    props.cbPressed(1)
  }
  function handleSecondClick() {
    props.cbPressed(2)
  }

  return (
    <span>
      <input type="button" value={props.caption1} onClick={handleFirstClick} />
      {props.children}
      <input type="button" value={props.caption2} onClick={handleSecondClick} />
    </span>
  )
}

export default DoubleButton