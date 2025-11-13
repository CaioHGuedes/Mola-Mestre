import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Transaction } from "@/types/actives";

export function TransactionHistory({
  transactions,
}: {
  transactions: Transaction[];
}) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-gray-50">
          <TableRow>
            <TableHead className="font-bold text-gray-600">Data</TableHead>
            <TableHead className="font-bold text-gray-600">Tipo</TableHead>
            <TableHead className="font-bold text-gray-600">Ativo</TableHead>
            <TableHead className="text-right font-bold text-gray-600">
              Quantidade
            </TableHead>
            <TableHead className="text-right font-bold text-gray-600">
              Preço
            </TableHead>
            <TableHead className="text-right font-bold text-gray-600">
              Total
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                Nenhum lançamento encontrado.
              </TableCell>
            </TableRow>
          ) : (
            transactions.map((tx) => {
              const dateObj = new Date(tx.data);
              const formattedDate = dateObj.toLocaleDateString("pt-BR");
              const total = tx.quantidade * tx.preco;

              return (
                <TableRow key={tx._id} className="hover:bg-gray-50/50">
                  <TableCell className="font-medium text-gray-700">
                    {formattedDate}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${
                        tx.tipo === "COMPRA"
                          ? "bg-blue-100 text-blue-700 hover:bg-blue-100"
                          : "bg-red-100 text-red-700 hover:bg-red-100"
                      } border-0`}
                    >
                      {tx.tipo}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-bold text-gray-800">
                    {tx.ticker}
                  </TableCell>
                  <TableCell className="text-right">{tx.quantidade}</TableCell>
                  <TableCell className="text-right">
                    R$ {tx.preco.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    R$ {total.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
    </div>
  );
}
