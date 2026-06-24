import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import styles from './GallerySlider.module.css'
import { NavigationIcon } from '@/shared/ui/Icons'

type GallerySliderProps = {
  images: string[]
}

export const GallerySlider = ({ images }: GallerySliderProps) => {
  const swiperRef = useRef<SwiperType | null>(null)
  const [activeInd, setActiveInd] = useState(0)
  const onSwiper = (swiper: SwiperType) => {
    swiperRef.current = swiper
  }
  const onSlideChange = (swiper: SwiperType) => {
    setActiveInd(swiper.realIndex)
  }

  const thumbs = Array.from({ length: 3 }).map((_, i) => {
    const idx = (activeInd + i + 1) % images.length
    return { idx, src: images[idx] }
  })
  const remaining = images.length - 1 - thumbs.length

  return (
    <div className={styles.gallery}>
      <div className={styles.mainFrame}>
        <Swiper
          onSwiper={onSwiper}
          onSlideChange={onSlideChange}
          slidesPerView={1}
          loop={true}
          style={{ width: '100%', height: '100%' }}
        >
          {images.map((src, index) => (
            <SwiperSlide key={index}>
              <img src={src} alt={`фото${index + 1}`} />
            </SwiperSlide>
          ))}
        </Swiper>
        <button
          className={styles.btnPrev}
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="Предыдущее фото"
        >
          <NavigationIcon />
        </button>
        <button
          className={styles.btnNext}
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="Следующее фото"
        >
          <NavigationIcon />
        </button>
      </div>
      <div className={styles.thumbs}>
        {thumbs.map((thumb, i) => (
          <div key={thumb.idx} className={styles.thumb}>
            <img
              src={thumb.src}
              alt={`миниатюра ${thumb.idx + 1}`}
              onClick={() => swiperRef.current?.slideTo(thumb.idx)}
            />
            {i === thumbs.length - 1 && remaining > 0 && (
              <span className={styles.overlay}>+{remaining}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
