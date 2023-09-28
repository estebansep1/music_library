import GalleryItem from './GalleryItem';

export default function Galley(props) {
    const data = props.data.result.read()

    const display = data.map((item, index) => <GalleryItem item={item} key={index} />)

    return (
        <div>
        {display}
        </div>
    )
}