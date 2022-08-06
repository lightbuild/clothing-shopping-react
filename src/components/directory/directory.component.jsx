import {CategoriesContainer} from './directory.style'
import '../directory-item/directory-item.component'
import DirectoryItem from "../directory-item/directory-item.component";

const Directory = ({categories}) => {
  return (
    <CategoriesContainer>
      {categories.map((category) => (
        <DirectoryItem key={category.id} category={category}/>
      ))}
    </CategoriesContainer>
  )
}

export default Directory