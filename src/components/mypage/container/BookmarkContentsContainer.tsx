import useMediaQuery from '../../../hooks/useMediaQuery'
import useDocumentTitle from '../../../hooks/useDocumentTitle'
import BookmarksContentsMobile from '../mobile/BookmarksContentsMobile'

function BookmarkContentsContainer() {
  useDocumentTitle('북마크')
  const isMobile = useMediaQuery('(max-width: 768px)')

  if (!isMobile) return null // pc에서는 랜더x

  return <BookmarksContentsMobile />
}

export default BookmarkContentsContainer
