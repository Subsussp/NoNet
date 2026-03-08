import { useEffect } from "react"
import { useLocation } from "react-router-dom"


const scrollPositions = {}

export default function ScrollRestoration() {
  const location = useLocation()

  useEffect(() => {
    const handleScroll = (e) => {
      scrollPositions[location.pathname] = window.scrollY
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [location.pathname])

  useEffect(() => {
    const y = scrollPositions[location.pathname] || 0
    window.scrollTo(0,y);
  }, [location.pathname])

  return null
}