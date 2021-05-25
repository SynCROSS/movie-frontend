import { useRouter } from 'next/dist/client/router';
import DetailContainer from '../../../containers/content/DetailContainer';

const Detail = () => {
  const { media_type, id } = useRouter().query;

  if (
    typeof id === 'string' &&
    /\d+/.exec(id) &&
    typeof media_type === 'string' &&
    /movie|tv/.exec(media_type)
  ) {
    return <DetailContainer media_type={media_type} id={+id} />;
  }
  return <div className="main-content"></div>;
};

export default Detail;
