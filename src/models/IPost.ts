

interface IPost {
    id: number;
    trip_type: string;
    how_long: number;
    rating: number;
    trip_area: string;
    trip_difficulty: string;
    image_filename: string;
    trip_description: string;
    user: {
        display_name: string;
    }
}

export default IPost;