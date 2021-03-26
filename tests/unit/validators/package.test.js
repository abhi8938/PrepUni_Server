import {package_data} from "../../sample_data.mjs"
import {validate,validateUpdate} from "../../../src/Validators/package.mjs"

describe('package data validating function',()=>{
    it('validate package data function',()=>{
        const result=validate(package_data)
        expect(result.error).toBe(undefined)
    })

    it('validate update function',()=>{
        const result=validateUpdate(package_data)
        expect(result.error).toBe(undefined)
    })
})