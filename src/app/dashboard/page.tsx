"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Folder, Bookmark } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Dashboard</h1>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button>
          <Folder className="mr-2 h-4 w-4" />
          Nova pasta
        </Button>
        <Button variant="outline">
          <Bookmark className="mr-2 h-4 w-4" />
          Adicionar favorito
        </Button>
      </div>

      {/* Favorites */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Favoritos</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {/* Pasta Dy alto */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Folder className="h-12 w-12 mb-2 text-primary" />
              <span className="text-sm font-medium text-center">Dy alto</span>
            </CardContent>
          </Card>

          {/* Pasta Pvp média */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="flex flex-col items-center justify-center p-6">
              <Folder className="h-12 w-12 mb-2 text-primary" />
              <span className="text-sm font-medium text-center">Pvp média</span>
            </CardContent>
          </Card>

          {/* Ações favoritas */}
          {["WEGE3", "BBAS3", "PETR4"].map((stock) => (
            <Card
              key={stock}
              className="cursor-pointer hover:shadow-lg transition-shadow"
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="w-12 h-12 mb-2 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="font-bold text-primary text-sm">
                    {stock.slice(0, 2)}
                  </span>
                </div>
                <span className="text-sm font-medium">{stock}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Valor Investido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              Sem aportes realizados
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Atual</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R$ 0,00</div>
            <p className="text-xs text-muted-foreground">
              Sem ativos na carteira
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Rentabilidade
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+0,00%</div>
            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ativos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">0</div>
            <p className="text-xs text-muted-foreground">
              Ações na carteira
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
