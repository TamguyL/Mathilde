import React from 'react';
import { useFetchData } from "../../data/useFetchData";
import './header.css'
import HiddenEditButton from '../EditButton/HiddenEditButton'
            

interface menu {
    menu: string,
}
const Header: React.FC = () => {
    const { data, loading, error } = useFetchData<{ menuValue: menu[] }>();
    if (loading) {
        console.log('Loading data...');
    }
    
    if (error) {
        console.log(`Error: ${error}`);
    }

    const transformMenu = (menu: string): string => {
        return menu.charAt(0).toLowerCase();
    };

    return (
        <header className="fondSaumon">
            <nav>
                {data?.menuValue.map((item, index) => (
                    <a key={index} className="lien" href={`#${transformMenu(item.menu)}`}>{item.menu}</a>
                ))}
            </nav>
            <HiddenEditButton/>
        </header>
    );
};
export default Header;
