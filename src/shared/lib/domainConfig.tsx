import React from 'react';
import {
  BriefcaseIcon,
  GlobalIcon,
  HomeIcon,
  PaletteIcon,
  BookIcon,
  LifestyleIcon,
} from '@/shared/ui/Icons/index';


export const domainConfig: Record<string, { icon: React.ReactNode; bgColor: string }> = {
  '1': {
    icon: <PaletteIcon size={18} color="#253017" />,
    bgColor: '#F7E7F2'
  },
  '2': {
    icon: <BookIcon size={19} color="#253017" />,
    bgColor: '#E7F2F6',
  },
  '3': {
    icon: <GlobalIcon size={19} color="#253017" />,
    bgColor: '#EBE5C5', // Дом и уют
  },
  '4': {
    icon: <HomeIcon size={19} color="#253017" />,
    bgColor: '#F7EBE5', // Творчество (можно заменить)
  },
  '5': {
    icon: <BriefcaseIcon size={19} color="#253017" />,
    bgColor: '#EEE7F7', // Образование и развитие
  },
  '6': {
    icon: <LifestyleIcon size={19} color="#253017" />,
    bgColor: '#E9F7E7', // Здоровье и лайфстайл
  },
};
