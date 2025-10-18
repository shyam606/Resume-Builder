'use client'
import { useTheme } from "@/context/ThemeContext";
import { Button } from "antd";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            type="text"
            icon={theme === 'light' ? <MoonOutlined /> : <SunOutlined />}
            onClick={toggleTheme}
            className="text-gray-900 dark:text-gray-100 dark:hover:!bg-gray-800"
            style={{ width: 40, height: 40 }}
        />
    );
}