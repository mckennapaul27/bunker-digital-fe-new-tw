import {
  Zap,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Globe,
  Settings,
  TrendingUp,
  Target,
  Code,
  Server,
  Search,
  Palette,
  Edit3,
  Timer,
  Layers,
  ClipboardList,
  Hammer,
  Rocket,
  // Add more icons as needed
  type LucideIcon,
} from "lucide-react";

// Map icon codes from Storyblok to Lucide React icons
export const iconMap: Record<string, LucideIcon> = {
  Zap,
  Smartphone,
  ShieldCheck,
  BarChart3,
  Globe,
  Settings,
  TrendingUp,
  Target,
  Code,
  Server,
  Search,
  Palette,
  Edit3,
  Timer,
  Layers,
  ClipboardList,
  Hammer,
  Rocket,
  // Add more mappings as needed
};

// Helper function to get icon component from icon code
export function getIcon(iconCode?: string): LucideIcon | null {
  if (!iconCode) return null;
  return iconMap[iconCode] || null;
}
