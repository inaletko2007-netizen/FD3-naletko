import { useState } from 'react'

function Filter(props) {
  var [text, setText] = useState('')
  var [sorted, setSorted] = useState(false)

  function handleTextChange(e) {
    setText(e.target.value)
  }

  function handleCheckboxChange(e) {
    setSorted(e.target.checked)
  }

  function handleReset() {
    setText('')
    setSorted(false)
  }

  var filteredWords = []
  for (var i = 0; i < props.words.length; i++) {
    if (props.words[i].includes(text)) {
      filteredWords.push(props.words[i])
    }
  }

  if (sorted) {
    var sortedWords = filteredWords.slice()
    sortedWords.sort()
    filteredWords = sortedWords
  }

  var wordDivs = []
  for (var j = 0; j < filteredWords.length; j++) {
    wordDivs.push(<div key={j}>{filteredWords[j]}</div>)
  }

  return (
    <div>
      <input type="checkbox" checked={sorted} onChange={handleCheckboxChange} />
      <input type="text" value={text} onChange={handleTextChange} />
      <button onClick={handleReset}>сброс</button>

      <div className="wordList">
        {wordDivs}
      </div>
    </div>
  )
}

export default Filter