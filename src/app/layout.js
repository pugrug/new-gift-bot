import './globals.css'

export const metadata = {
  title: 'Gift Bot',
  description: 'Your Radical Gift Advisor!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  )
}