import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface SlotGameProps {
  slotName: string;
  slotImage: string;
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const SlotGame = ({ slotName, slotImage, balance, onBalanceChange, onClose }: SlotGameProps) => {
  const [bet, setBet] = useState(10);
  const [reels, setReels] = useState(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState(false);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const symbols = ['🍒', '🍋', '🍊', '🍇', '⭐', '💎', '7️⃣', slotImage];
  
  const spin = () => {
    if (bet > balance || bet <= 0) return;
    if (isSpinning) return;
    
    setIsSpinning(true);
    setLastWin(null);
    onBalanceChange(balance - bet);
    
    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setReels([
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)],
        symbols[Math.floor(Math.random() * symbols.length)]
      ]);
      spinCount++;
      
      if (spinCount >= 20) {
        clearInterval(spinInterval);
        
        const finalReels = [
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)],
          symbols[Math.floor(Math.random() * symbols.length)]
        ];
        setReels(finalReels);
        
        let winAmount = 0;
        if (finalReels[0] === finalReels[1] && finalReels[1] === finalReels[2]) {
          if (finalReels[0] === '7️⃣') {
            winAmount = bet * 50;
          } else if (finalReels[0] === '💎') {
            winAmount = bet * 25;
          } else if (finalReels[0] === '⭐') {
            winAmount = bet * 15;
          } else if (finalReels[0] === slotImage) {
            winAmount = bet * 10;
          } else {
            winAmount = bet * 5;
          }
        } else if (finalReels[0] === finalReels[1] || finalReels[1] === finalReels[2] || finalReels[0] === finalReels[2]) {
          winAmount = bet * 2;
        }
        
        if (winAmount > 0) {
          setLastWin(winAmount);
          onBalanceChange(balance - bet + winAmount);
        }
        
        setIsSpinning(false);
      }
    }, 100);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-4xl">{slotImage}</span>
            {slotName}
          </h3>
          <p className="text-muted-foreground">Баланс: ${balance.toLocaleString()}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <Icon name="X" size={24} />
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-card via-card to-purple-900/20 border-2 border-primary/50">
        <CardHeader>
          <CardTitle className="text-center text-sm text-muted-foreground">БАРАБАНЫ</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center gap-4 p-8 bg-background/50 rounded-lg">
            {reels.map((symbol, index) => (
              <div
                key={index}
                className={`w-24 h-24 flex items-center justify-center text-6xl bg-card rounded-lg border-2 border-primary/30 ${
                  isSpinning ? 'animate-pulse' : ''
                }`}
              >
                {symbol}
              </div>
            ))}
          </div>
          
          {lastWin !== null && (
            <div className="mt-4 text-center">
              <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground animate-pulse">
                <Icon name="Trophy" className="mr-2" size={20} />
                ВЫИГРЫШ +${lastWin}
              </Badge>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex-col gap-4">
          <div className="w-full space-y-2">
            <Label>Ставка</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                min="1"
                max={balance}
                value={bet}
                onChange={(e) => setBet(Math.max(1, Number(e.target.value)))}
                className="flex-1"
              />
              <Button variant="outline" onClick={() => setBet(Math.min(bet * 2, balance))}>
                x2
              </Button>
            </div>
            <div className="flex gap-2">
              {[5, 10, 25, 50, 100].map((amount) => (
                <Button
                  key={amount}
                  size="sm"
                  variant="outline"
                  onClick={() => setBet(amount)}
                  disabled={amount > balance}
                >
                  ${amount}
                </Button>
              ))}
            </div>
          </div>
          
          <Button
            onClick={spin}
            disabled={isSpinning || bet > balance || bet <= 0}
            className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground text-xl py-6"
          >
            {isSpinning ? (
              <>
                <Icon name="Loader2" className="mr-2 animate-spin" size={24} />
                Крутим...
              </>
            ) : (
              <>
                <Icon name="Play" className="mr-2" size={24} />
                Крутить за ${bet}
              </>
            )}
          </Button>
        </CardFooter>
      </Card>

      <Card className="bg-muted/50">
        <CardHeader>
          <CardTitle className="text-sm">Таблица выплат</CardTitle>
        </CardHeader>
        <CardContent className="text-sm space-y-1">
          <div className="flex justify-between"><span>7️⃣ 7️⃣ 7️⃣</span><span className="text-secondary font-bold">x50</span></div>
          <div className="flex justify-between"><span>💎 💎 💎</span><span className="text-secondary font-bold">x25</span></div>
          <div className="flex justify-between"><span>⭐ ⭐ ⭐</span><span className="text-secondary font-bold">x15</span></div>
          <div className="flex justify-between"><span>{slotImage} {slotImage} {slotImage}</span><span className="text-secondary font-bold">x10</span></div>
          <div className="flex justify-between"><span>Любые 3 одинаковых</span><span className="text-primary font-bold">x5</span></div>
          <div className="flex justify-between"><span>Любые 2 одинаковых</span><span className="font-bold">x2</span></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SlotGame;
