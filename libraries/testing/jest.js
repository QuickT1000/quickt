const { exec, getArgs } = require('./functions');

const scriptArgs = getArgs();

const runJest = (config, args = []) => {
    exec('jest', [
        '--colors',
        `--config=${config}`,
        ...scriptArgs,
        ...args,
    ], {
        env: {
            ...process.env
        },
    });
};

module.exports = {
    runJest,
};
