import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { colors } from '../../theme/tokens';

export type IconName =
  | 'Search'
  | 'MapPin'
  | 'SlidersHorizontal'
  | 'Sparkles'
  | 'CheckCircle2'
  | 'AlertCircle'
  | 'XCircle'
  | 'Building2'
  | 'Bed'
  | 'Home'
  | 'FileText'
  | 'Calendar'
  | 'ShieldCheck'
  | 'KeyRound'
  | 'CreditCard'
  | 'Receipt'
  | 'TrendingDown'
  | 'TrendingUp'
  | 'Percent'
  | 'ArrowDownLeft'
  | 'ArrowUpRight'
  | 'Wallet'
  | 'Wrench'
  | 'Zap'
  | 'Droplets'
  | 'Wifi'
  | 'Wind'
  | 'Clock'
  | 'AlertTriangle'
  | 'Star'
  | 'Award'
  | 'ThumbsUp'
  | 'Check'
  | 'ExternalLink'
  | 'ChevronRight'
  | 'ChevronLeft'
  | 'ChevronDown'
  | 'ChevronUp'
  | 'X'
  | 'Menu'
  | 'Bell'
  | 'User'
  | 'Phone'
  | 'Mail'
  | 'Camera'
  | 'Upload'
  | 'Utensils'
  | 'Coffee'
  | 'Shield'
  | 'RefreshCw'
  | 'LogOut'
  | 'Eye'
  | 'EyeOff'
  | 'Lock'
  | 'Share2'
  | 'Plus'
  | 'Copy'
  | 'QrCode'
  | 'CheckSquare'
  | 'Users'
  | 'MessageSquare'
  | 'Send'
  | 'Sliders';

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: any;
}

export const Icon: React.FC<IconProps> = ({
  name,
  size = 20,
  color = colors.text,
  strokeWidth = 2,
  style,
}) => {
  const IconComponent = (LucideIcons as any)[name] || LucideIcons.HelpCircle;
  return <IconComponent size={size} color={color} strokeWidth={strokeWidth} style={style} />;
};
