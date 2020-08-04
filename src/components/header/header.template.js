function toButton(btn) {
    return `
        <div class="button">
            <span class="material-icons">${btn}</span>
        </div>
    `
}

export function createHeader(title) {
    const buttons = ['delete', 'exit_to_app']
        .map(toButton)
        .join('')

    return `
        <input type="text" class="input" value="${title}">

        <div>
            ${buttons}
        </div>
    `
}
