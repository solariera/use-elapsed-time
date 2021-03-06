# useElapsedTime / React hook

## Usage

### 1. Import use-elapsed-time

```typescript
import { useElapsedTime } from '@solariera/use-elapsed-time'
```

## Properties

### ReturnValues

| Name| Type| Default| Description|
| --- | --- | ------ | ---------- |
| elapsedTime| number | -| The elapsed time in milliseconds.|
| pause| () => void | -| Pause function|
| restart| () => void | -| Restart function|
| clear| () => void | -| Clear function|
| isWorking| () => boolean | -| Get the counter working status|

### Options

| Name| Type| Default| Description|
| --- | --- | ------ | ---------- |
| start| Date | new Date()| Reference time for counting elapsed time|
| interval| number | 200| Count up interval|
