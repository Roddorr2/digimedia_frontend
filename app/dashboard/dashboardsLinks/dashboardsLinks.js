import {
  Component,
  FileText,
  HandCoins,
  Home,
  Logs,
  Mail,
  User,
} from "lucide-react";

export const dashboardLinks = [
  { title: "Sección Principal", href: "/dashboard/main", icon: Home },
  {
    title: "Empleados",
    href: "/dashboard/empleados",
    permission: "ver-empleados",
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
];
