import './globals.css'
import { ModeProvider } from './contexts/ModeContext'

export const metadata = {
  title: 'Gift Bot',
  description: 'Your Radical Gift Advisor!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ModeProvider>
          {children}
        </ModeProvider>
      </body>
    </html>
  )
}