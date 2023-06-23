import Conatiner from './components/Container/Conatiner'
import LinksMenu from './components/LinksMenu/LinksMenu'
import './style.css'


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body>
     
     
      <Conatiner>
      
        {children}
        </Conatiner>
        </body>
    </html>
  )
}
