import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { zodValidator } from "@tanstack/zod-adapter";
import PageContainer from "@/components/layout/page-container";
import UserListingPage from "@/features/users/components/user-listing";
import { usersInfoContent } from "@/features/users/info-content";
import { UserFormSheetTrigger } from "@/features/users/components/user-form-sheet";

const usersSearchSchema = z.object({
  page: z.number().optional().default(1),
  perPage: z.number().optional().default(10),
  name: z.string().optional(),
  gender: z.string().optional(),
  role: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute("/dashboard/users")({
  head: () => ({ meta: [{ title: "Dashboard: Users" }] }),
  validateSearch: zodValidator(usersSearchSchema),
  component: UsersPage,
});

function UsersPage() {
  return (
    <PageContainer
      pageTitle="Users"
      pageDescription="Manage users (React Query + search params table pattern.)"
      infoContent={usersInfoContent}
      pageHeaderAction={<UserFormSheetTrigger />}
    >
      <UserListingPage />
    </PageContainer>
  );
}
