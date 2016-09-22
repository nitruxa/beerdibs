import UsersLayout from "../../containers/admin/user/UsersLayout";
import EditUser from "../../containers/admin/user/EditUser";
import NewUser from "../../containers/admin/user/NewUser";

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
