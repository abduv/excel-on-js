export class TableSelection {
    static className = 'selected'
    constructor() {
        this.group = []
        this.current = null
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.current = $el
        $el.addFocus().addClass(TableSelection.className)
    }

    selectGroup($group = []) {
        this.clear()

        this.group = $group
        $group.forEach(cell => cell.addClass(TableSelection.className))
    }

    applyStyle(style) {
        this.group.forEach(el => el.css(style))
    }

    clear() {
        this.group.forEach(el => el.removeClass(TableSelection.className))
        this.group = []
    }
}
