import {BackgoundImage,DirectotyBodyContainer,DirectoryContainer} from './directory-item.style'

const DirectoryItem = ({category}) => {
  const {imageUrl,title} = category;
  return (
    <DirectoryContainer>
      <BackgoundImage imageUrl={imageUrl}/>
      <DirectotyBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectotyBodyContainer>
    </DirectoryContainer>
  )
}

export default DirectoryItem