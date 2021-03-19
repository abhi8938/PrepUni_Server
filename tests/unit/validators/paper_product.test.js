import {paper_product_data} from "../../sample_data.mjs"
import {validate,validateUpdate} from "../../../src/Validators/paper_product.mjs"

describe('paper product verifier',()=>{
    it('should be able to verify proper paper product data',()=>{
        const result=validate(paper_product_data)
        expect(result.error).toBe(undefined)
    })

    it('should be able verify update ',()=>{
        var sample_data={
            name:paper_product_data['name'],
            link:paper_product_data['link'],
            cover:paper_product_data['cover']
        }
        const result=validateUpdate(sample_data)
        expect(result.error).toBe(undefined)
    })
})
