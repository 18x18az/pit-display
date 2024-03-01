'use client'

import { EventStage, useStageQuery } from '../__generated__/graphql'
import { Checkin } from './checkin'

export function Selector (): JSX.Element {
  const { data } = useStageQuery({ pollInterval: 500 })

  let content = <></>

  if (data !== undefined) {
    const stage = data.stage.stage

    if (stage === EventStage.Checkin) {
      content = <Checkin />
    }
  }

  return (
    <div className='w-full h-screen bg-gold-7'>
      {content}
    </div>
  )
}
