import { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";

interface AttendantAgentProps {
  cartCount: number;
  totalPrice: number;
}

export function AttendantAgent({ cartCount, totalPrice }: AttendantAgentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ role: "agent" | "user"; text: string }>>([
    {
      role: "agent",
      text: "Olá! 👋 Sou a Confeiteira da Golden Cookie! Estou aqui para ajudar você a escolher os melhores cookies. Qual é o seu sabor favorito?"
    }
  ]);
  const [userInput, setUserInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const agentResponses: { [key: string]: string } = {
    "oi": "Oi! Tudo bem? 😊 Estou aqui para ajudar você a escolher os melhores cookies. Qual é o seu sabor favorito?",
    "olá": "Olá! Bem-vindo! 🍪 Temos vários sabores deliciosos. Quer conhecer nossas opções mais populares?",
    "sabor": "Nossos sabores mais procurados são: Ovo Maltine 🥛, KitKat 🍫 e Galak com Negresco 🤍. Qual você gostaria de experimentar?",
    "preço": `Nossos cookies custam entre R$ 6,50 e R$ 7,00. Você já tem ${cartCount} item(ns) no carrinho totalizando R$ ${totalPrice.toFixed(2)}!`,
    "combo": "Oferecemos combos especiais: Combo Trio (3 cookies) por R$ 18,00 e Combo Família (6 cookies) por R$ 35,00. Quer adicionar um?",
    "pagamento": "O pagamento é feito exclusivamente via QR Code PIX. É rápido, seguro e fácil! Quando estiver pronto, clique em 'Finalizar Compra com PIX'.",
    "pix": "Sim! Usamos PIX para pagamento. Você receberá um QR Code para escanear com seu banco. É o método mais rápido! ⚡",
    "entrega": "Nosso foco é no atendimento local. Você pode retirar seu pedido ou consultar sobre opções de entrega.",
    "carrinho": `Você tem ${cartCount} item(ns) no carrinho. Total: R$ ${totalPrice.toFixed(2)}. Quer adicionar mais algo?`,
    "checkout": "Perfeito! Quando estiver satisfeito com sua seleção, clique em 'Finalizar Compra com PIX' para pagar! 🎉",
    "ajuda": "Posso ajudá-lo com: sabores disponíveis, preços, combos, pagamento via PIX ou qualquer dúvida sobre nossos cookies! 😊",
    "receita": "Todos os nossos cookies são feitos com ingredientes premium e muito amor! 💕 Cada um é uma obra-prima artesanal.",
    "fresco": "Produzimos nossos cookies diariamente para garantir que você receba sempre fresquinhos e crocantes! 🔥",
    "chocolate": "Ah, chocolate! 🍫 Temos Cookie Gotas de Chocolate e Cookie KitKat. Qual você prefere?",
    "maltine": "O Cookie Ovo Maltine é nosso campeão de vendas! 🏆 Crocante por fora, macio por dentro, com pedaços generosos de Ovomaltine. Delicioso! 😋"
  };

  const getAgentResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    
    for (const [key, response] of Object.entries(agentResponses)) {
      if (lowerInput.includes(key)) {
        return response;
      }
    }
    
    return "Ótima pergunta! 🤔 Posso ajudar com sabores, preços, combos ou pagamento. Qual é sua dúvida? 🍪";
  };

  const handleSendMessage = () => {
    if (!userInput.trim()) return;

    setMessages(prev => [...prev, { role: "user", text: userInput }]);

    setTimeout(() => {
      const response = getAgentResponse(userInput);
      setMessages(prev => [...prev, { role: "agent", text: response }]);
    }, 600);

    setUserInput("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante - Cookie */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 sm:w-20 sm:h-20 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center justify-center animate-bounce"
        style={{
          background: "radial-gradient(circle at 30% 30%, #F4D4A8, #D4A574, #8B6F47)",
          boxShadow: "0 8px 20px rgba(139, 111, 71, 0.4), inset -2px -2px 5px rgba(0,0,0,0.1), inset 2px 2px 5px rgba(255,255,255,0.3)"
        }}
        aria-label="Abrir chat com a confeiteira"
        title="Chat com a Confeiteira"
      >
        {isOpen ? (
          <X className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
        ) : (
          <span className="text-2xl sm:text-4xl">👩🏻‍🍳</span>
        )}
      </button>

      {/* Pop-up em formato de Card Moderno */}
      {isOpen && (
        <div
          className="fixed bottom-24 right-6 z-40 shadow-2xl overflow-hidden max-h-[90vh] w-[min(420px,90vw)]"
          style={{
            borderRadius: "20px",
            background: "linear-gradient(135deg, #FFFAF0 0%, #FFF5E6 100%)",
            boxShadow: "0 15px 40px rgba(139, 111, 71, 0.3), 0 0 0 1px rgba(200, 153, 104, 0.2)"
          }}
        >
          {/* Header com confeiteira */}
          <div
            className="p-4 sm:p-6 text-center space-y-2 border-b-2"
            style={{
              borderColor: "#FFE4CC",
              background: "linear-gradient(135deg, #F4D4A8 0%, #E8C89C 100%)"
            }}
          >
            <div className="flex items-center justify-center gap-3">
              <div className="text-4xl sm:text-5xl">👩🏻‍🍳</div>
              <div className="text-left">
                <p className="text-lg sm:text-xl font-bold" style={{ color: "#6B4423" }}>
                  Confeiteira Golden
                </p>
                <p className="text-xs sm:text-sm" style={{ color: "#8B6F47" }}>
                  Sua guia de cookies! 🍪
                </p>
              </div>
            </div>
          </div>

          {/* Área de mensagens */}
          <div 
            className="flex-1 overflow-y-auto space-y-3 p-4 sm:p-5 min-h-[200px] max-h-[300px]"
            style={{
              background: "linear-gradient(to bottom, #FFFAF0 0%, #FFF5E6 100%)"
            }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "agent" ? "justify-start" : "justify-end"}`}
              >
                {msg.role === "agent" && (
                  <span className="text-lg mr-2 flex-shrink-0">👩🏻‍🍳</span>
                )}
                <div
                  className={`max-w-xs px-4 py-2 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "agent"
                      ? "bg-white text-foreground border-2 rounded-bl-none"
                      : "text-white rounded-br-none"
                  }`}
                  style={{
                    borderColor: msg.role === "agent" ? "#FFE4CC" : "transparent",
                    backgroundColor: msg.role === "agent" ? "#FFFAF0" : "#C89968"
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input e botão */}
          <div className="flex gap-2 p-4 sm:p-5 border-t-2" style={{ borderColor: "#FFE4CC" }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Faça sua pergunta..."
              className="flex-1 px-4 py-2 border-2 rounded-full text-sm focus:outline-none transition-all"
              style={{
                borderColor: "#C89968",
                backgroundColor: "#FFFAF0"
              }}
            />
            <button
              type="button"
              onClick={handleSendMessage}
              className="rounded-full w-10 h-10 p-0 flex items-center justify-center text-white hover:shadow-lg transition-all flex-shrink-0"
              style={{
                background: "linear-gradient(135deg, #C89968 0%, #8B6F47 100%)"
              }}
            >
              <Send className="h-4 w-4" />
            </button>
          </div>

          {/* Sugestões rápidas */}
          <div className="space-y-2 px-4 sm:px-5 pb-4 sm:pb-5">
            <p className="text-xs font-bold" style={{ color: "#6B4423" }}>💡 Perguntas rápidas:</p>
            <div className="flex flex-wrap gap-2">
              {["🍪 Sabores", "💰 Preço", "🎁 Combos", "💳 PIX"].map((suggestion) => (
                <button
                  key={suggestion}
                  onClick={() => {
                    setUserInput(suggestion);
                    setTimeout(() => {
                      setMessages(prev => [...prev, { role: "user", text: suggestion }]);
                      setTimeout(() => {
                        const response = getAgentResponse(suggestion);
                        setMessages(prev => [...prev, { role: "agent", text: response }]);
                      }, 600);
                    }, 0);
                  }}
                  className="text-xs font-semibold px-3 py-1 rounded-full transition-all hover:scale-105"
                  style={{
                    background: "#FFE4CC",
                    color: "#8B6F47",
                    border: "1px solid #C89968"
                  }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
