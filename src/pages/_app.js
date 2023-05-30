import { ThemeProvider } from "@material-tailwind/react";
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
