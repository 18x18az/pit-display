'use client'

import { Inspection, Team, useInspectionQuery } from '../__generated__/graphql'

interface TeamProps {
  number: string
}

interface ColumnProps {
  title: string
  teams: TeamProps[]
}

function Column (props: ColumnProps): JSX.Element {
  return (
    <div className='flex flex-col w-1/4 text-center gap-6'>
      <div className='text-4xl text-slate-12'>{props.title}</div>
      <div className='grid grid-cols-2'>
      {props.teams.map(team => (
        <div className='text-slate-11 text-3xl'>{team.number}</div>
      ))}
      </div>
    </div>
  )
}

export function Checkin (): JSX.Element {
  const { data } = useInspectionQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <></>
  }

  const teams = data.teams

  const not_here = teams.filter(team => team.inspection === Inspection.NotHere)
  const not_started = teams.filter(team => team.inspection === Inspection.CheckedIn)
  const in_progress = teams.filter(team => team.inspection === Inspection.InProgress)
  const completed = teams.filter(team => team.inspection === Inspection.Completed)

  return (
    <div className='text-4xl text-slate-11 z-20 flex top-10 bottom-10 left-20 right-20 rounded-xl absolute justify-evenly bg-slate-4 p-8'>
      <Column title='Not Here' teams={not_here} />
      <Column title='Not Started' teams={not_started} />
      <Column title='In Progress' teams={in_progress} />
      <Column title='Completed' teams={completed} />
    </div>
  )
}
