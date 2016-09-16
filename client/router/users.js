import UsersLayout from "../containers/user/UsersLayout";
import EditUser from "../containers/user/EditUser";
import NewUser from "../containers/user/NewUser";

const users = [
    {
        path: '/users',
        component: UsersLayout,
        childRoutes: [
            {
                path: '/users/new',
                component: NewUser
            },
            {
                path: '/users/:userId',
                component: EditUser
            }
        ]
    }
];

export default users;
