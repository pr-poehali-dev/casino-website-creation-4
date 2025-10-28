import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name: string; balance: number } | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({ name: formData.get('email') as string, balance: 10000 });
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const handleRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setUser({ name: formData.get('email') as string, balance: 1000 });
    setIsLoggedIn(true);
    setLoginOpen(false);
  };

  const slots = [
    { id: 1, name: 'Lucky 777', image: '🎰', jackpot: 50000, hot: true },
    { id: 2, name: 'Diamond Blitz', image: '💎', jackpot: 75000, hot: true },
    { id: 3, name: 'Golden Pharaoh', image: '👑', jackpot: 100000, hot: false },
    { id: 4, name: 'Neon Fruits', image: '🍒', jackpot: 25000, hot: false },
    { id: 5, name: 'Vegas Nights', image: '🌟', jackpot: 60000, hot: true },
    { id: 6, name: 'Mega Fortune', image: '💰', jackpot: 150000, hot: false },
  ];

  const games = [
    { id: 1, name: 'Рулетка', icon: 'RotateCw', players: 234 },
    { id: 2, name: 'Блэкджек', icon: 'Spade', players: 156 },
    { id: 3, name: 'Покер', icon: 'Heart', players: 189 },
    { id: 4, name: 'Баккара', icon: 'Diamond', players: 78 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-purple-950">
      <header className="border-b border-border backdrop-blur-sm bg-background/50 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-4xl">🎰</span>
            <h1 className="text-3xl font-bold neon-glow text-primary">VEGAS ROYAL</h1>
          </div>
          
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Home" className="mr-2" size={18} />
              Главная
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Grid3x3" className="mr-2" size={18} />
              Слоты
            </Button>
            <Button variant="ghost" className="text-foreground hover:text-primary">
              <Icon name="Gamepad2" className="mr-2" size={18} />
              Игры
            </Button>
          </nav>

          <div className="flex gap-3 items-center">
            {isLoggedIn && user ? (
              <>
                <div className="text-right hidden sm:block">
                  <p className="text-sm text-muted-foreground">{user.name}</p>
                  <p className="text-lg font-bold text-secondary">${user.balance.toLocaleString()}</p>
                </div>
                <Button variant="outline" onClick={() => { setIsLoggedIn(false); setUser(null); }}>
                  <Icon name="LogOut" size={18} />
                </Button>
              </>
            ) : (
              <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 neon-border animate-glow">
                    <Icon name="User" className="mr-2" size={18} />
                    Войти
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="text-2xl">Добро пожаловать!</DialogTitle>
                    <DialogDescription>
                      Войдите или зарегистрируйтесь для игры
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Tabs defaultValue="login" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="login">Вход</TabsTrigger>
                      <TabsTrigger value="register">Регистрация</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="login">
                      <form onSubmit={handleLogin} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="login-email">Email</Label>
                          <Input id="login-email" name="email" type="email" placeholder="player@vegas.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="login-password">Пароль</Label>
                          <Input id="login-password" name="password" type="password" required />
                        </div>
                        <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                          Войти
                        </Button>
                      </form>
                    </TabsContent>
                    
                    <TabsContent value="register">
                      <form onSubmit={handleRegister} className="space-y-4 pt-4">
                        <div className="space-y-2">
                          <Label htmlFor="register-email">Email</Label>
                          <Input id="register-email" name="email" type="email" placeholder="player@vegas.com" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-password">Пароль</Label>
                          <Input id="register-password" name="password" type="password" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="register-confirm">Подтвердите пароль</Label>
                          <Input id="register-confirm" name="confirm" type="password" required />
                        </div>
                        <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                          Зарегистрироваться
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </header>

      <main>
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 animate-pulse-slow"></div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h2 className="text-6xl md:text-7xl font-bold mb-6 neon-glow text-primary animate-float">
              ДОБРО ПОЖАЛОВАТЬ
            </h2>
            <p className="text-xl md:text-2xl mb-8 text-foreground/90">
              в мир больших выигрышей и азартных игр
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button size="lg" className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl px-8 py-6 neon-border">
                <Icon name="Zap" className="mr-2" size={24} />
                Играть сейчас
              </Button>
              <Button size="lg" variant="outline" className="text-xl px-8 py-6 border-primary text-primary hover:bg-primary/10">
                <Icon name="Trophy" className="mr-2" size={24} />
                Турниры
              </Button>
            </div>
            
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
                <p className="text-3xl font-bold text-secondary">$2.5M</p>
                <p className="text-sm text-muted-foreground">Джекпот сегодня</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
                <p className="text-3xl font-bold text-primary">15,234</p>
                <p className="text-sm text-muted-foreground">Игроков онлайн</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
                <p className="text-3xl font-bold text-accent">500+</p>
                <p className="text-sm text-muted-foreground">Игр</p>
              </div>
              <div className="bg-card/50 backdrop-blur-sm p-4 rounded-lg border border-border">
                <p className="text-3xl font-bold text-secondary">24/7</p>
                <p className="text-sm text-muted-foreground">Поддержка</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-background/50">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-4xl font-bold neon-glow text-primary">🔥 Горячие слоты</h3>
              <Button variant="link" className="text-secondary">
                Смотреть все
                <Icon name="ArrowRight" className="ml-2" size={18} />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {slots.map((slot) => (
                <Card key={slot.id} className="bg-card/80 backdrop-blur-sm border-border hover:border-primary transition-all hover:scale-105 cursor-pointer overflow-hidden group">
                  <CardHeader className="relative">
                    {slot.hot && (
                      <Badge className="absolute top-4 right-4 bg-accent text-accent-foreground animate-pulse">
                        <Icon name="Flame" className="mr-1" size={14} />
                        HOT
                      </Badge>
                    )}
                    <div className="text-8xl text-center py-8 group-hover:animate-float">{slot.image}</div>
                  </CardHeader>
                  <CardContent>
                    <CardTitle className="text-xl mb-2">{slot.name}</CardTitle>
                    <CardDescription className="flex items-center gap-2">
                      <Icon name="Trophy" size={16} className="text-secondary" />
                      <span className="text-secondary font-bold">${slot.jackpot.toLocaleString()}</span>
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      <Icon name="Play" className="mr-2" size={18} />
                      Играть
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-b from-background/50 to-background">
          <div className="container mx-auto px-4">
            <h3 className="text-4xl font-bold mb-8 neon-glow text-primary text-center">🎲 Классические игры</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {games.map((game) => (
                <Card key={game.id} className="bg-card/80 backdrop-blur-sm border-border hover:border-secondary transition-all hover:scale-105 cursor-pointer">
                  <CardHeader>
                    <div className="w-16 h-16 mx-auto bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                      <Icon name={game.icon as any} size={32} className="text-secondary" />
                    </div>
                    <CardTitle className="text-center">{game.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                      <Icon name="Users" size={16} />
                      <span>{game.players} игроков</span>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full border-secondary text-secondary hover:bg-secondary/10">
                      Играть
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-8 bg-background/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 mb-4">
            <Button variant="ghost" size="sm">
              О нас
            </Button>
            <Button variant="ghost" size="sm">
              Правила
            </Button>
            <Button variant="ghost" size="sm">
              Поддержка
            </Button>
            <Button variant="ghost" size="sm">
              Ответственная игра
            </Button>
          </div>
          <p className="text-muted-foreground text-sm">
            © 2024 Vegas Royal Casino. Играйте ответственно. 18+
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
