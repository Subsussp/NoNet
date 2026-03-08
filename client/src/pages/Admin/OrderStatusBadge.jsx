import { CheckCircle, Clock, Truck, AlertCircle } from "react-feather";

const statusConfig = {
  pending: {
    bgLight: 'rgba(29, 107, 146, 0.08)',
    bgDark: 'rgba(29, 107, 146, 0.15)',
    textColor: 'text-[#1d6b92]',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    icon: Clock,
    label: 'Pending',
  },
  processing: {
    bgLight: 'rgba(16, 70, 97, 0.08)',
    bgDark: 'rgba(16, 70, 97, 0.15)',
    textColor: 'text-[#104661]',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    icon: Clock,
    label: 'Processing',
  },
  shipped: {
    bgLight: 'rgba(29, 107, 146, 0.08)',
    bgDark: 'rgba(29, 107, 146, 0.15)',
    textColor: 'text-[#1d6b92]',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    icon: Truck,
    label: 'Shipped',
  },
  delivered: {
    bgLight: 'rgba(16, 70, 97, 0.08)',
    bgDark: 'rgba(16, 70, 97, 0.15)',
    textColor: 'text-[var(--mainele)]',
    borderColor: 'rgba(0, 0, 0, 0.25)',
    icon: CheckCircle,
    label: 'Delivered',
  },
  cancelled: {
    bgLight: 'rgba(0, 0, 0, 0.05)',
    bgDark: 'rgba(0, 0, 0, 0.12)',
    textColor: 'text-[#000]',
    borderColor: 'rgba(255, 0, 0, 0.2)',
    icon: AlertCircle,
    label: 'Cancelled',
  },
};

export const OrderStatusBadge = ({ status, className = "" }) => {
  const config = statusConfig[status] || statusConfig.pending;
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center px-2 py-1 text-xs font-semibold rounded ${config.textColor} ${className}`}
      style={{
        backgroundColor: config.bgLight,
        border: `1px solid ${config.borderColor}`,
      }}
    >
      <Icon size={14} className="mr-1" />
      {config.label}
    </span>
  );
};