import { useCallback, useEffect, useState } from 'react'
import TablerMoon from '~icons/tabler/moon'
import TablerSun from '~icons/tabler/sun'

const getInitialTheme = () => (typeof window !== 'undefined' ? localStorage.theme || 'light' : 'light')

function setThemeEffect(theme: string, oldThemes: string[] = []) {
  if (typeof window === 'undefined') return
  const root = window.document.documentElement

  root.classList.remove(...oldThemes)
  root.classList.add(theme)
  root.dataset.theme = theme

  localStorage.setItem('theme', theme)
}

setThemeEffect(getInitialTheme())

export function useDarkMode() {
  const [theme, setTheme] = useState<string>(getInitialTheme())
  const colorTheme = theme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    setThemeEffect(theme, [colorTheme])
  }, [theme])

  return [theme === 'dark', useCallback(() => setTheme(colorTheme), [theme])] as const
}

export function ThemeSwitch() {
  const [darkMode, toggleDarkMode] = useDarkMode()

  return (
    <label htmlFor="theme-switch" className="flex justify-center">
      <div className="swap swap-rotate">
        <input id="theme-switch" type="checkbox" checked={!darkMode} onChange={toggleDarkMode} value="dark" />

        <TablerSun className="swap-on" />

        <TablerMoon className="swap-off" />
      </div>
    </label>
  )
}
