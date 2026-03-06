import type { ReactNode } from "react"

type NysType = "base" | "info" | "success" | "warning" | "danger" | "emergency"
interface MessageProps {
  nysType?: NysType,
  children?: ReactNode,
  text?: string | TrustedHTML,
  icon?: boolean,
  closable?: boolean,
  className?: string
}

const Message = ({ children, nysType = "info", closable, className }: MessageProps) => {
  return (
    <nys-alert className={className} aria-live="polite" data-pc-name="message" data-pc-section="root" type={nysType} dismissible={closable}>
      <div className="message-inner-wrap">{children}</div>
    </nys-alert>
  )
}

export default Message