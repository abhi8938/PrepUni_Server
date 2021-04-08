const {payments_data} =require ("../../sample_data")
const {validate} =require ("../../../src/Validators/payments")

describe("payments validate",()=>{
    it('check if paymeny data is valid',()=>{
        const result=validate(payments_data)
        expect(result.error).toBe(undefined)
    })
})