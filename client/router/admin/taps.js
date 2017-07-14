import TapsLayout from "../../containers/admin/tap/TapsLayout";
import TapForm from "../../containers/admin/tap/TapForm";

const taps = [
    {
        path: '/beer-taps',
        component: TapsLayout,
        childRoutes: [
            {
                path: '/beer-taps/:id',
                component: TapForm
            }
        ]
    }
];

export default taps;
