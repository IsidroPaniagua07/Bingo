const Card = ({ character }) => {
  let bgStyle = "black"
  let textColor = "white"
  const parsedChar = parseInt(character)

  const letterValidate = (str) => {
      return /[a-zA-Z]/.test(str)
  }

  if ((parsedChar >= 16 && parsedChar <=30) || (parsedChar >= 46 && parsedChar <=60)) bgStyle = "rgb(45, 212, 191)"
  else bgStyle = '#007079'
  if (letterValidate(character)) {
      bgStyle = "#ffa400"
      textColor = "black"
  }

  return (
    <div id={character} style={{background:bgStyle, color:textColor}} className="flex justify-center items-center text-5xl rounded-md
    text-white box-border border-2 border-black transition-all delay-750 h-full min-w-[52px] w-full font-mono font-bold">{character}</div>
  )
}

export default Card