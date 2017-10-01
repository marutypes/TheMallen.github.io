import Typography from 'typography'
import noriega from 'typography-theme-noriega'

const typography = new Typography(noriega)

// Hot reload typography in development.
if (process.env.NODE_ENV !== 'production') {
  typography.injectStyles()
}

export default typography
