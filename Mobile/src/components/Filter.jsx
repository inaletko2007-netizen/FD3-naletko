import { memo } from 'react'

function Filter(props) {
  console.log('Filter рендерится')

  function handleAllClick() {
    props.onFilterChange('all')
  }
  function handleActiveClick() {
    props.onFilterChange('active')
  }
  function handleBlockedClick() {
    props.onFilterChange('blocked')
  }

  return (
    <div>
      <button onClick={handleAllClick}>Все</button>
      <button onClick={handleActiveClick}>Активные</button>
      <button onClick={handleBlockedClick}>Заблокированные</button>
    </div>
  )
}

export default memo(Filter)