import { SignInButton, UserButton, useUser } from "@clerk/tanstack-react-start";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const user = useUser();
  const nameFromParts = [user.user?.firstName, user.user?.lastName].filter(Boolean).join(" ");
  const displayName =
    user.user?.fullName ||
    nameFromParts ||
    user.user?.username ||
    user.user?.primaryEmailAddress?.emailAddress ||
    user.user?.primaryPhoneNumber?.phoneNumber ||
    "User";

  if (!user.isLoaded) {
    return <div className="p-6">Loading...</div>;
  }

  if (!user.user) {
    return (
      <div className="p-6">
        <SignInButton />
      </div>
    );
  }

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p>Welcome {displayName}</p>
      <UserButton />
    </div>
  );
}
