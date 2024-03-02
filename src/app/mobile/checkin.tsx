import { Inspection, useInspectionQuery } from '../../__generated__/graphql'

interface TeamInfo {
    number: string
}

interface GroupProps {
    title: string
    teams: TeamInfo[]
}

function Group (props: GroupProps): JSX.Element {
    return (<div className='bg-slate-2 p-4'>
        <div className='text-4xl text-slate-12 mb-4'>{props.title}</div>
        <div className='flex flex-col gap-2'>
            {props.teams.map(team => (
                <div key={team.number} className='text-slate-11 text-3xl'>{team.number}</div>
            ))}
        </div>
    </div>)
}

export function Checkin (): JSX.Element {
  const { data } = useInspectionQuery({ pollInterval: 500 })

    if (data === undefined) {
        return <></>
    }

    const teams = data.teams

    const notHere = teams.filter(team => team.inspection === Inspection.NotHere)
    const notStarted = teams.filter(team => team.inspection === Inspection.CheckedIn)
    const inProgress = teams.filter(team => team.inspection === Inspection.InProgress)

    const groups = []

    if (notHere.length > 0) {
        groups.push(<Group title='Not Here' key={'Not Here'} teams={notHere} />)
    }

    if (notStarted.length > 0) {
        groups.push(<Group title='Not Started' key={'Not Started'} teams={notStarted} />)
    }

    if (inProgress.length > 0) {
        groups.push(<Group title='In Progress' key={'In Progress'} teams={inProgress} />)
    }

  return (
    <div className='w-full h-screen bg-slate-2 dark flex-col text-center gap-4'>
            {groups}
    </div>
  )
}
