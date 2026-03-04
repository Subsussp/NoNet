import React from 'react';
import { Database, User,DoorClosed , Eye, BoxIcon, Paintbrush, Compass, Settings, Globe2, Moon, GraduationCap, HelpCircle, LifeBuoy, PersonStanding, Command } from 'lucide-react';
import { LiaShoppingBagSolid ,LiaFanSolid} from "react-icons/lia";
import { FaMoneyBill } from "react-icons/fa";
const menuItems = [
  { icon: <Command size={20} />, label: 'Admin',link: '/admin' ,admin:true,renderforadmin:true},
  { icon: <BoxIcon size={20} />, label: 'Your Inventory',link: '/control',admin:true,renderforadmin:false},
    { icon: <User size={20} />, label: 'Profile' ,link: '/profile',require:false,renderforadmin:true},
  { icon: <FaMoneyBill size={20} />, label: 'Place Order' ,link: '/process',require:false , renderforadmin:false},
    // { icon: <Database size={20} />, label: 'Dashboard',link: '/dashboard' },
    { icon: <LiaShoppingBagSolid size={20} />, label: 'Cart',link: '/cart',require:true,renderforadmin:false},
    // { icon: <Eye size={20} />, label: 'Watchlist',link: '' },
    // { icon: <BoxIcon size={20} />, label: 'Your orders',link: '' },
    
    { icon: <DoorClosed size={20} />, label: 'Logout' ,link: '/logout',require:true,renderforadmin:true},
    { divider: true ,require:true},
    // { icon: <Settings size={20} />, label: 'Settings' ,link: '/Settings'},
    // { icon: <Globe2 size={20}/>, label: 'Language', suffix: 'en >',link: '' },
    { 
      icon: <Moon size={20} className='text-two' />, 
      label: 'Night Mode',
      toggle: true
    },
    { divider: true ,toggle:true},
    // { icon: <GraduationCap size={20} />, label: 'Learn' ,link: ''},
    // { icon: <HelpCircle size={20} />, label: 'Help center' ,href: ''},
    { icon: <LifeBuoy size={20} />,require:false,renderforadmin:true, label: 'Support', href: 'https://api.whatsapp.com/send?phone=2001091244232'}
  ];

export default menuItems