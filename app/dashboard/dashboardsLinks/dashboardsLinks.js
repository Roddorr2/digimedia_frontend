import { icon } from "@fortawesome/fontawesome-svg-core";
import {
  ChartColumn,
  Component,
  FileText,
  HandCoins,
  Home,
  Logs,
  Mail,
  Settings,
  User,
  PhoneCall,
  Megaphone,
  Shield,
  KeyIcon,
  MessageSquareQuote,
} from "lucide-react";

export const dashboardLinks = [
  { title: "Sección Principal", href: "/dashboard/main", icon: Home },
  {
    title: "Empleados",
    href: "/dashboard/empleados",
    permission: "ver-empleados",
    role: "administrador, marketing",
    icon: User,
  },
  {
    title: "Contactanos",
    href: "/dashboard/contactanos",
    permission: "ver-contactos",
    icon: Mail,
  },
  {
    title: "Modales",
    href: "/dashboard/modales",
    permission: "ver-modales",
    icon: Component,
  },
  {
    title: "Roles",
    href: "/dashboard/roles",
    role: "administrador",
    icon: Shield,
  },
  {
    title: "Permisos",
    href: "/dashboard/permisos",
    role: "administrador",
    icon: KeyIcon,
  },
  {
    title: "Reclamaciones",
    href: "/dashboard/reclamaciones",
    permission: "ver-reclamaciones",
    icon: FileText,
  },
  {
    title: "Blogs",
    href: "/dashboard/blogs",
    permission: "crear-blogs",
    icon: Logs,
  },
  {
    title: "Testimonios",
    href: "/dashboard/testimonios",
    role: "administrador, marketing",
    icon: MessageSquareQuote,
  },
  {
    title: "Métricas",
    href: "/dashboard/metricas",
    icon: ChartColumn,
    role: "administrador, marketing",
  },
  {
    title: "WhatsApp",
    href: "/dashboard/whatsapp",
    icon: PhoneCall,
    role: "administrador, marketing",
  },
  {
    title: "Campañas",
    href: "/dashboard/campanias",
    icon: Megaphone,
    role: "marketing, administrador",
  },
];
