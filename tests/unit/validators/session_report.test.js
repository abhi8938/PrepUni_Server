import {session_report_data} from "../../sample_data.mjs"
import jwt from "jsonwebtoken"
import {validate} from "../../../src/Validators/session_report.mjs"

describe('session data',()=>{
    it('valid session data filter',()=>{
        const result=validate(session_report_data)
        expect(result.error).toBe(undefined)
    })
})