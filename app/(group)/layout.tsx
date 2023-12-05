import React from 'react'

type Props = {
    children: React.ReactNode
}

const GroupLayout = ({children}: Props) => {
  return (
    <div className='h-full bg-sky-700 text-white'>{children}</div>
  )
}

export default GroupLayout