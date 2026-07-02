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
      '/images/skills/106-osnovy-ui-ux-dizayna.jpg',
      '/images/skills/107-igra-na-barabanah.jpg',
      '/images/skills/103-osnovy-fotografii.jpg',
    ],
    mainButtonLabel: 'Предложить обмен',
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
    isLiked: true,
  },
}

export const HomeOffered: Story = {
  args: {
    ...Home.args,
    isOffered: true,
    mainButtonLabel: 'Ожидание',
  },
}

export const Register: Story = {
  args: {
    pageVariant: 'register',
    buttonVariant: 'primary',
  },
}
