"use client";

import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchStocks } from "@/app/services/topstock";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { Loader2 } from "lucide-react";
import { SummaryCards } from "@/components/actives/SummaryCards";
import { AssetList } from "@/components/actives/AssetList";
import { TransactionHistory } from "@/components/actives/TransactionHistory";
import { Transaction } from "@/types/actives";

interface PortfolioItem {
  ticker: string;
  quantidade: number;
  precoMedio: number;
  totalInvestido: number;
}

export default function ActivesPage() {
  const { data: transactions, isLoading: loadingTx } = useQuery<Transaction[]>({
    queryKey: ["transactions"],
    queryFn: async () => {
      const res = await axios.get("/api/transactions");
      return res.data;
    },
  });

  const portfolio = useMemo(() => {
    if (!transactions) return [];

    const positionMap: Record<string, PortfolioItem> = {};

    const sortedTx = [...transactions].sort(
      (a, b) => new Date(a.data).getTime() - new Date(b.data).getTime()
    );

    sortedTx.forEach((tx) => {
      if (!positionMap[tx.ticker]) {
        positionMap[tx.ticker] = {
          ticker: tx.ticker,
          quantidade: 0,
          precoMedio: 0,
          totalInvestido: 0,
        };
      }

      const item = positionMap[tx.ticker];

      if (tx.tipo === "COMPRA") {
        const novoTotalInvestido =
          item.totalInvestido + tx.quantidade * tx.preco;
        const novaQuantidade = item.quantidade + tx.quantidade;
        item.precoMedio = novoTotalInvestido / novaQuantidade;
        item.quantidade = novaQuantidade;
        item.totalInvestido = novoTotalInvestido;
      } else {
        item.quantidade -= tx.quantidade;
        item.totalInvestido = item.quantidade * item.precoMedio;
      }
    });

    return Object.values(positionMap).filter((p) => p.quantidade > 0);
  }, [transactions]);

  const tickersUserHas = portfolio.map((p) => p.ticker);

  const { data: quotes } = useQuery({
    queryKey: ["quotes", tickersUserHas],
    queryFn: () => fetchStocks(tickersUserHas),
    enabled: tickersUserHas.length > 0,
    refetchInterval: 1000 * 60 * 5,
    staleTime: 1000 * 60 * 2,
  });

  const finalData = useMemo(() => {
    let patrimonioTotal = 0;
    let valorInvestidoTotal = 0;
    let variacaoDoDiaTotal = 0;
    let proventosTotais = 0;

    const items = portfolio.map((item) => {
      const quote = quotes?.find((q) => q.symbol === item.ticker);

      let totalProventosAtivo = 0;
      if (quote?.dividendsData?.cashDividends) {
        const dividendosRecentes = quote.dividendsData.cashDividends.filter(
          (div) => {
            if (!div.paymentDate) return false;
            const ano = new Date(div.paymentDate).getFullYear();
            // ALTERAR O ANO CASO DESEJAR
            return ano >= 2024;
          }
        );

        totalProventosAtivo = dividendosRecentes.reduce((acc, div) => {
          return acc + div.rate * item.quantidade;
        }, 0);
      }

      proventosTotais += totalProventosAtivo;

      const precoAtual = quote?.regularMarketPrice || item.precoMedio;

      const variacaoUnitaria = quote?.regularMarketChange || 0;
      const variacaoDiaItem = variacaoUnitaria * item.quantidade;

      const saldoAtual = item.quantidade * precoAtual;
      const rentabilidadeVal = saldoAtual - item.totalInvestido;
      const rentabilidadePerc = (rentabilidadeVal / item.totalInvestido) * 100;

      patrimonioTotal += saldoAtual;
      valorInvestidoTotal += item.totalInvestido;
      variacaoDoDiaTotal += variacaoDiaItem;

      return {
        ...item,
        precoAtual,
        saldoAtual,
        rentabilidadeVal,
        rentabilidadePerc,
        variacaoDia: variacaoDiaItem,
        logoUrl: quote?.logourl,
      };
    });

    const lucroTotal = patrimonioTotal - valorInvestidoTotal;

    return {
      items,
      summary: {
        patrimonioTotal,
        valorInvestidoTotal,
        lucroTotal,
        variacao: variacaoDoDiaTotal,
        proventos: proventosTotais,
      },
    };
  }, [portfolio, quotes]);

  if (loadingTx)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-green-600 w-8 h-8" />
      </div>
    );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">A minha carteira</h1>
          <p className="text-gray-500 mt-1">
            Gerencie seus ativos e acompanhe seus rendimentos
          </p>
        </div>
        <AddTransactionModal />
      </div>

      <section>
        <SummaryCards summary={finalData.summary} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Meus ativos</h2>
        <AssetList items={finalData.items} />
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Histórico de Lançamentos
        </h2>
        <TransactionHistory transactions={transactions || []} />
      </section>
    </div>
  );
}
