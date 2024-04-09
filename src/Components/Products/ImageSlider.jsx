import React, { useState, useEffect, useRef } from "react"
import Slider from "react-slick"
import Spinner from './Spinner.jsx'

export default function ImageSlider({ loadedImages }) {
  const [nav1, setNav1] = useState(null)
  const [nav2, setNav2] = useState(null)
  const [zoomedImage, setZoomedImage] = useState(null)
  const [showSecondSlider, setShowSecondSlider] = useState(true)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const imageNotFound = 'https://ih1.redbubble.net/image.1893341687.8294/fposter,small,wall_texture,product,750x1000.jpg';

  let sliderRef1 = useRef(null)
  let sliderRef2 = useRef(null)

  useEffect(() => {
    setNav1(sliderRef1)
    setNav2(sliderRef2)
  }, [])

  useEffect(() => {
    if (loadedImages.length === 1) {
      setShowSecondSlider(false) 
      setLoading(false)
    } else {
      setShowSecondSlider(true)
    }
  }, [loadedImages])

  const handleZoomImage = (image) => {
    if (!zoomedImage) {
      setZoomedImage(image)
      document.body.style.overflowY = 'hidden'
      return
    }

    setZoomedImage(null)
    document.body.style.overflowY = 'visible'
  }
  
  const handleImageLoad = () => {
    setLoading(false)
  }

  const handleImageError = () => {
    setLoading(false)
    setError(true)
  }

  return (
    <div className="slider-container min-h-[300px]">
      {loadedImages.length === 1 ? (
        <div onClick={() => handleZoomImage(loadedImages[0])}>
          {loading && <Spinner />}
          {!loading && !error && (
            <img
              src={loadedImages[0]}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="eager"
              alt="Image 1"
              className="object-contain rounded-lg cursor-zoom-in min-h-[300px]"
            />
          )}
          {error && (
            <img
              src={imageNotFound}
              alt="Image not found"
              loading="eager"
              className="object-contain rounded-lg min-h-[300px]"
            />
          )}
        </div>
      ) : (
        <Slider
          asNavFor={showSecondSlider ? nav2 : null}
          ref={(slider) => (sliderRef1 = slider)}
          arrows={false}
          // Configuración adicional del Slider para manejar el estado de carga y error
          beforeChange={(oldIndex, newIndex) => {
            setLoading(true);
            setError(false);
          }}
          afterChange={(currentSlide) => {
            setLoading(false);
          }}
        >
          {loadedImages.map((image, index) => (
            <div key={index} onClick={() => handleZoomImage(image)}>
              <img
                src={image}
                loading="eager"
                alt={`Image ${index + 1}`}
                className="object-contain rounded-lg cursor-pointer"
              />
            </div>
          ))}
        </Slider>
      )}

      {showSecondSlider && (
        <Slider
          asNavFor={nav1}
          ref={(slider) => (sliderRef2 = slider)}
          slidesToShow={3}
          swipeToSlide={true}
          focusOnSelect={true}
          arrows={false}
          className="dots-slider"
        >
          {loadedImages.map((image, index) => (
            <div className="cursor-pointer" key={index}>
              <img
                src={image}
                loading="eager"
                alt={`Image ${index + 1}`}
                className="object-contain rounded-lg"
              />
            </div>
          ))}
        </Slider>
      )}

      {zoomedImage && (
        <section onClick={() => handleZoomImage(null)}>
          <article className="fixed flex p-5 items-center justify-center z-[9999999] bg-black bg-opacity-75 h-screen w-screen top-0 right-[0] max-sm:min-w-[390px] max-sm:min-h-[650px]">
            <span className="absolute top-5 right-10 text-white font-bold text-4xl cursor-pointer">x</span>
            <img src={zoomedImage} className="rounded-lg object-contain cursor-zoom-in w-[550px]" />
          </article>
        </section>
      )}
    </div>
  )
}
