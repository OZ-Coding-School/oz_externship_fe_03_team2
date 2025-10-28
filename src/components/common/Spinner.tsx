import { ClipLoader } from 'react-spinners'

export function Spinner() {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#EAB308"
        loading
        size={57}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.57}
      />
    </div>
  )
}
