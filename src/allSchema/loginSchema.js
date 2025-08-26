
import * as zod from "zod";

const loginSchema = zod.object({
    email: zod.string()
        .nonempty("Email is reqired")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is Invaild"),
    password: zod.string()
        .nonempty("Password is reqired")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Minimum eight characters, at least one letter capital, one number and one special character:"),

},)
export default loginSchema