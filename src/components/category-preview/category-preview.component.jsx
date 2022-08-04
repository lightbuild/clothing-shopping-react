import './category-preview.style.scss'
import ProductCard from "../product-card/product-card.component";

const CategoryPreview = ({title,products}) =>{
    return (
      <div className='category-preview-container'>
        <h2 className='title-container'>
          <span className='title'>{title}</span>
        </h2>
        <div className='preview'>
          {
            products
              .filter((_,index)=> index < 4)
              .map((product)=>(
                  <ProductCard key={product.id} product={product} />
                )
              )
          }
        </div>
      </div>
    )
}

export default CategoryPreview