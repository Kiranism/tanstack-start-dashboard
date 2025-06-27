import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { UserSettingsForm } from "./settings-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/data/users";

export default function SettingsView() {
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);

  // Fetch the current user (in a real app, this would be from auth context)
  const { data: userData } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      getUsers({
        data: {
          page: 0,
          pageSize: 10,
        },
      }),
  });

  // For demo purposes, we'll use the first user as the current user
  const user = userData?.users?.[0];

  const handleEditSettings = () => {
    setCurrentUser(user);
    setOpen(true);
  };

  return (
    <div className="py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">User Settings</h1>
        <Button onClick={handleEditSettings}>Edit Settings</Button>
      </div>

      {user && (
        <Card>
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>
              View and manage your account settings
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Name
                </h3>
                <p>{user.name}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Email
                </h3>
                <p>{user.email}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Role
                </h3>
                <p>{user.role}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Status
                </h3>
                <p>{user.status}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground">
                  Join Date
                </h3>
                <p>{user.joinDate}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <UserSettingsForm
        open={open}
        onOpenChange={setOpen}
        initialData={currentUser}
        onSuccess={(updatedUser) => {
          console.log("User updated:", updatedUser);
        }}
      />
    </div>
  );
}
