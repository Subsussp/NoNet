import { 
  LayoutDashboard, 
  ShoppingCart, 
  Package, 
  Users, 
  BarChart2, 
  Settings,
} from 'lucide-react';

let navItems = [
    { icon: <LayoutDashboard size={20} className='text-dropicons'/>, label: 'Dashboard', active: true ,href: '/dashboard'},
    { icon: <ShoppingCart className='text-dropicons' size={20} />, label: 'Orders'  ,href: '/orders' },
    { icon: <Package className='text-dropicons' size={20} />, label: 'Products' ,href: '/control' },
    { icon: <Users className='text-dropicons' size={20} />, label: 'Users' ,href: '/users' },
    { icon: <BarChart2 className='text-dropicons' size={20} />, label: 'Analytics' ,href: '/analytics' },
    { icon: <Settings className='text-dropicons' size={20} />, label: 'Settings' ,href: '/Setting' },
  ];

export default navItems