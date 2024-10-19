import { FaRegCircle, FaRegTrashAlt , FaRegCheckCircle } from "react-icons/fa";

const ToDoItem = ({ToDo, toggle, deleteToDo}) => {
  return (
    <div className='w-full flex items-center gap-2 border-b border-[#DBE2EF] px-2 py-3 select-none' onClick={() => toggle(ToDo.id)}>
      {ToDo.isComplete ? 
      (<FaRegCheckCircle className='text-[#3F72AF] cursor-pointer size-4'/>) 
      : 
      (<FaRegCircle className='text-[#3F72AF] cursor-pointer size-4'/>)}
        <p className={`flex-1 text-[#3F72AF] ${ToDo.isComplete ? "line-through" : ""}`}>{ToDo.text}</p>
        <FaRegTrashAlt className='text-[#3F72AF] cursor-pointer size-4 hover:text-[#FF7777]' onClick={() => deleteToDo(ToDo.id)}/>        
    </div>
  )
}

export default ToDoItem