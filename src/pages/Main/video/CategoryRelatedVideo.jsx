import { useSearchParams } from 'react-router-dom';
import { useSingleVideoQuery } from '../../../redux/features/tutorialSlice';

export default function CategoryRelatedVideo() {

     const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  console.log(id, "category id");
  const {data} = useSingleVideoQuery(id);
  console.log(data, 'signle');
  return (
    <div>
      <h1>Category Related Video {id}</h1>
    </div>
  )
}
