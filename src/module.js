export const module = 'module'

async function start() {
    return await Promise.resolve('hi')
}

start().then(console.log)
