import { useUserStore } from '../../../store/useUserStore'
import ProfileContents from '../ProfileContents'
import ProfileContentsMobile from '../mobile/ProfileContentsMobile'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import useMediaQuery from '../../../hooks/useMediaQuery'

function ProfileContentsContainer() {
  useDocumentTitle('내 정보')
  const user = useUserStore((state) => state.user)
  const isMobile = useMediaQuery('(max-width: 768px)') //화면이 768px 이하인지 확인

  if (!user) return null

  //모바일이면 모바일 버전 or pc버전 렌더링
  return isMobile ? <ProfileContentsMobile /> : <ProfileContents />
}

export default ProfileContentsContainer
