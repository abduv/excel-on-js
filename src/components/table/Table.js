import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown']
        })
    }

    toHTML() {
        return createTable(20)
    }

    onMousedown(e) {
        const resizeType = e.target.dataset.resize
        if (resizeType) {
            const $resizer = $(e.target)
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const index = $parent.dataset.col || null
            const sideProp = resizeType === 'col' ? 'bottom' : 'right'
            let value

            $resizer.css({
                opacity: 1,
                [sideProp]: '-2000px'
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
                    const cells = this.$root.findAll(`[data-col="${index}"]`)
                    $parent.css({width: value + 'px'})
                    cells.forEach(el => {
                        el.style.width = value + 'px'
                    })
                } else {
                    $parent.css({height: value + 'px'})
                }

                $resizer.removeCSS('opacity', 'bottom', 'right')
            }
        }
    }
}