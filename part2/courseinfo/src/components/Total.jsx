const Total = (props) => {
  const total = props.course.parts.reduce(function (accumulator, currentValue) {
    return accumulator + currentValue.exercises
  }, 0)

  return (
    <p>Number of exercises {total}</p>
  )
}

export default Total 