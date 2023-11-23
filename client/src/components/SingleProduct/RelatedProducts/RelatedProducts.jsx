import useFetch from '../../../hooks/UseFetch';
import Products from '../../Products/Products';

const RelatedProducts = ({ categoriesId, productId }) => {

    const {data} = useFetch(`/api/products?populate=*&filters[id][$ne]=${productId}&filters[categories][id]=${categoriesId}&pagination[start]=0&pagination[limit]=4`);

    return (
        <div className='related-products'>
            <Products 
                headingText = "Related Products" 
                products={data}
            />
        </div>
    );
};

export default RelatedProducts;
