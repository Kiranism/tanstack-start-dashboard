import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

export type User = {
  id: number;
  name: string;
  email: string;
  role: "Admin" | "User" | "Moderator";
  status: "Active" | "Inactive";
  avatar: string;
  joinDate: string;
};

// Sample users data
export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    avatar: "",
    joinDate: "2024-01-15",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "User",
    status: "Active",
    avatar: "",
    joinDate: "2024-01-20",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    role: "Moderator",
    status: "Inactive",
    avatar: "",
    joinDate: "2024-01-10",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice.williams@example.com",
    role: "User",
    status: "Active",
    avatar: "",
    joinDate: "2024-02-05",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    role: "User",
    status: "Inactive",
    avatar: "",
    joinDate: "2024-01-25",
  },
  {
    id: 6,
    name: "Diana Prince",
    email: "diana.prince@example.com",
    role: "Moderator",
    status: "Active",
    avatar: "",
    joinDate: "2024-02-10",
  },
  {
    id: 7,
    name: "Edward Norton",
    email: "edward.norton@example.com",
    role: "User",
    status: "Active",
    avatar: "",
    joinDate: "2024-02-15",
  },
];

// Server function to get users with filtering and pagination
export const getUsers = createServerFn({ method: "GET" })
  .validator(
    z.object({
      page: z.number().default(0),
      pageSize: z.number().default(10),
      search: z.string().optional(),
      status: z.enum(["Active", "Inactive", "All"]).optional(),
      role: z.enum(["Admin", "User", "Moderator", "All"]).optional(),
    })
  )
  .handler(async ({ data }) => {
    const { page, pageSize, search, status, role } = data;

    // Simulate a delay to show loading states
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Apply filters
    let filteredUsers = [...users];

    if (search) {
      const searchLower = search.toLowerCase();
      filteredUsers = filteredUsers.filter(
        (user) =>
          user.name.toLowerCase().includes(searchLower) ||
          user.email.toLowerCase().includes(searchLower)
      );
    }

    if (status && status !== "All") {
      filteredUsers = filteredUsers.filter((user) => user.status === status);
    }

    if (role && role !== "All") {
      filteredUsers = filteredUsers.filter((user) => user.role === role);
    }

    // Calculate pagination
    const totalCount = filteredUsers.length;
    const totalPages = Math.ceil(totalCount / pageSize);
    const paginatedUsers = filteredUsers.slice(
      page * pageSize,
      (page + 1) * pageSize
    );

    // Return paginated data with metadata
    return {
      users: paginatedUsers,
      pagination: {
        page,
        pageSize,
        totalCount,
        totalPages,
      },
      stats: {
        totalUsers: users.length,
        activeUsers: users.filter((user) => user.status === "Active").length,
        newThisMonth: users.filter((user) => {
          const joinDate = new Date(user.joinDate);
          const now = new Date();
          return (
            joinDate.getMonth() === now.getMonth() &&
            joinDate.getFullYear() === now.getFullYear()
          );
        }).length,
      },
    };
  });

export const getUser = createServerFn({ method: "GET" }).handler(async () => {
  const userData = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Admin",
    status: "Active",
    avatar: "",
    joinDate: "2024-01-15",
  };
  return userData;
});
