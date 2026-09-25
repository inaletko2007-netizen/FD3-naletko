function BR2JSX(props) {
  var text = props.text
  text = text.split('<br />').join('|||')
  text = text.split('<br/>').join('|||')
  text = text.split('<br>').join('|||')
  var parts = text.split('|||')

  var elements = []
  for (var i = 0; i < parts.length; i++) {
    elements.push(parts[i])
    if (i < parts.length - 1) {
      elements.push(<br key={i} />)
    }
  }

  return <div className="br2jsx">{elements}</div>
}

export default BR2JSX