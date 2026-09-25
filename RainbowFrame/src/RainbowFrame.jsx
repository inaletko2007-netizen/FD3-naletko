function RainbowFrame(props) {
  if (props.colors.length === 0) {
    return props.children
  }

  var firstColor = props.colors[0]
  var restColors = props.colors.slice(1)

  var style = {
    border: "5px solid " + firstColor,
    padding: "10px"
  }

  return (
    <div style={style}>
      <RainbowFrame colors={restColors}>
        {props.children}
      </RainbowFrame>
    </div>
  )
}

export default RainbowFrame