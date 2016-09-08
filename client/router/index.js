import App from "../components/global/App"
import Dashboard from "../containers/Dashboard"
import users from "./users"

const routes = [
    {
        path: '/',
        component: App,
        indexRoute: {
            component: Dashboard
        },
        childRoutes: [...users]
    },
    {
        path: '*',
        component: App
    }
    // indexRoute: { component: Dashboard },
    // childRoutes: [
    //     { path: 'beers', component: Beers },
    //     { path: 'users', component: Users }
    // {
    //   path: 'inbox',
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id',
    //     onEnter: ({ params }, replace) => replace(`/messages/${params.id}`)
    //   }]
    // },
    // {
    //   component: Inbox,
    //   childRoutes: [{
    //     path: 'messages/:id', component: Message
    //   }]
    // }
  // ]
];

export default routes;
