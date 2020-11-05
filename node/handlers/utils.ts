const createParentsId = (i: number, elem: { parentsIds: object, id: string }) => {
    const levelName = `l${i}`
    elem.parentsIds = elem.parentsIds || {}
    const parentsIds: { [key: string]: string; } = { ...elem.parentsIds};
    parentsIds[levelName] = elem.id

    return parentsIds
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