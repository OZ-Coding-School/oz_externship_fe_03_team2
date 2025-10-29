import { ClipLoader } from 'react-spinners'

interface propsType {
  size?: number
  color?: string
  speedMultiplier?: number
}

export function Spinner({
  size = 57,
  color = '#EAB308',
  speedMultiplier = 0.57,
}: propsType) {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color={color}
        loading
        size={size}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={speedMultiplier}
      />
    </div>
  )
}
