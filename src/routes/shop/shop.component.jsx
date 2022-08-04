import {Routes,Route} from 'react-router-dom'

import CategoriesPreview from "../category-preview/category-preview.component";


const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
    </Routes>
  )
}

export default Shop