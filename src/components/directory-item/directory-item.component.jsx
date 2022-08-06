import {useNavigate} from 'react-router-dom'

import {
  BackgoundImage,
  DirectotyBodyContainer,
  DirectoryContainer} from './directory-item.style'

const DirectoryItem = ({category}) => {
  const {imageUrl,title,route} = category;
  const navigate = useNavigate()

  const onNavigeteHandler = () => navigate(route)

  return (
    <DirectoryContainer onClick={onNavigeteHandler}>
      <BackgoundImage imageUrl={imageUrl}/>
      <DirectotyBodyContainer>
        <h2>{title}</h2>
        <p>Shop Now</p>
      </DirectotyBodyContainer>
    </DirectoryContainer>
  )
}

export default DirectoryItem