import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, QrCode, AlertCircle } from "lucide-react";
import { toast } from "sonner";

interface PixPaymentProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  items: string[];
}

export function PixPayment({ open, onOpenChange, amount, items }: PixPaymentProps) {
  const [copied, setCopied] = useState(false);
  
  // Chave PIX que será fornecida pelo usuário
  const pixKey = "seuemail@exemplo.com";
  
  // Gerar código PIX copia e cola (simplificado)
  const pixCode = `00020126580014br.gov.bcb.pix0136${pixKey}520400005303986540${amount.toFixed(2)}5802BR5913Golden Cookie6009SAO PAULO62070503***6304`;

  const copyPixCode = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    toast.success("Código PIX copiado!");
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Pagamento via PIX
          </DialogTitle>
          <DialogDescription>
            Escaneie o QR Code ou copie o código para realizar o pagamento
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Resumo do pedido */}
          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Resumo do Pedido</h4>
            <div className="space-y-1 text-sm text-muted-foreground">
              {items.map((item, index) => (
                <div key={index}>• {item}</div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total a Pagar</span>
                <span className="text-primary">R$ {amount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* QR Code Placeholder */}
          <div className="bg-white p-6 rounded-lg flex items-center justify-center border-2 border-dashed border-border">
            <div className="text-center">
              <QrCode className="h-48 w-48 mx-auto text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground font-semibold">
                QR Code PIX
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Escaneie com seu celular
              </p>
            </div>
          </div>

          {/* Aviso importante */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex gap-3">
            <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-amber-800">
              <p className="font-semibold mb-1">Importante:</p>
              <p>Após escanear o QR Code, confirme o pagamento no seu banco. Você receberá uma confirmação automaticamente.</p>
            </div>
          </div>

          {/* Código PIX Copia e Cola */}
          <div className="space-y-2">
            <Label htmlFor="pix-code" className="text-sm font-semibold">Ou copie o código PIX</Label>
            <div className="flex gap-2">
              <Input
                id="pix-code"
                value={pixCode}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={copyPixCode}
                className="flex-shrink-0"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Instruções */}
          <div className="bg-accent/30 p-4 rounded-lg text-sm space-y-2">
            <p className="font-semibold text-foreground">Como pagar:</p>
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground">
              <li>Abra o app do seu banco</li>
              <li>Escolha a opção PIX</li>
              <li>Escaneie o QR Code ou cole o código</li>
              <li>Confirme o pagamento</li>
              <li>Pronto! Seu pedido será processado</li>
            </ol>
          </div>

          {/* Botões de ação */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button
              className="flex-1"
              onClick={() => {
                toast.success("Pagamento confirmado! Obrigado pela compra! 🍪");
                setTimeout(() => onOpenChange(false), 1500);
              }}
            >
              Pagamento Realizado
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
