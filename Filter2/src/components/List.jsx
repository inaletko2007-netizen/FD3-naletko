import { memo } from 'react'

function List(props) {
  console.log('List рендерится')

  var wordDivs = []
  for (var i = 0; i < props.words.length; i++) {
    wordDivs.push(<div key={i}>{props.words[i]}</div>)
  }

  return <div className="wordList">{wordDivs}</div>
}

export default memo(List)