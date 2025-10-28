import { ClipLoader } from 'react-spinners'

export function Spinner() {
  return (
    <div className="sweet-loading">
      <ClipLoader
        color="#c4c4c4"
        loading
        size={40}
        aria-label="Loading Spinner"
        data-testid="loader"
        speedMultiplier={0.58}
      />
    </div>
  )
}
