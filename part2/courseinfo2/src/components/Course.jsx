const Header = (props) => {
    return (
      <h1>{props.title}</h1>
    )
}
  
const Part = (props) => {
    return (
      <p>{props.part} {props.exercise}</p>
    )
}
  
const Content = ({parts}) => {
    return (
      <div>
        {
          parts.map(p => <Part key={p.name} part={p.name} exercise={p.exercises}/>)
        } 
      </div>
    )
}
  
const Total = ({parts}) => {
    const total = parts.reduce((s, p) => s + p.exercises, 0)
    return (
      <p><b>Number of exercises {total}</b></p>
    )
}

const Course = ({courses}) => {
    return (
      <div>
        {
          courses.map(course => 
          <div key={course.id}>
            <Header title={course.name}/>
            <Content parts={course.parts}/>
            <Total parts={course.parts}/>
          </div>
          )
        }
      </div>
    )
}

export default Course