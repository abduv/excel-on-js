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
import * as actions from '@/redux/actions';

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
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

        this.selectCell(this.$root.find('[data-id="0:0"]'))

        this
            .$on('formula:input', text => {
                this.selection.current.text(text)
            })
            .$on('formula:done', () => {
                this.selection.current.addFocus()
            })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
    }

    async resizeTable(e) {
        try {
            const data = await resizeHandler(e, this.$root)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(e) {
        if (shouldResize(e)) {
            this.resizeTable(e)
        } else if (isCell(e)) {
            const $target = $(e.target)

            if (e.shiftKey) {
                const $cells = matrix($target, this.selection.current)
                    .map(id => this.$root.find(`[data-id="${id}"]`))
                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
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
                this.selectCell($next)
            }
        }
    }

    onInput(e) {
        this.$emit('table:input', $(e.target))
    }
}
