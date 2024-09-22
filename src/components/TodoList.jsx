import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from '../app/todoSlice'; 
import del from '../assets/icons/delete.svg';
import '../App.css';

const TodoList = () => {
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all'); 
  const todos = useSelector((state) => state.todos); 
  const dispatch = useDispatch();

  const handleAddTodo = () => {
    if (text.length >= 1) {
      dispatch(addTodo(text));
      setText('');
    }
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true; 
  });

  return (
    <div className="flex flex-col items-center bg-[#1A202C] min-h-[100vh] p-[20px] max-w-[100%]">
      <h1 className='text-[40px] text-cyan-500 mb-[20px] mt-[120px]'>Lista de tarefas</h1>
      
      <div className="mb-4 mt-[40px] items-center flex justify-center space-x-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter a task"
          className="bg-slate-800 text-white rounded-[6px] py-[15px] px-[25px]"
        />
        <button onClick={handleAddTodo} className="bg-[#90cdf4] rounded-[6px] py-[15px] px-[25px]">
          Adicionar
        </button>
      </div>
      
      <div className="flex justify-center space-x-4 text-[13px] ">
        <button
          onClick={() => setFilter('active')}
          className={`px-[7px] py-[3px] rounded-[7px] ${filter === 'active' ? 'opacity-[0.7]' : 'bg-none'} text-[#D6BCFA;] border border-[#D6BCFA;]`}
        >
          Em Andamento
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`px-[7px] py-[3px] rounded-[7px] ${filter === 'completed' ? 'opacity-[0.7]' : 'bg-none'} text-[#9AE6B4] border border-[#9AE6B4]`}
        >
          Concluídas
        </button>
        <button
          onClick={() => setFilter('all')}
          className={`px-[7px] py-[3px] rounded-[7px] ${filter === 'all' ? 'opacity-[0.7]' : 'bg-none'} text-[#90cdf4;] border border-[#90cdf4;]`}
        >
          Todas
        </button>
      </div>

      <div className='main__container space-x-[5px]'>
        <div className='w-[37%] p-[20px] rounded-[5px]'>
          <div className="w-[100%]">
            <ul className="list-none border border-white p-[20px]">
              {filteredTodos.map((todo) => (
                <li key={todo.id} className="flex items-center mb-2 border-b-[3px] text-white py-[15px] mb-[15px]">
                  <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    className="mr-2" 
                    onChange={() => dispatch(toggleTodo(todo.id))}
                  />
                  <span
                    className={`flex-grow rounded-[5px] ${todo.completed ? 'line-through' : ''}`}
                  >
                    {todo.text}
                  </span>
                  <button onClick={() => dispatch(deleteTodo(todo.id))} className="ml-2 bg-slate-700 p-[10px] rounded-[50px]">
                     <img src={del} alt="delete" className='w-5' />
                  </button>
                </li>
              ))}
               <div className="text-white text-[18px] text-center">
                  Your all tasks: <span className="font-bold">{todos.length}</span>
               </div>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
