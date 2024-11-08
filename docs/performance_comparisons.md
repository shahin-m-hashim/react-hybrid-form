# Library Comparisons

> **Note**: This comparison is not intended to show any library as superior or to discredit others. It’s purely for analytical purposes based on performance metrics and size comparisons.

The testing involved creating the same forms using popular libraries. All files used for testing are available in the
<a href="https://github.com/shahin-m-hashim/react-hybrid-form/tree/master/examples/Javascript/src/comparisons" target="_blank">comparisons</a> folder of the repository.

## React Hybrid Form

- **Unpacked Size**: 70 KB

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Largest Contentful Paint | 200 ms        | 789 ms          | 1.38 s          | 1.07 s          | 3.04 s          | 10.3 s     |

## React Hook Form

- **Unpacked Size**: 922 KB

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Largest Contentful Paint | 214 ms        | 1.03 s          | 1.49 s          | 920 ms          | 2.46 s          | 8.34 s     |

## Formik

- **Unpacked Size**: 583 KB

| Metric                   | No Throttling | 4x CPU Slowdown | 6x CPU Slowdown | Fast 4G Network | Slow 4G Network | 3G Network |
| ------------------------ | ------------- | --------------- | --------------- | --------------- | --------------- | ---------- |
| Largest Contentful Paint | 244 ms        | 1.27 s          | 1.66 s          | 896 ms          | 2.49 s          | 8.31 s     |

### Key Takeaways:

- The size and performance metrics of React Hybrid Form show a lightweight and optimized approach compared to React Hook Form and Formik.

- These metrics were measured under standard testing environments to provide insight into load times and layout stability.

For custom testing, refer to the <a href="https://github.com/shahin-m-hashim/react-hybrid-form/tree/master/examples/Javascript/src/comparisons" target="_blank">comparisons</a> folder where the actual test files are included.
