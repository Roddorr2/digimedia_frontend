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
    title: "Roles y Permisos",
    href: "/dashboard/role-permission",
    role: "administrador",
    icon: HandCoins,
  },
  {
    title: "Métricas",
    href: "/dashboard/metricas",
    icon: ChartColumn,
    role: "administrador",
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
