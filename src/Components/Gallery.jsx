import GalleryItem from './GalleryItem';

export default function Gallery(props) {
  if (!props.data || !props.data.result) {
    return <div></div>; 
  }
  const data = props.data.result.read();

  const display = data.map((item, index) => (
    <GalleryItem item={item} key={index} />
  ));

  return <div>{display}</div>;
}
