import { createFileRoute } from "@tanstack/react-router";
import { queryOptions } from "@tanstack/react-query";
import { Suspense } from "react";
import PageContainer from "@/components/layout/page-container";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardFooter,
} from "@/components/ui/card";
import { Icons } from "@/components/icons";
import { delay } from "@/constants/mock-api";
import { BarGraph } from "@/features/overview/components/bar-graph";
import { BarGraphSkeleton } from "@/features/overview/components/bar-graph-skeleton";
import { RecentSales } from "@/features/overview/components/recent-sales";
import { RecentSalesSkeleton } from "@/features/overview/components/recent-sales-skeleton";
import { AreaGraph } from "@/features/overview/components/area-graph";
import { AreaGraphSkeleton } from "@/features/overview/components/area-graph-skeleton";
import { PieGraph } from "@/features/overview/components/pie-graph";
import { PieGraphSkeleton } from "@/features/overview/components/pie-graph-skeleton";
import { useSuspenseQuery } from "@tanstack/react-query";
import { ErrorBoundary } from "@/components/error-boundary";

const barStatsQuery = queryOptions({
  queryKey: ["overview", "barStats"],
  queryFn: async () => {
    await delay(1000);
    return { ready: true };
  },
});

const salesQuery = queryOptions({
  queryKey: ["overview", "sales"],
  queryFn: async () => {
    await delay(3000);
    return { ready: true };
  },
});

const areaStatsQuery = queryOptions({
  queryKey: ["overview", "areaStats"],
  queryFn: async () => {
    await delay(2000);
    return { ready: true };
  },
});

const pieStatsQuery = queryOptions({
  queryKey: ["overview", "pieStats"],
  queryFn: async () => {
    await delay(1000);
    return { ready: true };
  },
});

export const Route = createFileRoute("/dashboard/overview")({
  loader: ({ context: { queryClient } }) => {
    queryClient.prefetchQuery(barStatsQuery);
    queryClient.prefetchQuery(salesQuery);
    queryClient.prefetchQuery(areaStatsQuery);
    queryClient.prefetchQuery(pieStatsQuery);
  },
  component: OverviewPage,
});

function OverviewPage() {
  return (
    <PageContainer>
      <div className="flex flex-1 flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Hi, Welcome back 👋</h2>
        </div>
        <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:shadow-xs md:grid-cols-2 lg:grid-cols-4">
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Total Revenue</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                $1,250.00
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icons.trendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Trending up this month <Icons.trendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Visitors for the last 6 months</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>New Customers</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                1,234
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icons.trendingDown />
                  -20%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Down 20% this period <Icons.trendingDown className="size-4" />
              </div>
              <div className="text-muted-foreground">Acquisition needs attention</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Active Accounts</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                45,678
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icons.trendingUp />
                  +12.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Strong user retention <Icons.trendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Engagement exceed targets</div>
            </CardFooter>
          </Card>
          <Card className="@container/card">
            <CardHeader>
              <CardDescription>Growth Rate</CardDescription>
              <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
                4.5%
              </CardTitle>
              <CardAction>
                <Badge variant="outline">
                  <Icons.trendingUp />
                  +4.5%
                </Badge>
              </CardAction>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="line-clamp-1 flex gap-2 font-medium">
                Steady performance increase <Icons.trendingUp className="size-4" />
              </div>
              <div className="text-muted-foreground">Meets growth projections</div>
            </CardFooter>
          </Card>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-7">
          <div className="col-span-4">
            <ErrorBoundary fallback={<BarGraphSkeleton />}>
              <Suspense fallback={<BarGraphSkeleton />}>
                <SuspenseBarGraph />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="col-span-4 md:col-span-3">
            <ErrorBoundary fallback={<RecentSalesSkeleton />}>
              <Suspense fallback={<RecentSalesSkeleton />}>
                <SuspenseSales />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="col-span-4">
            <ErrorBoundary fallback={<AreaGraphSkeleton />}>
              <Suspense fallback={<AreaGraphSkeleton />}>
                <SuspenseAreaGraph />
              </Suspense>
            </ErrorBoundary>
          </div>
          <div className="col-span-4 min-h-0 md:col-span-3">
            <ErrorBoundary fallback={<PieGraphSkeleton />}>
              <Suspense fallback={<PieGraphSkeleton />}>
                <SuspensePieGraph />
              </Suspense>
            </ErrorBoundary>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}

function SuspenseBarGraph() {
  useSuspenseQuery(barStatsQuery);
  return <BarGraph />;
}

function SuspenseSales() {
  useSuspenseQuery(salesQuery);
  return <RecentSales />;
}

function SuspenseAreaGraph() {
  useSuspenseQuery(areaStatsQuery);
  return <AreaGraph />;
}

function SuspensePieGraph() {
  useSuspenseQuery(pieStatsQuery);
  return <PieGraph />;
}
