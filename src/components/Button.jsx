import { Link } from 'react-router-dom'

function Button({ children, to, type = 'button', variant = 'primary', className = '', ...props }) {
  const buttonClass = `btn btn-${variant} ${className}`.trim()

  if (to) {
    return (
      <Link className={buttonClass} to={to} {...props}>
        {children}
      </Link>
    )
  }

  return (
    <button className={buttonClass} type={type} {...props}>
      {children}
    </button>
  )
}

export default Button
