import { useState, useMemo } from 'react'
import Controls from './Controls'
import List from './List'

function Filter(props) {
  var [text, setText] = useState('')
  var [sorted, setSorted] = useState(false)

  function handleTextChange(e) {
    setText(e.target.value)
  }
  function handleSortChange(e) {
    setSorted(e.target.checked)
  }
  function handleReset() {
    setText('')
    setSorted(false)
  }

  var filteredWords = useMemo(function() {
    var result = []
    for (var i = 0; i < props.words.length; i++) {
      if (props.words[i].includes(text)) {
        result.push(props.words[i])
      }
    }
    if (sorted) {
      result = result.slice()
      result.sort()
    }
    return result
  }, [props.words, text, sorted])

  return (
    <div>
      <Controls text={text} sorted={sorted} onTextChange={handleTextChange} onSortChange={handleSortChange} onReset={handleReset} />
      <List words={filteredWords} />
    </div>
  )
}

export default Filter