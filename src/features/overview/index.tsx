import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  Package,
  ShoppingCart,
  TrendingUp,
  TrendingDown,
  Plus,
} from "lucide-react";
import { AreaChartStacked } from "./area-chart";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1%",
    trend: "up" as const,
    icon: BarChart3,
  },
  {
    title: "Total Users",
    value: "2,350",
    change: "+180.1%",
    trend: "up" as const,
    icon: Users,
  },
  {
    title: "Total Products",
    value: "12,234",
    change: "+19%",
    trend: "up" as const,
    icon: Package,
  },
  {
    title: "Total Orders",
    value: "573",
    change: "+201",
    trend: "up" as const,
    icon: ShoppingCart,
  },
];

const recentActivities = [
  {
    title: "New user registration",
    description: "John Doe just signed up",
    time: "2 minutes ago",
    type: "user",
  },
  {
    title: "Order completed",
    description: "Order #1234 has been completed",
    time: "5 minutes ago",
    type: "order",
  },
  {
    title: "Product updated",
    description: "iPhone 15 Pro details updated",
    time: "10 minutes ago",
    type: "product",
  },
  {
    title: "Payment received",
    description: "$299.00 payment received",
    time: "15 minutes ago",
    type: "payment",
  },
];

export function DashboardOverview() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your business today.
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-xs text-muted-foreground">
                {stat.trend === "up" ? (
                  <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Chart Placeholder */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardDescription>
              Your revenue and sales overview for the last 12 months
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <AreaChartStacked />
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest business activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.title}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {activity.description}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.time}
                    </p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Common tasks you can perform quickly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button variant="outline" className="h-20 flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Manage Users</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Package className="h-6 w-6 mb-2" />
              <span>Add Product</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <span>View Orders</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <BarChart3 className="h-6 w-6 mb-2" />
              <span>Analytics</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
