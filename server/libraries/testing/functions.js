const { spawn } = require('child_process');

const defaultOptions = { stdio: ['pipe', 'pipe', 'pipe', 'ipc'] };

const exec = (cmd, args, options) => {
    const child = spawn(cmd, args, { ...defaultOptions, ...options });
    const { stdout, stderr, stdin } = child;

    stdout.pipe(process.stdout);
    stderr.pipe(process.stderr);
    process.stdin.pipe(stdin);

    child.on('exit', (code) => process.exit(code));

    return child;
};

const getArgs = () => {
    let args = [...process.argv];
    args.shift();
    args.shift();

    return args;
}

module.exports = {
    exec,
    getArgs
};