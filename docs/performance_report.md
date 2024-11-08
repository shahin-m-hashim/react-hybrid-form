# PERFORMANCE REPORT

## Performance Metrics (Hybrid Form)

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Largest Contentful Paint | 1.7 s         | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s      |
| Cumulative Layout Shift  | 0             | 0               | 0               | 0               | 0               | 0          |

### Overall Performance (LCP)

- No throttling: 158 ms
- 20x slowdown CPU & no network throttling: 14.16 s
- No CPU throttling & 3G network throttling: 12.44 s
- 20x slowdown CPU & 3G network throttling: 21.65 s

### Interactions

- Input fields: 14 ms
- Submit & reset buttons: 20 ms
- Select & dueDate fields: 24 ms

## Performance Metrics (UnControlled Form)

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Performance Score        | 91            | 91              | 90              | 91              | 88              | 91         |
| First Contentful Paint   | 1.0 s         | 1.0 s           | 1.0 s           | 1.0 s           | 1.0 s           | 1.0 s      |
| Largest Contentful Paint | 1.8 s         | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s      |
| Total Blocking Time      | 0 ms          | 0 ms            | 50 ms           | 0 ms            | 0 ms            | 0 ms       |
| Cumulative Layout Shift  | 0             | 0               | 0               | 0               | 0               | 0          |
| Speed Index              | 1.1 s         | 1.0 s           | 1.7 s           | 1.0 s           | 2.0 s           | 1.0 s      |

### Overall Performance (LCP)

- No throttling: 161 ms
- 20x slowdown CPU & no network throttling: 12.25 s
- No CPU throttling & 3G network throttling: 12.47 s
- 20x slowdown CPU & 3G network throttling: 20.18 s

### Interactions

- Input fields: 14 ms
- Submit & reset buttons: 24 ms
- Select & dueDate fields: 40 ms

## Performance Metrics (Controlled Form)

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Performance Score        | 91            | 91              | 91              | 91              | 91              | 91         |
| First Contentful Paint   | 1.0 s         | 1.1 s           | 1.0 s           | 1.0 s           | 1.0 s           | 1.0 s      |
| Largest Contentful Paint | 1.7 s         | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s           | 1.7 s      |
| Total Blocking Time      | 0 ms          | 0 ms            | 0 ms            | 0 ms            | 0 ms            | 0 ms       |
| Cumulative Layout Shift  | 0             | 0               | 0               | 0               | 0               | 0          |
| Speed Index              | 1.1 s         | 1.1 s           | 1.0 s           | 1.0 s           | 1.0 s           | 1.0 s      |

### Overall Performance (LCP)

- No throttling: 156 ms
- 20x slowdown CPU & no network throttling: 13.40 s
- No CPU throttling & 3G network throttling: 12.51 s
- 20x slowdown CPU & 3G network throttling: 20.41 s

### Interactions

- Input fields: 14 ms
- Submit & reset buttons: 24 ms
- Select & dueDate fields: 30 ms
