---
date: '2021-01-24'
title: Create a new custom session attributes manager
root: '/blog'
---

# Create a new custom session attributes manager

Talkyjs has a abstract class to manage your own skill's session attributes.

```typescript
import { SessionAttributesManager  } from '@takyjs/core'
```

And we can create own Type-safe session attributes manager.

## Create a Custom class extends `SessionAttributesManager`

We can create a new class by extends `SessionAttributesManager` class.

```typescript
import { SessionAttributesManager  } from '@takyjs/core'

export type GameSessionAttributes = {
    playerName?: string;
    gameScore: number
}

export class GameSessionAttributeManager extends SessionAttributesManager {
    private readonly recordKey = 'gamePlayData'
    
    public updatePlayerName(name: string): void {
        this.updateSessionAttributes<GameSessionAttributes>(this.recordKey, {
            playerName: name
        })
    }

    public getPlayerName(): string | null {
        const data = this.getSessionAttributes<GameSessionAttributes>(this.recordKey)
        if (!data || !data.playerName) return null;
        return data.playerName
    }

    public updateGameScore(score: number): void {
        this.updateSessionAttributes<GameSessionAttributes>(this.recordKey, {
            gameScore: score
        })
    }

    public getGameScore(): number {
        const data = this.getSessionAttributes<GameSessionAttributes>(this.recordKey)
        if (!data || !data.gameScore) {
            this.updateGameScore(0)
            return 0
        }
        return data.gameScore
    }
}
```

And we can use the class by your own handler.

```typescript
const CustomHandle = {
    canHandle() {
        return true;
    },
    handle(handlerInput) {
        const sessionManager = new GameSessionAttributeManager(handlerInput)
        const score = sessionManager.getGameScore()
        ...
    }
}
```