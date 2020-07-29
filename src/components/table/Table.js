import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'mousemove']
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

            document.onmousemove = (event) => {
                const delta = event.pageX - coords.right
                const value = coords.width + delta
                $parent.$el.style.width = value + 'px'
            }

            document.onmouseup = () => {
                document.onmousemove = null
            }
        }
    }

    onMousemove() {

    }
}