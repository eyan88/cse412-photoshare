import Post from './Post';

const Gallery = () => {

    return (
        <div className="container my-12 mx-auto px-4 md:px-12 overflow-auto">
            <h1 className="text-3xl">Gallery</h1>
            <div className="mt-4 grid gap-8 lg:grid-cols-2 md:grid-cols-3 sm:grid-cols-1">
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
                <Post />
            </div>
        </div>
    )

}

export default Gallery;