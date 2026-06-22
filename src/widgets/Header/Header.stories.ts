// import type { Meta, StoryObj } from '@storybook/react';
// import { MemoryRouter } from 'react-router-dom'; 
// import React from 'react';
// import { Header } from './Header';

// const meta: Meta<typeof Header> = {
//   title: 'Widgets/Header',
//   component: Header,
//   parameters: {
//     layout: 'fullscreen',
//   },
//   decorators: [
//     (Story) => React.createElement(MemoryRouter, null, React.createElement(Story)),
//   ],
// };

// export default meta;
// type Story = StoryObj<typeof Header>;

// // Вариант 1: Гость
// export const Unauthorized: Story = {
//   args: {},
// };

// // Вариант 2: Авторизован
// export const Authorized: Story = {
//   args: {
//     userData: {
//       name: 'Мария',
//       avatarUrl: 'https://unsplash.com',
//     },
//   },
// };

// // Вариант 3: Страница авторизации
// export const AuthPage: Story = {
//   args: {
//     isAuthPage: true,
//   },
// };