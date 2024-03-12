import { MantineProvider } from "@mantine/core"
import Footer from "components/Footer"
import * as gtag from "lib/gtag"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import Script from "next/script"
import { useEffect } from "react"
import "../styles/globals.css"

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      gtag.pageview(url)
    }
    router.events.on("routeChangeComplete", handleRouteChange)
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <Script
        defer
        strategy="afterInteractive"
        src="https://analytics.zulio.me/script.js"
        data-website-id="ed9f688b-6a26-4831-847c-00dc162183c2"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-94DZGE8HM1', {
page_path: window.location.pathname,
});
`,
        }}
      />
      <MantineProvider>
        <Component {...pageProps} />
        <Footer />
      </MantineProvider>
    </>
  )
}

export default MyApp
