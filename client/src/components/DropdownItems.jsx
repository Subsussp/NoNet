import React from 'react';
import { Database, User,DoorClosed , Eye, BoxIcon, Paintbrush, Compass, Settings, Globe2, Moon, GraduationCap, HelpCircle, LifeBuoy, PersonStanding, Command } from 'lucide-react';
import { LiaShoppingBagSolid ,LiaFanSolid} from "react-icons/lia";
import { FaMoneyBill } from "react-icons/fa";
const menuItems = [
  { icon: <Command size={20} />, label: 'Admin',link: '/admin' ,admin:true},
  { icon: <BoxIcon size={20} />, label: 'Your Inventory',link: '/control',admin:true},
  { icon: <FaMoneyBill size={20} />, label: 'Place Order' ,link: '/proccess'},
    { icon: <User size={20} />, label: 'Profile' ,link: '/profile'},
    // { icon: <Database size={20} />, label: 'Dashboard',link: '/dashboard' },
    { icon: <LiaShoppingBagSolid size={20} />, label: 'Cart',link: '/cart',require:true},
    // { icon: <Eye size={20} />, label: 'Watchlist',link: '' },
    // { icon: <BoxIcon size={20} />, label: 'Your orders',link: '' },
    
    { icon: <DoorClosed size={20} />, label: 'Logout' ,link: '/logout',require:true},
    { divider: true },
    // { icon: <Settings size={20} />, label: 'Settings' ,link: '/Settings'},
    // { icon: <Globe2 size={20}/>, label: 'Language', suffix: 'en >',link: '' },
    { 
      icon: <Moon size={20} className='text-two' />, 
      label: 'Night Mode',
      toggle: true
    },
    { divider: true },
    // { icon: <GraduationCap size={20} />, label: 'Learn' ,link: ''},
    // { icon: <HelpCircle size={20} />, label: 'Help center' ,href: ''},
    { icon: <LifeBuoy size={20} />, label: 'Support', href: 'https://api.whatsapp.com/send?phone=01091244232'}
  ];

export default menuItems