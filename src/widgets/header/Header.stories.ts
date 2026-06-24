import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router-dom'; 
import React from 'react';
import { Header } from './Header';

const meta: Meta<typeof Header> = {
  title: 'Widgets/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => React.createElement(MemoryRouter, null, React.createElement(Story)),
  ],
};

export default meta;
type Story = StoryObj<typeof Header>;

// Гость
export const Unauthorized: Story = {
  args: {},
};

// Авторизован
export const Authorized: Story = {
  args: {
    userData: {
      name: 'Анна',
      avatarUrl: '/avatars/01-anna-volkova.jpg',
    },
  },
};

// Страница авторизации
export const AuthPage: Story = {
  args: {
    isAuthPage: true,
  },
};

