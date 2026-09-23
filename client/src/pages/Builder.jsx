import React, { useState, useEffect } from 'react'
import './Builder.css'

function Builder() {

  const [products, setProducts] = useState([])

  const [selectedCPU, setSelectedCPU] = useState('')
  const [selectedMotherboard, setSelectedMotherboard] = useState('')
  const [selectedRAM, setSelectedRAM] = useState('')
  const [selectedStorage, setSelectedStorage] = useState('')
  const [selectedGPU, setSelectedGPU] = useState('')
  const [selectedCooler, setSelectedCooler] = useState('')
  const [selectedPSU, setSelectedPSU] = useState('')
  const [selectedCabinet, setSelectedCabinet] = useState('')

  useEffect(() => {

    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data)
      })
      .catch((error) => {
        console.log(error)
      })

  }, [])


  const cpus = products.filter(
    (product) => product.category === 'CPU'
  )

  const rams = products.filter(
    (product) => product.category === 'RAM'
  )

  const storages = products.filter(
    (product) => product.category === 'Storage'
  )

  const gpus = products.filter(
    (product) => product.category === 'GPU'
  )

  const psus = products.filter(
    (product) => product.category === 'PSU'
  )

  const coolers = products.filter(
    (product) => product.category === 'CPU Cooler'
  )

  const cabinets = products.filter(
    (product) => product.category === 'Cabinet'
  )

  function getSpecification(product, specificationName) {

    return product?.specifications?.find(
      (spec) => spec.specification === specificationName
    )?.value

  }

  const selectedCPUProduct = products.find(
    (product) =>
      product.product_id === Number(selectedCPU)
  )


  const cpuSocket = getSpecification(
    selectedCPUProduct,
    'Socket'
  )

  const cpuTDP = Number(
    getSpecification(
      selectedCPUProduct,
      'TDP'
    )
  ) || 0


  const cpuPCIeVersion = Number(
    getSpecification(
      selectedCPUProduct,
      'PCIe Version'
    )
  ) || 0

  const motherboards = products.filter((product) => {

    if (product.category !== 'Motherboard') {
      return false
    }

    if (!cpuSocket) {
      return true
    }

    const motherboardSocket = getSpecification(
      product,
      'Socket'
    )

    return motherboardSocket === cpuSocket

  })

  const selectedMotherboardProduct = products.find(
    (product) =>
      product.product_id === Number(selectedMotherboard)
  )


  const motherboardRAMType = getSpecification(
    selectedMotherboardProduct,
    'RAM Type'
  )


  const motherboardPCIeVersion = Number(
    getSpecification(
      selectedMotherboardProduct,
      'PCIe Version'
    )
  ) || 0


  const motherboardM2Slots = Number(
    getSpecification(
      selectedMotherboardProduct,
      'M.2 Slots'
    )
  ) || 0


  const motherboardSATAPorts = Number(
    getSpecification(
      selectedMotherboardProduct,
      'SATA Ports'
    )
  ) || 0

  const compatibleRAM = rams.filter((ram) => {

    if (!motherboardRAMType) {
      return true
    }

    const ramType = getSpecification(
      ram,
      'RAM Type'
    )

    return ramType === motherboardRAMType

  })

  const compatibleStorage = storages.filter((storage) => {

    if (!selectedMotherboard) {
      return true
    }

    const interfaceType = getSpecification(
      storage,
      'Interface'
    )

    const storagePCIeVersion = Number(
      getSpecification(
        storage,
        'PCIe Version'
      )
    ) || 0

    if (interfaceType === 'SATA III') {

      return motherboardSATAPorts > 0

    }


    if (interfaceType === 'M.2') {

      if (motherboardM2Slots <= 0) {
        return false
      }

      if (storagePCIeVersion > motherboardPCIeVersion) {
        return false
      }

      return true
    }


    return false

  })

  const compatibleGPUs = gpus.filter((gpu) => {

    if (!selectedMotherboard) {
      return true
    }

    const gpuPCIeVersion = Number(
      getSpecification(
        gpu,
        'PCIe Version'
      )
    ) || 0


    if (gpuPCIeVersion > motherboardPCIeVersion) {
      return false
    }

    return true

  })

  const compatibleCoolers = coolers.filter((cooler) => {

    if (!cpuSocket) {
      return true
    }

    const coolerSocket = getSpecification(
      cooler,
      'Socket'
    )

    if (!coolerSocket) {
      return false
    }


    const supportedSockets = coolerSocket.split('/')

    return supportedSockets.includes(cpuSocket)

  })


  const selectedGPUProduct = products.find(
    (product) =>
      product.product_id === Number(selectedGPU)
  )


  const gpuPowerDraw = Number(
    getSpecification(
      selectedGPUProduct,
      'Power Draw'
    )
  ) || 0


  /*
    CPU TDP + GPU Power Draw

    Then we add 30% headroom.

    Example:

    CPU = 125W
    GPU = 320W

    Base:
    125 + 320 = 445W

    With 30% headroom:
    445 × 1.3 = 578.5W

    Therefore a 650W PSU would qualify.
  */

  const requiredPSUWattage =
    (cpuTDP + gpuPowerDraw) * 1.3


  const compatiblePSUs = psus.filter((psu) => {

    if (!selectedCPU && !selectedGPU) {
      return true
    }

    const psuWattage = Number(
      getSpecification(
        psu,
        'PSU Wattage'
      )
    ) || 0

    return psuWattage >= requiredPSUWattage

  })


  // ------------------------------------------------
  // CABINET
  // GPU LENGTH → CASE GPU CLEARANCE
  // ------------------------------------------------

  const selectedGPUProductForCase = products.find(
    (product) =>
      product.product_id === Number(selectedGPU)
  )


  const gpuLength = Number(
    getSpecification(
      selectedGPUProductForCase,
      'GPU Length'
    )
  ) || 0


  const compatibleCabinets = cabinets.filter((cabinet) => {

    if (!selectedGPU) {
      return true
    }

    const gpuClearance = Number(
      getSpecification(
        cabinet,
        'Case GPU Clearance'
      )
    ) || 0

    return gpuLength <= gpuClearance

  })


  // ------------------------------------------------
  // CPU CHANGE
  // ------------------------------------------------

  function handleCPUChange(e) {

    const cpuId = e.target.value

    setSelectedCPU(cpuId)

    // CPU changed → reset dependent components

    setSelectedMotherboard('')
    setSelectedRAM('')
    setSelectedStorage('')
    setSelectedGPU('')
    setSelectedCooler('')
    setSelectedPSU('')
    setSelectedCabinet('')

  }


  // ------------------------------------------------
  // MOTHERBOARD CHANGE
  // ------------------------------------------------

  function handleMotherboardChange(e) {

    const motherboardId = e.target.value

    setSelectedMotherboard(motherboardId)

    // Motherboard changed → reset components
    // depending on motherboard

    setSelectedRAM('')
    setSelectedStorage('')
    setSelectedGPU('')
    setSelectedPSU('')
    setSelectedCabinet('')

  }


  // ------------------------------------------------
  // GPU CHANGE
  // ------------------------------------------------

  function handleGPUChange(e) {

    const gpuId = e.target.value

    setSelectedGPU(gpuId)

    // GPU affects PSU and Cabinet

    setSelectedPSU('')
    setSelectedCabinet('')

  }


  return (
    <>

      <div className="builder-page">

        <h1>PC Builder</h1>

        <p>
          Choose your components to build your PC.
        </p>


        <div className="builder-options">


          {/* CPU */}

          <div className="builder-item">

            <h3>CPU</h3>

            <select
              value={selectedCPU}
              onChange={handleCPUChange}
            >

              <option value="">
                Select CPU
              </option>

              {cpus.map((cpu) => (

                <option
                  key={cpu.product_id}
                  value={cpu.product_id}
                >
                  {cpu.name}
                </option>

              ))}

            </select>

          </div>


          {/* MOTHERBOARD */}

          <div className="builder-item">

            <h3>Motherboard</h3>

            <select
              value={selectedMotherboard}
              onChange={handleMotherboardChange}
            >

              <option value="">
                Select Motherboard
              </option>

              {motherboards.map((motherboard) => (

                <option
                  key={motherboard.product_id}
                  value={motherboard.product_id}
                >
                  {motherboard.name}
                </option>

              ))}

            </select>

          </div>


          {/* RAM */}

          <div className="builder-item">

            <h3>RAM</h3>

            <select
              value={selectedRAM}
              onChange={(e) =>
                setSelectedRAM(e.target.value)
              }
              disabled={!selectedMotherboard}
            >

              <option value="">
                Select RAM
              </option>

              {compatibleRAM.map((ram) => (

                <option
                  key={ram.product_id}
                  value={ram.product_id}
                >
                  {ram.name}
                </option>

              ))}

            </select>

          </div>


          {/* STORAGE */}

          <div className="builder-item">

            <h3>Storage</h3>

            <select
              value={selectedStorage}
              onChange={(e) =>
                setSelectedStorage(e.target.value)
              }
              disabled={!selectedMotherboard}
            >

              <option value="">
                Select Storage
              </option>

              {compatibleStorage.map((storage) => (

                <option
                  key={storage.product_id}
                  value={storage.product_id}
                >
                  {storage.name}
                </option>

              ))}

            </select>

          </div>


          {/* GPU */}

          <div className="builder-item">

            <h3>GPU</h3>

            <select
              value={selectedGPU}
              onChange={handleGPUChange}
              disabled={!selectedMotherboard}
            >

              <option value="">
                Select GPU
              </option>

              {compatibleGPUs.map((gpu) => (

                <option
                  key={gpu.product_id}
                  value={gpu.product_id}
                >
                  {gpu.name}
                </option>

              ))}

            </select>

          </div>


          {/* CPU COOLER */}

          <div className="builder-item">

            <h3>CPU Cooler</h3>

            <select
              value={selectedCooler}
              onChange={(e) =>
                setSelectedCooler(e.target.value)
              }
              disabled={!selectedCPU}
            >

              <option value="">
                Select CPU Cooler
              </option>

              {compatibleCoolers.map((cooler) => (

                <option
                  key={cooler.product_id}
                  value={cooler.product_id}
                >
                  {cooler.name}
                </option>

              ))}

            </select>

          </div>


          {/* PSU */}

          <div className="builder-item">

            <h3>Power Supply</h3>

            <select
              value={selectedPSU}
              onChange={(e) =>
                setSelectedPSU(e.target.value)
              }
              disabled={!selectedCPU && !selectedGPU}
            >

              <option value="">
                Select Power Supply
              </option>

              {compatiblePSUs.map((psu) => (

                <option
                  key={psu.product_id}
                  value={psu.product_id}
                >
                  {psu.name}
                </option>

              ))}

            </select>

          </div>


          {/* CABINET */}

          <div className="builder-item">

            <h3>Cabinet</h3>

            <select
              value={selectedCabinet}
              onChange={(e) =>
                setSelectedCabinet(e.target.value)
              }
              disabled={!selectedGPU}
            >

              <option value="">
                Select Cabinet
              </option>

              {compatibleCabinets.map((cabinet) => (

                <option
                  key={cabinet.product_id}
                  value={cabinet.product_id}
                >
                  {cabinet.name}
                </option>

              ))}

            </select>

          </div>

        </div>


        {/* SUMMARY */}

        <div className="builder-summary">

          <h2>Your Build</h2>

          <p>
            Choose your components above.
          </p>

          <button>
            Build PC
          </button>

        </div>

      </div>

    </>
  )
}

export default Builder