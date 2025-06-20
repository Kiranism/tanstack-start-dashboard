import { useRouter, Link } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

export function PathBreadcrumbs() {
  const router = useRouter();
  const pathname = router.state.location.pathname;

  // Skip empty segments and remove any trailing slash
  const pathSegments = pathname
    .split("/")
    .filter(Boolean)
    .map((segment) => decodeURIComponent(segment));

  // Don't render breadcrumbs if we're at the root
  if (pathSegments.length === 0) {
    return null;
  }

  // Format segment for display (capitalize, replace hyphens with spaces)
  const formatSegment = (segment: string) => {
    // Handle dynamic route parameters (segments starting with $)
    if (segment.startsWith("$")) {
      return segment.substring(1);
    }

    return segment
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">
              <Home className="h-4 w-4" />
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {pathSegments.map((segment, index) => {
          const isLast = index === pathSegments.length - 1;
          const path = `/${pathSegments.slice(0, index + 1).join("/")}`;

          return (
            <BreadcrumbItem key={path}>
              {isLast ? (
                <BreadcrumbPage>{formatSegment(segment)}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link to={path}>{formatSegment(segment)}</Link>
                </BreadcrumbLink>
              )}
              {!isLast && <BreadcrumbSeparator />}
            </BreadcrumbItem>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
