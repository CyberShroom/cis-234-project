import type { Metadata } from 'next'
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Nav from './components/Nav';
import Top from './components/Top';
 
export const metadata: Metadata = {
  title: 'Next + React',
  description: 'Task App WIP',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
        <body>
            <div id="root">
                <div id="grid-div">
                    <Top />
                    <Nav />
                    {children}
                </div>
            </div>
        </body>
    </html>
  )
}