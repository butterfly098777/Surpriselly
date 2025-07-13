import React from 'react'
import Nav from './Nav'
import Page1 from './Page1'
import Categories from './Categories'
import Page2 from './Page2'
import Page3 from './Page3'
import QuirkyCelebrations from './QuirkyCelebrations'
import Page4 from './Page4'
import Page5 from './Page5'
import Page6 from './Page6'
import Page7 from './Page7'
import Page8 from './Page8'
import EventBanner from './EventBanner'
import Footer from './Footer'

function HomePage() {
  return (
    <div className="bg-purple-50">
        <Nav />
        <Page1 />
        <Categories />
        <Page2 /> 
        <Page3 />
        <QuirkyCelebrations />
        <Page4 />
        <Page5 />
        <Page6 />
        <Page7 />
        <EventBanner />
        <Page8 />

    </div>
  )
}

export default HomePage