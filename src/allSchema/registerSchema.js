import * as zod from "zod";


const registerSchema = zod.object({
    name: zod.string()
        .nonempty("Name is reqired")
        .min(2, "Name must be 2 char at least")
        .max(20, "Name must be 20 char at most"),
    email: zod.string()
        .nonempty("Email is reqired")
        .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Email is Invaild"),
    password: zod.string()
        .nonempty("Password is reqired")
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, "Minimum eight characters, at least one letter capital, one number and one special character:"),
    age: zod.coerce.date()
        .transform((date) => {
            const dateNow = new Date();
            return dateNow.getFullYear() - date.getFullYear();
        })
        .refine((age) => age >= 10, { message: "Your age must be at least 10 years old" }),
    phone: zod.string()
        .nonempty("Phone is required")
        .regex(/^01[0125][0-9]{8}$/, "Phone number must be a valid Egyptian number (starts with 010, 011, 012, or 015 and has 11 digits)"),
})
export default registerSchema
