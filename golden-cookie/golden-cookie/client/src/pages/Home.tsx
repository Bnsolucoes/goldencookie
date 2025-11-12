import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { APP_LOGO } from "@/const";
import { Heart, Award, Clock, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { PixPayment } from "@/components/PixPayment";
import { ShoppingCart } from "@/components/ShoppingCart";
import { AttendantAgent } from "@/components/AttendantAgent";


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

const products: Product[] = [
  {
    id: 1,
    name: "Cookie Ovo Maltine",
    description: "Uma explosão de sabor que derrete na boca! Nosso cookie mais popular combina a crocância perfeita por fora com um interior macio e recheado de pedaços generosos de Ovomaltine. Cada mordida é uma experiência inesquecível de textura e sabor que vai te fazer querer mais.",
    price: 7.00,
    image: "/images/ovomaltine-cookies.jpg",
    popular: true
  },
  {
    id: 2,
    name: "Cookie KitKat",
    description: "Prepare-se para uma experiência sensorial única! Pedaços crocantes de KitKat envolvidos em uma massa artesanal que equilibra perfeitamente doçura e textura. O contraste entre o chocolate cremoso e a wafer crocante cria uma sinfonia de sabores que conquista no primeiro bite.",
    price: 7.00,
    image: "/images/kitkat-cookies.jpg",
    popular: true
  },
  {
    id: 3,
    name: "Cookie Galak com Negresco",
    description: "A combinação perfeita entre o chocolate branco suave do Galak e a intensidade do biscoito Negresco. Uma verdadeira obra-prima artesanal que une contrastes deliciosos em cada pedaço. Impossível resistir a essa tentação irresistível!",
    price: 7.00,
    image: "/images/classic-cookies.jpg",
    popular: true
  },
  {
    id: 4,
    name: "Cookie Gotas de Chocolate",
    description: "O clássico reinventado! Generosas gotas de chocolate ao leite derretendo em uma massa dourada e aromática. Cada cookie é preparado com carinho e ingredientes selecionados para garantir aquele sabor caseiro que te transporta para memórias afetivas.",
    price: 6.50,
    image: "/images/chocolate-cookies.jpg"
  },
  {
    id: 5,
    name: "Cookie Tradicional",
    description: "A essência do cookie perfeito! Massa artesanal com gotas de chocolate belga, textura crocante nas bordas e centro macio. Feito com ingredientes premium e muito amor, é a escolha ideal para quem aprecia a autenticidade de um cookie verdadeiramente especial.",
    price: 6.50,
    image: "/images/traditional-cookies.jpg"
  }
];

export default function Home() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showPixPayment, setShowPixPayment] = useState(false);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1
      }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCartItems(prev =>
        prev.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      );
    }
  };

  const removeFromCart = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img src={APP_LOGO} alt="Golden Cookie" className="w-12 h-12 rounded-full" />
              <h1 className="text-2xl font-bold" style={{ color: '#6B4423' }}>Golden Cookie</h1>
            </div>
            <nav className="hidden md:flex gap-6">
              <a href="#cardapio" className="text-foreground hover:text-primary transition-colors">Cardápio</a>
              <a href="#sobre" className="text-foreground hover:text-primary transition-colors">Sobre</a>
              <a href="#contato" className="text-foreground hover:text-primary transition-colors">Contato</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-background relative py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fadeIn">
              <h2 className="text-4xl md:text-6xl font-bold leading-tight text-foreground">
                O Cookie Artesanal que Você <span className="text-primary">Merece</span>
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground">
                Crocante por fora, macio por dentro. Cada cookie é uma experiência inesquecível de sabor e qualidade artesanal.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="text-lg" onClick={() => document.getElementById('cardapio')?.scrollIntoView({ behavior: 'smooth' })}>
                  <ShoppingBag className="mr-2 h-5 w-5" />
                  Ver Cardápio
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/hero-cookie.jpg" 
                alt="Cookie Golden Cookie" 
                className="w-full h-auto rounded-2xl shadow-2xl product-card"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="diferenciais-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Feito com Amor</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Cada cookie é preparado artesanalmente com ingredientes selecionados e muito carinho
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Qualidade Premium</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Ingredientes de primeira qualidade para garantir o melhor sabor em cada mordida
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-none shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Sempre Frescos</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Produção diária para você saborear cookies sempre fresquinhos e crocantes
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Cardápio */}
      <section id="cardapio" className="cardapio-background py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ color: '#6B4423' }}>Nosso Cardápio</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Descubra nossos sabores irresistíveis e escolha sua próxima tentação
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Produtos */}
            <div className="lg:col-span-2 space-y-8">
              <div className="grid md:grid-cols-2 gap-6">
                {products.map((product) => (
                  <Card key={product.id} className="product-card overflow-hidden">
                    <div className="relative">
                      {product.popular && (
                        <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold z-10">
                          Mais Vendido
                        </div>
                      )}
                      <img 
                        src={product.image} 
                        alt={product.name} 
                        className="w-full h-48 object-cover"
                      />
                    </div>
                    <CardHeader>
                      <CardTitle className="text-xl">{product.name}</CardTitle>
                      <CardDescription className="text-sm leading-relaxed">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold text-primary">
                          R$ {product.price.toFixed(2)}
                        </span>
                        <Button 
                          onClick={() => addToCart(product)}
                          className="text-sm"
                        >
                          Adicionar
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Combos */}
              <div className="combos-background rounded-2xl p-8">
                <h3 className="text-3xl font-bold mb-6 text-center text-foreground">Combos Especiais</h3>
                <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="text-2xl">Combo Trio</CardTitle>
                      <CardDescription>3 cookies de sua escolha</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary mb-2">R$ 18,00</p>
                      <p className="text-sm text-muted-foreground">Economize R$ 3,00</p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-primary">
                    <CardHeader>
                      <CardTitle className="text-2xl">Combo Família</CardTitle>
                      <CardDescription>6 cookies de sua escolha</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold text-primary mb-2">R$ 35,00</p>
                      <p className="text-sm text-muted-foreground">Economize R$ 7,00</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>

            {/* Carrinho */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <ShoppingCart
                  items={cartItems}
                  onUpdateQuantity={updateQuantity}
                  onRemoveItem={removeFromCart}
                  onCheckout={() => setShowPixPayment(true)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="sobre-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Sobre a Golden Cookie</h2>
            <div className="space-y-4 text-lg text-muted-foreground leading-relaxed">
              <p>
                A Golden Cookie nasceu da paixão por criar cookies verdadeiramente especiais. Nosso diferencial está no cuidado artesanal com cada detalhe: desde a seleção dos melhores ingredientes até o ponto perfeito de cozimento que garante aquela textura única - crocante por fora e macio por dentro.
              </p>
              <p>
                Focamos em qualidade, apresentação e frescor, tornando cada cookie uma experiência inesquecível. Nosso compromisso é oferecer produtos artesanais e diferenciados que transformam momentos simples em memórias deliciosas.
              </p>
              <p className="text-xl font-semibold text-primary">
                Porque você merece o melhor cookie artesanal!
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="contato-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">Entre em Contato</h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-lg">
                📍 R. Jairo de Almeida Machado, 401 - Jaraguá, São Paulo - SP, 02998-060
              </p>
              <p className="text-lg">
                📱 Acesse nosso Instagram:{' '}
                <a 
                  href="https://www.instagram.com/golden.cookie._?igsh=MXEza2lyajdmODByOQ==" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-primary hover:underline font-semibold"
                >
                  @golden.cookie._
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-background border-t border-border py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src={APP_LOGO} alt="Golden Cookie" className="w-10 h-10 rounded-full" />
            <span className="text-xl font-bold" style={{ color: '#6B4423' }}>Golden Cookie</span>
          </div>
          <p className="text-muted-foreground">
            Cookies artesanais feitos com amor e ingredientes de qualidade
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p>📍 R. Jairo de Almeida Machado, 401 - Jaraguá, São Paulo - SP, 02998-060</p>
            <p>© 2025 Golden Cookie. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Modal de Pagamento PIX */}
      <PixPayment
        open={showPixPayment}
        onOpenChange={setShowPixPayment}
        amount={totalPrice}
        items={cartItems.map(item => `${item.name} (x${item.quantity}) - R$ ${(item.price * item.quantity).toFixed(2)}`)}
      />

      {/* Agente de Atendimento */}
      <AttendantAgent cartCount={totalItems} totalPrice={totalPrice} />
    </div>
  );
}
