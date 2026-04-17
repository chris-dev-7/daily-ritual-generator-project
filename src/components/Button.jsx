export default function Button( { onClick, hasGenerated, allLocked, lockedActivities } ){

// Button Text Configuration

  let buttonTextOutput;
  if (!hasGenerated) {
    buttonTextOutput = 'Generate My Day';
  } else if (allLocked) {
    buttonTextOutput = 'Save & Share My Perfect Day';
  } else if (lockedActivities?.filter((activity) => activity.isLocked).length === 4) {
    buttonTextOutput = 'New Activity';
  } else {
    buttonTextOutput = 'New Activities';
  }

  return(
    <div className='flex flex-row justify-center items-center'>
      <button onClick={onClick}
              className='bg-white text-black px-4 p-2 rounded-md'
              disabled={false}
              >{buttonTextOutput}
              
      </button>
    </div>
  )
} 