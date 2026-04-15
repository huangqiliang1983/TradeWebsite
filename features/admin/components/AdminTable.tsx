import type { ReactNode } from "react";

type AdminTableProps = {
  headers: string[];
  children: ReactNode;
};

export function AdminTable({ headers, children }: AdminTableProps) {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-[var(--line)]">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-[var(--line)] text-sm">
          <thead className="bg-[var(--surface)]">
            <tr>
              {headers.map((header) => (
                <th
                  key={header}
                  className="px-4 py-3 text-left font-medium uppercase tracking-[0.16em] text-[var(--muted)]"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--line)] bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
