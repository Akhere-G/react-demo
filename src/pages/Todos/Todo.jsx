export default function Todo({ title, category, description, dueDate, estimatedMinutes, tags, isComplete }) {
  return (
    <article className={`todo ${isComplete ? "completed" : ""}`}>
      <header className='todo-header'>
        <div className="title-area">
          <h3>{title}</h3>
          <span className="badge-category">{category}</span>
        </div>
        <div className="status-area">
          <span className='time-estimate'>{estimatedMinutes}m</span>
          <input type='checkbox' checked={isComplete} readOnly />
        </div>
      </header>
      
      <div className='todo-body'>
        <p className='description'>{description}</p>
        
        <footer className='todo-footer'>
          <div className='tags'>
            {tags.map((tag, index) => (
              <span key={index} className='tag'>#{tag}</span>
            ))}
          </div>
          <time className='due-date'>📅 {dueDate}</time>
        </footer>
      </div>
    </article>
  )
}