import * as React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Card, Stack, TextContainer, Toast } from '@shopify/polaris';
import { ThumbsUpMajor, ThumbsUpMinor, LinkMinor } from '@shopify/polaris-icons';

import './components.css';
import '../styles.css'

type ImageCardProps = {
  title: string,
  date: string,
  imageUrl: string,
  description: string,
  credit?: string,
  isSingleCard: boolean
};

const copySingleImgUrl = (date: string) => {
  if(window.location.hash.includes(`image`)) {
    navigator.clipboard.writeText(window.location.href)
  } else {
    navigator.clipboard.writeText(window.location.href + `image/${date}`)
  }
}

const isImage = (imageUrl: string) => {
  const imageExtensions = ["png", "jpg", "gif"]
  return imageExtensions.find((extension) =>imageUrl.includes(extension))
}

const ImageCard: React.FC<ImageCardProps> = (props) => {
  // States
  const [isLiked, setIsLiked] = React.useState<boolean>(false)
  const [showToast, setShowToast] = React.useState<boolean>(false);

  const toggleActive = React.useCallback(() => {
    setShowToast((showToast) => !showToast)
  }, []);

  React.useEffect(() => {
    if(localStorage.getItem(props.date)) setIsLiked(true)
  }, [props.date, setIsLiked]);
  
  const linkCopiedToast = showToast ? (
    <Toast content="Link copied!" onDismiss={toggleActive} duration={4500} />
  ) : null
  
  const likeIcon = isLiked ? ThumbsUpMajor : ThumbsUpMinor
  const likeText = isLiked ? "Liked" : "Like"
  const handleLike = () => {
    setIsLiked(!isLiked)
    !isLiked ? (
      localStorage.setItem(String(props.date), "liked")
    ) : (
      localStorage.removeItem(String(props.date))
    )
  }

  return (
    <Card>
      <Card.Header 
        title={moment(props.date).format("MMMM Do, YYYY") + ": " + props.title}
      >
        <Button 
          plain 
          icon={LinkMinor}
          onClick={() => {
            toggleActive()
            copySingleImgUrl(props.date)
          }}
        >
          Share
        </Button>
        {linkCopiedToast}
      </Card.Header>
      <Card.Section>
        {isImage(props.imageUrl) ? (
          <img alt={props.title} width="100%" src={props.imageUrl}/>
        ) : (
          <iframe title={props.title} width="100%" height="315px" src={props.imageUrl}/>
        )}
        {props.isSingleCard && <div className="card-text-area">
          <TextContainer>
            <p>{props.description}</p>
            
          </TextContainer>
        </div>}
        <div className="mt-m">
          <Stack alignment="center">
            <Stack.Item fill>
              <ButtonGroup>
                <Button 
                  primary={!isLiked}
                  pressed={isLiked}
                  icon={likeIcon} 
                  onClick={() => handleLike()}
                >
                  {likeText}
                </Button>
                {!props.isSingleCard && 
                  <Link to={`/image/${props.date}`}>
                    <Button>
                      View more
                    </Button>
                  </Link>
                }
              </ButtonGroup>
            </Stack.Item>
            {props.credit && <p>&copy;	{props.credit}</p>}
          </Stack>
        </div>
      </Card.Section>
    </Card>
  )
}
export default ImageCard;