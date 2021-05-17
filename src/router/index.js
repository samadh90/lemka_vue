import Vue from 'vue'
import VueRouter from 'vue-router'
import LemkaHelpers from "@/helpers";

// region Admin views
import ViewAdmin from "@/views/administrateur/ViewAdmin";
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
// endregion

// region User views
import ViewUser from "@/views/utilisateur/ViewUser";
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
// endregion

// region Global Views
import VGHome from "@/views/global/VGHome";
import VGLogin from "@/views/global/VGLogin";
import VGRegister from "@/views/global/VGRegister";
import VGAbout from "@/views/global/VGAbout";
import VGHoraire from "@/views/global/VGHoraire";
import VGContact from "@/views/global/VGContact";
import VGNotFound from "@/views/global/VGNotFound";
import VGCGV from "@/views/global/VGCGV";
import VGConfidentialite from "@/views/global/VGConfidentialite";
import VGRetourRemboursement from "@/views/global/VGRetourRemboursement";
import VADevisAddOrUpdate from "@/views/administrateur/devis/VADevisAddOrUpdate";
import VUDevisDetails from "@/views/utilisateur/devis/VUDevisDetails";
import VURendezVousReservation from "@/views/utilisateur/rendez_vous/VURendezVousReservation";
import VGArticleDetail from "@/views/global/VGArticleDetail";
import VGRecherche from "@/views/global/VGRecherche";
import VGMercerieDetail from "@/views/global/VGMercerieDetail";
import VAHoraire from "@/views/administrateur/horaire/VAHoraire";
import VGResetPassword from "@/views/global/VGResetPassword";
import VGEmailVerify from "@/views/global/VGEmailVerify";
import VGRegisterSuccess from "@/views/global/VGRegisterSuccess";

// endregion

Vue.use(VueRouter)

const ROUTES = LemkaHelpers.Routes;
const PROFIL = '/profil';
const ADMIN = '/admin/';

const adminRoutes = [
  {
    path: ADMIN + 'utilisateurs',
    name: ROUTES.UTILISATEURS.name,
    meta: {value: ROUTES.UTILISATEURS.value},
    component: VAUsers,
    children: [
      {
        path: ADMIN + 'utilisateurs/:username/detail',
        name: ROUTES.UTILISATEURS_DETAIL.name,
        meta: {value: ROUTES.UTILISATEURS_DETAIL.value},
        component: VAUserDetail,
        props: true,
      }
    ]
  },
  {
    path: ADMIN + 'articles',
    name: ROUTES.ARTICLES.name,
    meta: {value: ROUTES.ARTICLES.value},
    component: VAArticles,
    children: [
      {
        path: ADMIN + 'article/:slug?',
        name: ROUTES.ARTICLES_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.ARTICLES_ADD_OR_UPDATE.value},
        component: VAArticleAddOrUpdate,
        props: true
      }
    ]
  },
  {
    path: ADMIN + 'merceries',
    name: ROUTES.MERCERIES.name,
    meta: {value: ROUTES.MERCERIES.value},
    component: VAMerceries,
    children: [
      {
        path: ADMIN + 'mercerie/:id?',
        name: ROUTES.MERCERIES_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.MERCERIES_ADD_OR_UPDATE.value},
        component: VAMercerieAddOrUpdate,
        props: true
      }
    ]
  },
  {
    path: ADMIN + 'demande-de-devis',
    name: ROUTES.DEMANDE_DEVIS_ADMIN.name,
    meta: {value: ROUTES.DEMANDE_DEVIS_ADMIN.value},
    component: VADemandeDeDevis
  },
  {
    path: ADMIN + 'devis',
    name: ROUTES.DEVIS.name,
    meta: {value: ROUTES.DEVIS.value},
    component: VADevis,
    children: [
      {
        path: ADMIN + 'devi/:id',
        name: ROUTES.DEVIS_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.DEVIS_ADD_OR_UPDATE.value},
        component: VADevisAddOrUpdate,
        props: true
      },
    ]
  },
  {
    path: ADMIN + 'rendez-vous',
    name: ROUTES.RENDEZ_VOUS.name,
    meta: {value: ROUTES.RENDEZ_VOUS.value},
    component: VARendezVous
  },
  {
    path: ADMIN + 'horaires',
    name: ROUTES.ADMIN_HORAIRE.name,
    meta: {value: ROUTES.ADMIN_HORAIRE.value},
    component: VAHoraire
  },
  {
    path: ADMIN + 'entreprise',
    name: ROUTES.PARAMETRES_ENTREPRISE.name,
    meta: {value: ROUTES.PARAMETRES_ENTREPRISE.value},
    component: VAEntreprise,
    children: [
      {
        path: ADMIN + 'entreprise/ajouter',
        name: ROUTES.PARAMETRES_ENTREPRISE_ADD.name,
        meta: {value: ROUTES.PARAMETRES_ENTREPRISE_ADD.value},
        component: VAEntrepriseAdd
      },
      {
        path: ADMIN + 'entreprise/update',
        name: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.name,
        meta: {value: ROUTES.PARAMETRES_ENTREPRISE_UPDATE.value},
        component: VAEntrepriseUpdate
      }
    ]
  },
  {
    path: ADMIN + 'parametres',
    name: ROUTES.PARAMETRES.name,
    meta: {value: ROUTES.PARAMETRES.value},
    component: VAParametres,
    children: [

      {
        path: ADMIN + 'parametres/genres',
        name: ROUTES.PARAMETRES_GENRE.name,
        meta: {value: ROUTES.PARAMETRES_GENRE.value},
        component: VAGenres,
        children: [
          {
            path: ADMIN + 'parametres/genre/:id?',
            name: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_GENRE_ADD_OR_UPDATE.value},
            component: VAGenreAddOrUpdate,
            props: true
          },
        ]
      },
      {
        path: '/admin/parametres/mensurations',
        name: ROUTES.PARAMETRES_MENSURATION.name,
        meta: {value: ROUTES.PARAMETRES_MENSURATION.value},
        component: VAMensurations,
        children: [
          {
            path: '/admin/parametres/mensuration/:id?',
            name: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_MENSURATION_ADD_OR_UPDATE.value},
            component: VAMensurationAddOrUpdate,
            props: true
          }
        ]
      },
      {
        path: '/admin/parametres/services',
        name: ROUTES.PARAMETRES_SERVICE.name,
        meta: {value: ROUTES.PARAMETRES_SERVICE.value},
        component: VAServices,
        children: [
          {
            path: '/admin/parametres/service/:id?',
            name: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.name,
            meta: {value: ROUTES.PARAMETRES_SERVICE_ADD_OR_UPDATE.value},
            component: VAServiceAddOrUpdate,
            props: true
          }
        ]
      }
    ]
  }
]

const profilRoutes = [
  {
    path: PROFIL + '/informations',
    name: ROUTES.INFORMATIONS.name,
    meta: {value: ROUTES.INFORMATIONS.value},
    component: VUInformations,
  },
  {
    path: PROFIL + '/informations/update',
    name: ROUTES.INFORMATIONS_UPDATE.name,
    meta: {value: ROUTES.INFORMATIONS_UPDATE.value},
    component: VUInformationsUpdate
  },
  {
    path: PROFIL + '/adresse',
    name: ROUTES.ADRESSE_ADD.name,
    meta: {value: ROUTES.ADRESSE_ADD.value},
    component: VUAdresseAdd
  },
  {
    path: PROFIL + '/adresse/update',
    name: ROUTES.ADRESSE_UPDATE.name,
    meta: {value: ROUTES.ADRESSE_UPDATE.value},
    component: VUAdresseUpdate
  },
  {
    path: PROFIL + '/mensurations',
    name: LemkaHelpers.Routes.USER_MENSURATIONS.name,
    meta: {value: LemkaHelpers.Routes.USER_MENSURATIONS.value},
    component: VUMensurations
  },
  {
    path: PROFIL + '/mensurations/:id/detail',
    name: ROUTES.USER_MESURES.name,
    meta: {value: ROUTES.USER_MESURES.value},
    component: VUMensurationDetail,
    props: true
  },
  {
    path: PROFIL + '/mensuration/:id?',
    name: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.name,
    meta: {value: ROUTES.USER_MENSURATION_ADD_OR_UPDATE.value},
    component: VUUserMensurationAddOrUpdate,
    props: true
  },
  {
    path: PROFIL + '/demandes_devis/',
    name: ROUTES.DEMANDE_DE_DEVIS.name,
    meta: {value: ROUTES.DEMANDE_DE_DEVIS.value},
    component: VUDemandeDevis,
    children: [
      {
        path: PROFIL + '/demande_devis/:id?',
        name: ROUTES.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.name,
        meta: {value: ROUTES.DEMANDE_DE_DEVIS_ADD_OR_UPDATE.value},
        component: VUDemandeDevisAddOrUpdate,
        props: true
      }
    ]
  },
  {
    path: PROFIL + '/devis/',
    name: ROUTES.DEVIS_USER.name,
    meta: {value: ROUTES.DEVIS_USER.value},
    component: VUDevis,
    children: [
      {
        path: PROFIL + '/devis/:numero_devis/detail',
        name: ROUTES.USER_DEVIS_DETAIL.name,
        meta: {value: ROUTES.USER_DEVIS_DETAIL.value},
        component: VUDevisDetails,
        props: true
      }
    ]
  },
  {
    path: PROFIL + '/rendez-vous/',
    name: ROUTES.RENDEZ_VOUS_USER.name,
    meta: {value: ROUTES.RENDEZ_VOUS_USER.value},
    component: VURendezVous,
    children: [
      {
        path: PROFIL + '/rendez-vous/reservation/',
        name: ROUTES.RENDEZ_VOUS_USER_RESERVATION.name,
        meta: {value: ROUTES.RENDEZ_VOUS_USER_RESERVATION.value},
        component: VURendezVousReservation
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: ROUTES.HOME_ROUTE.name,
      meta: {value: ROUTES.HOME_ROUTE.value},
      component: VGHome
    },
    {
      path: '/login',
      name: ROUTES.LOGIN_ROUTE.name,
      meta: {value: ROUTES.LOGIN_ROUTE.value},
      component: VGLogin
    },
    {
      path: '/register',
      name: ROUTES.REGISTER_ROUTE.name,
      meta: {value: ROUTES.REGISTER_ROUTE.value},
      component: VGRegister
    },
    {
      path: '/about',
      name: ROUTES.ABOUT_ROUTE.name,
      meta: {value: ROUTES.ABOUT_ROUTE.value},
      component: VGAbout
    },
    {
      path: '/horaire',
      name: ROUTES.HORAIRE_ROUTE.name,
      meta: {value: ROUTES.HORAIRE_ROUTE.value},
      component: VGHoraire
    },
    {
      path: '/contact',
      name: ROUTES.CONTACT_ROUTE.name,
      meta: {value: ROUTES.CONTACT_ROUTE.value},
      component: VGContact
    },
    {
      path: '/articles/:slug',
      name: ROUTES.ARTICLES_DETAIL.name,
      meta: {value: ''},
      component: VGArticleDetail,
      props: true
    },
    {
      path: '/merceries/:id',
      name: ROUTES.MERCERIES_DETAIL.name,
      meta: {value: ''},
      component: VGMercerieDetail,
      props: true
    },
    {
      path: '/cgv',
      name: "VGCGV",
      meta: {value: "Conditions générales"},
      component: VGCGV
    },
    {
      path: '/confidentialite',
      name: "VGConfidentialite",
      meta: {value: "Politique de confidentialité"},
      component: VGConfidentialite
    },
    {
      path: '/email-verify',
      name: "VGEmailVerify",
      meta: {value: "Vérification d'email"},
      component: VGEmailVerify,
      props: route => ({query: route.query.token})
    },
    {
      path: '/password-reset',
      name: "VGResetPassword",
      meta: {value: "Mot de passe oublié"},
      component: VGResetPassword
    },
    {
      path: '/register-success',
      name: "VGRegisterSuccess",
      meta: {value: "Compte créé avec succès"},
      component: VGRegisterSuccess
    },
    {
      path: '/recherche',
      name: 'VGRecherche',
      meta: {value: 'Recherche'},
      component: VGRecherche,
      props: true
      // props: route => ({query: route.query.search})
    },
    {
      path: '/retour-remboursement',
      name: "VGRetourRemboursement",
      meta: {value: "Retour et remboursement"},
      component: VGRetourRemboursement
    },
    {
      path: PROFIL,
      name: ROUTES.PROFIL_ROUTE.name,
      meta: {value: ROUTES.PROFIL_ROUTE.value, requiresAuth: true},
      component: ViewUser,
      children: profilRoutes
    },
    {
      path: ADMIN,
      name: ROUTES.ADMIN_ROUTE.name,
      meta: {value: ROUTES.ADMIN_ROUTE.value, requiresAuth: true},
      component: ViewAdmin,
      children: adminRoutes
    },
    {
      path: '/404',
      name: ROUTES.PAGE_NOT_FOUND_ROUTE.name,
      meta: {value: ROUTES.PAGE_NOT_FOUND_ROUTE.value},
      component: VGNotFound
    },
    {
      path: '*',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authRequired = to.matched.some(record => record.meta.requiresAuth);
  // const loggedIn = sessionStorage.getItem('user');
  const loggedIn = localStorage.getItem('user');

  if (authRequired && !loggedIn) {
    next({name: ROUTES.LOGIN_ROUTE.name});
  } else {
    next();
  }
});

export default router
