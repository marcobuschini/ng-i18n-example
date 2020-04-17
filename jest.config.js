module.exports = {
    verbose: true,
    collectCoverage: true,
    reporters: [
        "default",
        ["./node_modules/jest-html-reporter", {
            "pageTitle": "Test Report"
        }]
    ],
    coverageReporters: ["lcov", "html"],
};