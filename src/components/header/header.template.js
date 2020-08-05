function toButton(btn) {
    return `
        <div class="button" data-action="${btn.action}">
            <span 
                class="material-icons" 
                data-action="${btn.action}"
            >${btn.value}</span>
        </div>
    `
}

export function createHeader(title) {
    const buttons = [
        {
            value: 'delete',
            action: 'delete'
        },
        {
            value: 'exit_to_app',
            action: 'exit'
        }
    ]
        .map(toButton)
        .join('')

    return `
        <input type="text" class="input" value="${title}">

        <div>
            ${buttons}
        </div>
    `
}
