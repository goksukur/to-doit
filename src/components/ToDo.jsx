import {useState, useRef, useEffect}  from 'react'
import { FaPlus } from "react-icons/fa";
import ToDoItem from './ToDoItem';

const ToDo = () => {
    const [ toDos, setToDos ] = useState(localStorage.getItem("toDos") ? JSON.parse(localStorage.getItem("toDos")) : [] );
    const data = useRef();

    const addToDos = () => {
        const inputText = data.current.value.trim();

        if (inputText === ""){
            return null;
        }

        const newToDo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }

        setToDos((prev) => [ ...prev, newToDo]);
        data.current.value = "";
    };

    const toggle = (id) => {
        setToDos((prevToDos) => {
            return prevToDos.map((ToDo) => {
                if(ToDo.id === id){
                    return {... ToDo, isComplete: !ToDo.isComplete}
                }
                return ToDo;
            })
        })
    }

    const deleteToDo = (id) => {
        setToDos((prevToDos) => {
            return prevToDos.filter((ToDo) => ToDo.id !== id);
        })
    }

    useEffect(() => {
        localStorage.setItem("toDos", JSON.stringify(toDos))
      }, [toDos]);

  return (
    <div className='place-self-center bg-[#F9F7F7] w-[400px] h-[600px] p-12 flex flex-col gap-5 rounded-xl'>
        {/* Başlık */}
        <h1 className='text-3xl font-semibold tracking-wider flex gap-2 items-center text-[#3F72AF]'>
            to-do it!
        </h1>
        {/* Arama */}
        <div className='flex h-10 items-center bg-[#DBE2EF] rounded-xl'>
            <input ref={data} type='text' className='border-none outline-none p-1 flex-1 bg-transparent rounded-xl placeholder:text-[#3F72AF] text-[#3F72AF]' placeholder='do it!' onKeyDown={(e) => { if (e.key === "Enter") { addToDos();}}}/>
            <div className='bg-[#3F72AF] h-full w-8 flex items-center justify-center rounded-r-xl cursor-pointer' onClick={() => addToDos()}>
                <FaPlus  className='size-3 text-[#DBE2EF]'/>
            </div>
        </div>
        {/* Listeleme */}
        <div className='mt-5 overflow-y-auto max-h-[400px]'>
            {
                toDos.map(ToDo => (
                    <ToDoItem key={ToDo.id} ToDo={ToDo} toggle={toggle} deleteToDo={deleteToDo}/>
                ))
            }
        </div>
    </div>
  )
}

export default ToDo