import { useState } from 'react'

const App = () => {
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function getIndexOfMax(arr) {
    if (arr.length === 0) {
        return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] > max) {
            maxIndex = i;
            max = arr[i];
        }
    }

    return maxIndex;
}

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState([0,0,0,0,0,0,0])
  const [indexOfMax, setIndexOfMax] = useState(0)
 
  const handleSetPoints = (index) => {
    const copy = [...points]
    copy[index] += 1
    setPoints(copy)
    setIndexOfMax(getIndexOfMax(points))
  }

  return (
    <div>
      <h2>Anecdotes of the day</h2>
        <p>{anecdotes[selected]} has {points[selected]}</p>
        <button onClick={() => handleSetPoints(selected)}>vote</button>
        <button onClick={() => setSelected(getRandomInt(7))}>next anecdote</button>
      
      <h2>Anecdotes with most votes</h2>  
        <p>{anecdotes[indexOfMax]} has {points[indexOfMax]} votes</p>
    </div>
  )
}

export default App