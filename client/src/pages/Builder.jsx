import React from 'react'
import './Builder.css'

function Builder() {
  return (
    <>
      <div className="builder-page">

        <h1>PC Builder</h1>
        <p>Choose your components to build your PC.</p>

        <div className="builder-options">

          <div className="builder-item">
            <h3>CPU</h3>
            <select>
              <option>Select CPU</option>
              <option>AMD Ryzen 5 7600</option>
              <option>Intel Core i5-13400</option>
            </select>
          </div>

          <div className="builder-item">
            <h3>GPU</h3>
            <select>
              <option>Select GPU</option>
              <option>NVIDIA RTX 4060</option>
              <option>AMD RX 7600</option>
            </select>
          </div>

          <div className="builder-item">
            <h3>RAM</h3>
            <select>
              <option>Select RAM</option>
              <option>16GB DDR5</option>
              <option>32GB DDR5</option>
            </select>
          </div>

          <div className="builder-item">
            <h3>Storage</h3>
            <select>
              <option>Select Storage</option>
              <option>512GB SSD</option>
              <option>1TB SSD</option>
            </select>
          </div>

          <div className="builder-item">
            <h3>Power Supply</h3>
            <select>
              <option>Select Power Supply</option>
              <option>550W</option>
              <option>650W</option>
              <option>750W</option>
            </select>
          </div>

        </div>

        <div className="builder-summary">
          <h2>Your Build</h2>
          <p>Choose your components above.</p>

          <button>Build PC</button>
        </div>

      </div>
    </>
  )
}

export default Builder