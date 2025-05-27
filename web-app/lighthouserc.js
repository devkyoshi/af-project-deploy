module.exports = {
  ci: {
    collect: {
      // Run Lighthouse on the built version of the app
      // This assumes you've already built the app using 'npm run build'
      staticDistDir: './dist',
      // Alternatively, you can use a local dev server
      // startServerCommand: 'npm run preview',
      // url: ['http://localhost:4173/'],
      numberOfRuns: 3,
      // Use Microsoft Edge instead of Chrome
      chromePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe",
    },
    upload: {
      // Upload the results to temporary public storage
      target: 'temporary-public-storage',
    },
    assert: {
      // Assert against the default Lighthouse categories
      preset: 'lighthouse:recommended',
      assertions: {
        // Customize assertions as needed
        'first-contentful-paint': ['warn', { maxNumericValue: 2000 }],
        'interactive': ['warn', { maxNumericValue: 3500 }],
        'max-potential-fid': ['warn', { maxNumericValue: 300 }],
        'cumulative-layout-shift': ['warn', { maxNumericValue: 0.1 }],
        'largest-contentful-paint': ['warn', { maxNumericValue: 2500 }],
      },
    },
  },
};
