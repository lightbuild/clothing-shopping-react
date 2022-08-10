import {CategoryContainer,CategoryTitle} from './category.style'
import {Fragment, useState, useEffect} from 'react'

import {useParams} from 'react-router-dom'

import ProductCard from "../../components/product-card/product-card.component";

import {useSelector} from "react-redux";
import {selectCategoriesMap} from "../../store/categories/categories.selector";

const Category = () => {
  const {category} = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)

  const [products, setProducts] = useState([])

  useEffect(() =>{
    setProducts(categoriesMap[category])
  },[category,categoriesMap])

  return (
    <Fragment>
      <CategoryTitle>{category.toUpperCase()}</CategoryTitle>
      <CategoryContainer>
        {products && products.map((product) => (
          <ProductCard key={product.id} product={product}/>
        ))}
      </CategoryContainer>
    </Fragment>
  )
}

export default Category