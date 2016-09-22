import BeerBrandsLayout from "../../containers/admin/beerBrand/BeerBrandsLayout";
import BeerBrandForm from "../../containers/admin/beerBrand/BeerBrandForm";

const beerBrands = [
    {
        path: '/beer-brands',
        component: BeerBrandsLayout,
        childRoutes: [
            {
                path: '/beer-brands/new',
                component: BeerBrandForm
            },
            {
                path: '/beer-brands/:beerBrandId',
                component: BeerBrandForm
            }
        ]
    }
];

export default beerBrands;
