import {test, expect} from '@playwright/test'
import { ProductPage } from '../pages/ProductsPage'

test('Count All Products', async({page})=>{
      const products = new ProductPage(page)
      await products.openApp()
      const allProductCount =await products.allProducts.count()
      await expect(allProductCount).toBe(34)
      
})