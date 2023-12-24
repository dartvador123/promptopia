import React from 'react'
import '@styles/golbals.css'
import Nav from '@components/Nav'
import Provider from '@components/Provider'

export const metadata = {
  titie: "Promptopia",
  description: "Discover and Share AI Prompts"
} 

//The <html> tag represents the root of an HTML document. You should always include the lang attribute inside the <html> tag, to declare the language of the Web page. This is meant to assist search engines and browsers.
const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
          <Nav/>
          {children}
        </main>
        </Provider>
      </body>

    </html>
  )
}

export default RootLayout;