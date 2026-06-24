import type { Meta, StoryObj } from '@storybook/react-vite'
import { GallerySlider } from './GallerySlider'

const meta: Meta<typeof GallerySlider> = {
  title: 'Shared/GallerySlider',
  component: GallerySlider,
  tags: ['autodocs'],
}

export default meta

type Story = StoryObj<typeof GallerySlider>

export const SingleImage: Story = {
  args: {
    images: ['/images/skills/103-osnovy-fotografii.jpg'],
  },
}

export const FourImages: Story = {
  args: {
    images: [
      '/images/skills/103-osnovy-fotografii.jpg',
      '/images/skills/107-igra-na-barabanah.jpg',
      '/images/skills/106-osnovy-ui-ux-dizayna.jpg',
      '/images/skills/110-vyazanie.jpg',
    ],
  },
}

export const FiveImages: Story = {
  args: {
    images: [
      '/images/skills/103-osnovy-fotografii.jpg',
      '/images/skills/107-igra-na-barabanah.jpg',
      '/images/skills/106-osnovy-ui-ux-dizayna.jpg',
      '/images/skills/110-vyazanie.jpg',
      '/images/skills/102-angliyskiy-yazyk.jpg',
    ],
  },
}

export const AllSkillImages: Story = {
  args: {
    images: [
      '/images/skills/103-osnovy-fotografii.jpg',
      '/images/skills/107-igra-na-barabanah.jpg',
      '/images/skills/106-osnovy-ui-ux-dizayna.jpg',
      '/images/skills/110-vyazanie.jpg',
      '/images/skills/102-angliyskiy-yazyk.jpg',
      '/images/skills/116-inostrannye-yazyki.jpg',
      '/images/skills/101-nastavnichestvo-v-it.jpg',
      '/images/skills/115-shahmaty.jpg',
      '/images/skills/112-samoprezentatsiya.jpg',
      '/images/skills/104-meditatsiya.jpg',
      '/images/skills/114-plavanie-i-dayving.jpg',
      '/images/skills/111-orientirovanie-na-mestnosti.jpg',
      '/images/skills/108-vypechka-pirozhkov.jpg',
      '/images/skills/117-prigotovlenie-kofe.jpg',
      '/images/skills/118-uhod-za-rasteniyami.jpg',
      '/images/skills/105-sborka-mebeli.jpg',
      '/images/skills/113-avtoremont.jpg',
      '/images/skills/109-smm-kontent-marketing.jpg',
      '/images/skills/100-taym-menedzhment.jpg',
      '/images/skills/119-gigantskiy-mech.jpg',
    ],
  },
}