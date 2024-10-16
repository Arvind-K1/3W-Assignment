class AppError extends Error{
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;

        if(stack){
            this.stack = this.stack
        }
        else{
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

export { AppError }