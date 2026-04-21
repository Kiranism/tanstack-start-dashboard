import { NavGroup } from "@/types";

/**
 * Navigation configuration
 *
 * This configuration is used for both the sidebar navigation and Cmd+K bar.
 * Items are organized into groups, each rendered with a SidebarGroupLabel.
 */
export const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      {
        title: "Dashboard",
        url: "/dashboard/overview",
        icon: "dashboard",
        isActive: false,
        shortcut: ["d", "d"],
        items: [],
      },
      {
        title: "Product",
        url: "/dashboard/product",
        icon: "product",
        shortcut: ["p", "p"],
        isActive: false,
        items: [],
      },
      {
        title: "Users",
        url: "/dashboard/users",
        icon: "teams",
        shortcut: ["u", "u"],
        isActive: false,
        items: [],
      },
      {
        title: "Kanban",
        url: "/dashboard/kanban",
        icon: "kanban",
        shortcut: ["k", "k"],
        isActive: false,
        items: [],
      },
      {
        title: "Chat",
        url: "/dashboard/chat",
        icon: "chat",
        shortcut: ["c", "c"],
        isActive: false,
        items: [],
      },
    ],
  },
  {
    label: "Elements",
    items: [
      {
        title: "Forms",
        url: "#",
        icon: "forms",
        isActive: true,
        items: [
          {
            title: "Basic Form",
            url: "/dashboard/forms/basic",
            icon: "forms",
            shortcut: ["f", "f"],
          },
          {
            title: "Multi-Step Form",
            url: "/dashboard/forms/multi-step",
            icon: "forms",
          },
          {
            title: "Sheet & Dialog",
            url: "/dashboard/forms/sheet-form",
            icon: "forms",
          },
          {
            title: "Advanced Patterns",
            url: "/dashboard/forms/advanced",
            icon: "forms",
          },
        ],
      },
      {
        title: "React Query",
        url: "/dashboard/react-query",
        icon: "code",
        isActive: false,
        items: [],
      },
      {
        title: "Icons",
        url: "/dashboard/elements/icons",
        icon: "palette",
        isActive: false,
        items: [],
      },
    ],
  },
  {
    label: "",
    items: [
      {
        title: "Account",
        url: "#",
        icon: "account",
        isActive: true,
        items: [
          {
            title: "Notifications",
            url: "/dashboard/notifications",
            icon: "notification",
            shortcut: ["n", "n"],
          },
        ],
      },
    ],
  },
];
