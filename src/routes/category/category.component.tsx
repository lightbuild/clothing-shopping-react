import {CatergoryContainer,ProductContainer, CategoryTitle} from './category.style';
import {useState, useEffect} from 'react';

import {useParams} from 'react-router-dom';

import ProductCard from '../../components/product-card/product-card.component';

import {useSelector} from 'react-redux';
import {selectCategoriesMap, selectIsLoading} from '../../store/categories/categories.selector';

import Spinner from '../../components/spinner/spinner.component';


type CategoryRouteParams = {
  category: string;
}


const Category = () => {
  const {category} = useParams<keyof CategoryRouteParams>() as CategoryRouteParams;

  const categoriesMap = useSelector(selectCategoriesMap);
  const isLoading = useSelector(selectIsLoading);

  const [products, setProducts] = useState(categoriesMap[category])

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [category, categoriesMap]);

  return (
    <CatergoryContainer>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      {isLoading ? (
        <Spinner/>
      ) : (
        <ProductContainer>
          {products && products.map((product) => (
            <ProductCard key={product.id} product={product}/>
          ))}
        </ProductContainer>
      )}
    </CatergoryContainer>
  );
};

export default Category;