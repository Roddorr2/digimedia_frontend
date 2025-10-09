export const dashboardLinks = [
  { title: "Sección Principal", href: "/dashboard/main"},
  {
    title: "Empleados",
    href: "/dashboard/empleados",
    permission: "ver-empleados",
  },
  {
    title: "Contactanos",
    href: "/dashboard/contactanos",
    permission: "ver-contactos",
  },
  { title: "Modales", href: "/dashboard/modales", permission: "ver-modales" },
  {
    title: "Reclamaciones",
    href: "/dashboard/reclamaciones",
    permission: "ver-reclamaciones",
  },
  { title: "Blogs", href: "/dashboard/blogs", permission: "crear-blogs" },
  {
    title: "Roles y Permisos",
    href: "/dashboard/role-permission",
    role: "administrador",
  },
];
