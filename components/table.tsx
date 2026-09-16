import type { ReactNode } from "react";

type TableColumn = {
  key: string;
  header: string;
  mono?: boolean;
};

type TableProps = {
  columns: TableColumn[];
  rows: Record<string, ReactNode>[];
  className?: string;
};

export default function Table({ columns, rows, className = "" }: TableProps) {
  return (
    <div
      className={[
        "overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <table className="w-full min-w-[28rem] text-left text-sm">
        <thead className="border-b border-zinc-200 bg-zinc-100 text-xs uppercase tracking-[0.12em] text-zinc-500 dark:border-zinc-800 dark:bg-zinc-950/80">
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="px-4 py-3 font-medium">
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-200 text-zinc-600 dark:divide-zinc-800/80 dark:text-zinc-400">
          {rows.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
            >
              {columns.map((column, columnIndex) => (
                <td
                  key={column.key}
                  className={[
                    "px-4 py-2.5",
                    column.mono || columnIndex === 0
                      ? "font-mono text-xs"
                      : "",
                    columnIndex === 0
                      ? "text-zinc-900 dark:text-zinc-200"
                      : "",
                    column.mono && columnIndex !== 0 ? "text-zinc-500" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export { Table };
export type { TableProps, TableColumn };
