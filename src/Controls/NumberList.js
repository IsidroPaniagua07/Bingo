const NumberList = ({ calledNumbers, handleUndoButton }) => {
    const alternatingColors = ['#007079', '#ffffff'];
  return (
<>
    <div className='flex justify-start items-center bg-gray-300 overflow-auto outline-black w-full h-full flex-col'>
        {calledNumbers &&  calledNumbers.map((number, index, {length}) => {
            if (index <= length - 11) return null
            return (
        <div key={index} style={{backgroundColor:alternatingColors[index % 2]}} className='flex flex-row w-full h-[10%] md:pl-4 justify-between items-center'>
            <div className='flex items-center w-1/2 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center justify-center'>
                {number}
            </div>
            <button onClick={()=> handleUndoButton(number, index)} className='flex justify-center text-xl sm:text-2xl md:text-3xl lg:text-4xl items-center text-white
             bg-[rgb(255,0,0)] border-2 border-black border-t-0 w-1/2 lg:1/3 h-full '>
                Undo
            </button>
        </div>
            )
            })}
    </div>
</>
  )
}

export default NumberList