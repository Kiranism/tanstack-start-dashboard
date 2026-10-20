/**
 * Flattens TanStack Router's parsed search object into URLSearchParams the
 * same way nuqs' TanStack Router adapter does, so a route loader parses
 * exactly what the nuqs hooks (e.g. DiceUI's useDataTable) read on the client.
 */
export function toURLSearchParams(search: Record<string, unknown>) {
  return new URLSearchParams(
    Object.entries(search).flatMap(([key, value]): [string, string][] => {
      if (value === undefined) return [];
      if (Array.isArray(value)) return value.map((v) => [key, String(v)]);
      if (typeof value === 'object' && value !== null) return [[key, JSON.stringify(value)]];
      return [[key, String(value)]];
    })
  );
}
