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
        const dataResize = e.target.dataset.resize
        if (dataResize) {
            const $resizer = $(e.target)
            // const $parent = $resizer.$el.parentNode // bad!
            // const $parent = $resizer.$el.closest('.column') // better but bad
            const $parent = $resizer.closest('[data-type="resizable"]')
            const coords = $parent.getCoords()
            const index = $parent.dataset.col || null
            const cells = this.$root.findAll(`[data-col="${index}"]`)

            document.onmousemove = (event) => {
                if (dataResize === 'col') {
                    const delta = event.pageX - coords.right
                    const value = coords.width + delta
                    $parent.$el.style.width = value + 'px'
                    cells.forEach(el => {
                        el.style.width = value + 'px'
                    })
                } else {
                    const delta = event.pageY - coords.bottom
                    const value = coords.height + delta
                    $parent.$el.style.height = value + 'px'
                }
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }
}