import {createRouter, createWebHistory} from "vue-router";
import CountryExplorerComponent from "../country-explorer/pages/country-explorer.component.vue";
import View1Component from "../country-explorer/pages/view-1.component.vue";
import View2Component from "../country-explorer/pages/view-2.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/country-explorer', name:'country-explorer', component: CountryExplorerComponent, meta: { title: 'Country Explorer' } },
        { path: '/view-1'          , name:'view-1'          , component: View1Component          , meta: { title: 'View 1' } },
        { path: '/view-2'         , name:'view-2'          , component: View2Component           , meta: { title: 'View 2' } },
        { path: '/'               , redirect: '/country-explorer' }

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Fractal-Up';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})

export default router;
