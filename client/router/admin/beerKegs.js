import BeerKegsLayout from "../../containers/admin/beerKeg/BeerKegsLayout";
import BeerKegForm from "../../containers/admin/beerKeg/BeerKegForm";

const beerBrands = [
    {
        path: '/beer-kegs',
        component: BeerKegsLayout,
        childRoutes: [
            {
                path: '/beer-kegs/new',
                component: BeerKegForm
            },
            {
                path: '/beer-kegs/:id',
                component: BeerKegForm
            }
        ]
    }
];

export default beerBrands;
