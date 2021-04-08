const {
    validate,
    validateUpdate
} =require ("../../../src/Validators/Program")

const {
    validateprogram_data
} =require ("../../sample_data")

describe("Program Validator",()=>{
    it("validate fucntion validator",()=>{
        const result=validate(validateprogram_data)
        expect(result.error).toBe(undefined)
    })
    it('validate update function validator',()=>{
        const result=validateUpdate(validateprogram_data)
        expect(result.error).toBe(undefined)
    })
})