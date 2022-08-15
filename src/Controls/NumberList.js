const NumberList = ({ calledNumbers, handleUndoButton }) => {
    const alternatingColors = ['#d5d5d5', '#a9a9a9'];
  return (
<>
    <div className='flex justify-start items-center bg-gray-100 overflow-auto outline-black outline outline-1 rounded-3xl w-2/3 h-[94%] flex-col'>
        {calledNumbers &&  calledNumbers.map((number, index, {length}) => {
            if (index <= length - 11) return null
            return (
        <div key={index} style={{backgroundColor:alternatingColors[index % 2]}} className='flex flex-row w-full h-[10%] pl-1 justify-between items-center'>
            <div className='flex items-center w-auto text-3xl ml-4 font-bold'>
                {number}
            </div>
            <button onClick={()=> handleUndoButton(number, index)} className='flex justify-center items-center mr-4 bg-white border border-black w-1/4 h-1/2'>
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