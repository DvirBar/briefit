import { FieldsConfig } from "./types";

export const config: FieldsConfig = {
  fields: {
    // Authenticatiion
    email: {
      isRequired: { message: "דרוש דואר אלקטרוני" },
      isNotEmail: { message: "כתובת דוא\"ל לא תקינה" },
    },

    password: {
      isRequired: { message: "דרושה סיסמה" },
      isTooShortPass: { message: "על הסיסמה להיות באורך 8 תווים לפחות" },
      isNotStrongPass: { message: "על הסיסמה לכלול אותיות גדולות וקטנות באנגלית ומספרים" },
    },

    confirmPassword: {
      isRequired: { message: "יש לחזור על הסיסמה החדשה" },
    },

    firstName: {
      isRequired: { message: "דרוש שם פרטי" },
      isNotHebName: { message: "שם צריך להיות בעברית" },
    },

    lastName: {
      isRequired: { message: "דרוש שם משפחה" },
    },

    name: {
      isRequired: { message: "יש להזין שם" },
    },

    title: {
      isRequired: { message: "יש להזין כותרת" },
    },

    content: {
      isRequired: { message: "יש להזין תוכן" },
    },

    path: {
      isRequired: { message: "יש להזין מסלול" },
    },

    url: {
      isRequired: { message: "יש להזין כתובת" },
    },

    link: {
      isRequired: { message: "יש להזין קישור" },
    },

    value: {
      isRequired: { message: "יש להזין ערך" },
    },

    group: {
      isRequired: { message: "יש לבחור קבוצה" },
    },

    year: {
      isRequired: { message: "יש לבחור שנה" },
    },
  },
};
