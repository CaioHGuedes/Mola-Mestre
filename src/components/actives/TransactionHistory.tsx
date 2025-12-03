import { Transaction } from "@/types/actives";
import { DataTable } from "./table/data-table";
import { columns } from "./table/columns";

export function TransactionHistory({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="w-full">
      <DataTable columns={columns} data={transactions} />
    </div>
  );
}
