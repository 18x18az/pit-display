'use client'

import { MatchStatus, Round, useSittingsQuery } from '../__generated__/graphql'

interface SittingInfo {
  sitting: number
  round: Round
  match: number
  contest: number
  status: MatchStatus
  red: string[]
  blue: string[]
}

function makeName (sitting: SittingInfo): string {
  let round = 'Q'

  switch(sitting.round) {
    case Round.Ro16:
      round = 'R16'
      break
    case Round.Qf:
      round = 'QF'
      break
    case Round.Sf:
      round = 'SF'
      break
    case Round.F:
      round = 'F'
      break
  }

  return `${round} ${sitting.contest}`
}

interface SittingProps {
  sitting: SittingInfo
}

function Teams (props: {teams: string[], color: 'red' | 'blue'}): JSX.Element {
  const { teams, color } = props
  
  const text: string = teams.join(', ')

  const fontColor = color === 'red' ? 'text-red-9' : 'text-blue-9'

  return (
    <div className={`${fontColor} text-3xl`}>{text}</div>
  )
}

export function Sitting(props: SittingProps): JSX.Element {
  const { sitting } = props
  const name = makeName(sitting)
  
  return (
    <div className='flex flex-col w-fit text-center'>
      <div className='text-4xl text-slate-12'>{name}</div>
      <div className='flex'>
        <Teams teams={sitting.red} color='red' />
        <div>v</div>
        <Teams teams={sitting.blue} color='blue' />
      </div>
    </div>
  )
}

export function Queueing (): JSX.Element {
  const { data } = useSittingsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <></>
  }

  const sittings = data.matches

  if (sittings.length === 0) {
    return <></>
  }

  // 4th sitting that is not in progress, or the last sitting if there are less than 4
  const queuedSitting = sittings.filter(sitting => sitting.status !== MatchStatus.InProgress)[3] || sittings[sittings.length - 1]
  const queuedSittingName = makeName(queuedSitting)

  const displayedSittings = sittings.map(sitting => (
    <Sitting key={sitting.id} sitting={sitting} />
  ))

  return (
    <div className='flex h-full w-full p-12 gap-4'>
      <div className='bg-slate-3 h-full grow rounded-xl [font-size:30rem] text-slate-11 text-center flex flex-col justify-center'>
        {queuedSittingName}
      </div>
      <div className='flex flex-col bg-slate-3 rounded-xl'>
        {displayedSittings}
      </div>
    </div>
  )
}
