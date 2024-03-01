'use client'

import { EventStage, useStageQuery } from '../__generated__/graphql'
import { Checkin } from './checkin'
import { Queueing } from './queueing'

export function Selector (): JSX.Element {
  const { data } = useStageQuery({ pollInterval: 500 })

  let content = <></>

  if (data !== undefined) {
    const stage = data.stage.stage

    if (stage === EventStage.Checkin) {
      content = <Checkin />
    } else if (stage === EventStage.Qualifications || stage === EventStage.Elims) {
      content = <Queueing />
    }
  }

  return (
    <div className='w-full h-screen bg-slate-2 dark'>
      {content}
    </div>
  )
}
