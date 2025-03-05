import * as webVitals from 'web-vitals';

Object.keys(webVitals)
    .filter((key) => key.startsWith('on'))
    .forEach((key) => webVitals[key](console.log));