import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/home'}
    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Fractal-Up';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
})

export default router;
