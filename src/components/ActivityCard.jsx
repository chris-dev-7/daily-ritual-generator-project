import morningIcon from '../assets/activityIcons/DailyRitualIcons/morningRitual.svg'
import creativityIcon from '../assets/activityIcons/DailyRitualIcons/creative.svg'
import mindfulnessIcon from '../assets/activityIcons/DailyRitualIcons/mindfulness.svg'
import movementIcon from '../assets/activityIcons/DailyRitualIcons/movementActivity.svg'
import eveningIcon from '../assets/activityIcons/DailyRitualIcons/eveningWindDown.svg'
import lockIcon from '../assets/activityIcons/DailyRitualIcons/lockIcon.svg'
import unlockIcon from '../assets/activityIcons/DailyRitualIcons/unlockIcon.svg'

export default function ActivityCard({  name, category, description, duration, isLocked, onToggle }){


  const categoryIconMap = {
    'Morning Ritual': morningIcon,
    'Creativity': creativityIcon,
    'Movement': movementIcon,
    'Mindfulness': mindfulnessIcon,
    'Evening Wind Down': eveningIcon
  
  }
  

  return (
    <div
      className={`${isLocked ? 'bg-orange-300' : 'bg-orange-200'} 
        text-center border rounded-lg shadow-md border-orange-300 
        text-white z-40 opacity-90 flex flex-col flex-shrink-0
        w-28 h-[19rem] p-1
        md:w-40 md:h-auto md:p-4 md:min-w-0`}
      onClick={onToggle}
    >
      <div className='flex flex-col items-center flex-shrink-0'>
        <img
          className='p-0 mb-0.5 h-18 w-18 object-contain md:mb-4 md:h-16 md:w-20'
          src={categoryIconMap[category]}
          alt={`${category} icon`}
        />
        <h1 className='font-extrabold text-sm leading-tight md:text-xl'>{category}</h1>
      </div>

      <div className='min-w-0 flex-1 min-h-0 overflow-hidden text-xs leading-snug py-0.5 md:flex-none md:overflow-visible md:text-base md:leading-normal md:py-0'>
        <p className='font-bold text-orange-400 whitespace-nowrap'>Activity:</p>
        <p className='font-medium break-normal'>{name}</p>
        <p className='font-bold text-orange-400 whitespace-nowrap'>Details:</p>
        <p className='font-medium break-normal'>{description}</p>
        <p className='font-bold text-orange-400 whitespace-nowrap'>Duration:</p>
        <p className='font-medium break-normal pb-0.5 md:pb-0'>{duration}</p>
      </div>

      <div className='flex shrink-0 justify-center pt-0.5 md:pt-4 md:pb-0'>
        {isLocked ? (
          <img className='h-8 w-8 md:h-12 md:w-12' src={lockIcon} alt='lock icon' />
        ) : (
          <img className='h-8 w-8 md:h-12 md:w-12' src={unlockIcon} alt='unlock icon' />
        )}
      </div>
    </div>
  )
}