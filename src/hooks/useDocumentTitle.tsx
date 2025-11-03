import { useEffect } from 'react'

function useDocumentTitle(title?: string): void {
  useEffect(() => {
    document.title = title ? `StudyHub | ${title}` : 'StudyHub'
  }, [title])
}

export default useDocumentTitle
