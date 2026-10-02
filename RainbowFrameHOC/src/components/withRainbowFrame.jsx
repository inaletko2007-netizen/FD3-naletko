function RainbowFrame(colors) {
  return function(Component) {
    function WrappedComponent(props) {
      var content = <Component {...props} />

      for (var i = colors.length - 1; i >= 0; i--) {
        var style = {
          border: "5px solid " + colors[i],
          padding: "10px"
        }
        content = <div style={style}>{content}</div>
      }

      return content
    }

    return WrappedComponent
  }
}

export default RainbowFrame