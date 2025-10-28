import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Icon from '@/components/ui/icon';
import { Badge } from '@/components/ui/badge';

interface RouletteGameProps {
  balance: number;
  onBalanceChange: (newBalance: number) => void;
  onClose: () => void;
}

const RouletteGame = ({ balance, onBalanceChange, onClose }: RouletteGameProps) => {
  const [bet, setBet] = useState(10);
  const [selectedBet, setSelectedBet] = useState<{ type: string; value: string | number } | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const [lastWin, setLastWin] = useState<number | null>(null);

  const numbers = Array.from({ length: 37 }, (_, i) => i);
  const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

  const placeBet = (type: string, value: string | number) => {
    setSelectedBet({ type, value });
  };

  const spin = () => {
    if (!selectedBet || bet > balance || bet <= 0 || isSpinning) return;

    setIsSpinning(true);
    setLastWin(null);
    onBalanceChange(balance - bet);

    let spinCount = 0;
    const spinInterval = setInterval(() => {
      setResult(Math.floor(Math.random() * 37));
      spinCount++;

      if (spinCount >= 30) {
        clearInterval(spinInterval);
        const finalResult = Math.floor(Math.random() * 37);
        setResult(finalResult);

        let winAmount = 0;
        const isRed = redNumbers.includes(finalResult);
        const isBlack = finalResult !== 0 && !isRed;

        switch (selectedBet.type) {
          case 'number':
            if (finalResult === selectedBet.value) winAmount = bet * 36;
            break;
          case 'red':
            if (isRed) winAmount = bet * 2;
            break;
          case 'black':
            if (isBlack) winAmount = bet * 2;
            break;
          case 'even':
            if (finalResult !== 0 && finalResult % 2 === 0) winAmount = bet * 2;
            break;
          case 'odd':
            if (finalResult % 2 === 1) winAmount = bet * 2;
            break;
          case 'low':
            if (finalResult >= 1 && finalResult <= 18) winAmount = bet * 2;
            break;
          case 'high':
            if (finalResult >= 19 && finalResult <= 36) winAmount = bet * 2;
            break;
          case 'dozen1':
            if (finalResult >= 1 && finalResult <= 12) winAmount = bet * 3;
            break;
          case 'dozen2':
            if (finalResult >= 13 && finalResult <= 24) winAmount = bet * 3;
            break;
          case 'dozen3':
            if (finalResult >= 25 && finalResult <= 36) winAmount = bet * 3;
            break;
        }

        if (winAmount > 0) {
          setLastWin(winAmount);
          onBalanceChange(balance - bet + winAmount);
        }

        setIsSpinning(false);
      }
    }, 100);
  };

  const getNumberColor = (num: number) => {
    if (num === 0) return 'bg-green-600';
    return redNumbers.includes(num) ? 'bg-red-600' : 'bg-gray-900';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <Icon name="RotateCw" size={32} className="text-accent" />
            Рулетка
          </h3>
          <p className="text-muted-foreground">Баланс: ${balance.toLocaleString()}</p>
        </div>
        <Button variant="ghost" onClick={onClose}>
          <Icon name="X" size={24} />
        </Button>
      </div>

      <Card className="bg-gradient-to-br from-card via-card to-red-900/20 border-2 border-accent/50">
        <CardHeader>
          <CardTitle className="text-center">
            {result !== null ? (
              <div className="flex items-center justify-center gap-4">
                <div
                  className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold ${getNumberColor(
                    result
                  )} ${isSpinning ? 'animate-spin' : 'animate-pulse'}`}
                >
                  {result}
                </div>
                {!isSpinning && lastWin !== null && lastWin > 0 && (
                  <Badge className="text-lg px-4 py-2 bg-secondary text-secondary-foreground">
                    +${lastWin}
                  </Badge>
                )}
              </div>
            ) : (
              <span className="text-muted-foreground">Сделайте ставку</span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label className="text-sm mb-2 block">Числа (x36)</Label>
            <div className="grid grid-cols-9 gap-1 max-h-48 overflow-y-auto">
              {numbers.map((num) => (
                <Button
                  key={num}
                  size="sm"
                  className={`${getNumberColor(num)} hover:opacity-80 ${
                    selectedBet?.type === 'number' && selectedBet?.value === num
                      ? 'ring-2 ring-secondary'
                      : ''
                  }`}
                  onClick={() => placeBet('number', num)}
                  disabled={isSpinning}
                >
                  {num}
                </Button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Цвет (x2)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={`bg-red-600 hover:bg-red-700 ${
                  selectedBet?.type === 'red' ? 'ring-2 ring-secondary' : ''
                }`}
                onClick={() => placeBet('red', 'red')}
                disabled={isSpinning}
              >
                Красное
              </Button>
              <Button
                variant="outline"
                className={`bg-gray-900 hover:bg-gray-800 ${
                  selectedBet?.type === 'black' ? 'ring-2 ring-secondary' : ''
                }`}
                onClick={() => placeBet('black', 'black')}
                disabled={isSpinning}
              >
                Черное
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Четность (x2)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={selectedBet?.type === 'even' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('even', 'even')}
                disabled={isSpinning}
              >
                Четное
              </Button>
              <Button
                variant="outline"
                className={selectedBet?.type === 'odd' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('odd', 'odd')}
                disabled={isSpinning}
              >
                Нечетное
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Диапазон (x2)</Label>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={selectedBet?.type === 'low' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('low', 'low')}
                disabled={isSpinning}
              >
                1-18
              </Button>
              <Button
                variant="outline"
                className={selectedBet?.type === 'high' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('high', 'high')}
                disabled={isSpinning}
              >
                19-36
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm">Дюжины (x3)</Label>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant="outline"
                size="sm"
                className={selectedBet?.type === 'dozen1' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('dozen1', 'dozen1')}
                disabled={isSpinning}
              >
                1-12
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={selectedBet?.type === 'dozen2' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('dozen2', 'dozen2')}
                disabled={isSpinning}
              >
                13-24
              </Button>
              <Button
                variant="outline"
                size="sm"
                className={selectedBet?.type === 'dozen3' ? 'ring-2 ring-secondary' : ''}
                onClick={() => placeBet('dozen3', 'dozen3')}
                disabled={isSpinning}
              >
                25-36
              </Button>
            </div>
          </div>
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
              {[10, 25, 50, 100].map((amount) => (
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
            disabled={isSpinning || !selectedBet || bet > balance || bet <= 0}
            className="w-full bg-accent hover:bg-accent/90 text-accent-foreground text-xl py-6"
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
    </div>
  );
};

export default RouletteGame;
