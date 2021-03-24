import {extra_message_data,
    validateprogram_data,
    legal_data,
    unversity_data
    } from "../../sample_data.mjs"
import {
    ValidateBMessage,
    ValidateProgram,
    ValidateLegal,
    validateLegalUpdate,
    validateUniversity
    } from "../../../src/Validators/extra.mjs"

// describe('Bmessage validator',()=>{
//     it('validating bmessage data',()=>{
//         const result=ValidateBMessage(extra_message_data)
//         expect(result.error).toBe(undefined)
//     })
// })

// describe('validate program',()=>{
//     it('validate program data',()=>{
//         const result=ValidateProgram(validateprogram_data)
//         expect(result.error).toBe(undefined)
//     })
// })

describe('validating legal details',()=>{
    it('validate create file if legal data',()=>{
        const result=ValidateLegal(legal_data)
        expect(result.error).toBe(undefined)
    })
    it("validate update legal data",()=>{
        const result=validateLegalUpdate(legal_data)
        expect(result.error).toBe(undefined)
    })
})

// describe('validate unversity function',()=>{
//     it('verify univerty data',()=>{
//         const result=validateUniversity(unversity_data)
//         expect(result.error).toBe(undefined)
//     })
// })