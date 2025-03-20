import { useTheme } from '../../context/ThemeContext'
import { FaSun, FaMoon } from 'react-icons/fa'

function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
    >
      {isDark ? <FaSun /> : <FaMoon />}
    </button>
  )
}

export default ThemeToggle