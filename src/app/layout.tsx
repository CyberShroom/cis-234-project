import type { Metadata } from 'next';
import './layout.css';
import './global.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import Nav from './components/Nav';
import Top from './components/Top';
 
export const metadata: Metadata = {
  title: 'Task App',
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
                <Container fluid className='mt-0'>
                  <Row id='row1'>
                    <Top />
                  </Row>
                  <Row id='row2'>
                    <Nav />
                  </Row>
                  {children}
                </Container>
            </div>
        </body>
    </html>
  )
}