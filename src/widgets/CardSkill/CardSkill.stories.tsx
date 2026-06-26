import type { Meta, StoryObj } from '@storybook/react-vite'
import { fn } from 'storybook/test'
import { CardSkill } from './CardSkill'

const meta = {
  title: 'Widgets/CardSkill',
  component: CardSkill,
  parameters: {
    layout: 'padded',
  },
  args: {
    title: 'Игра на гитаре',
    domain: 'Творчество и искусство',
    category: 'Музыка и звук',
    description:
      'Покажу базовые аккорды и бой, разберём пару песен под акустику. Подойдёт для полных новичков.',
    images: [
      'https://placehold.co/640x480?text=Photo+1',
      'https://placehold.co/640x480?text=Photo+2',
      'https://placehold.co/640x480?text=Photo+3',
    ],
    mainButtonLabel: 'Предложить обмен',
    onMainClick: fn(),
  },
} satisfies Meta<typeof CardSkill>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {
  args: {
    variant: 'home',
    isLiked: false,
    onLikeClick: fn(),
    onShareClick: fn(),
    onMoreClick: fn(),
  },
}

export const HomeLiked: Story = {
  args: {
    ...Home.args,
    isLiked: true,
  },
}

export const Register: Story = {
  args: {
    variant: 'register',
    secondaryButtonLabel: 'Редактировать',
    onSecondaryClick: fn(),
  },
}
