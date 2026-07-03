import {test, expect} from '@playwright/test'
import { searchItems } from '../test-data/searchItems'
import { SearchProduct } from '../pages/SearchProduct'

searchItems.forEach ((item) =>{
    test(`Search Test for ${item}`, async({page})=>{
        const search = new SearchProduct(page)

        await search.goto()
        await search.searchMethod(item)
        await expect(search.seacheditem).toContainText(item)

    })

})