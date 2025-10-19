'use client'
import { useTheme } from "@/context/ThemeContext";
import { Button, Tooltip } from "antd";
import { MoonOutlined, SunOutlined } from '@ant-design/icons';
import { FaRegMoon } from "react-icons/fa";
import { IoSunnyOutline } from "react-icons/io5";

export default function ThemeToggler() {
    const { theme, toggleTheme } = useTheme();

    return (
        <Button
            type="text"
            icon={theme === 'light' ?
                <Tooltip title='Dark'>
                    <FaRegMoon size={20} className="dark:text-black text-white" />
                </Tooltip>
                :
                <Tooltip title='Light'>
                    <IoSunnyOutline size={20} className="text-white" />
                </Tooltip>
            }
            onClick={toggleTheme}
            className="text-gray-900 bg-slate-500"
            style={{ width: 40, height: 40 }}
        />
    );
}