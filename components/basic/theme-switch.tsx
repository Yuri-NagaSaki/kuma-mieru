'use client';

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react';
import { motion } from 'framer-motion';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

const mode = {
  light: {
    icon: <Sun size={22} />,
    text: 'modeLight',
  },
  dark: {
    icon: <Moon size={22} />,
    text: 'modeDark',
  },
  system: {
    icon: <Monitor size={22} />,
    text: 'modeSystem',
  },
};

export const ThemeSwitch = ({
  radius,
}: {
  radius?: 'none' | 'full' | 'sm' | 'md' | 'lg' | undefined;
}) => {
  const t = useTranslations();
  const { theme, setTheme } = useTheme();

  return (
    <Dropdown aria-label="Switch Theme">
      <DropdownTrigger>
        <Button isIconOnly variant="light" radius={radius} className="text-default-500">
          {theme === 'system' ? (
            <div key={theme}>{mode[theme as keyof typeof mode].icon}</div>
          ) : (
            <motion.div
              key={theme} // 根据主题变化设置唯一 key
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {mode[theme as keyof typeof mode].icon}
            </motion.div>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Switch Theme" variant="faded">
        {Object.entries(mode).map(([key, value]) => (
          <DropdownItem
            key={key}
            startContent={<div className="w-6 h-6">{value.icon}</div>}
            onPress={() => setTheme(key)}
            className="flex flex-row items-center gap-2 text-default-500"
          >
            {t(value.text)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
};
