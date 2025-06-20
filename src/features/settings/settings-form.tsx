import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppForm } from "@/components/ui/tanstack-form";
import { useCallback } from "react";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { User } from "@/data/users";
import { useQueryClient } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

// Define the roles and statuses from the sample data
const ROLES = ["Admin", "User", "Moderator"];
const STATUSES = ["Active", "Inactive"];

// Define the form schema with validation
const UserSettingsFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  role: z.string().min(1, {
    message: "Please select a role.",
  }),
  status: z.string().min(1, {
    message: "Please select a status.",
  }),
});

interface UserSettingsFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: (user: User) => void;
  initialData?: Partial<User>;
}

export function UserSettingsForm({
  open,
  onOpenChange,
  onSuccess,
  initialData,
}: UserSettingsFormProps) {
  const queryClient = useQueryClient();
  const isEditing = !!initialData?.id;

  // Create form with validation
  const form = useAppForm({
    validators: { onChange: UserSettingsFormSchema },
    defaultValues: {
      name: initialData?.name || "",
      email: initialData?.email || "",
      role: initialData?.role || "",
      status: initialData?.status || "",
    },
    onSubmit: async ({ value }) => {
      // Create a new user object
      const updatedUser: User = {
        id: initialData?.id || Math.floor(Math.random() * 1000),
        name: value.name,
        email: value.email,
        role: value.role as "Admin" | "User" | "Moderator",
        status: value.status as "Active" | "Inactive",
        avatar: initialData?.avatar || "",
        joinDate:
          initialData?.joinDate || new Date().toISOString().split("T")[0],
      };

      // In a real app, you would call an API here
      // For now, we'll just invalidate the query to refresh the data
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate API call

      // Invalidate queries to refresh the data
      queryClient.invalidateQueries({ queryKey: ["users"] });

      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess(updatedUser);
      }

      // Close the dialog
      onOpenChange(false);
    },
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();
    },
    [form]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? "Edit User Settings" : "Create New User"}
          </DialogTitle>
        </DialogHeader>
        <form.AppForm>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <form.AppField
              name="name"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Name</field.FormLabel>
                  <field.FormControl>
                    <Input
                      placeholder="John Doe"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="email"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Email</field.FormLabel>
                  <field.FormControl>
                    <Input
                      type="email"
                      placeholder="john.doe@example.com"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="role"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Role</field.FormLabel>
                  <field.FormControl>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onOpenChange={field.handleBlur}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        {ROLES.map((role) => (
                          <SelectItem key={role} value={role}>
                            {role}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <form.AppField
              name="status"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>Status</field.FormLabel>
                  <field.FormControl>
                    <Select
                      value={field.state.value}
                      onValueChange={field.handleChange}
                      onOpenChange={field.handleBlur}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUSES.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />

            <div className="flex justify-end space-x-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {isEditing ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </form.AppForm>
      </DialogContent>
    </Dialog>
  );
}
