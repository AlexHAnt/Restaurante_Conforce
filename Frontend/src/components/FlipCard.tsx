import React, { useEffect } from "react";
import { useToasts } from 'react-toast-notifications'

interface IProps {
  content: FlipCard
}

const FlipCard: React.FC<IProps> = ({ content }) => {
  const { addToast }:any = useToasts()
 
  useEffect(() => {
    if (content.message !== '') {
      addToast(content.message, {
        appearance: content.type,
        autoDismiss: true
      })
    }
  }, [content])

  return (
    <></>
  )
}
export default FlipCard