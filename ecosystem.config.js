module.exports = {
    apps: [
        {
            name: 'daney1',
            port: '4001',
            exec_mode: 'cluster',
            instances: '1',
            script: './.output/server/index.mjs'
        }
    ]
}