class ApiError extends Error { //It extends the built-in Error class, which allows it to inherit error handling behavior.
    constructor(
        statusCode,
        message= "Something went wrong", 
        errors = [],
        stack = ""
    ){
        super(message) // for overwrite success message
        this.statusCode = statusCode
        this.data = null
        this.message = message 
        this.success = false; 
        this.errors = errors

        if (stack) { // The purpose of this logic is to handle the stack trace associated with an error
            this.stack = stack
        } else{
            Error.captureStackTrace(this, this.constructor)
        }

    }
}

export {ApiError}