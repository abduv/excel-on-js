import {$} from '@core/dom';


export function resizeHandler(e, $root) {
    return new Promise(resolve => {
        const $resizer = $(e.target)
        const $parent = $resizer.closest('[data-type="resizable"]')
        const resizeType = $resizer.dataset.resize
        const coords = $parent.getCoords()
        const colId = $parent.dataset.col || null
        const sideProp = resizeType === 'col' ? 'bottom' : 'right'
        let value

        $resizer.css({
            opacity: 1,
            [sideProp]: '-5000px'
        })

        document.onmousemove = (event) => {
            if (resizeType === 'col') {
                const delta = event.clientX - coords.right
                value = coords.width + delta
                $resizer.css({
                    right: -delta + 'px'
                })
            } else {
                const delta = event.clientY - coords.bottom
                value = coords.height + delta
                $resizer.css({
                    bottom: -delta + 'px'
                })
            }
        }

        document.onmouseup = () => {
            document.onmousemove = null
            document.onmouseup = null

            if (resizeType === 'col') {
                const cells = $root.findAll(`[data-col="${colId}"]`)
                $parent.css({
                    width: value + 'px'
                })
                cells.forEach(el => el.style.width = value + 'px')
            } else {
                $parent.css({
                    height: value + 'px'
                })
            }

            resolve({
                value,
                id: resizeType === 'col' ? colId : null
            })

            $resizer.removeCSS('opacity', 'bottom', 'right')
        }
    })
}
