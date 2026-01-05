import { styled } from '@mui/material'
import Button, { type ButtonProps } from '@mui/material/Button'

const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: '8px',
})

const ButtonComponent = (props: ButtonProps) => {
  const { children, ...rest } = props

  return (
    <div>
      <StyledButton {...rest}>{children}</StyledButton>
    </div>
  )
}

export default ButtonComponent