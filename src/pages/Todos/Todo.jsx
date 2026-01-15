export default function Todo({title, category, description, dueDate, estimatedMinutes, tags, isComplete}){
  return (
    <div className='todo'>
      <div className='todoHeader'>
        <span>{title}</span>
        <span>Estimated time: {estimatedMinutes}</span>
        <span><input type='checkbox' readOnly checked={isComplete}/></span>
        </div>
      <div className='todoBody'>
        <p>{category}</p>
        
        <p>{description}</p>
        <div className='tags'>
          {tags.map(tag => (
            <span className='tag'>{tag}</span>
          ))}
          <p className='dueDate'>{dueDate}</p>
        </div>
      </div>

    </div>
  )
}