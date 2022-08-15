import { useRef, useState, useEffect } from 'react'
import { io } from 'socket.io-client';
import NumberList from './NumberList';

const Controls = () => {
  const inputRef = useRef(null)
  const [socket, setSocket] = useState(null);
  const [calledNumbers, setCalledNumbers] = useState([])
  const [ballCount, setBallCount] = useState(0)

  // Initializes Socket IO
  useEffect(() => {
    
    // Home
    // setSocket(io('192.168.0.102:8080/'))
    // Work PC
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      setSocket(io(process.env.REACT_APP_DEVELOPMENT_SERVER_IP));
  } else {
      setSocket(io(process.env.REACT_APP_PRODUCTION_SERVER_IP))
  }
    
  }, []);

  
  
  // Submitting a number form handler
  const handleSubmit = (e) => {
    e.preventDefault()
    const regex = /^[0-9]+$/
    const inputValue = inputRef.current.value.replace(/\b0+/g, "")
    if (!inputValue.match(regex) || parseInt(inputValue) > 75 || parseInt(inputValue) < 1) return alert('Please use numbers between 1-75')   
    const parsedNumber = parseInt(inputValue)
    if (calledNumbers.includes(parsedNumber)) return alert("You've already selected that number")
    document.getElementById('submitNotification').textContent = `Selected: ${parsedNumber}`
    let newList = calledNumbers
    newList.push(parsedNumber)
    setCalledNumbers([...newList])
    setBallCount(ballCount => ballCount + 1)
    socket.emit('request-send-number', parsedNumber)
    console.log(`Submit request for: ${parsedNumber}`)
    inputRef.current.value = ""
    
  }
  // Undo button handler
  const handleUndoButton = (number, index) => {
    if(window.confirm(`Are you sure you want to undo number: ${number}`)) {
      let newList = calledNumbers
      newList.splice(index, 1)
      setCalledNumbers([...newList])
      setBallCount(ballCount => ballCount - 1)
      socket.emit('request-remove', number)
      console.log(`Undo request for: ${number}`)
    }
  }
  // Clear board button
  const sendClearEmit = () => {
    if(window.confirm('Are you sure you want to clear the board?')) {
        setCalledNumbers([])
        setBallCount(0)
        console.log('Requested board clear')
        socket.emit('request-clear')
        
      }
    }
    // Bingo call button
    const sendBingoEmit = () => {
      if(window.confirm('Are you sure you want to call Bingo?')) {
        console.log('Calling bingo')
        socket.emit('request-call-bingo')
      
    }
  }
  
  
  useEffect(() => {
    
    if (!socket) return;
    socket.on('connect', () => {
      console.log('Connected')
      // Requests Bingo data from server on page load
      socket.emit('controls-request-numbers')
    });

    // When server responds with Bingo data this catches the data
    socket.on('get-numbers-controls', (array) => {
      console.log('Initializing board state...')
      setCalledNumbers(array)
      setBallCount(array.length)

    })
    // When another controller submits data this refreshes control page with updated data
    socket.on('update-numbers', array => {
      console.log('Updating data')
      setCalledNumbers(array)
      setBallCount(array.length)
    })

    socket.on('disconnect', () => {
      console.log('Disconnected')
    });
    
  }, [socket])


  
  
  return (
    <>
    <div className='flex flex-col h-full w-full justify-center items-center bg-jcaqua'>
      <div className='flex flex-row bg-gray-200 h-[97%] w-[98%] 
        justfiy-center items-center'>
        <div className='flex flex-col h-full w-full justify-center items-center'>
          <NumberList 
          calledNumbers={calledNumbers}
          handleUndoButton={handleUndoButton} />

        </div>
        <div className='flex flex-col justify-center items-center h-full w-full pt-6 '>
          <div className='flex flex-col h-full w-full items-center'>
            <div className='h-[80%] pt-2 text-5xl'>
              Bingo Controls
            </div>
            <div className='h-full text-4xl'>
              Ball count: {ballCount}
            </div>
            <div className='flex flex-col justify-between h-full w-full items-center'>

            <button onClick={sendBingoEmit} className='h-auto w-auto bg-jcaqua p-1 m-1 font-semibold outline outline-1'>Call Bingo</button>    
            <button onClick={sendClearEmit} className='h-auto w-auto bg-red-600 p-1 m-1 font-semibold outline outline-1'>Clear Board</button>   
            </div>
          </div>
          <form className='flex flex-col justify-center items-center gap-2 h-full w-full' onSubmit={handleSubmit}>
            <div id="submitNotification" className='h-fit w-full text-center text-2xl lg:text-3xl justify-self-center self-center'>Type number below!</div>
            <input ref={inputRef} autoComplete="off" className='text-black text-center text-5xl lg:text-6xl h-1/6 w-1/3 max-w-fit outline outline-1' type="text" name="name" />
            <button type='submit' className='h-[10vh] w-1/3 p-1 bg-green-700 font-bold text-3xl lg:text-4xl text-white mt-20 outline outline-1'>Submit</button>
          </form>    
        </div>
      </div>
    </div>
    </>
  )
}

export default Controls