import UsersLayout from "../../containers/public/UsersLayout";

const users = [
    {
        path: '/users',
        component: UsersLayout,
        childRoutes: [
            {
                path: '/users/:userId'
            }
        ]
    }
];

export default users;
