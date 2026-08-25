import React from 'react'
import './Home.css'
import {Link} from 'react-router-dom'
function Home() {
  return (
    <>
    <div className='home'>

      <section className='hero'>
        <h1>Build your Dream PC</h1>
        <p>Find the right components and build your perfect PC with BuildSphere.</p>
        <Link to='/products'>
        <button>Explore Products</button>
        </Link>
      </section>

      <section className='categories'>
        <h2>Shop by categories</h2>

        <div className='category-list'>
          <div>CPU</div>
          <div>GPU</div>
          <div>RAM</div>
          <div>Storage</div>
        </div>
      </section>

      <section className='why-buildsphere'>
          <h2>Why BuildSphere?</h2>
          <p>BuildSphere helps u find components compatible with your custom builds.</p>
      </section>

    </div>
    </>
  )
}

export default Home