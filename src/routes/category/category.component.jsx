import { useState, useEffect, Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import { selectCategoriesMap } from '../../store/categories/category.selector';
import { CategoryContainer, Title } from './category.style';

const Category = () => {
    //takes the category name from the URL parameter and then it 
    //pulls off the categories map from our new selector that will transform the categories array.
    const { category } = useParams();
    const categoriesMap = useSelector(selectCategoriesMap);
    const [products, setProducts] = useState(categoriesMap[category]);
    //will update the products inside that this category uses which will be an array depending on when the category itself changes in the URL parameter or when the
    //category is map updates. 
    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap]);


    return (
        <Fragment>
            <Title>{category.toUpperCase()}</Title>
            <CategoryContainer>

                {products &&
                    products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}

            </CategoryContainer>
        </Fragment>
    );

};
export default Category;