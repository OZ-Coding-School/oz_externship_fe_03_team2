import { useUserStore } from '../../../store/useUserStore'
import StudysContents from '../StudysContents'
import StudysContentsMobile from '../mobile/StudysContentsMobile'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useMediaQuery from '../../../hooks/useMediaQuery'

function StudyContentsContainer() {
  useDocumentTitle('지원 내역')
  const user = useUserStore((state) => state.user)
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (!user) return null

  return isMobile ? <StudysContentsMobile /> : <StudysContents />
}

export default StudyContentsContainer
