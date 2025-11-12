import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Plus, Minus, ShoppingBag } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

interface ShoppingCartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
  onCheckout: () => void;
}

export function ShoppingCart({
  items,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}: ShoppingCartProps) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  if (items.length === 0) {
    return (
      <Card className="border-2 border-dashed border-primary">
        <CardContent className="pt-6 text-center">
          <ShoppingBag className="h-12 w-12 text-muted-foreground mx-auto mb-3 opacity-50" />
          <p className="text-muted-foreground">Seu carrinho está vazio</p>
          <p className="text-sm text-muted-foreground mt-1">
            Escolha seus cookies favoritos para começar!
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-2 border-primary">
      <CardHeader className="bg-primary/10">
        <CardTitle className="flex items-center gap-2">
          <ShoppingBag className="h-5 w-5" />
          Seu Carrinho
        </CardTitle>
        <CardDescription>
          {itemCount} item{itemCount !== 1 ? "ns" : ""} selecionado{itemCount !== 1 ? "s" : ""}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-6 space-y-4">
        {/* Lista de itens */}
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
            >
              <div className="flex-1">
                <p className="font-medium text-sm">{item.name}</p>
                <p className="text-xs text-muted-foreground">
                  R$ {item.price.toFixed(2)} cada
                </p>
              </div>

              <div className="flex items-center gap-2">
                {/* Controle de quantidade */}
                <div className="flex items-center gap-1 bg-background rounded border border-border">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    className="p-1 hover:bg-muted transition-colors"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-8 text-center text-sm font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1 hover:bg-muted transition-colors"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-20 text-right">
                  <p className="font-semibold text-sm">
                    R$ {(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>

                {/* Remover */}
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-1 hover:bg-destructive/10 text-destructive rounded transition-colors"
                  aria-label="Remover item"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Divisor */}
        <div className="border-t border-border pt-4">
          {/* Total */}
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-2xl font-bold text-primary">
              R$ {total.toFixed(2)}
            </span>
          </div>

          {/* Botão de checkout */}
          <Button
            onClick={onCheckout}
            className="w-full text-lg py-6"
            disabled={items.length === 0}
          >
            Finalizar Compra com PIX
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
