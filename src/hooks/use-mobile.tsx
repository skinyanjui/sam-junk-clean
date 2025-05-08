
import * as React from "react"

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check
    checkMobile()
    
    // Add event listeners for both resize and orientation change
    window.addEventListener("resize", checkMobile)
    window.addEventListener("orientationchange", checkMobile)
    
    return () => {
      window.removeEventListener("resize", checkMobile)
      window.removeEventListener("orientationchange", checkMobile)
    }
  }, [])

  return !!isMobile
}

// Enhanced hook for detecting orientation
export function useOrientation() {
  const [orientation, setOrientation] = React.useState<'portrait' | 'landscape'>('portrait')

  React.useEffect(() => {
    const checkOrientation = () => {
      setOrientation(
        window.matchMedia("(orientation: landscape)").matches 
          ? 'landscape' 
          : 'portrait'
      )
    }
    
    // Initial check
    checkOrientation()
    
    // Add event listeners
    window.addEventListener("resize", checkOrientation)
    window.addEventListener("orientationchange", checkOrientation)
    
    return () => {
      window.removeEventListener("resize", checkOrientation)
      window.removeEventListener("orientationchange", checkOrientation)
    }
  }, [])

  return orientation
}

// New hook that combines device type and orientation
export function useResponsiveLayout() {
  const [layout, setLayout] = React.useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    orientation: 'portrait' as 'portrait' | 'landscape'
  })

  React.useEffect(() => {
    const checkLayout = () => {
      const width = window.innerWidth
      setLayout({
        isMobile: width < MOBILE_BREAKPOINT,
        isTablet: width >= MOBILE_BREAKPOINT && width < TABLET_BREAKPOINT,
        isDesktop: width >= TABLET_BREAKPOINT,
        orientation: window.matchMedia("(orientation: landscape)").matches 
          ? 'landscape' 
          : 'portrait'
      })
    }
    
    // Initial check
    checkLayout()
    
    // Add event listeners
    window.addEventListener("resize", checkLayout)
    window.addEventListener("orientationchange", checkLayout)
    
    return () => {
      window.removeEventListener("resize", checkLayout)
      window.removeEventListener("orientationchange", checkLayout)
    }
  }, [])

  // Computed convenience properties
  const isLandscapeMobile = layout.isMobile && layout.orientation === 'landscape'
  const isPortraitMobile = layout.isMobile && layout.orientation === 'portrait'

  return {
    ...layout,
    isLandscapeMobile,
    isPortraitMobile
  }
}
