import styles from './IllustratedGuide.module.css'
import { IllustrationProps } from '@/shared/ui/Illustrations'
import React from 'react'
import { FC } from 'react'

type IllustratedGuideProps = {
  ImageComponent: React.ComponentType<IllustrationProps>
  title: string
  description: string
}

export const IllustratedGuide: FC<IllustratedGuideProps> = ({
  ImageComponent,
  title,
  description,
}) => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.image_wrapper}>
          <ImageComponent width={300} height={300} />
        </div>
        <div className={styles.text_wrapper}>
          <h2 className={styles.header}>{title}</h2>
          <span className={styles.description}>{description}</span>
        </div>
      </div>
    </>
  )
}
