export const mapCategories = (categories: object[], level: number) => {
    for(let i = 1; i < level; i++) {
        categories = categories.reduce((acc: object[], elem: any) => {
            acc = acc || []
            elem.children.map((e: object) => acc.push(e))
            return acc
        }, [])
    }
    return categories
}