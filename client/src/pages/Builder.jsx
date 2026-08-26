import React, {useState,useEffect} from 'react'
import './Builder.css'

function Builder() {

  const [products,setProducts]=useState([])

  useEffect(()=>{
    fetch('http://localhost:5000/api/products')
    .then((res)=>res.json())
    .then((data)=>{
      setProducts(data)
    })
    .catch((error)=>{
      console.log(error);
    })
  },[])

const cpus = products.filter((product) => product.category === 'CPU')
const gpus = products.filter((product) => product.category === 'GPU')
const rams = products.filter((product) => product.category === 'RAM')
const storage = products.filter((product) => product.category === 'Storage')
const psus = products.filter((product) => product.category === 'PSU')
const motherboards=products.filter((product)=>product.category==='Motherboard')
const coolers=products.filter((product)=>product.category==='CPU Cooler')
const cabinets=products.filter((product)=>product.category==='Cabinet')

  // console.log(cpus)
  // console.log(gpus)
  // console.log(rams)
  // console.log(storage)
  // console.log(powerSupplies)

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
              
              {cpus.map((cpu)=>(
                <option key={cpu.product_id} value={cpu.product_id}>
                  {cpu.name}
                </option>
              ))}
            </select>
          </div>

          <div className="builder-item">
            <h3>GPU</h3>
            <select>
              <option>Select GPU</option>
              
             {gpus.map((gpu)=>(
              <option key={gpu.product_id} value={gpu.product_id}>
                {gpu.name}
              </option>
             ))}
            </select>
          </div>

          <div className="builder-item">
            <h3>RAM</h3>
            <select>
              <option>Select RAM</option>
              
              {rams.map((ram)=>(
                <option key={ram.product_id} value={ram.product_id}>
                  {ram.name}
                </option>
              ))}
            </select>
          </div>

          <div className="builder-item">
            <h3>Storage</h3>
            <select>
              <option>Select Storage</option>
              
              {storage.map((store)=>(
                <option key={store.product_id} value={store.product_id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>

          <div className="builder-item">
            <h3>Power Supply</h3>
            <select>
              <option>Select Power Supply</option>

              {psus.map((psu)=>(
                <option key={psu.product_id} value={psu.product_id}>
                  {psu.name}
                </option>
              ))}
            </select>
          </div>


          <div className="builder-item">
            <h3>MotherBoard</h3>
            <select>
              <option>Select MotherBoard</option>

              {motherboards.map((motherboard)=>(
                <option key={motherboard.product_id} value={motherboard.product_id}>
                  {motherboard.name}
                </option>
              ))}
            </select>
          </div>


          <div className="builder-item">
            <h3>CPU Cooler</h3>
            <select>
              <option>Select Cooler</option>

              {coolers.map((cooler)=>(
                <option key={cooler.product_id} value={cooler.product_id}>
                  {cooler.name}
                </option>
              ))}
            </select>
          </div>
                    

          <div className="builder-item">
            <h3>Cabinet</h3>
            <select>
              <option>Select Cabinet</option>

              {cabinets.map((cabinet)=>(
                <option key={cabinet.product_id} value={cabinet.product_id}>
                  {cabinet.name}
                </option>
              ))}
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