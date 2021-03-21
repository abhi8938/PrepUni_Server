import {payments_data} from "../../sample_data.mjs"
import {validate} from "../../../src/Validators/payments.mjs"

describe("payments validate",()=>{
    it('check if paymeny data is valid',()=>{
        const result=validate(payments_data)
        expect(result.error).toBe(undefined)
    })
})