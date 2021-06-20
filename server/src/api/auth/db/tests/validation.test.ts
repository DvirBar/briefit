import { validateEmail, validateName, validatePassword } from "../validation";


// Name validation
describe("test name validation", () => {
    describe("test valid values", () => {
        test("should accept only lowercase", () => {
            expect(validateName("abc")).toBe(true);
        });
    
        test("should accept only uppercase", () => {
            expect(validateName("ABC")).toBe(true);
        });
    
        test("should accept starting with uppercase", () => {
            expect(validateName("Abc")).toBe(true);
        });
    
        test("should accept ending with uppercase", () => {
            expect(validateName("abC")).toBe(true);
        });

        test("should accept containing uppercase", () => {
            expect(validateName("aBc")).toBe(true);
        });

        test("should accept single character", () => {
            expect(validateName("a")).toBe(true);
        });

        test("should accept Hebrew single word names", () => {
            expect(validateName("דן")).toBe(true);
        });

        test("should accept Hebrew multiple word names", () => {
            expect(validateName("דן שרון")).toBe(true);
        });
    });

    describe("test invalid values", () => {
        test("should not accept only whitespace", () => {
            expect(validateName(" ")).toBe(false);
        });

        test("should not accept starting whitespace", () => {
            expect(validateName(" fDdf")).toBe(false);
        });

        test("should not accept one letter Hebrew", () => {
            expect(validateName("ג")).toBe(false);
        });

        test("should not accept combination of Hebrew and English", () => {
            expect(validateName("שכds")).toBe(false);
            expect(validateName("dsגג")).toBe(false);
            expect(validateName("ds גג")).toBe(false);
        });
    });
    
});


// Email vallidation
describe("test email validation", () => {
    describe("test valid value", () => {
        test("test simple valid value", () => {
            expect(validateEmail("abc@gmail.com")).toBe(true);
        });


        test("test email that contains special character", () => {
            expect(validateEmail("a!bc@gmail.com")).toBe(true);
            expect(validateEmail("a.bc@gmail.com")).toBe(true);
        });

        test("test email that contains special character", () => {
            expect(validateEmail("a!bc@gmail.com")).toBe(true);
            expect(validateEmail("a.bc@gmail.com")).toBe(true);
        });
    });

    describe("test invalid values", () => {
        test("test value with missing @", () => {
            expect(validateEmail("abcgmail.com")).toBe(false);
        });  

        test("test value with missing .", () => {
            expect(validateEmail("abc@gmailcom")).toBe(false);
        });
        
        test("test value without @ and .", () => {
            expect(validateEmail("abcgmailcom")).toBe(false);
        });  

        test("test value with 2 @", () => {
            expect(validateEmail("abc@gm@ailcom")).toBe(false);
        }); 

        test("test value with 2 . after @", () => {
            expect(validateEmail("abc@gmail.co.m")).toBe(false);
        }); 

        test("test email that starts with period", () => {
            expect(validateEmail(".abc@gmail.com")).toBe(false);
        });
        
        test("test email that ends period", () => {
            expect(validateEmail("abc.@gmail.com")).toBe(false);
        });
    });
    
});


// Test password validation
describe("test password validation", () => {
    describe("test valid values", () => {
        test("starts with lowercase", () => {
            expect(validatePassword("abc123BC")).toBe(true);
        });
        test("starts with uppercase", () => {
            expect(validatePassword("ZY46533e")).toBe(true);
        });
        test("starts with numbers", () => {
            expect(validatePassword("43fRERef")).toBe(true);
        });

        test("contains special characters", () => {
            expect(validatePassword("fge232@Re!")).toBe(true);
        });
    });

    describe("test invalid values", () => {
        describe(validatePassword, () => {
            test("password is shorter than 8 characters", () => {
                expect(validatePassword("AB2rR4")).toBe(false);
            });
            test("does not contain lowercase", () => {
                expect(validatePassword("AB24RRS44")).toBe(false);
            });

            test("does not contain uppercase", () => {
                expect(validatePassword("afd35fge")).toBe(false);
            });

            test("does not contain numbers", () => {
                expect(validatePassword("35fgefd42f")).toBe(false);
            });
        });
    });
});
