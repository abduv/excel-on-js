import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/resizeLogic';
import {
    isCell,
    matrix,
    nextSelector,
    shouldResize
} from '@/components/table/table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import {$} from '@core/dom';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown'],
            ...options
        })
    }

    toHTML() {
        return createTable(20)
    }

    prepare() {
        this.selection = new TableSelection()
    }

    init() {
        super.init()

        const $cell = this.$root.find('[data-id="0:0"]')
        this.selection.select($cell)

        this.emitter.subscribe('it is working', text => {
            this.selection.current.text(text)
            console.log(text)
        })
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            resizeHandler(e, this.$root)
        } else if (isCell(e)) {
            const $target = $(e.target)

            if (e.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selection.select($target)
            }
        }
    }

    onKeydown(e) {
        const keys = [
            'Enter', 'Tab',
            'ArrowRight', 'ArrowDown',
            'ArrowUp', 'ArrowLeft'
        ]
        const key = e.key
        const shiftKey = e.shiftKey

        if (keys.includes(key)) {
            e.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id, shiftKey))
            if ($next.isNotEmpty()) {
                this.selection.select($next)
            }
        }
    }
}