import type { Meta, StoryObj } from '@storybook/react-vite'
import { MemoryRouter } from 'react-router-dom'
import { CardSkill } from './CardSkill'

const meta = {
  title: 'Widgets/CardSkill',
  component: CardSkill,
  parameters: {
    layout: 'padded',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
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
  },
} satisfies Meta<typeof CardSkill>

export default meta
type Story = StoryObj<typeof meta>

export const Home: Story = {
  args: {
    pageVariant: 'home',
    buttonVariant: 'primary',
  },
}

export const HomeLiked: Story = {
  args: {
    ...Home.args,
  },
}

export const Register: Story = {
  args: {
    pageVariant: 'register',
    buttonVariant: 'primary',
  },
}
