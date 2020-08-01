import {range} from '@core/utils';


export function shouldResize(event) {
    return event.target.dataset.resize
}

export function isCell(event) {
    return event.target.dataset.type === 'cell'
}

export function matrix($target, $current, keyboardNavigate) {
    const target = $target.id(true)
    const current = $current.id(true)
    const cols = range(current.col, target.col)
    const rows = range(current.row, target.row)

    const ids = cols.reduce((acc, col) => {
        rows.forEach(row => acc .push(`${row}:${col}`))
        return acc
    }, [])

    if (keyboardNavigate) {
        return {
            cols,
            rows
        }
    }

    return ids
}

export function nextSelector(key, {col, row}, shiftKey) {
    if (!shiftKey) {
        switch (key) {
        case 'Enter':
        case 'ArrowDown':
            row++
            break
        case 'Tab':
        case 'ArrowRight':
            col++
            break
        case 'ArrowLeft':
            col--
            break
        case 'ArrowUp':
            row--
            break
        }
    } else {
        switch (key) {
        case 'Tab':
            col--
            break
        }
    }

    return `[data-id="${row}:${col}"]`
}