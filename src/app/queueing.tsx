'use client'

import { useSittingsQuery } from '../__generated__/graphql'

export function Queueing (): JSX.Element {
  const { data } = useSittingsQuery({ pollInterval: 500 })

  if (data === undefined) {
    return <></>
  }

  const sittings = data.matches

  if (sittings.length === 0) {
    return <></>
  }

  return (
    <div />
  )
}
