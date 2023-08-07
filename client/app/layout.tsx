import LeftPane from '../components/LeftPane';
import TopNavbar from '../components/TopNavbar';
import NextTopLoader from 'nextjs-toploader';
import "../styles/sg-bootstrap-standard.min.css";
import "../styles/index.min.css"; 

export const metadata = {
  title: 'Client Navigator',
  description: 'A simple client navigator.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="en" className="">
      <head>
        {/* <link rel="stylesheet" href="https://sgwt-cdn-sgbs.sgmarkets.com/sg-bootstrap/5.5.1/core/css/sg-bootstrap-standard.min.css" /> */}
        {/* <link rel="stylesheet" href="https://sgwt-cdn-sgbs.sgmarkets.com/sg-bootstrap/5.5.1/icons/index.min.css" /> */}
        
      </head>
      <body className="">
      <section>
      <NextTopLoader color="#FF0000" showSpinner={false} />
      <TopNavbar />
      </section>
      <div className="container-fluid bg-lvl2 ">
        <div className="row">
          <div className="col-lg-3 py-3 bg-lvl2">
              <LeftPane />
          </div>
          <div className="col-lg-9 pt-3 bg-white">
            {children}
          </div>
        </div>
      </div>
      </body>
    </html>
  )
}
