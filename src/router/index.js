import Vue from 'vue'
import VueRouter from 'vue-router'
import LemkaHelpers from "@/helpers";

// region Admin views
import VAUsers from "@/views/administrateur/utilisateurs/VAUsers";
import VAUserDetail from "@/views/administrateur/utilisateurs/VAUserDetail";
import VAArticles from "@/views/administrateur/articles/VAArticles";
import VAArticleAddOrUpdate from "@/views/administrateur/articles/VAArticleAddOrUpdate";
import VAMerceries from "@/views/administrateur/merceries/VAMerceries";
import VAMercerieAddOrUpdate from "@/views/administrateur/merceries/VAMercerieAddOrUpdate";
import VADemandeDeDevis from "@/views/administrateur/demande_de_devis/VADemandeDeDevis";
import VADevis from "@/views/administrateur/devis/VADevis";
import VARendezVous from "@/views/administrateur/rendez_vous/VARendezVous";
import VAParametres from "@/views/administrateur/parametres/VAParametres";
import VAEntreprise from "@/views/administrateur/entreprise/VAEntreprise";
import VAEntrepriseAdd from "@/views/administrateur/entreprise/VAEntrepriseAdd";
import VAEntrepriseUpdate from "@/views/administrateur/entreprise/VAEntrepriseUpdate";
import VAGenres from "@/views/administrateur/parametres/genre/VAGenres";
import VAGenreAddOrUpdate from "@/views/administrateur/parametres/genre/VAGenreAddOrUpdate";
import VAMensurations from "@/views/administrateur/parametres/mensuration/VAMensurations";
import VAMensurationAddOrUpdate from "@/views/administrateur/parametres/mensuration/VAMensurationAddOrUpdate";
import VAServices from "@/views/administrateur/parametres/service/VAServices";
import VAServiceAddOrUpdate from "@/views/administrateur/parametres/service/VAServiceAddOrUpdate";
import VAHoraire from "@/views/administrateur/horaire/VAHoraire";
import VADevisAddOrUpdate from "@/views/administrateur/devis/VADevisAddOrUpdate";
import VACouleurs from "@/views/administrateur/parametres/couleur/VACouleurs";
import VACouleurAddOrUpdate from "@/views/administrateur/parametres/couleur/VACouleurAddOrUpdate";
import VACharacteristiques from "@/views/administrateur/parametres/caracteristique/VACharacteristiques";
import VACharacteristiqueAddOrUpdate
    from "@/views/administrateur/parametres/caracteristique/VACharacteristiqueAddOrUpdate";
import VACategories from "@/views/administrateur/parametres/categorie/VACategories";
import VACategorieAddOrUpdate from "@/views/administrateur/parametres/categorie/VACategorieAddOrUpdate";
// endregion

// region User views
import VUInformations from "@/views/utilisateur/informations/VUInformations";
import VUInformationsUpdate from "@/views/utilisateur/informations/VUInformationsUpdate";
import VUAdresseAdd from "@/views/utilisateur/informations/VUAdresseAdd";
import VUAdresseUpdate from "@/views/utilisateur/informations/VUAdresseUpdate";
import VUMensurations from "@/views/utilisateur/mensurations/VUMensurations";
import VUUserMensurationAddOrUpdate from "@/views/utilisateur/mensurations/VUUserMensurationAddOrUpdate";
import VUMensurationDetail from "@/views/utilisateur/mensurations/VUMensurationDetail";
import VUDemandeDevis from "@/views/utilisateur/demande_de_devis/VUDemandeDevis";
import VUDemandeDevisAddOrUpdate from "@/views/utilisateur/demande_de_devis/VUDemandeDevisAddOrUpdate";
import VUDevis from "@/views/utilisateur/devis/VUDevis";
import VURendezVous from "@/views/utilisateur/rendez_vous/VURendezVous";
import VUDevisDetails from "@/views/utilisateur/devis/VUDevisDetails";
import VURendezVousReservation from "@/views/utilisateur/rendez_vous/VURendezVousReservation";
import jwt_decode from "jwt-decode";
// endregion

Vue.use(VueRouter)

const ROUTES = LemkaHelpers.Routes;

const authChildren = [
    {
        path: 'login',
        name: 'authLogin',
        meta: {value: 'Se connecter'},
        component: () => import('@/views/auth/Login')
    },
    {
        path: 'register',
        name: 'authRegister',
        meta: {value: "S'inscrire"},
        component: () => import('@/views/auth/Register')
    },
    {
        path: 'email-verify',
        name: "VGEmailVerify",
        meta: {value: "Vérification d'email"},
        component: () => import('@/views/auth/EmailVerify'),
        props: route => ({query: route.query.token})
    },
    {
        path: 'password-reset',
        name: "VGResetPassword",
        meta: {value: "Mot de passe oublié"},
        component: () => import('@/views/auth/ResetPassword')
    },
    {
        path: 'new-password',
        name: "VGNewPassword",
        meta: {value: "Nouveau mot de passe"},
        component: () => import('@/views/auth/NewPassword'),
        props: (route) => ({query: route.query.q})
    },
    {
        path: 'register-success',
        name: "VGRegisterSuccess",
        meta: {value: "Compte créé avec succès"},
        component: () => import('@/views/auth/RegisterSuccess'),
        props: true
    },
]

const legaleChildren = [
    {
        path: 'cgvu',
        name: 'cgvu',
        meta: {value: "Conditions générales de vente et d'utilisation"},
        component: () => import('@/views/legales/CGVU')
    },
    {
        path: 'pc',
        name: 'pc',
        meta: {value: 'Politique de confidentialité'},
        component: () => import('@/views/legales/PC')
    },
    {
        path: 'rb',
        name: 'rb',
        meta: {value: 'Retours et remboursements'},
        component: () => import('@/views/legales/RB')
    },
];

const accountChildren = [
    {
        path: 'profil',
        name: 'profilIndex',
        component: () => import('@/views/account/profil/Index'),
        redirect: {name: 'profilDetails'},
        children: [
            {
                path: 'details',
                name: 'profilDetails',
                component: () => import('@/views/account/profil/Details')
            },
            {
                path: 'update',
                name: 'profilUpdate',
                component: () => import('@/views/account/profil/Update')
            },
        ]
    },
    {
        path: 'mensurations',
        name: 'mensurationsIndex',
        component: () => import('@/views/account/mensurations/Index'),
        redirect: {name: 'mensurationsList'},
        children: [
            {
                path: 'list',
                name: 'mensurationsList',
                component: () => import('@/views/account/mensurations/List')
            },
            {
                path: 'create',
                name: 'mensurationsCreate',
                component: () => import('@/views/account/mensurations/Create')
            },
            {
                path: ':id/details',
                name: 'mensurationsDetails',
                component: () => import('@/views/account/mensurations/Details')
            },
            {
                path: ':id/update',
                name: 'mensurationsUpdate',
                component: () => import('@/views/account/mensurations/Update')
            },
        ]
    },
    {
        path: 'demandes-devis',
        name: 'demandesDevisIndex',
        component: () => import('@/views/account/demandes-devis/Index'),
        redirect: {name: 'demandesDevisList'},
        children: [
            {
                path: 'list',
                name: 'demandesDevisList',
                component: () => import('@/views/account/demandes-devis/List')
            },
            {
                path: ':id/details',
                name: 'demandesDevisDetails',
                component: () => import('@/views/account/demandes-devis/Details')
            },
            {
                path: 'create',
                name: 'demandesDevisCreate',
                component: () => import('@/views/account/demandes-devis/Create')
            },
            {
                path: ':id/update',
                name: 'demandesDevisUpdate',
                component: () => import('@/views/account/demandes-devis/Update')
            },
        ]
    },
    {
        path: 'rendez-vous',
        name: 'rendezVousIndex',
        component: () => import('@/views/account/rendez-vous/Index'),
        redirect: {name: 'rendezVousList'},
        children: [
            {
                path: 'list',
                name: 'rendezVousList',
                component: () => import('@/views/account/rendez-vous/List')
            },
            {
                path: 'create',
                name: 'rendezVousCreate',
                component: () => import('@/views/account/rendez-vous/Create')
            },
            {
                path: ':id/details',
                name: 'rendezVousDetails',
                component: () => import('@/views/account/rendez-vous/Details')
            },
        ]
    }
];

const profilChildren = [
    {
        path: 'informations',
        name: ROUTES.INFORMATIONS.name,
        meta: {value: ROUTES.INFORMATIONS.value},
        component: VUInformations,
    },
    {
        path: 'informations/update',
        name: ROUTES.INFORMATIONS_UPDATE.name,
        meta: {value: ROUTES.INFORMATIONS_UPDATE.value},
        component: VUInformationsUpdate
    },
    {
        path: 'adresse/add',
        name: ROUTES.ADRESSE_ADD.name,
        meta: {value: ROUTES.ADRESSE_ADD.value},
        component: VUAdresseAdd
    },
    {
        path: 'adresse/update',
        name: ROUTES.ADRESSE_UPDATE.name,
        meta: {value: ROUTES.ADRESSE_UPDATE.value},
        component: VUAdresseUpdate
    },
    {
        path: 'mensurations',
        name: LemkaHelpers.Routes.USER_MENSURATIONS.name,
        meta: {value: LemkaHelpers.Routes.USER_MENSURATIONS.value},
        component: VUMensurations
    },
    {
        path: 'mensurations/:id/detail',
        name: ROUTES.USER_MESURES.name,
        meta: {value: ROUTES.USER_MESURES.value},
        component: VUMensurationDetail,
        props: true
    },
    {
        path: 'mensuration/:id?',
        name: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.value},
        component: VUUserMensurationAddOrUpdate,
        props: true
    },
    {
        path: 'demandes_devis/',
        name: ROUTES.DEMANDE_DE_DEVIS.name,
        meta: {value: ROUTES.DEMANDE_DE_DEVIS.value},
        component: VUDemandeDevis,
        children: [
            {
                path: 'cu/:id?',
                name: ROUTES.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name,
                meta: {value: ROUTES.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.value},
                component: VUDemandeDevisAddOrUpdate,
                props: true
            }
        ]
    },
    {
        path: 'devis/',
        name: ROUTES.DEVIS_USER.name,
        meta: {value: ROUTES.DEVIS_USER.value},
        component: VUDevis,
        children: [
            {
                path: 'cu/:numero_devis',
                name: ROUTES.USER_DEVIS_DETAIL.name,
                meta: {value: ROUTES.USER_DEVIS_DETAIL.value},
                component: VUDevisDetails,
                props: true
            }
        ]
    },
    {
        path: 'rendez-vous/',
        name: ROUTES.RENDEZ_VOUS_USER.name,
        meta: {value: ROUTES.RENDEZ_VOUS_USER.value},
        component: VURendezVous,
        children: [
            {
                path: 'reservation/',
                name: ROUTES.RENDEZ_VOUS_USER_RESERVATION.name,
                meta: {value: ROUTES.RENDEZ_VOUS_USER_RESERVATION.value},
                component: VURendezVousReservation
            }
        ]
    }
];

const adminChildren = [
    {
        path: 'utilisateurs',
        name: ROUTES.UTILISATEURS.name,
        meta: {value: ROUTES.UTILISATEURS.value},
        component: VAUsers,
        children: [
            {
                path: ':username',
                name: ROUTES.UTILISATEURS_DETAIL.name,
                meta: {value: ROUTES.UTILISATEURS_DETAIL.value},
                component: VAUserDetail,
                props: true,
            }
        ]
    },
    {
        path: 'articles',
        name: ROUTES.ARTICLES.name,
        meta: {value: ROUTES.ARTICLES.value},
        component: VAArticles,
        children: [
            {
                path: 'cu/:slug?',
                name: ROUTES.ARTICLES_ADD_OR_UPDATE.name,
                meta: {value: ROUTES.ARTICLES_ADD_OR_UPDATE.value},
                component: VAArticleAddOrUpdate,
                props: true
            }
        ]
    },
    {
        path: 'merceries',
        name: ROUTES.MERCERIES.name,
        meta: {value: ROUTES.MERCERIES.value},
        component: VAMerceries,
        children: [
            {
                path: 'cu/:id?',
                name: ROUTES.MERCERIES_ADD_OR_UPDATE.name,
                meta: {value: ROUTES.MERCERIES_ADD_OR_UPDATE.value},
                component: VAMercerieAddOrUpdate,
                props: true
            }
        ]
    },
    {
        path: 'demande-de-devis',
        name: ROUTES.DEMANDE_DEVIS_ADMIN.name,
        meta: {value: ROUTES.DEMANDE_DEVIS_ADMIN.value},
        component: VADemandeDeDevis
    },
    {
        path: 'devis',
        name: ROUTES.DEVIS.name,
        meta: {value: ROUTES.DEVIS.value},
        component: VADevis,
        children: [
            {
                path: 'cu/:id',
                name: ROUTES.DEVIS_ADD_OR_UPDATE.name,
                meta: {value: ROUTES.DEVIS_ADD_OR_UPDATE.value},
                component: VADevisAddOrUpdate,
                props: true
            },
        ]
    },
    {
        path: 'rendez-vous',
        name: ROUTES.RENDEZ_VOUS.name,
        meta: {value: ROUTES.RENDEZ_VOUS.value},
        component: VARendezVous
    },
    {
        path: 'horaires',
        name: ROUTES.ADMIN_HORAIRE.name,
        meta: {value: ROUTES.ADMIN_HORAIRE.value},
        component: VAHoraire
    },
    {
        path: 'entreprise',
        name: ROUTES.PARAMETRES_ENTREPRISE.name,
        meta: {value: ROUTES.PARAMETRES_ENTREPRISE.value},
        component: VAEntreprise,
        children: [
            {
                path: 'ajouter',
                name: ROUTES.PARAMETRES_ENTREPRISE_ADD.name,
                meta: {value: ROUTES.PARAMETRES_ENTREPRISE_ADD.value},
                component: VAEntrepriseAdd
            },
            {
                path: 'update',
                name: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.name,
                meta: {value: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.value},
                component: VAEntrepriseUpdate
            }
        ]
    },
    {
        path: 'parametres',
        name: ROUTES.PARAMETRES.name,
        meta: {value: ROUTES.PARAMETRES.value},
        component: VAParametres,
        children: [
            {
                path: 'genres',
                name: ROUTES.PARAMETRES_GENRE.name,
                meta: {value: ROUTES.PARAMETRES_GENRE.value},
                component: VAGenres,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.value},
                        component: VAGenreAddOrUpdate,
                        props: true
                    },
                ]
            },
            {
                path: 'mensurations',
                name: ROUTES.PARAMETRES_MENSURATION.name,
                meta: {value: ROUTES.PARAMETRES_MENSURATION.value},
                component: VAMensurations,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value},
                        component: VAMensurationAddOrUpdate,
                        props: true
                    }
                ]
            },
            {
                path: 'services',
                name: ROUTES.PARAMETRES_SERVICE.name,
                meta: {value: ROUTES.PARAMETRES_SERVICE.value},
                component: VAServices,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.value},
                        component: VAServiceAddOrUpdate,
                        props: true
                    }
                ]
            },
            {
                path: 'couleurs',
                name: ROUTES.PARAMETRES_COULEUR.name,
                meta: {value: ROUTES.PARAMETRES_COULEUR.value},
                component: VACouleurs,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_COULEUR_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_COULEUR_ADD_OR_UPDATE.value},
                        component: VACouleurAddOrUpdate,
                        props: true
                    }
                ]
            },
            {
                path: 'characteristiques',
                name: ROUTES.PARAMETRES_CHARACTERISTIQUE.name,
                meta: {value: ROUTES.PARAMETRES_CHARACTERISTIQUE.value},
                component: VACharacteristiques,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_CHARACTERISTIQUE_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_CHARACTERISTIQUE_ADD_OR_UPDATE.value},
                        component: VACharacteristiqueAddOrUpdate,
                        props: true
                    }
                ]
            },
            {
                path: 'categories',
                name: ROUTES.PARAMETRES_CATEGORIE.name,
                meta: {value: ROUTES.PARAMETRES_CATEGORIE.value},
                component: VACategories,
                children: [
                    {
                        path: 'cu/:id?',
                        name: ROUTES.PARAMETRES_CATEGORIE_ADD_OR_UPDATE.name,
                        meta: {value: ROUTES.PARAMETRES_CATEGORIE_ADD_OR_UPDATE.value},
                        component: VACategorieAddOrUpdate,
                        props: true
                    }
                ]
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/auth',
            name: 'authIndex',
            component: () => import('@/views/auth/Index'),
            beforeEnter: (to, from, next) => {
                const loggedIn = localStorage.getItem('user');

                if (loggedIn) {
                    next({name: 'profilIndex'});
                } else {
                    next();
                }
            },
            redirect: {name: 'authLogin'},
            children: authChildren
        },
        {
            path: '/account',
            redirect: {name: 'profilIndex'},
            component: () => import('@/views/account/Index'),
            children: accountChildren
        },
        {
            path: '/profil',
            name: ROUTES.PROFIL_ROUTE.name,
            meta: {value: 'Profil'},
            component: () => import('@/views/utilisateur/ViewUser'),
            beforeEnter: (to, from, next) => {
                const loggedIn = localStorage.getItem('user');
                if (!loggedIn) {
                    next({name: 'authLogin'});
                } else {
                    next();
                }
            },
            children: profilChildren
        },
        {
            path: '/admin',
            name: ROUTES.ADMIN_ROUTE.name,
            meta: {value: ROUTES.ADMIN_ROUTE.value},
            component: () => import('@/views/administrateur/ViewAdmin'),
            beforeEnter(to, from, next) {
                const loggedIn = JSON.parse(localStorage.getItem('user'));
                if (!loggedIn) {
                    next({name: 'authLogin'});
                } else {
                    const user = jwt_decode(loggedIn.access);
                    if (user.is_staff) {
                        next();
                    } else {
                        next({name: 'home'})
                    }
                }
            },
            children: adminChildren
        },
        {
            path: '/legales',
            name: 'legales',
            redirect: {name: 'cgvu'},
            component: () => import('@/views/legales/Index'),
            children: legaleChildren
        },
        {
            path: '/home',
            name: 'home',
            meta: {value: 'Accueil'},
            component: () => import('@/views/Home'),
        },
        {
            path: '/about',
            name: 'about',
            meta: {value: 'À propos'},
            component: () => import('@/views/About')
        },
        {
            path: '/horaire',
            name: 'horaire',
            meta: {value: 'Horaire'},
            component: () => import('@/views/Horaire')
        },
        {
            path: '/contact',
            name: 'contact',
            meta: {value: 'Contact'},
            component: () => import('@/views/Contact')
        },
        {
            path: '/articles/:slug',
            name: 'articlesDetails',
            meta: {value: ''},
            component: () => import('@/views/ArticleDetail'),
            props: true
        },
        {
            path: '/merceries/:id',
            name: ROUTES.MERCERIES_DETAIL.name,
            meta: {value: ''},
            component: () => import('@/views/MercerieDetail'),
            props: true
        },
        {
            path: '/recherche',
            name: 'VGRecherche',
            meta: {value: 'Recherche'},
            component: () => import('@/views/Recherche'),
            props: true
            // props: route => ({query: route.query.search})
        },
        {
            path: '/404',
            name: 'NotFound',
            meta: {value: '404'},
            component: () => import('@/views/NotFound')
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})

export default router
