import Script from "next/script";

import { serverEnv } from "@/lib/env";

export function Analytics() {
  const gaMeasurementId = serverEnv.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const gtmId = serverEnv.NEXT_PUBLIC_GTM_ID;

  return (
    <>
      {gtmId ? (
        <Script id="gtm-loader" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `}
        </Script>
      ) : null}

      {gaMeasurementId ? (
        <>
          <Script
            id="ga-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="ga-config" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                anonymize_ip: true,
                transport_type: 'beacon'
              });
            `}
          </Script>
        </>
      ) : null}
    </>
  );
}
