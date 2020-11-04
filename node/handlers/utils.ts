const createParentsId = (i: any, elem: any) => {
    const levelName = `l${i}`
    elem.parentsIds = elem.parentsIds || {}
    elem.parentsIds[levelName] = elem.id

    return elem.parentsIds
}


export const mapCategories = (categories: object[], level: number) => {
    for(let i = 1; i < level; i++) {
        categories = categories.reduce((acc: object[], elem: any) => {
            acc = acc || []
            elem.children.map((e: any) => acc.push({ 
                ...e, 
                parentsIds: createParentsId(i, elem) 
            }))
            return acc
        }, [])
    }
    return categories
}