export const mapCategories = (categories: any, level: number) => {
    console.log(categories)
    for(let i = 1; i <= level; i++) {
        console.log("loop", i)
        categories = categories.map((c: any) => c.children.map((ch: object) => ch)).filter((c: any) => c)
    }
    return categories
}