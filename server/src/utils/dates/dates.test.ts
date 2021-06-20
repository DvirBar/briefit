import { dateInPast } from "./dates";

describe("test dates utility functions", () => {
    describe("test dateInPast function", () => {
        test("should return true if date was over", () => {
            const currentDate = new Date();
            const pastDate = new Date(currentDate.getTime() - 30000);
            
            expect(dateInPast(pastDate)).toBe(true);
        });

        test("should return false if date is in future", () => {
            const currentDate = new Date();
            const futureDate = new Date(currentDate.getTime() + 30000);
            
            expect(dateInPast(futureDate)).toBe(false);
        });
    });
});