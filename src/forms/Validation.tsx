import * as Yup from "yup";

export const loginSchema = Yup.object({
    username: Yup.string().required("Le pseudo est requis."),
    password: Yup.string().required("Le mot de passe est requis."),
});

export const registerSchema = Yup.object({
    username: Yup.string()
        .required("Le pseudo est requis")
        .matches(/^[a-zA-Z_ ]*$/, "Caractères spécials non autorisés.")
        .min(2, "Le nom doit contenir entre 2 et 25 caractères")
        .max(25, "Le nom doit contenir entre 2 et 25 caractères"),
    email: Yup.string()
        .required("L'adresse e-mail est requise.")
        .email("Adresse e-mail non valide."),
    password: Yup.string()
        .required("Le mot de passe est requis")
        .min(4, "Le mot de passe doit contenir au moins 4 caractères."),
    // confirmPassword: Yup.string()
    //     .oneOf([Yup.ref('password'), undefined], 'Les mots de passe ne correspondent pas.')
    //     .required('La confirmation du mot de passe est requise'),
    terms: Yup.boolean()
        .oneOf([true], "Tu dois accepter les conditions d'utilisation.")
});

export const contactSchema = Yup.object({
    email: Yup.string().required("Le pseudo est requis.").email("L'adresse e-mail est requise."),
    subject: Yup.string().required("Le sujet est requis."),
    content: Yup.string().required("Le message est requis.")
});