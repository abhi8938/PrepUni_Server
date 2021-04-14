const {session_report_data} =require ("../../data/sample_data")
const jwt =require ("jsonwebtoken")
const {validate} =require ("../../../src/Validators/session_report")

describe('session data',()=>{
    it('valid session data filter',()=>{
        const result=validate(session_report_data)
        expect(result.error).toBe(undefined)
    })
})